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

import { BaseSubManager } from '../BaseSubManager.js';
import { SoftButtonManager } from './SoftButtonManager.js';
import { TextAndGraphicManager } from './TextAndGraphicManager.js';
import { MenuManager } from './MenuManager.js';
import { ChoiceSetManager } from './ChoiceSetManager.js';
import { VoiceCommandManager } from './VoiceCommandManager.js';

class BaseScreenManager extends BaseSubManager {
    /**
     * @param {LifecycleManager} lifecycleManager
     * @param {FileManager} fileManager
    */
    constructor (lifecycleManager, fileManager = null) {
        super(lifecycleManager);

        this._fileManager = fileManager;
        if (this._fileManager !== null) {
            this._softButtonManager = new SoftButtonManager(lifecycleManager, this._fileManager);
            this._textAndGraphicManager = new TextAndGraphicManager(lifecycleManager, this._fileManager, this._softButtonManager);
            this._menuManager = new MenuManager(lifecycleManager, this._fileManager);
            this._choiceSetManager = new ChoiceSetManager(lifecycleManager, this._fileManager);
        }
        this._voiceCommandManager = new VoiceCommandManager(lifecycleManager);
    }

    /**
     * @return {Promise}
    */
    async start () {
        await Promise.all([
            this._softButtonManager.start(),
            this._textAndGraphicManager.start(),
            this._voiceCommandManager.start(),
            this._menuManager.start(),
            this._choiceSetManager.start(),
        ]);
        this._transitionToState(BaseSubManager.READY);
        await super.start();
    }

    /**
     * Called when manager is being torn down
    */
    dispose () {
        this._softButtonManager.dispose();
        this._textAndGraphicManager.dispose();
        this._voiceCommandManager.dispose();
        this._menuManager.dispose();
        this._choiceSetManager.dispose();
        super.dispose();
    }

    /**
     * Set the textField1 on the head unit screen
     * Sending an empty String "" will clear the field
     * @param {String} textField1 - value represents the textField1
     * @return {BaseScreenManager}
     */
    setTextField1 (textField1) {
        this._softButtonManager.setCurrentMainField1(textField1);
        this._textAndGraphicManager.setTextField1(textField1);
        return this;
    }

    /**
     * Get the current textField1 value
     * @return {String} - value represents the current textField1 value
     */
    getTextField1 () {
        return this._textAndGraphicManager.getTextField1();
    }

    /**
     * Set the textField2 on the head unit screen
     * Sending an empty String "" will clear the field
     * @param {String} textField2 - value represents the textField1
     * @return {BaseScreenManager}
     */
    setTextField2 (textField2) {
        this._textAndGraphicManager.setTextField2(textField2);
        return this;
    }

    /**
     * Get the current textField2 value
     * @return {String} - value represents the current textField2 value
     */
    getTextField2 () {
        return this._textAndGraphicManager.getTextField2();
    }

    /**
     * Set the textField3 on the head unit screen
     * Sending an empty String "" will clear the field
     * @param {String} textField3 - value represents the textField1
     * @return {BaseScreenManager}
     */
    setTextField3 (textField3) {
        this._textAndGraphicManager.setTextField3(textField3);
        return this;
    }

    /**
     * Get the current textField3 value
     * @return {String} - value represents the current textField3 value
     */
    getTextField3 () {
        return this._textAndGraphicManager.getTextField3();
    }

    /**
     * Set the textField4 on the head unit screen
     * Sending an empty String "" will clear the field
     * @param {String} textField4 - value represents the textField1
     * @return {BaseScreenManager}
     */
    setTextField4 (textField4) {
        this._textAndGraphicManager.setTextField4(textField4);
        return this;
    }

    /**
     * Get the current textField4 value
     * @return {String} - value represents the current textField4 value
     */
    getTextField4 () {
        return this._textAndGraphicManager.getTextField4();
    }

    /**
     * Set the mediaTrackTextField on the head unit screen
     * @param {String} mediaTrackTextField - value represents the mediaTrackTextField
     * @return {BaseScreenManager}
     */
    setMediaTrackTextField (mediaTrackTextField) {
        this._textAndGraphicManager.setMediaTrackTextField(mediaTrackTextField);
        return this;
    }

    /**
     * Get the current mediaTrackTextField value
     * @return {String} - value represents the current mediaTrackTextField
     */
    getMediaTrackTextField () {
        return this._textAndGraphicManager.getMediaTrackTextField();
    }

    /**
     * Set the primaryGraphic on the head unit screen
     * @param {SdlArtwork} primaryGraphic - an SdlArtwork object represents the primaryGraphic
     * @return {BaseScreenManager}
     */
    setPrimaryGraphic (primaryGraphic) {
        if (primaryGraphic === null) {
            primaryGraphic = this._textAndGraphicManager.getBlankArtwork();
        }
        this._textAndGraphicManager.setPrimaryGraphic(primaryGraphic);
        return this;
    }

    /**
     * Get the current primaryGraphic value
     * @return {SdlArtwork} - object represents the current primaryGraphic
     */
    getPrimaryGraphic () {
        return this._textAndGraphicManager.getPrimaryGraphic();
    }

    /**
     * Set the secondaryGraphic on the head unit screen
     * @param {SdlArtwork} secondaryGraphic - an SdlArtwork object represents the secondaryGraphic
     * @return {BaseScreenManager}
     */
    setSecondaryGraphic (secondaryGraphic) {
        if (secondaryGraphic === null) {
            secondaryGraphic = this._textAndGraphicManager.getBlankArtwork();
        }
        this._textAndGraphicManager.setSecondaryGraphic(secondaryGraphic);
        return this;
    }

    /**
     * Get the current secondaryGraphic value
     * @return {SdlArtwork} - object represents the current secondaryGraphic
     */
    getSecondaryGraphic () {
        return this._textAndGraphicManager.getSecondaryGraphic();
    }

    /**
     * Set the alignment for the text fields
     * @param {TextAlignment} textAlignment - TextAlignment value represents the alignment for the text fields
     * @return {BaseScreenManager}
     */
    setTextAlignment (textAlignment) {
        this._textAndGraphicManager.setTextAlignment(textAlignment);
        return this;
    }

    /**
     * Get the alignment for the text fields
     * @return {TextAlignment} - value represents the alignment for the text fields
     */
    getTextAlignment () {
        return this._textAndGraphicManager.getTextAlignment();
    }

    /**
     * Set the metadata type for the textField1
     * @param {MetadataType} textField1Type - a MetadataType value represents the metadata for textField1
     * @return {BaseScreenManager}
     */
    setTextField1Type (textField1Type) {
        this._textAndGraphicManager.setTextField1Type(textField1Type);
        return this;
    }

    /**
     * Get the metadata type for textField1
     * @return {MetadataType} - value represents the metadata for textField1
     */
    getTextField1Type () {
        return this._textAndGraphicManager.getTextField1Type();
    }

    /**
     * Set the metadata type for the textField2
     * @param {MetadataType} textField2Type - a MetadataType value represents the metadata for textField2
     * @return {BaseScreenManager}
     */
    setTextField2Type (textField2Type) {
        this._textAndGraphicManager.setTextField2Type(textField2Type);
        return this;
    }

    /**
     * Get the metadata type for textField2
     * @return {MetadataType} - value represents the metadata for textField2
     */
    getTextField2Type () {
        return this._textAndGraphicManager.getTextField2Type();
    }

    /**
     * Set the metadata type for the textField3
     * @param {MetadataType} textField3Type - a MetadataType value represents the metadata for textField3
     * @return {BaseScreenManager}
     */
    setTextField3Type (textField3Type) {
        this._textAndGraphicManager.setTextField3Type(textField3Type);
        return this;
    }

    /**
     * Get the metadata type for textField3
     * @return {MetadataType} - value represents the metadata for textField3
     */
    getTextField3Type () {
        return this._textAndGraphicManager.getTextField3Type();
    }

    /**
     * Set the metadata type for the textField4
     * @param {MetadataType} textField4Type - a MetadataType value represents the metadata for textField4
     * @return {BaseScreenManager}
     */
    setTextField4Type (textField4Type) {
        this._textAndGraphicManager.setTextField4Type(textField4Type);
        return this;
    }

    /**
     * Get the metadata type for textField4
     * @return {MetadataType} - value represents the metadata for textField4
     */
    getTextField4Type () {
        return this._textAndGraphicManager.getTextField4Type();
    }

    /**
     * Sets the title of the new template that will be displayed.
     * Sending an empty String "" will clear the field
     * @param {String} title - the title of the new template that will be displayed. Maxlength: 100.
     * @return {BaseScreenManager}
     */
    setTitle (title) {
        this._textAndGraphicManager.setTitle(title);
        return this;
    }

    /**
     * Gets the title of the new template that will be displayed
     * @return title - String value that represents the title of the new template that will be displayed
     */
    getTitle () {
        return this._textAndGraphicManager.getTitle();
    }

    /**
     * Set softButtonObjects list and upload the images to the head unit
     * @param {SoftButtonObject[]} softButtonObjects - the list of the SoftButtonObject values that should be displayed on the head unit
     * @return {Promise} - returns BaseScreenManager when finished
     */
    async setSoftButtonObjects (softButtonObjects) {
        await this._softButtonManager.setSoftButtonObjects(softButtonObjects);
        return this;
    }

    /**
     * Get the soft button objects list
     * @return {SoftButtonObject[]}
     */
    getSoftButtonObjects () {
        return this._softButtonManager.getSoftButtonObjects();
    }

    /**
     * Get the SoftButtonObject that has the provided name
     * @param {String} name - a String value that represents the name
     * @return {SoftButtonObject}
     */
    getSoftButtonObjectByName (name) {
        return this._softButtonManager.getSoftButtonObjectByName(name);
    }

    /**
     * Get the SoftButtonObject that has the provided buttonId
     * @param {Number} buttonId - a int value that represents the id of the button
     * @return {SoftButtonObject}
     */
    getSoftButtonObjectById (buttonId) {
        return this._softButtonManager.getSoftButtonObjectById(buttonId);
    }

    /**
     * Get the currently set voice commands
     * @return {VoiceCommand[]} - a List of Voice Command objects
     */
    getVoiceCommands () {
        return this._voiceCommandManager.getVoiceCommands();
    }

    /**
     * Set voice commands
     * @param {VoiceCommand[]} voiceCommands - the voice commands to be sent to the head unit
     * @return {Promise}
     */
    async setVoiceCommands (voiceCommands) {
        return this._voiceCommandManager.setVoiceCommands(voiceCommands);
    }

    // MENUS

    /**
     * The list of currently set menu cells
     * @return {MenuCell[]} - a List of the currently set menu cells
     */
    getMenu () {
        return this._menuManager.getMenuCells();
    }

    /**
     * Creates and sends all associated Menu RPCs
     * Note: the manager will store a deep copy the menuCells internally to be able to handle future updates correctly
     * @param {MenuCell[]} menuCells - the menu cells that are to be sent to the head unit, including their sub-cells.
     * @return {BaseScreenManager}
     */
    setMenu (menuCells) {
        this._menuManager.setMenuCells(menuCells);
        return this;
    }

    /**
     * Sets the behavior of how menus are updated. For explanations of the differences, see {@link DynamicMenuUpdatesMode}
     * @param {DynamicMenuUpdatesMode} value - the update mode
     * @return {BaseScreenManager}
     */
    setDynamicMenuUpdatesMode (value) {
        this._menuManager.setDynamicUpdatesMode(value);
        return this;
    }

    /**
     * @return {DynamicMenuUpdatesMode} - The currently set DynamicMenuUpdatesMode. It defaults to ON_WITH_COMPAT_MODE if not set.
     */
    getDynamicMenuUpdatesMode () {
        return this._menuManager.getDynamicMenuUpdatesMode();
    }

    /**
     * Requires SDL RPC Version 6.0.0 or greater
     * Opens the Main Menu.
     * @return {Boolean} success / failure - whether the request was able to be sent
     */
    openMenu () {
        return this._menuManager.openMenu();
    }

    /**
     * Requires SDL RPC Version 6.0.0 or greater
     * Opens a subMenu. The cell you pass in must be constructed with {@link MenuCell(String,SdlArtwork,List)}
     * @param {MenuCell} cell - A <Strong>SubMenu</Strong> cell whose sub menu you wish to open
     * @return {Boolean} success / failure - whether the request was able to be sent
     */
    openSubMenu (cell) {
        return this._menuManager.openSubMenu(cell);
    }

    /**
     * The main menu layout. See available menu layouts on WindowCapability.menuLayoutsAvailable.
     * @param {MenuConfiguration} menuConfiguration - The default menuConfiguration
     * @return {BaseScreenManager}
     */
    setMenuConfiguration (menuConfiguration) {
        this._menuManager.setMenuConfiguration(menuConfiguration);
        return this;
    }

    /**
     * The main menu layout. See available menu layouts on WindowCapability.menuLayoutsAvailable.
     * @return {MenuConfiguration} - the currently set MenuConfiguration
     */
    getMenuConfiguration () {
        return this._menuManager.getMenuConfiguration();
    }

    // CHOICE SETS

    /**
     * Deletes choices that were sent previously
     * @param {ChoiceCell[]} choices - A list of ChoiceCell objects
     */
    deleteChoices (choices) {
        this._choiceSetManager.deleteChoices(choices);
    }

    /**
     * Preload choices to improve performance while presenting a choice set at a later time
     * @param {ChoiceCell[]} choices - a list of ChoiceCell objects that will be part of a choice set later
     * @return {Promise}
     */
    async preloadChoices (choices) {
        return this._choiceSetManager.preloadChoices(choices);
    }

    /**
     * Presents a searchable choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @param {InteractionMode} mode - The intended interaction mode
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     */
    presentSearchableChoiceSet (choiceSet, mode, keyboardListener) {
        this._choiceSetManager.presentChoiceSet(choiceSet, mode, keyboardListener);
    }

    /**
     * Presents a choice set
     * @param {ChoiceSet} choiceSet - The choice set to be presented. This can include Choice Cells that were preloaded or not
     * @param {InteractionMode} mode - The intended interaction mode
     */
    presentChoiceSet (choiceSet, mode) {
        this._choiceSetManager.presentChoiceSet(choiceSet, mode, null);
    }

    /**
     * Presents a keyboard on the Head unit to capture user input
     * @param {String} initialText - The initial text that is used as a placeholder text. It might not work on some head units.
     * @param {KeyboardProperties} customKeyboardProperties - the custom keyboard configuration to be used when the keyboard is displayed
     * @param {KeyboardListener} keyboardListener - A keyboard listener to capture user input
     * @return {Number} - A unique cancelID that can be used to cancel this keyboard. If `null`, no keyboard was created.
     */
    presentKeyboard (initialText, customKeyboardProperties, keyboardListener) {
        return this._choiceSetManager.presentKeyboard(initialText, customKeyboardProperties, keyboardListener);
    }

    /**
     * Set a custom keyboard configuration for this session. If set to null, it will reset to default keyboard configuration.
     * @param {KeyboardProperties} keyboardConfiguration - the custom keyboard configuration to be used when the keyboard is displayed
     * @return {BaseScreenManager}
     */
    setKeyboardConfiguration (keyboardConfiguration) {
        this._choiceSetManager.setKeyboardConfiguration(keyboardConfiguration);
        return this;
    }

    /**
     * @return {Set.<ChoiceCell>} - A set of choice cells that have been preloaded to the head unit
     */
    getPreloadedChoices () {
        return this._choiceSetManager.getPreloadedChoices();
    }

    /**
     * Dismisses a currently presented keyboard with the associated ID. Canceling a keyboard only works when connected to SDL Core v.6.0+. When connected to older versions of SDL Core the keyboard will not be dismissed.
     * @param {Number} cancelID - The unique ID assigned to the keyboard
     */
    dismissKeyboard (cancelID) {
        this._choiceSetManager.dismissKeyboard(cancelID);
    }

    // END CHOICE SETS

    /**
     * Begin a multiple updates transaction. The updates will be applied when commit() is called<br>
     * Note: if we don't use beginTransaction & commit, every update will be sent individually.
     */
    beginTransaction () {
        this._softButtonManager.setBatchUpdates(true);
        this._textAndGraphicManager.setBatchUpdates(true);
    }

    /**
     * Send the updates that were started after beginning the transaction
     * @return {Promise}
     */
    commit (listener) { // TODO: revise so that a success boolean can be returned
        this._softButtonManager.setBatchUpdates(false);
        this._textAndGraphicManager.setBatchUpdates(false);
    }
}

export { BaseScreenManager };