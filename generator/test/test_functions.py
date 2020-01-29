from collections import namedtuple
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
        item = Function(name='RegisterAppInterface', function_id=Enum(name='RegisterAppInterfaceID'),
                        message_type=EnumElement(name='request'), params=
                        {
                            'syncMsgVersion': Param(name='syncMsgVersion', param_type=
                            Struct(name='SyncMsgVersion', description=['Specifies the'], members={
                                'majorVersion': Param(name='majorVersion', param_type=Integer())
                            }), description=['See SyncMsgVersion']),
                            'fullAppID': Param(name='fullAppID', description=['ID used'], param_type=String()),
                            'dayColorScheme': Param(name='dayColorScheme', param_type=
                            Struct(name='TemplateColorScheme', description=
                            ['\n            A color scheme for all display layout templates.\n        '])),
                            'ttsName': Param(name='ttsName', description=['\n      TTS string for'], param_type=
                            Array(element_type=Struct(name='TTSChunk', description=['A TTS chunk'])))
                        })
        expected = {
            'name': 'RegisterAppInterface',
            'imports': {self.producer.imports(what='SdlMsgVersion', wherefrom='../structs/SdlMsgVersion.js'),
                        self.producer.imports(what='TemplateColorScheme',
                                              wherefrom='../structs/TemplateColorScheme.js'),
                        self.producer.imports(what='TTSChunk', wherefrom='../structs/TTSChunk.js'),
                        self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                        self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')},
            'methods': [self.producer.methods(key='KEY_SDL_MSG_VERSION',
                                              method_title='SdlMsgVersion', external='SdlMsgVersion',
                                              description=['See SyncMsgVersion'], param_name='version',
                                              type='SdlMsgVersion'),
                        self.producer.methods(key='KEY_FULL_APP_ID', method_title='FullAppID',
                                              external=None, description=['ID used'], param_name='id', type='String'),
                        self.producer.methods(key='KEY_DAY_COLOR_SCHEME', param_name='scheme',
                                              method_title='DayColorScheme', external='TemplateColorScheme',
                                              description=['A color scheme for all display layout templates.'],
                                              type='TemplateColorScheme'),
                        self.producer.methods(key='KEY_TTS_NAME', param_name='name',
                                              method_title='TtsName', external='TTSChunk',
                                              description=['TTS string for'], type='TTSChunk[]')],
            'params': [self.producer.params(key='APP_ID_MAX_LENGTH', value=10),
                       self.producer.params(key='KEY_SDL_MSG_VERSION', value="'syncMsgVersion'"),
                       self.producer.params(key='KEY_FULL_APP_ID', value="'fullAppID'"),
                       self.producer.params(key='KEY_DAY_COLOR_SCHEME', value="'dayColorScheme'"),
                       self.producer.params(key='KEY_TTS_NAME', value="'ttsName'")],
            'scripts': [self.producer.get_file_content('templates/scripts/fullAppID.js')],
            'func': 'RegisterAppInterface',
            'extend': 'RpcRequest'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertListEqual(sorted(expected['methods']), sorted(result['methods']))
        self.assertListEqual(sorted(expected['params']), sorted(result['params']))
        self.assertEqual(expected['func'], result['func'])
        self.assertEqual(expected['extend'], result['extend'])

    def test_RegisterAppInterfaceResponse(self):
        item = Function(name='RegisterAppInterface', function_id=Enum(name='RegisterAppInterfaceID'),
                        description=['The response '],
                        message_type=EnumElement(name='response'), params=
                        {
                            'success': Param(name='success', param_type=Boolean(), description=[' true if ']),
                            'language': Param(name='language', param_type=
                            Enum(name='Language', elements={
                                'EN-US': EnumElement(name='EN-US', description=['English - US'])
                            }), description=['The currently']),
                            'supportedDiagModes': Param(name='supportedDiagModes', param_type=
                            Array(element_type=Integer()), description=['\n                Specifies the'], )
                        })
        expected = {
            'name': 'RegisterAppInterfaceResponse',
            'imports': {self.producer.imports(what='Language', wherefrom='../enums/Language.js'),
                        self.producer.imports(what='RpcResponse', wherefrom='../RpcResponse.js'),
                        self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')},
            'methods': [self.producer.methods(key='KEY_LANGUAGE',
                                              method_title='Language', external='Language',
                                              description=['The currently'], param_name='language',
                                              type='Language'),
                        self.producer.methods(key='KEY_SUPPORTED_DIAG_MODES',
                                              method_title='SupportedDiagModes', external=None,
                                              description=['Specifies the'], param_name='modes',
                                              type='Number[]')],
            'params': [self.producer.params(key='KEY_LANGUAGE', value="'language'"),
                       self.producer.params(key='KEY_SUPPORTED_DIAG_MODES', value="'supportedDiagModes'")],
            'description': ['The response'],
            'func': 'RegisterAppInterface',
            'extend': 'RpcResponse'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertListEqual(sorted(expected['methods']), sorted(result['methods']))
        self.assertListEqual(sorted(expected['params']), sorted(result['params']))
        self.assertEqual(expected['description'], result['description'])
        self.assertEqual(expected['func'], result['func'])
        self.assertEqual(expected['extend'], result['extend'])

    def test_UnregisterAppInterfaceRequest(self):
        item = Function(name='UnregisterAppInterface', function_id=Enum(name='UnregisterAppInterfaceID'),
                        message_type=EnumElement(name='request'), params={})
        expected = {
            'name': 'UnregisterAppInterface',
            'imports': {self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                        self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')},
            'func': 'UnregisterAppInterface',
            'extend': 'RpcRequest'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertEqual(expected['func'], result['func'])
        self.assertEqual(expected['extend'], result['extend'])

    def test_PutFileRequest(self):
        item = Function(name='PutFile', function_id=Enum(name='PutFileID'), description=['\n            Used to'],
                        message_type=EnumElement(name='request'), params=
                        {
                            'fileType': Param(name='fileType', param_type=
                            Enum(name='FileType', description=['Enumeration listing'], elements={
                                'AUDIO_MP3': EnumElement(name='AUDIO_MP3')
                            }), description=['Selected file type.'])
                        })
        expected = {
            'name': 'PutFile',
            'imports': {self.producer.imports(what='FileType', wherefrom='../enums/FileType.js'),
                        self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                        self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')},
            'methods': [self.producer.methods(key='KEY_FILE_TYPE',
                                              method_title='FileType', external='FileType',
                                              description=['Selected file type.'], param_name='type',
                                              type='FileType')],
            'params': [self.producer.params(key='KEY_FILE_TYPE', value="'fileType'")],
            'description': ['Used to'],
            'scripts': [self.producer.get_file_content('templates/scripts/PutFileRequest.js')],
            'func': 'PutFile',
            'extend': 'RpcRequest'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertListEqual(sorted(expected['methods']), sorted(result['methods']))
        self.assertListEqual(sorted(expected['params']), sorted(result['params']))
        self.assertEqual(expected['description'], result['description'])
        self.assertSequenceEqual(expected['scripts'], result['scripts'])
        self.assertEqual(expected['func'], result['func'])
        self.assertEqual(expected['extend'], result['extend'])

    def test_OnEncodedSyncPDataNotification(self):
        item = Function(name='OnEncodedSyncPData', function_id=Enum(name='OnEncodedSyncPDataID'),
                        description=['\n           Callback including \n'],
                        message_type=EnumElement(name='notification'), params=
                        {
                            'URL': Param(name='URL', param_type=String(), description=['\n                If '])
                        })
        expected = {
            'name': 'OnEncodedSyncPData',
            'imports': {self.producer.imports(what='RpcNotification', wherefrom='../RpcNotification.js'),
                        self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')},
            'methods': [self.producer.methods(key='KEY_URL',
                                              method_title='URL', external=None,
                                              description=['If'], param_name='url',
                                              type='String')],
            'params': [self.producer.params(key='KEY_URL', value="'URL'")],
            'description': ['Callback including'],
            'func': 'OnEncodedSyncPData',
            'extend': 'RpcNotification'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertListEqual(sorted(expected['methods']), sorted(result['methods']))
        self.assertListEqual(sorted(expected['params']), sorted(result['params']))
        self.assertEqual(expected['description'], result['description'])
        self.assertEqual(expected['func'], result['func'])
        self.assertEqual(expected['extend'], result['extend'])

    def test_CreateInteractionChoiceSetRequest(self):
        item = Function(name='CreateInteractionChoiceSet', function_id=Enum(name='CreateInteractionChoiceSetID'),
                        description=['creates interaction'],
                        message_type=EnumElement(name='request'), params=
                        {
                            'choiceSet': Param(name='choiceSet', param_type=
                            Array(element_type=Struct(name='Choice', description=['A choice is an option given to '])))
                        })
        expected = {
            'name': 'CreateInteractionChoiceSet',
            'imports': {self.producer.imports(what='Choice', wherefrom='../structs/Choice.js'),
                        self.producer.imports(what='RpcRequest', wherefrom='../RpcRequest.js'),
                        self.producer.imports(what='FunctionID', wherefrom='../enums/FunctionID.js')},
            'methods': [self.producer.methods(key='KEY_CHOICE_SET',
                                              method_title='ChoiceSet', external='Choice',
                                              description=['A choice is an option given to'], param_name='set',
                                              type='Choice[]')],
            'params': [self.producer.params(key='KEY_CHOICE_SET', value="'choiceSet'")],
            'description': ['creates interaction'],
            'func': 'CreateInteractionChoiceSet',
            'extend': 'RpcRequest'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertListEqual(sorted(expected['methods']), sorted(result['methods']))
        self.assertListEqual(sorted(expected['params']), sorted(result['params']))
        self.assertEqual(expected['description'], result['description'])
        self.assertEqual(expected['func'], result['func'])
        self.assertEqual(expected['extend'], result['extend'])
