from collections import namedtuple, OrderedDict
from unittest import TestCase

from model.enum import Enum
from model.enum_element import EnumElement
from transformers.enums_producer import EnumsProducer


class TestEnumsProducer(TestCase):
    def setUp(self):
        self.maxDiff = None
        Prop = namedtuple('Prop', 'enums_dir_name structs_dir_name path_to_enum_class')
        paths = Prop(enums_dir_name='../enums',
                     structs_dir_name='../structs',
                     path_to_enum_class='../../util/Enum.js')
        self.producer = EnumsProducer(paths)

    def test_FunctionID(self):
        elements = OrderedDict()
        elements['RESERVED'] = EnumElement(name='RESERVED', value=0)
        elements['RegisterAppInterfaceID'] = EnumElement(name='RegisterAppInterfaceID', hex_value=1)
        elements['PerformAudioPassThruID'] = EnumElement(name='PerformAudioPassThruID', hex_value=10)

        item = Enum(name='FunctionID', elements=elements)
        expected = OrderedDict()
        expected['file_name'] = 'FunctionID'
        expected['name'] = 'FunctionID'
        expected['imports'] = {self.producer.imports(what='Enum', wherefrom='../../util/Enum.js')}
        expected['methods'] = (self.producer.methods(method_title='RESERVED',
                                                     description=[], type='Number'),
                               self.producer.methods(method_title='RegisterAppInterface',
                                                     description=[], type='Number'),
                               self.producer.methods(method_title='PerformAudioPassThru',
                                                     description=[], type='Number'))
        expected['params'] = (self.producer.params(key='RESERVED', value="'RESERVED'"),
                              self.producer.params(key='RegisterAppInterface', value='0x01'),
                              self.producer.params(key='PerformAudioPassThru', value='0x10'))
        expected['extend'] = 'Enum'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)

    def test_Result(self):
        elements = OrderedDict()
        elements['SUCCESS'] = EnumElement(name='SUCCESS')
        item = Enum(name='Result', elements=elements)
        expected = OrderedDict()
        expected['file_name'] = 'Result'
        expected['name'] = 'Result'
        expected['file_name'] = 'Result'
        expected['imports'] = {self.producer.imports(what='Enum', wherefrom='../../util/Enum.js')}
        expected['methods'] = (self.producer.methods(method_title='SUCCESS',
                                                      description=[], type='String'),)
        expected['params'] = (self.producer.params(key='SUCCESS', value="'SUCCESS'"),)
        expected['extend'] = 'Enum'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)
