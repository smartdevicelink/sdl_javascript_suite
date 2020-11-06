from collections import namedtuple, OrderedDict
from unittest import TestCase

from model.param import Param
from model.string import String
from model.struct import Struct
from transformers.structs_producer import StructsProducer


class TestStructsProducer(TestCase):
    def setUp(self):
        self.maxDiff = None
        Prop = namedtuple('Prop', 'structs_dir_name enums_dir_name path_to_struct_class')
        paths = Prop(enums_dir_name='../enums',
                     structs_dir_name='../structs',
                     path_to_struct_class='../RpcStruct.js')
        key_words = ('value',)
        self.producer = StructsProducer(paths, ['Image'], mapping={}, key_words=key_words)

    def test_SoftButton(self):
        members = OrderedDict()
        members['image'] = Param(name='image', param_type=Struct(name='Image'), description=['Optional image'])
        members['value'] = Param(name='value', param_type=String())
        item = Struct(name='SoftButton', members=members)
        expected = OrderedDict()
        expected['file_name'] = 'SoftButton'
        expected['name'] = 'SoftButton'
        expected['file_name'] = 'SoftButton'
        expected['imports'] = {self.producer.imports(what='Image', wherefrom='./Image.js'),
                               self.producer.imports(what='RpcStruct', wherefrom='../RpcStruct.js')}
        expected['methods'] = (
            self.producer.methods(
                description=['Optional image'], external='Image', key='KEY_IMAGE', method_title='Image',
                param_name='image', type='Image', param_values={}, deprecated=None, history=None, since=None),
            self.producer.methods(
                description=[], external=None, key='KEY_VALUE', method_title='ValueParam',
                param_name='value', type='String', param_values={}, deprecated=None, history=None, since=None))
        expected['params'] = (self.producer.params(key='KEY_IMAGE', value="'image'"),
                              self.producer.params(key='KEY_VALUE', value="'value'"))
        expected['since'] = None
        expected['history'] = None
        expected['deprecated'] = None
        expected['extend'] = 'RpcStruct'
        result = self.producer.transform(item)
        self.assertDictEqual(expected, result)
