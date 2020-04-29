from collections import namedtuple, OrderedDict
from unittest import TestCase

from model.array import Array
from model.boolean import Boolean
from model.enum import Enum
from model.enum_element import EnumElement
from model.function import Function
from model.integer import Integer
from model.param import Param
from model.string import String
from model.struct import Struct
from transformers.functions_producer import FunctionsProducer


class TestFunctionsProducer(TestCase):
    def setUp(self):
        self.maxDiff = None
        Prop = namedtuple('Prop',
                          'functions_dir_name enums_dir_name structs_dir_name path_to_request_class '
                          'path_to_response_class path_to_notification_class')
        paths = Prop(functions_dir_name='../messages',
                     enums_dir_name='../enums',
                     structs_dir_name='../structs',
                     path_to_request_class='../RpcRequest.js',
                     path_to_response_class='../RpcResponse.js',
                     path_to_notification_class='../RpcNotification.js')

        mapping = {"functions": {
            "RegisterAppInterfaceRequest": {
                "syncMsgVersion": {
                    "methods": {
                        "method_title": "SdlMsgVersion",
                        "external": "SdlMsgVersion",
                        "key": "KEY_SDL_MSG_VERSION",
                        "type": "SdlMsgVersion"
                    },
                    "params": {
                        "key": "KEY_SDL_MSG_VERSION"
                    }
                },
                "params": [
                    {
                        "key": "APP_ID_MAX_LENGTH",
                        "value": 10
                    }
                ]
            },
            "RegisterAppInterfaceResponse": {
                "script": "templates/scripts/notExist.js"
            },
            "PutFileRequest": {
                "script": "templates/scripts/PutFileRequest.js"
            }}}

        names = ('FileType', 'Language', 'SyncMsgVersion', 'TemplateColorScheme', 'TTSChunk', 'Choice')
        self.producer = FunctionsProducer(paths, names, mapping)

    def test_RegisterAppInterfaceRequest(self):
        params = OrderedDict()
        params['syncMsgVersion'] = Param(
            name='syncMsgVersion', param_type=Struct(
                name='SyncMsgVersion', description=['Specifies the'],
                members={'majorVersion': Param(name='majorVersion', param_type=Integer())}),
            description=['See SyncMsgVersion'])
        params['fullAppID'] = Param(name='fullAppID', description=['ID used'], param_type=String())
        params['dayColorScheme'] = Param(
            name='dayColorScheme', param_type=Struct(name='TemplateColorScheme', description=[
                '\n            A color scheme for all display layout templates.\n        ']))
        params['ttsName'] = Param(
            name='ttsName', description=['\n      TTS string for'],
            param_type=Array(element_type=Struct(name='TTSChunk', description=['A TTS chunk'])))

        item = Function(name='RegisterAppInterface', function_id=Enum(name='RegisterAppInterfaceID'),
                        message_type=EnumElement(name='request'), params=params)
        expected = OrderedDict()
        expected['file_name'] = 'RegisterAppInterface'
        expected['name'] = 'RegisterAppInterface'
        expected['imports'] = {self.producer.imports(what='SdlMsgVersion', wherefrom='../structs/SdlMsgVersion.js'),
                               self.producer.imports(what='TemplateColorScheme',
                                                     wherefrom='../structs/TemplateColorScheme.js'),
                               self.producer.imports(what='TTSChunk', wherefrom='../structs/TTSChunk.js'),
                               self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                               self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')}
        expected['methods'] = (self.producer.methods(key='KEY_SDL_MSG_VERSION',
                                                     method_title='SdlMsgVersion', external='SdlMsgVersion',
                                                     description=['See SyncMsgVersion'], param_name='version',
                                                     type='SdlMsgVersion'),
                               self.producer.methods(key='KEY_FULL_APP_ID', method_title='FullAppID',
                                                     external=None, description=['ID used'], param_name='id',
                                                     type='String'),
                               self.producer.methods(key='KEY_DAY_COLOR_SCHEME', param_name='scheme',
                                                     method_title='DayColorScheme', external='TemplateColorScheme',
                                                     description=['A color scheme for all display layout templates.'],
                                                     type='TemplateColorScheme'),
                               self.producer.methods(key='KEY_TTS_NAME', param_name='name',
                                                     method_title='TtsName', external='TTSChunk',
                                                     description=['TTS string for'], type='TTSChunk[]'))
        expected['params'] = (self.producer.params(key='KEY_SDL_MSG_VERSION', value="'syncMsgVersion'"),
                              self.producer.params(key='KEY_FULL_APP_ID', value="'fullAppID'"),
                              self.producer.params(key='KEY_DAY_COLOR_SCHEME', value="'dayColorScheme'"),
                              self.producer.params(key='KEY_TTS_NAME', value="'ttsName'"),
                              self.producer.params(key='APP_ID_MAX_LENGTH', value=10))
        expected['func'] = 'RegisterAppInterface'
        expected['extend'] = 'RpcRequest'

        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)

    def test_RegisterAppInterfaceResponse(self):
        params = OrderedDict()
        params['success'] = Param(name='success', param_type=Boolean(), description=[' true if '])
        params['language'] = Param(name='language', param_type=Enum(name='Language', elements={
            'EN-US': EnumElement(name='EN-US', description=['English - US'])
        }), description=['The currently'])
        params['supportedDiagModes'] = Param(name='supportedDiagModes', param_type=Array(element_type=Integer()),
                                             description=['\n                Specifies the'])

        item = Function(name='RegisterAppInterface', function_id=Enum(name='RegisterAppInterfaceID'),
                        description=['The response '],
                        message_type=EnumElement(name='response'), params=params)
        expected = OrderedDict()
        expected['file_name'] = 'RegisterAppInterfaceResponse'
        expected['name'] = 'RegisterAppInterfaceResponse'
        expected['imports'] = {self.producer.imports(what='Language', wherefrom='../enums/Language.js'),
                               self.producer.imports(what='RpcResponse', wherefrom='../RpcResponse.js'),
                               self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')}
        expected['methods'] = (self.producer.methods(key='KEY_LANGUAGE',
                                                     method_title='Language', external='Language',
                                                     description=['The currently'], param_name='language',
                                                     type='Language'),
                               self.producer.methods(key='KEY_SUPPORTED_DIAG_MODES',
                                                     method_title='SupportedDiagModes', external=None,
                                                     description=['Specifies the'], param_name='modes',
                                                     type='Number[]'))
        expected['params'] = (self.producer.params(key='KEY_LANGUAGE', value="'language'"),
                              self.producer.params(key='KEY_SUPPORTED_DIAG_MODES', value="'supportedDiagModes'"))
        expected['description'] = ['The response']
        expected['func'] = 'RegisterAppInterface'
        expected['extend'] = 'RpcResponse'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)

    def test_UnregisterAppInterfaceRequest(self):
        item = Function(name='UnregisterAppInterface', function_id=Enum(name='UnregisterAppInterfaceID'),
                        message_type=EnumElement(name='request'), params=OrderedDict())
        expected = OrderedDict()
        expected['file_name'] = 'UnregisterAppInterface'
        expected['name'] = 'UnregisterAppInterface'
        expected['imports'] = {self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                               self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')}
        expected['methods'] = ()
        expected['params'] = ()
        expected['func'] = 'UnregisterAppInterface'
        expected['extend'] = 'RpcRequest'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)

    def test_PutFileRequest(self):
        params = OrderedDict()
        params['fileType'] = Param(
            name='fileType', param_type=Enum(name='FileType', description=['Enumeration listing'], elements={
                'AUDIO_MP3': EnumElement(name='AUDIO_MP3')
            }), description=['Selected file type.'])
        item = Function(name='PutFile', function_id=Enum(name='PutFileID'), description=['\n            Used to'],
                        message_type=EnumElement(name='request'), params=params)
        expected = OrderedDict()
        expected['file_name'] = 'PutFile'
        expected['name'] = 'PutFile'
        expected['imports'] = {self.producer.imports(what='FileType', wherefrom='../enums/FileType.js'),
                               self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                               self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')}
        expected['methods'] = (self.producer.methods(key='KEY_FILE_TYPE',
                                                     method_title='FileType', external='FileType',
                                                     description=['Selected file type.'], param_name='type',
                                                     type='FileType'),)
        expected['params'] = (self.producer.params(key='KEY_FILE_TYPE', value="'fileType'"),)
        expected['description'] = ['Used to']
        expected['script'] = self.producer.get_file_content('templates/scripts/PutFileRequest.js')
        expected['func'] = 'PutFile'
        expected['extend'] = 'RpcRequest'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)

    def test_OnEncodedSyncPDataNotification(self):
        params = OrderedDict()
        params['URL'] = Param(name='URL', param_type=String(), description=['\n                If '])
        item = Function(name='OnEncodedSyncPData', function_id=Enum(name='OnEncodedSyncPDataID'),
                        description=['\n           Callback including \n'],
                        message_type=EnumElement(name='notification'), params=params)
        expected = OrderedDict()
        expected['file_name'] = 'OnEncodedSyncPData'
        expected['name'] = 'OnEncodedSyncPData'
        expected['imports'] = {self.producer.imports(what='RpcNotification', wherefrom='../RpcNotification.js'),
                               self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')}
        expected['methods'] = (self.producer.methods(key='KEY_URL',
                                                     method_title='URL', external=None,
                                                     description=['If'], param_name='url',
                                                     type='String'),)
        expected['params'] = (self.producer.params(key='KEY_URL', value="'URL'"),)
        expected['description'] = ['Callback including']
        expected['func'] = 'OnEncodedSyncPData'
        expected['extend'] = 'RpcNotification'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)

    def test_CreateInteractionChoiceSetRequest(self):
        params = OrderedDict()
        params['choiceSet'] = Param(name='choiceSet', param_type=Array(
            element_type=Struct(name='Choice', description=['A choice is an option given to '])))
        item = Function(name='CreateInteractionChoiceSet', function_id=Enum(name='CreateInteractionChoiceSetID'),
                        description=['creates interaction'],
                        message_type=EnumElement(name='request'), params=params)
        expected = OrderedDict()
        expected['file_name'] = 'CreateInteractionChoiceSet'
        expected['name'] = 'CreateInteractionChoiceSet'
        expected['imports'] = {self.producer.imports(what='Choice', wherefrom='../structs/Choice.js'),
                               self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                               self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')}
        expected['methods'] = (self.producer.methods(key='KEY_CHOICE_SET',
                                                     method_title='ChoiceSet', external='Choice',
                                                     description=['A choice is an option given to'], param_name='set',
                                                     type='Choice[]'),)
        expected['params'] = (self.producer.params(key='KEY_CHOICE_SET', value="'choiceSet'"),)
        expected['description'] = ['creates interaction']
        expected['func'] = 'CreateInteractionChoiceSet'
        expected['extend'] = 'RpcRequest'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)
