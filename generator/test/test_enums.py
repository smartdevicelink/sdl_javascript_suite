from collections import namedtuple
from datetime import date
from unittest import TestCase

from transformers.enums_producer import EnumsProducer
from model.enum import Enum
from model.enum_element import EnumElement


class TestEnumsProducer(TestCase):
    def setUp(self):
        self.maxDiff = None
        Prop = namedtuple('Prop', 'enums_dir_name structs_dir_name path_to_enum_class')
        paths = Prop(enums_dir_name='../enums',
                     structs_dir_name='../structs',
                     path_to_enum_class='../../util/Enum.js')
        self.producer = EnumsProducer(paths)

    def test_FunctionID(self):
        item = Enum(name='FunctionID', elements={
            'RESERVED': EnumElement(name='RESERVED', value=0),
            'RegisterAppInterfaceID': EnumElement(name='RegisterAppInterfaceID', hex_value=1),
            'PerformAudioPassThruID': EnumElement(name='PerformAudioPassThruID', hex_value=10)
        })
        expected = {
            'name': 'FunctionID',
            'imports': [self.producer.imports(what='Enum', wherefrom='../../util/Enum.js')],
            'methods': [self.producer.methods(origin='RESERVED',
                                              method_title='RESERVED',
                                              description=[], type='Number'),
                        self.producer.methods(origin='RegisterAppInterfaceID',
                                              method_title='RegisterAppInterface',
                                              description=[], type='Number'),
                        self.producer.methods(origin='PerformAudioPassThruID',
                                              method_title='PerformAudioPassThru',
                                              description=[], type='Number')],
            'params': [self.producer.params(key='RESERVED', value=0),
                       self.producer.params(key='RegisterAppInterface', value='0x01'),
                       self.producer.params(key='PerformAudioPassThru', value='0x10')],
            'extend': 'Enum'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected['name'], result['name'])
        self.assertListEqual(sorted(expected['imports']), sorted(result['imports']))
        self.assertListEqual(sorted(expected['methods']), sorted(result['methods']))
        self.assertListEqual(sorted(expected['params']), sorted(result['params']))
        self.assertEqual(expected['extend'], result['extend'])

    def test_Result(self):
        item = Enum(name='Result', elements={
            'SUCCESS': EnumElement(name='SUCCESS')
        })
        expected = {
            'year': date.today().year,
            'name': 'Result',
            'file_name': 'Result',
            'imports': [self.producer.imports(what='Enum', wherefrom='../../util/Enum.js')],
            'methods': tuple([self.producer.methods(origin='SUCCESS',
                                              method_title='SUCCESS',
                                              description=[], type='String')]),
            'params': tuple([self.producer.params(key='SUCCESS', value="'SUCCESS'")]),
            'extend': 'Enum'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected, result)
