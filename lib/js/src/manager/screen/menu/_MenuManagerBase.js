/*
* Copyright (c) 2020, Livio, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the Livio Inc. nor the names of its contributors
* may be used to endorse or promote products derived from this software
* without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { _SubManagerBase } from '../../_SubManagerBase.js';
import { MenuConfiguration } from './MenuConfiguration.js';
import { DynamicMenuUpdatesMode } from './enums/DynamicMenuUpdatesMode.js';
import { HMILevel } from '../../../rpc/enums/HMILevel.js';
import { SystemContext } from '../../../rpc/enums/SystemContext.js';
import { FunctionID } from '../../../rpc/enums/FunctionID.js';
import { PredefinedWindows } from '../../../rpc/enums/PredefinedWindows.js';
import { SystemCapabilityType } from '../../../rpc/enums/SystemCapabilityType.js';
import { DisplayType } from '../../../rpc/enums/DisplayType.js';
import { _MenuManagerCompletionListener } from './_MenuManagerCompletionListener.js';
import { _MenuReplaceOperation } from './_MenuReplaceOperation.js';
import { _MenuConfigurationUpdateOperation } from './_MenuConfigurationUpdateOperation.js';
import { _MenuShowOperation } from './_MenuShowOperation.js';
import { MenuSelectionListener } from './MenuSelectionListener.js';

class _MenuManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _MenuManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - A _LifecycleManager instance.
     * @param {FileManager} fileManager - A FileManager instance.
     */
    constructor (lifecycleManager, fileManager = null) {
        super(lifecycleManager);
        this._fileManager = fileManager;
        this._currentMenuConfiguration = new MenuConfiguration();
        this._menuConfiguration = new MenuConfiguration();
        this._menuCells = [];
        this._currentMenuCells = [];
        this._dynamicMenuUpdatesMode = DynamicMenuUpdatesMode.ON_WITH_COMPAT_MODE;
        this._displayType = null;
        this._commandListener = null;
        // custom logic for hmi status change and display notifications needed
        this._currentSystemContext = SystemContext.SYSCTXT_MAIN;
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._hmiListener = null;
        this._onDisplayCapabilityListener = null;
        this._windowCapability = null;
        this._isHandlingTasks = true;
        this._addListeners();
    }

    /**
     * After this method finishes, the manager is ready
     * @returns {Promise} - A promise.
     */
    async start () {
        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Teardown method
     */
    dispose () {
        this._menuCells = [];
        this._currentMenuCells = [];
        this._currentHmiLevel = HMILevel.HMI_NONE;
        this._currentSystemContext = SystemContext.SYSCTXT_MAIN;
        this._dynamicMenuUpdatesMode = DynamicMenuUpdatesMode.ON_WITH_COMPAT_MODE;
        this._windowCapability = null;
        this._menuConfiguration = null;
        this._currentMenuConfiguration = null;
        this._cancelAllTasks(); // cancel all operations
        // remove the listeners
        if (typeof this._hmiListener === 'function') {
            this._lifecycleManager.removeRpcListener(FunctionID.OnHMIStatus, this._hmiListener);
        }
        if (typeof this._commandListener === 'function') {
            this._lifecycleManager.removeRpcListener(FunctionID.OnCommand, this._commandListener);
        }
        if (typeof this._onDisplayCapabilityListener === 'function') {
            this._lifecycleManager.removeOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);
        }
        super.dispose();
    }

    /**
     * Suspend the queue if the HMI level is NONE since we want to delay sending RPCs until we're in non-NONE
     */
    _updateTransactionQueueSuspended () {
        if (this._currentHmiLevel === HMILevel.HMI_NONE || this._currentSystemContext === SystemContext.SYSCTXT_MENU) {
            console.log(`MenuManagerBase - Suspending the transaction queue. Current HMI level is: ${this._currentHmiLevel}, current system context is: ${this._currentSystemContext}`);
            this._canRunTasks = false;
        } else {
            console.log('MenuManagerBase - Starting the transaction queue');
            this._canRunTasks = true;
            this._invokeTaskQueue();
        }
    }

    /**
     * Sets the dynamic updates mode
     * @param {DynamicMenuUpdatesMode} value - The dynamic updates mode
     */
    _setDynamicMenuUpdatesMode (value) {
        this._dynamicMenuUpdatesMode = value;
    }

    /**
     * Gets the dynamic updates mode
     * @returns {DynamicMenuUpdatesMode} - The dynamic updates mode
     */
    _getDynamicMenuUpdatesMode () {
        return this._dynamicMenuUpdatesMode;
    }


    /**
     * Creates and sends all associated Menu RPCs
     * @param {MenuCell[]} cells - The menu cells that are to be sent to the head unit, including their sub-cells.
     */
    _setMenuCells (cells = []) {
        if (cells === null) {
            console.error('MenuManagerBase - Cells list is null. Skipping...');
            return;
        }

        if (!this._menuCellsAreUnique(cells.map(cell => cell.clone()), [])) {
            console.error('MenuManagerBase - Not all set menu cells are unique, but that is required');
            return;
        }

        // Create a deep copy of the list so future changes by developers don't affect the algorithm logic
        this._menuCells = cells.map(cell => cell.clone());
        const isDynamicMenuUpdateActiveBoolean = this._isDynamicMenuUpdateActive(this._dynamicMenuUpdatesMode, this._displayType);

        const operation = new _MenuReplaceOperation(this._lifecycleManager, this._fileManager, this._windowCapability,
            this._menuConfiguration, this._currentMenuCells, this._menuCells, isDynamicMenuUpdateActiveBoolean, new _MenuManagerCompletionListener()
                .setOnComplete((success, currentMenuCells) => {
                    this._currentMenuCells = currentMenuCells;
                    this._updateMenuReplaceOperationsWithNewCurrentMenu();
                    console.log('MenuManagerBase - Finished updating menu');
                })
        );

        // Cancel previous MenuReplaceOperations
        this._cancelAllTasks('MenuReplaceOperation');
        this._addTask(operation);
    }

    /**
     * Returns current list of menu cells
     * @returns {MenuCell[]} - A list of currently set menu cells
     */
    _getMenuCells () {
        return this._menuCells;
    }

    /**
     * Shows a menu cell
     * @param {MenuCell} cell - The menu cell to show
     * @returns {Boolean} - Whether the operation is placed into the task queue
     */
    _openMenuPrivate (cell = null) {
        let foundClonedCell = null;

        if (cell !== null && this._currentMenuCells !== null) {
            // We must see if we have a copy of this cell, since we clone the objects
            for (const clonedCell of this._currentMenuCells) {
                if (clonedCell.equals(cell) && clonedCell._getCellId() !== _MenuManagerBase.PARENT_ID_NOT_FOUND) {
                    // We've found the correct sub menu cell
                    foundClonedCell = clonedCell;
                    break;
                }
            }
        }

        if (cell !== null && !cell.isSubMenuCell()) {
            console.error(`MenuManagerBase - The cell ${cell.getTitle()} does not contain any sub cells, so no submenu can be opened`);
            return false;
        } else if (cell !== null && foundClonedCell === null) {
            console.error('MenuManagerBase - The cell has not been sent to the head unit, so no submenu can be opened. Make sure that the cell exists in the menu array');
            return false;
        } else if (this._lifecycleManager.getSdlMsgVersion().getMajorVersion() < 6) {
            console.warn('MenuManagerBase - The openSubmenu method is not supported on this head unit');
            return false;
        }

        // create the operation
        const operation = new _MenuShowOperation(this._lifecycleManager, foundClonedCell);

        // cancel previous open menu operations
        this._cancelAllTasks('MenuShowOperation');
        this._addTask(operation);
        return true;
    }

    /**
     * Opens the main menu
     * @returns {Boolean} - Whether the operation is placed into the task queue
     */
    _openMenu () {
        return this._openMenuPrivate();
    }

    /**
     * Opens a subMenu. The cell you pass in must be constructed with submenu cells
     * @param {MenuCell} cell - A submenu cell whose sub menu you wish to open
     * @returns {Boolean} - Whether the operation is placed into the task queue
     */
    _openSubMenu (cell) {
        return this._openMenuPrivate(cell);
    }

    /**
     * This method is called via the screen manager to set the menuConfiguration.
     * This will be used when a menuCell with sub-cells has a null value for SubMenuLayout
     * @param {MenuConfiguration} menuConfiguration - The default menuConfiguration
     */
    _setMenuConfiguration (menuConfiguration) {
        if (menuConfiguration.equals(this._menuConfiguration)) {
            console.log('MenuManagerBase - New menu configuration is equal to existng one, will not set new configuration');
            return;
        }

        this._menuConfiguration = menuConfiguration;
        const operation = new _MenuConfigurationUpdateOperation(this._lifecycleManager, this._windowCapability, menuConfiguration, success => {
            if (!success) {
                console.error('MenuManagerBase - Error setting new menu configuration.');
            } else {
                this._currentMenuConfiguration = menuConfiguration;
                this._updateMenuReplaceOperationsWithNewMenuConfiguration();
            }
        });

        // cancel menu configuration operations
        this._cancelAllTasks('MenuConfigurationUpdateOperation');
        this._addTask(operation);
    }

    /**
     * Gets the menu configuration
     * @returns {MenuConfiguration} - The menu configuration
     */
    _getMenuConfiguration () {
        return this._menuConfiguration;
    }

    /**
     * Invoke the selection listeners for matching command IDs
     * @param {MenuCell[]} cells - The menu cells
     * @param {OnCommand} command - The OnCommand to check the ID from
     * @returns {Boolean} - Whether a menu cell was found with the matching command ID
     */
    _callListenerForCells (cells = null, command = null) {
        if (cells === null || cells.length === 0 || command === null) {
            return false;
        }

        for (const cell of cells) {
            if (cell._getCellId() === command.getCmdID() && cell.getMenuSelectionListener() instanceof MenuSelectionListener) {
                cell.getMenuSelectionListener().onTriggered(command.getTriggerSource());
                return true;
            }
            if (cell.isSubMenuCell() && cell.getSubCells().length !== 0) {
                // for each cell, if it has sub cells, recursively loop through those as well
                const success = this._callListenerForCells(cell.getSubCells(), command);
                if (success) {
                    return true;
                }
            }
        }
    }

    /**
     * All MenuReplaceOperations get an updated current menu
     */
    _updateMenuReplaceOperationsWithNewCurrentMenu () {
        this._taskQueue.forEach(task => {
            if (task.getName() === 'MenuReplaceOperation') {
                task.setCurrentMenu(this._currentMenuCells);
            }
        });
    }

    /**
     * All MenuReplaceOperations get an updated window capability
     */
    _updateMenuReplaceOperationsWithNewWindowCapability () {
        this._taskQueue.forEach(task => {
            if (task.getName() === 'MenuReplaceOperation') {
                task._setWindowCapability(this._windowCapability);
            }
        });
    }

    /**
     * All MenuReplaceOperations get an updated menu configuration
     */
    _updateMenuReplaceOperationsWithNewMenuConfiguration () {
        this._taskQueue.forEach(task => {
            if (task.getName() === 'MenuReplaceOperation') {
                task.setMenuConfiguration(this._currentMenuConfiguration);
            }
        });
    }

    /**
     * Determines whether dynamic menu updates are enabled
     * @param {DynamicMenuUpdatesMode} updateMode - The dynamic menu update mode
     * @param {String} displayType - The display type
     * @returns {Boolean} - Whether dynamic menu updates are enabled
     */
    _isDynamicMenuUpdateActive (updateMode, displayType) {
        if (updateMode === DynamicMenuUpdatesMode.ON_WITH_COMPAT_MODE) {
            if (this._displayType === null) {
                return true;
            }
            return displayType !== DisplayType.GEN3_8_INCH;
        } else if (updateMode === DynamicMenuUpdatesMode.FORCE_OFF) {
            return false;
        } else if (updateMode === DynamicMenuUpdatesMode.FORCE_ON) {
            return true;
        }

        return true;
    }

    /**
     * Check for cell lists with completely duplicate information, or any duplicate voiceCommands
     * @param {MenuCell[]} cells - The menu cells to check
     * @param {String[]} allVoiceCommands - The voice commands to check
     * @returns {Boolean} - Whether the menu cells are unique
     */
    _menuCellsAreUnique (cells, allVoiceCommands) {
        const identicalCellsCheckSet = [];
        // Check all voice commands for identical items and check each list of cells for identical cells
        for (const cell of cells) {
            if (identicalCellsCheckSet.findIndex(setCell => setCell.equals(cell)) === -1) {
                identicalCellsCheckSet.push(cell);
            }

            if (cell.isSubMenuCell() && cell.getSubCells().length > 0) {
                // Recursively check the sub-cell lists to see if they are all unique as well. If anything is not, this will chain back up the list to return false.
                const subCellsAreUnique = this._menuCellsAreUnique(cell.getSubCells(), allVoiceCommands);
                if (!subCellsAreUnique) {
                    console.error('MenuManagerBase - Not all subCells are unique. The menu will not be set.');
                    return false;
                }
            }

            // Voice commands have to be identical across all lists
            if (cell.getVoiceCommands() !== null) {
                allVoiceCommands = allVoiceCommands.concat(cell.getVoiceCommands());
            }
        }

        // Check for duplicate cells
        if (identicalCellsCheckSet.length !== cells.length) {
            console.error('MenuManagerBase - Not all cells are unique. Cells in each list (such as main menu or sub cell list) must have some differentiating property other than the sub cells within a cell. The menu will not be set.');
            return false;
        }

        // All the VR commands must be unique
        const uniqueVoiceCommands = new Set(allVoiceCommands).size === allVoiceCommands.length;

        if (!uniqueVoiceCommands) {
            console.error('MenuManagerBase - Attempted to create a menu with duplicate voice commands. Voice commands must be unique. The menu will not be set');
            return false;
        }

        return true;
    }

    /**
     * Listen for updates from RPCs
     * @private
     */
    _addListeners () {
        this._onDisplayCapabilityListener = (capabilities) => {
            if (!Array.isArray(capabilities) || capabilities.length === 0) {
                return;
            }
            const displayCapability = capabilities[0];
            this._displayType = displayCapability.getDisplayName();
            for (const windowCapability of displayCapability.getWindowCapabilities()) {
                let currentWindowId;
                if (windowCapability.getWindowID() !== null && windowCapability.getWindowID() !== undefined) {
                    currentWindowId = windowCapability.getWindowID();
                } else {
                    currentWindowId = PredefinedWindows.DEFAULT_WINDOW;
                }
                if (currentWindowId === PredefinedWindows.DEFAULT_WINDOW) {
                    this._windowCapability = windowCapability;
                    this._updateMenuReplaceOperationsWithNewWindowCapability();
                }
            }
        };

        this._lifecycleManager.addOnSystemCapabilityListener(SystemCapabilityType.DISPLAYS, this._onDisplayCapabilityListener);

        this._hmiListener = (onHmiStatus) => {
            if (onHmiStatus.getWindowID() !== null && onHmiStatus.getWindowID() !== PredefinedWindows.DEFAULT_WINDOW) {
                return;
            }
            this._currentHmiLevel = onHmiStatus.getHmiLevel();
            this._currentSystemContext = onHmiStatus.getSystemContext();
            this._updateTransactionQueueSuspended();
        };

        this._lifecycleManager.addRpcListener(FunctionID.OnHMIStatus, this._hmiListener);

        this._commandListener = (onCommand) => {
            this._callListenerForCells(this._currentMenuCells, onCommand);
        };

        this._lifecycleManager.addRpcListener(FunctionID.OnCommand, this._commandListener);
    }
}

_MenuManagerBase.PARENT_ID_NOT_FOUND = 2000000000;

export { _MenuManagerBase };
