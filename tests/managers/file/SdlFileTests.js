const chai = require('chai');
chai.use(require('chai-as-promised'));
const SDL = require('../../config.js').node;

// Mocking framework
// Used to stub an RPC call so that it isn't actually sent to Core
const Validator = require('../../Validator');

module.exports = function (appClient) {
    describe('SdlFileTests', function () {
        it('testFileEquality', function () {
            const fileName = 'testFile';
            const fileData = Uint8Array.from('it is wednesday');
            const filePath = './doesnt_go_anywhere.txt';
            const file = new SDL.manager.file.filetypes.SdlFile(fileName, SDL.rpc.enums.FileType.BINARY, fileData, true)
                .setFilePath(filePath)
                .setFileData(fileData)
                .setStaticIcon(true)
                .setOverwrite(true);
            const file2 = new SDL.manager.file.filetypes.SdlFile(fileName, SDL.rpc.enums.FileType.BINARY, fileData, true)
                .setFilePath(filePath)
                .setFileData(fileData)
                .setStaticIcon(true)
                .setOverwrite(true);
            Validator.assertTrue(file.equals(file2));

            const fileClone = file.clone();
            Validator.assertTrue(file !== fileClone);
            Validator.assertTrue(file.equals(file2));

            fileClone.setName('something else');
            fileClone.setFilePath('./goes_nowhere.txt');
            fileClone.setFileData(Uint8Array.from('my dudes'));
            fileClone.setType(SDL.rpc.enums.FileType.JSON);
            fileClone.setPersistent(false);
            fileClone.setStaticIcon(false);
            fileClone.setOverwrite(false);

            Validator.assertTrue(file !== fileClone);
            Validator.assertTrue(!file.equals(fileClone));
            Validator.assertNotEquals(file.getName(), fileClone.getName());
            Validator.assertNotEquals(file.getFilePath(), fileClone.getFilePath());
            Validator.assertNotEquals(file.getFileData(), fileClone.getFileData());
            Validator.assertNotEquals(file.getType(), fileClone.getType());
            Validator.assertNotEquals(file.isPersistent(), fileClone.isPersistent());
            Validator.assertNotEquals(file.isStaticIcon(), fileClone.isStaticIcon());
            Validator.assertNotEquals(file.getOverwrite(), fileClone.getOverwrite());

            const emptyFile = new SDL.manager.file.filetypes.SdlFile(null, SDL.rpc.enums.FileType.BINARY, null, false);
            const emptyClone = emptyFile.clone();

            Validator.assertTrue(emptyFile !== emptyClone);
            Validator.assertTrue(emptyFile.equals(emptyClone));
            Validator.assertTrue(emptyClone !== fileClone);
        });
    });
    describe('SdlArtworkTests', function () {
        it('testFileEquality', function () {
            const fileName = 'testFile';
            const fileData = Uint8Array.from('it is wednesday');
            const filePath = './doesnt_go_anywhere.txt';
            const file = new SDL.manager.file.filetypes.SdlArtwork(fileName, SDL.rpc.enums.FileType.GRAPHIC_JPEG, fileData, true)
                .setFilePath(filePath)
                .setStaticIcon(true)
                .setOverwrite(true)
                .setTemplateImage(true);
            const file2 = new SDL.manager.file.filetypes.SdlArtwork(fileName, SDL.rpc.enums.FileType.GRAPHIC_JPEG, fileData, true)
                .setFilePath(filePath)
                .setStaticIcon(true)
                .setOverwrite(true)
                .setTemplateImage(true);
            Validator.assertTrue(file.equals(file2));

            // forcibly create the image rpc
            file.getImageRPC();

            const fileClone = file.clone();
            Validator.assertTrue(file !== fileClone);
            Validator.assertTrue(file.equals(file2));
            Validator.assertNotEquals(file._imageRPC, fileClone._imageRPC);

            fileClone.setName('something else');
            fileClone.setFilePath('./goes_nowhere.txt');
            fileClone.setFileData(Uint8Array.from('my dudes'));
            fileClone.setType(SDL.rpc.enums.FileType.GRAPHIC_PNG);
            fileClone.setPersistent(false);
            fileClone.setStaticIcon(false);
            fileClone.setOverwrite(false);
            fileClone.setTemplateImage(false);

            Validator.assertTrue(file !== fileClone);
            Validator.assertTrue(!file.equals(fileClone));
            Validator.assertNotEquals(file.getName(), fileClone.getName());
            Validator.assertNotEquals(file.getFilePath(), fileClone.getFilePath());
            Validator.assertNotEquals(file.getFileData(), fileClone.getFileData());
            Validator.assertNotEquals(file.getType(), fileClone.getType());
            Validator.assertNotEquals(file.isPersistent(), fileClone.isPersistent());
            Validator.assertNotEquals(file.isStaticIcon(), fileClone.isStaticIcon());
            Validator.assertNotEquals(file.getOverwrite(), fileClone.getOverwrite());
            Validator.assertNotEquals(file.isTemplateImage(), fileClone.isTemplateImage());

            const emptyFile = new SDL.manager.file.filetypes.SdlArtwork(null, SDL.rpc.enums.FileType.GRAPHIC_JPEG, null, false);
            const emptyClone = emptyFile.clone();

            Validator.assertTrue(emptyFile !== emptyClone);
            Validator.assertTrue(emptyFile.equals(emptyClone));
            Validator.assertTrue(emptyClone !== fileClone);
        });
    });
};