"""
Enums transformation
"""

import logging
import textwrap
from collections import namedtuple

from model.enum import Enum
from model.enum_element import EnumElement
from transformers.common_producer import InterfaceProducerCommon


class EnumsProducer(InterfaceProducerCommon):
    """
    Enums transformation
    """

    def __init__(self, paths, mapping=None):
        super(EnumsProducer, self).__init__(
            container_name='elements',
            enums_dir_name=paths.enums_dir_name,
            structs_dir_name=paths.structs_dir_name,
            mapping=mapping['enums'] if mapping and 'enums' in mapping else {})
        self.logger = logging.getLogger(self.__class__.__name__)
        self.enum_class = paths.path_to_enum_class

    @property
    def methods(self):
        """
        Override
        :return: namedtuple methods(origin='', method_title='', description='', type='')
        """
        return namedtuple('Methods', 'origin method_title description type')

    def transform(self, item: Enum) -> dict:
        """
        Override
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        tmp = super(EnumsProducer, self).transform(item)
        what_where = self.extract_imports(self.enum_class)
        tmp.update({'extend': what_where.what})
        tmp['imports'].append(what_where)
        return tmp

    def common_flow(self, param: EnumElement, item_type=None):
        """
        Override
        Main transformation flow, for Enum
        :param param: sub-element (EnumElement) of element from initial Model
        :param item_type: not used
        :return: tuple with 3 element, which going to be applied to jinja2 template
        """
        (name, description) = self.extract_name_description(param)
        type_name = self.extract_type(param)
        description = textwrap.wrap(description, 117 - len(type_name))
        name = self.ending_cutter(name)

        methods = self.methods(origin=param.name, method_title=name, description=description, type=type_name)
        params = self.extract_param(param)

        imports = None
        return imports, methods, params

    def extract_param(self, param: EnumElement) -> namedtuple:
        """
        Evaluate and extract params
        :param param: sub-element (EnumElement) of element from initial Model
        :return: self.params
        """
        if getattr(param, 'hexvalue', None) is not None:
            if len(str(param.hexvalue)) > 1:
                value = '0x{}'.format(param.hexvalue)
            else:
                value = '0x0{}'.format(param.hexvalue)
        elif getattr(param, 'value', None) is not None:
            value = param.value
        else:
            value = "'{}'".format(param.name)
        return self.params(key=self.ending_cutter(param.primary_name), value=value)

    @staticmethod
    def extract_type(param: EnumElement) -> str:
        """
        Override
        Evaluate and extract type
        :param param: sub-element (EnumElement) of element from initial Model
        :return: string with sub-element type
        """
        if getattr(param, 'hexvalue', None) is not None or getattr(param, 'value', None) is not None:
            return 'Number'
        return 'String'
