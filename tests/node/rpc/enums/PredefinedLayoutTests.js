const SDL = require('../../../config.js').node;

const PredefinedLayout = SDL.rpc.enums.PredefinedLayout;
const Validator = require('./../../../Validator.js');

describe('PredefinedLayoutTests', function () {
    it('testValidEnums', function (done) {
        let example = 'DEFAULT';
        const enumDefault = PredefinedLayout.valueForKey(example);

        example = 'MEDIA';
        const enumMedia = PredefinedLayout.valueForKey(example);
        example = 'NON_MEDIA';
        const enumNonMedia = PredefinedLayout.valueForKey(example);
        example = 'ONSCREEN_PRESETS';
        const enumOnscreenPresets = PredefinedLayout.valueForKey(example);
        example = 'NAV_FULLSCREEN_MAP';
        const enumNavFullscreenMap = PredefinedLayout.valueForKey(example);
        example = 'NAV_LIST';
        const enumNavList = PredefinedLayout.valueForKey(example);
        example = 'NAV_KEYBOARD';
        const enumNavKeyboard = PredefinedLayout.valueForKey(example);
        example = 'GRAPHIC_WITH_TEXT';
        const enumGraphicWithText = PredefinedLayout.valueForKey(example);
        example = 'TEXT_WITH_GRAPHIC';
        const enumTextWithGraphic = PredefinedLayout.valueForKey(example);
        example = 'TILES_ONLY';
        const enumTilesOnly = PredefinedLayout.valueForKey(example);
        example = 'TEXTBUTTONS_ONLY';
        const enumTextbuttonsOnly = PredefinedLayout.valueForKey(example);
        example = 'GRAPHIC_WITH_TILES';
        const enumGraphicWithTiles = PredefinedLayout.valueForKey(example);
        example = 'TILES_WITH_GRAPHIC';
        const enumTilesWithGraphic = PredefinedLayout.valueForKey(example);
        example = 'GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS';
        const enumGraphicWithTextAndSoftbuttons = PredefinedLayout.valueForKey(example);
        example = 'TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC';
        const enumTextAndSoftbuttonsWithGraphic = PredefinedLayout.valueForKey(example);
        example = 'GRAPHIC_WITH_TEXTBUTTONS';
        const enumGraphicWithTextbuttons = PredefinedLayout.valueForKey(example);
        example = 'TEXTBUTTONS_WITH_GRAPHIC';
        const enumTextbuttonsWithGraphic = PredefinedLayout.valueForKey(example);
        example = 'LARGE_GRAPHIC_WITH_SOFTBUTTONS';
        const enumLargeGraphicWithSoftbuttons = PredefinedLayout.valueForKey(example);
        example = 'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS';
        const enumDoubleGraphicWithSoftbuttons = PredefinedLayout.valueForKey(example);
        example = 'LARGE_GRAPHIC_ONLY';
        const enumLargeGraphicOnly = PredefinedLayout.valueForKey(example);
        example = 'WEB_VIEW';
        const enumWebView = PredefinedLayout.valueForKey(example);

        Validator.assertNotNull(enumDefault, 'DEFAULT returned null');
        Validator.assertNotNull(enumMedia, 'MEDIA returned null');
        Validator.assertNotNull(enumNonMedia, 'NON_MEDIA returned null');
        Validator.assertNotNull(enumOnscreenPresets, 'ONSCREEN_PRESETS returned null');
        Validator.assertNotNull(enumNavFullscreenMap, 'NAV_FULLSCREEN_MAP returned null');
        Validator.assertNotNull(enumNavList, 'NAV_LIST returned null');
        Validator.assertNotNull(enumNavKeyboard, 'NAV_KEYBOARD returned null');
        Validator.assertNotNull(enumGraphicWithText, 'GRAPHIC_WITH_TEXT returned null');
        Validator.assertNotNull(enumTextWithGraphic, 'TEXT_WITH_GRAPHIC returned null');
        Validator.assertNotNull(enumTilesOnly, 'TILES_ONLY returned null');
        Validator.assertNotNull(enumTextbuttonsOnly, 'TEXTBUTTONS_ONLY returned null');
        Validator.assertNotNull(enumGraphicWithTiles, 'GRAPHIC_WITH_TILES returned null');
        Validator.assertNotNull(enumTilesWithGraphic, 'TILES_WITH_GRAPHIC returned null');
        Validator.assertNotNull(enumGraphicWithTextAndSoftbuttons, 'GRAPHIC_WITH_TEXT_AND_SOFTBUTTONS returned null');
        Validator.assertNotNull(enumTextAndSoftbuttonsWithGraphic, 'TEXT_AND_SOFTBUTTONS_WITH_GRAPHIC returned null');
        Validator.assertNotNull(enumGraphicWithTextbuttons, 'GRAPHIC_WITH_TEXTBUTTONS returned null');
        Validator.assertNotNull(enumTextbuttonsWithGraphic, 'TEXTBUTTONS_WITH_GRAPHIC returned null');
        Validator.assertNotNull(enumLargeGraphicWithSoftbuttons, 'LARGE_GRAPHIC_WITH_SOFTBUTTONS returned null');
        Validator.assertNotNull(enumDoubleGraphicWithSoftbuttons, 'DOUBLE_GRAPHIC_WITH_SOFTBUTTONS returned null');
        Validator.assertNotNull(enumLargeGraphicOnly, 'LARGE_GRAPHIC_ONLY returned null');
        Validator.assertNotNull(enumWebView, 'WEB_VIEW returned null');
        done();
    });

    it('testInvalidEnum', function (done) {
        const example = 'deFaUlt';
        const temp = PredefinedLayout.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });

    it('testNullEnum', function (done) {
        const example = null;
        const temp = PredefinedLayout.valueForKey(example);
        Validator.assertNull(temp);
        done();
    });
});
