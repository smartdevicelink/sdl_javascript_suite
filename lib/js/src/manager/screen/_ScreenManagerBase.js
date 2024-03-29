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

import { _SubManagerBase } from '../_SubManagerBase.js';
import { _SoftButtonManager } from './_SoftButtonManager.js';
import { _TextAndGraphicManager } from './_TextAndGraphicManager.js';
import { _VoiceCommandManager } from './_VoiceCommandManager.js';
import { _SubscribeButtonManager } from './_SubscribeButtonManager';
import { Enum } from '../../util/Enum';
import { _AlertManager } from './_AlertManager.js';
import { _ChoiceSetManagerBase } from './choiceset/_ChoiceSetManagerBase';
import { _MenuManagerBase } from './menu/_MenuManagerBase';

class _ScreenManagerBase extends _SubManagerBase {
    /**
     * Initializes an instance of _ScreenManagerBase.
     * @class
     * @private
     * @param {_LifecycleManager} lifecycleManager - An instance of _LifecycleManager.
     * @param {FileManager} fileManager - An instance of FileManager.
     */
    constructor (lifecycleManager, fileManager = null) {
        super(lifecycleManager);

        this._fileManager = fileManager;
        if (this._fileManager !== null) {
            this._softButtonManager = new _SoftButtonManager(lifecycleManager, this._fileManager);
            this._textAndGraphicManager = new _TextAndGraphicManager(lifecycleManager, this._fileManager, this._softButtonManager);
            this._alertManager = new _AlertManager(lifecycleManager, this._fileManager);
            this._choiceSetManagerBase = new _ChoiceSetManagerBase(lifecycleManager, this._fileManager);
            this._menuManagerBase = new _MenuManagerBase(lifecycleManager, this._fileManager);
        }
        this._voiceCommandManager = new _VoiceCommandManager(lifecycleManager);
        this._subscribeButtonManager = new _SubscribeButtonManager(lifecycleManager);
    }

    /**
     * Start the manager.
     * @returns {Promise} - A promise.
     */
    async start () {
        await Promise.all([
            this._softButtonManager.start(),
            this._textAndGraphicManager.start(),
            this._voiceCommandManager.start(),
            this._subscribeButtonManager.start(),
            this._alertManager.start(),
            this._choiceSetManagerBase.start(),
            this._menuManagerBase.start(),
        ]);

        _ScreenManagerBase._softButtonIDBySoftButtonManager = new Set();
        _ScreenManagerBase._softButtonIDByAlertManager = new Set();

        this._transitionToState(_SubManagerBase.READY);
        await super.start();
    }

    /**
     * Called when manager is being torn down
     */
    dispose () {
        this._softButtonManager.dispose();
        this._textAndGraphicManager.dispose();
        this._voiceCommandManager.dispose();
        this._subscribeButtonManager.dispose();
        this._alertManager.dispose();

        _ScreenManagerBase._softButtonIDBySoftButtonManager = null;
        _ScreenManagerBase._softButtonIDByAlertManager = null;
        this._choiceSetManagerBase.dispose();
        this._menuManagerBase.dispose();
        super.dispose();
    }

    /**
     * The top text field within a template layout. Pass an empty string '' to clear the text field.
     *
     * If the system does not support a full 4 fields, this will automatically be concatenated and properly send the field available.
     *
     * If 3 lines are available: [field1, field2, field3 - field 4]
     *
     * If 2 lines are available: [field1 - field2, field3 - field4]
     *
     * If 1 line is available: [field1 - field2 - field3 - field4]
     *
     * @param {String} textField1 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField1 (textField1) {
        this._softButtonManager.setCurrentMainField1(textField1);
        this._textAndGraphicManager.setTextField1(textField1);
        return this;
    }

    /**
     * Get the current textField1 value
     * @returns {String} - value represents the current textField1 value
     */
    getTextField1 () {
        return this._textAndGraphicManager.getTextField1();
    }

    /**
     * Sets the second text field within a template layout. Pass an empty string '' to clear the text field.
     *
     * If the system does not support a full 4 fields, this will automatically be concatenated and properly send the field available.
     *
     * If 3 lines are available: [field1, field2, field3 - field 4]
     *
     * If 2 lines are available: [field1 - field2, field3 - field4]
     *
     * If 1 line is available: [field1 - field2 - field3 - field4]
     *
     * @param {String} textField2 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField2 (textField2) {
        this._textAndGraphicManager.setTextField2(textField2);
        return this;
    }

    /**
     * Get the current textField2 value
     * @returns {String} - value represents the current textField2 value
     */
    getTextField2 () {
        return this._textAndGraphicManager.getTextField2();
    }

    /**
     * Sets the third text field within a template layout. Pass an empty string '' to clear the text field.
     *
     * If the system does not support a full 4 fields, this will automatically be concatenated and properly send the field available.
     *
     * If 3 lines are available: [field1, field2, field3 - field 4]
     *
     * If 2 lines are available: [field1 - field2, field3 - field4]
     *
     * If 1 line is available: [field1 - field2 - field3 - field4]
     *
     * @param {String} textField3 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField3 (textField3) {
        this._textAndGraphicManager.setTextField3(textField3);
        return this;
    }

    /**
     * Get the current textField3 value
     * @returns {String} - value represents the current textField3 value
     */
    getTextField3 () {
        return this._textAndGraphicManager.getTextField3();
    }

    /**
     * Sets the fourth text field within a template layout. Pass an empty string "" to clear the text field.
     *
     * If the system does not support a full 4 fields, this will automatically be concatenated and properly send the field available.
     *
     * If 3 lines are available: [field1, field2, field3 - field 4]
     *
     * If 2 lines are available: [field1 - field2, field3 - field4]
     *
     * If 1 line is available: [field1 - field2 - field3 - field4]
     *
     * @param {String} textField4 - value represents the textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField4 (textField4) {
        this._textAndGraphicManager.setTextField4(textField4);
        return this;
    }

    /**
     * Get the current textField4 value
     * @returns {String} - value represents the current textField4 value
     */
    getTextField4 () {
        return this._textAndGraphicManager.getTextField4();
    }

    /**
     * Set the mediaTrackTextField on the head unit screen
     * @param {String} mediaTrackTextField - value represents the mediaTrackTextField
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setMediaTrackTextField (mediaTrackTextField) {
        this._textAndGraphicManager.setMediaTrackTextField(mediaTrackTextField);
        return this;
    }

    /**
     * Get the current mediaTrackTextField value
     * @returns {String} - value represents the current mediaTrackTextField
     */
    getMediaTrackTextField () {
        return this._textAndGraphicManager.getMediaTrackTextField();
    }

    /**
     * Set the primaryGraphic on the head unit screen
     * @param {SdlArtwork} primaryGraphic - an SdlArtwork object represents the primaryGraphic
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setPrimaryGraphic (primaryGraphic) {
        if (primaryGraphic === null) {
            primaryGraphic = this._textAndGraphicManager._getBlankArtwork();
        }
        this._textAndGraphicManager.setPrimaryGraphic(primaryGraphic);
        return this;
    }

    /**
     * Get the current primaryGraphic value
     * @returns {SdlArtwork} - object represents the current primaryGraphic
     */
    getPrimaryGraphic () {
        if (this._textAndGraphicManager.getPrimaryGraphic() === null ||  this._textAndGraphicManager.getPrimaryGraphic().getName() === null || this._textAndGraphicManager.getPrimaryGraphic().getName() === this._textAndGraphicManager._getBlankArtwork().getName()) {
            return null;
        }
        return this._textAndGraphicManager.getPrimaryGraphic();
    }

    /**
     * Set the secondaryGraphic on the head unit screen
     * @param {SdlArtwork} secondaryGraphic - an SdlArtwork object represents the secondaryGraphic
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setSecondaryGraphic (secondaryGraphic) {
        if (secondaryGraphic === null) {
            secondaryGraphic = this._textAndGraphicManager._getBlankArtwork();
        }
        this._textAndGraphicManager.setSecondaryGraphic(secondaryGraphic);
        return this;
    }

    /**
     * Get the current secondaryGraphic value
     * @returns {SdlArtwork} - object represents the current secondaryGraphic
     */
    getSecondaryGraphic () {
        if (this._textAndGraphicManager.getSecondaryGraphic() === null || this._textAndGraphicManager.getSecondaryGraphic().getName() === null || this._textAndGraphicManager.getSecondaryGraphic().getName() === this._textAndGraphicManager._getBlankArtwork().getName()) {
            return null;
        }
        return this._textAndGraphicManager.getSecondaryGraphic();
    }

    /**
     * Set the alignment for the text fields
     * @param {TextAlignment} textAlignment - TextAlignment value represents the alignment for the text fields
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextAlignment (textAlignment) {
        this._textAndGraphicManager.setTextAlignment(textAlignment);
        return this;
    }

    /**
     * Get the alignment for the text fields
     * @returns {TextAlignment} - value represents the alignment for the text fields
     */
    getTextAlignment () {
        return this._textAndGraphicManager.getTextAlignment();
    }

    /**
     * Set the metadata type for the textField1
     * @param {MetadataType} textField1Type - a MetadataType value represents the metadata for textField1
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField1Type (textField1Type) {
        this._textAndGraphicManager.setTextField1Type(textField1Type);
        return this;
    }

    /**
     * Get the metadata type for textField1
     * @returns {MetadataType} - value represents the metadata for textField1
     */
    getTextField1Type () {
        return this._textAndGraphicManager.getTextField1Type();
    }

    /**
     * Set the metadata type for the textField2
     * @param {MetadataType} textField2Type - a MetadataType value represents the metadata for textField2
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField2Type (textField2Type) {
        this._textAndGraphicManager.setTextField2Type(textField2Type);
        return this;
    }

    /**
     * Get the metadata type for textField2
     * @returns {MetadataType} - value represents the metadata for textField2
     */
    getTextField2Type () {
        return this._textAndGraphicManager.getTextField2Type();
    }

    /**
     * Set the metadata type for the textField3
     * @param {MetadataType} textField3Type - a MetadataType value represents the metadata for textField3
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField3Type (textField3Type) {
        this._textAndGraphicManager.setTextField3Type(textField3Type);
        return this;
    }

    /**
     * Get the metadata type for textField3
     * @returns {MetadataType} - value represents the metadata for textField3
     */
    getTextField3Type () {
        return this._textAndGraphicManager.getTextField3Type();
    }

    /**
     * Set the metadata type for the textField4
     * @param {MetadataType} textField4Type - a MetadataType value represents the metadata for textField4
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTextField4Type (textField4Type) {
        this._textAndGraphicManager.setTextField4Type(textField4Type);
        return this;
    }

    /**
     * Get the metadata type for textField4
     * @returns {MetadataType} - value represents the metadata for textField4
     */
    getTextField4Type () {
        return this._textAndGraphicManager.getTextField4Type();
    }

    /**
     * Sets the title of the new template that will be displayed.
     * Sending an empty String "" will clear the field
     * @param {String} title - the title of the new template that will be displayed. Maxlength: 100.
     * @returns {_ScreenManagerBase} - A reference to this instance to support method chaining.
     */
    setTitle (title) {
        this._textAndGraphicManager.setTitle(title);
        return this;
    }

    /**
     * Gets the title of the new template that will be displayed
     * @returns {String} - String value that represents the title of the new template that will be displayed
     */
    getTitle () {
        return this._textAndGraphicManager.getTitle();
    }

    /**
     * Change the current layout to a new layout and optionally update the layout's night and day color schemes. The values set for the text, graphics,
     * buttons and template title persist between layout changes. To update the text, graphics, buttons and template title at the same time as the template,
     * batch all the updates between beginTransaction and commit. If the layout update fails while batching, then the updated text, graphics, buttons or template title will also not be updated.
     *
     * If you are connected on a < v6.0 connection and batching the update, the layout will be updated, then the text and graphics will be updated.
     * If you are connected on a >= v6.0 connection, the layout will be updated at the same time that the text and graphics are updated.
     *
     * If this update is batched between beginTransaction and commit, the resolve here will not be called. As a result, you should not use await with this function when batching.
     *
     * NOTE: If this update returns an false, it may have been superseded by another update.
     * This means that it was cancelled while in-progress because another update was requested, whether batched or not.
     *
     * @param {TemplateConfiguration} templateConfiguration - The new configuration of the template, including the layout and color scheme.
     * @returns {Promise} - Resolves to Boolean: whether the update is successful
     */
    async changeLayout (templateConfiguration) {
        return new Promise((resolve) => {
            this._textAndGraphicManager.changeLayout(templateConfiguration, resolve);
        });
    }

    /**
     * Set softButtonObjects list and upload the images to the head unit
     * @param {SoftButtonObject[]} softButtonObjects - the list of the SoftButtonObject values that should be displayed on the head unit
     * @returns {Promise} - returns _ScreenManagerBase when finished
     */
    async setSoftButtonObjects (softButtonObjects) {
        await this._softButtonManager.setSoftButtonObjects(softButtonObjects);
        return this;
    }

    /**
     * Get the soft button objects list
     * @returns {SoftButtonObject[]} - An array of SoftButtonObject instances.
     */
    getSoftButtonObjects () {
        return this._softButtonManager.getSoftButtonObjects();
    }

    /**
     * Get the SoftButtonObject that has the provided name
     * @param {String} name - a String value that represents the name
     * @returns {SoftButtonObject} - A SoftButtonObject instance.
     */
    getSoftButtonObjectByName (name) {
        return this._softButtonManager.getSoftButtonObjectByName(name);
    }

    /**
     * Get the SoftButtonObject that has the provided buttonId
     * @private
     * @param {Number} buttonId - a int value that represents the id of the button
     * @returns {SoftButtonObject} - A SoftButtonObject instance.
     */
    _getSoftButtonObjectById (buttonId) {
        return this._softButtonManager._getSoftButtonObjectById(buttonId);
    }

    /**
     * Gets the voice commands set as part of the last initiated update operation
     * @returns {VoiceCommand[]} - a List of Voice Command objects
     */
    getVoiceCommands () {
        return this._voiceCommandManager.getVoiceCommands();
    }

    /**
     * Set voice commands
     * @param {VoiceCommand[]} voiceCommands - the voice commands to be sent to the head unit
     * @returns {Promise} - A promise.
     */
    async setVoiceCommands (voiceCommands) {
        return this._voiceCommandManager.setVoiceCommands(voiceCommands);
    }

    /**
     * Deletes choices that were sent previously
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects
     * @returns {Promise} - A promise that resolves to a Boolean of whether the operation is a success
     */
    async deleteChoices (choices) {
        return this._choiceSetManagerBase.deleteChoices(choices);
    }

    /**
     * Preload choices to improve performance while presenting a choice set at a later time
     * @param {ChoiceCell[]} choices - a list of ChoiceCell objects that will be part of a choice set later
     * @returns {Promise} - A promise.
     */
    async preloadChoices (choices) {
        return this._choiceSetManagerBase.preloadChoices(choices);
    }

    /**
     * Presents a searchable choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @param {InteractionMode} mode - The intended interaction mode
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     */
    presentSearchableChoiceSet (choiceSet, mode, keyboardListener) {
        this._choiceSetManagerBase.presentChoiceSet(choiceSet, mode, keyboardListener);
    }

    /**
     * Presents a choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @param {InteractionMode} mode - The intended interaction mode
     */
    presentChoiceSet (choiceSet, mode) {
        this._choiceSetManagerBase.presentChoiceSet(choiceSet, mode, null);
    }

    /**
     * Presents a keyboard on the Head unit to capture user input
     * @param {String} initialText - The initial text that is used as a placeholder text. It might not work on some head units.
     * @param {KeyboardProperties} customKeyboardProperties - the custom keyboard configuration to be used when the keyboard is displayed
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     * @returns {Number|null} - A unique cancel ID that can be used to cancel this keyboard. If `null`, no keyboard was created.
     */
    presentKeyboard (initialText, customKeyboardProperties, keyboardListener) {
        return this._choiceSetManagerBase.presentKeyboard(initialText, customKeyboardProperties, keyboardListener);
    }

    /**
     * Set a custom keyboard configuration for this session. If set to null, it will reset to default keyboard configuration.
     * @param {KeyboardProperties} keyboardConfiguration - the custom keyboard configuration to be used when the keyboard is displayed
     */
    setKeyboardConfiguration (keyboardConfiguration) {
        this._choiceSetManagerBase.setKeyboardConfiguration(keyboardConfiguration);
    }

    /**
     * Get the preloaded choices
     * @returns {ChoiceCell[]} - A set of choice cells that have been preloaded to the head unit
     */
    getPreloadedChoices () {
        return this._choiceSetManagerBase.getPreloadedChoices();
    }

    /**
     * Dismisses a currently presented keyboard with the associated ID. Canceling a keyboard only works when connected to SDL Core v.6.0+. When connected to older versions of SDL Core the keyboard will not be dismissed.
     * @param {Number} cancelId - The unique ID assigned to the keyboard
     */
    dismissKeyboard (cancelId) {
        this._choiceSetManagerBase.dismissKeyboard(cancelId);
    }

    /**
     * Begin a multiple updates transaction. The updates will be applied when commit() is called. Note: if we don't use beginTransaction & commit, every update will be sent individually.
     */
    beginTransaction () {
        this._softButtonManager.setBatchUpdates(true);
        this._textAndGraphicManager.setBatchUpdates(true);
    }

    /**
     * Pairs with beginTransaction() to batch text, graphic, and layout changes into a single update with a callback when the update is complete.
     * Update text fields with new text set into the text field properties, updates the primary and secondary images with new image(s) if new one(s) been set,
     * and updates the template if one was changed using changeLayout.
     * NOTE: The resolve in changeLayout will not be called if the update is batched into this update
     * NOTE: If this resolve returns false, it may have been superseded by another update. This means that it was cancelled while in-progress because another update was requested, whether batched or not
     * @returns {Promise} - Resolves to Boolean: whether the commit is a success
     */
    async commit () {
        this._softButtonManager.setBatchUpdates(false);
        this._textAndGraphicManager.setBatchUpdates(false);

        const success = await this._textAndGraphicManager.update();

        return success;
    }

    /**
     * Adds a listener to the list of listeners for a button and subscribes to the button if not already subscribed.
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - The listener to be removed
     * @returns {Promise} - returns _ScreenManagerBase when finished
     */
    async addButtonListener (buttonName, listener) {
        await this._subscribeButtonManager._addButtonListener(buttonName, listener);
        return this;
    }

    /**
     * Removes a listener from the list of listeners and unsubscribes to the button if it was the last listener.
     * @param {ButtonName} buttonName - Name of the button
     * @param {Function} listener - The listener to be removed
     * @returns {Promise} - returns _ScreenManagerBase when finished
     */
    async removeButtonListener (buttonName, listener) {
        await this._subscribeButtonManager._removeButtonListener(buttonName, listener);
        return this;
    }

    /**
     * Present the alert on the screen.
     * If the alert contains an audio indication with a file that needs to be uploaded,
     * it will be uploaded before presenting the alert. If the alert contains soft buttons with images,
     * they will be uploaded before presenting the alert. If the alert contains an icon, that will be uploaded before presenting the alert.
     * The handler will be called when the alert either dismisses from the screen or it has failed to present.
     * If the error value in the handler is present, then the alert failed to appear or was aborted,
     * if not, then the alert dismissed without error. The error will contain `userInfo` with information on how long to wait before retrying.
     * @param {AlertView} alert - the AlertView to present.
     * @param {AlertCompletionListener} listener - AlertCompletionListener that will notify the sender when Alert has completed
     */
    presentAlert (alert, listener) {
        this._alertManager.presentAlert(alert, listener);
    }

    /**
     * Check if there is a collision in the ids provided by the developer and assign ids to the SoftButtonObjects that do not have ids
     * @private
     * @param {SoftButtonObject[]} softButtonObjects - the list of the SoftButtonObject values that should be displayed on the head unit
     * @param {_ManagerLocation} location - which manager is assigning the button ID
     * @returns {Boolean} - boolean representing whether the ids are unique or not
     */
    static _checkAndAssignButtonIds (softButtonObjects, location) {
        let buttonIdsSetHashSet = new Set();
        if (location === _ManagerLocation.SOFTBUTTON_MANAGER) {
            _ScreenManagerBase._softButtonIDBySoftButtonManager.clear();
            buttonIdsSetHashSet = new Set(_ScreenManagerBase._softButtonIDByAlertManager);
        } else if (location === _ManagerLocation.ALERT_MANAGER) {
            _ScreenManagerBase._softButtonIDByAlertManager.clear();
            buttonIdsSetHashSet = new Set(_ScreenManagerBase._softButtonIDBySoftButtonManager);
        }

        let currentSoftButtonId,
            numberOfButtonIdsSet = buttonIdsSetHashSet.size,
            maxButtonIdsSetByDev = SOFT_BUTTON_ID_MIN_VALUE;

        for (const softButtonObject of softButtonObjects) {
            currentSoftButtonId = softButtonObject.getButtonId();
            if (currentSoftButtonId !== SOFT_BUTTON_ID_NOT_SET_VALUE) {
                if (_ScreenManagerBase._softButtonIDByAlertManager.has(currentSoftButtonId) || _ScreenManagerBase._softButtonIDBySoftButtonManager.has(currentSoftButtonId)) {
                    return false;
                }
                numberOfButtonIdsSet++;
                if (currentSoftButtonId > maxButtonIdsSetByDev) {
                    maxButtonIdsSetByDev = currentSoftButtonId;
                }
                buttonIdsSetHashSet.add(softButtonObject.getButtonId());
            }
        }

        if (numberOfButtonIdsSet !== buttonIdsSetHashSet.size) {
            return false;
        }

        let generatedSoftButtonId = maxButtonIdsSetByDev;
        for (const softButtonObject of softButtonObjects) {
            currentSoftButtonId = softButtonObject.getButtonId();
            if (currentSoftButtonId === SOFT_BUTTON_ID_NOT_SET_VALUE) {
                do {
                    if (generatedSoftButtonId >= SOFT_BUTTON_ID_MAX_VALUE) {
                        generatedSoftButtonId = SOFT_BUTTON_ID_MIN_VALUE;
                    }
                    generatedSoftButtonId++;
                } while (buttonIdsSetHashSet.has(generatedSoftButtonId));
                softButtonObject._setButtonId(generatedSoftButtonId);
                buttonIdsSetHashSet.add(generatedSoftButtonId);
                if (location === _ManagerLocation.ALERT_MANAGER) {
                    _ScreenManagerBase._softButtonIDByAlertManager.add(generatedSoftButtonId);
                } else if (location === _ManagerLocation.SOFTBUTTON_MANAGER) {
                    _ScreenManagerBase._softButtonIDBySoftButtonManager.add(generatedSoftButtonId);
                }
            }
        }
        return true;
    }

    /**
     * The list of currently set menu cells
     * @returns {MenuCell[]} - An array of the currently set menu cells
     */
    getMenu () {
        return this._menuManagerBase._getMenuCells();
    }

    /**
     * Creates and sends all associated Menu RPCs
     * Note: the manager will store a deep copy the menuCells internally to be able to handle future updates correctly
     * @param {MenuCell[]} menuCells - The menu cells that are to be sent to the head unit, including their sub-cells.
     */
    setMenu (menuCells) {
        this._menuManagerBase._setMenuCells(menuCells);
    }

    /**
     * Sets the behavior of how menus are updated. For explanations of the differences, see {@link DynamicMenuUpdatesMode}
     * @param {DynamicMenuUpdatesMode} value - The update mode
     */
    setDynamicMenuUpdatesMode (value) {
        this._menuManagerBase._setDynamicMenuUpdatesMode(value);
    }

    /**
     * Gets the dynamic menu update mode
     * @returns {DynamicMenuUpdatesMode} - The currently set DynamicMenuUpdatesMode. It defaults to ON_WITH_COMPAT_MODE if not set.
     */
    getDynamicMenuUpdatesMode () {
        return this._menuManagerBase._getDynamicMenuUpdatesMode();
    }

    /**
     * Requires SDL RPC Version 6.0.0 or greater
     * Opens the Main Menu.
     * @returns {Boolean} - Whether the request was able to be sent
     */
    openMenu () {
        return this._menuManagerBase._openMenu();
    }

    /**
     * Requires SDL RPC Version 6.0.0 or greater
     * Opens a subMenu. The cell you pass in must be constructed with submenu cells
     * @param {MenuCell} cell - A submenu cell whose sub menu you wish to open
     * @returns {Boolean} - Whether the request was able to be sent
     */
    openSubMenu (cell) {
        return this._menuManagerBase._openSubMenu(cell);
    }

    /**
     * The main menu layout. See available menu layouts on WindowCapability.menuLayoutsAvailable.
     * @param {MenuConfiguration} menuConfiguration - The default menuConfiguration
     */
    setMenuConfiguration (menuConfiguration) {
        this._menuManagerBase._setMenuConfiguration(menuConfiguration);
    }

    /**
     * The main menu layout. See available menu layouts on WindowCapability.menuLayoutsAvailable.
     * @returns {MenuConfiguration} - The currently set MenuConfiguration
     */
    getMenuConfiguration () {
        return this._menuManagerBase._getMenuConfiguration();
    }
}

class _ManagerLocation extends Enum {
    constructor () {
        super();
    }

    static get SOFTBUTTON_MANAGER () {
        return _ManagerLocation._MAP.SOFTBUTTON_MANAGER;
    }

    static get ALERT_MANAGER () {
        return _ManagerLocation._MAP.ALERT_MANAGER;
    }
}

_ManagerLocation._MAP = Object.freeze({
    'SOFTBUTTON_MANAGER': 0,
    'ALERT_MANAGER': 1,
});

_ScreenManagerBase._ManagerLocation = _ManagerLocation;

const SOFT_BUTTON_ID_NOT_SET_VALUE = -1;
const SOFT_BUTTON_ID_MIN_VALUE = 0;
const SOFT_BUTTON_ID_MAX_VALUE = 10000;

export { _ScreenManagerBase };
