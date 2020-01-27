from collections import namedtuple
from datetime import date
from unittest import TestCase

from model.param import Param
from model.struct import Struct
from transformers.structs_producer import StructsProducer


class TestStructsProducer(TestCase):
    def setUp(self):
        self.maxDiff = None
        Prop = namedtuple('Prop', 'structs_dir_name enums_dir_name path_to_struct_class')
        paths = Prop(enums_dir_name='../enums',
                     structs_dir_name='../structs',
                     path_to_struct_class='../RpcStruct.js')

        self.producer = StructsProducer(paths, (), ('Image',))

    def test_SoftButton(self):
        item = Struct(name='SoftButton', members={
            'image': Param(name='image', param_type=Struct(name='Image'), description=['Optional image']),
        })
        expected = {
            'year': date.today().year,
            'name': 'SoftButton',
            'file_name': 'SoftButton',
            'imports': {self.producer.imports(what='Image', wherefrom='./Image.js'),
                        self.producer.imports(what='RpcStruct', wherefrom='../RpcStruct.js')},
            'methods': tuple([self.producer.methods(description=['Optional image'], external='Image',
                                                    key='KEY_IMAGE', method_title='Image',
                                                    param_name='image', type='Image')]),
            'params': tuple([self.producer.params(key='KEY_IMAGE', value="'image'")]),
            'extend': 'RpcStruct'
        }
        result = self.producer.transform(item)
        self.assertEqual(expected, result)
