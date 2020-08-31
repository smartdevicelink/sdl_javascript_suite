"""
Enums transformation
"""

import logging
from collections import namedtuple, OrderedDict

from model.enum import Enum
from model.enum_element import EnumElement
from transformers.common_producer import InterfaceProducerCommon


class EnumsProducer(InterfaceProducerCommon):
    """
    Enums transformation
    """

    def __init__(self, paths, mapping=OrderedDict(), key_words=()):
        super(EnumsProducer, self).__init__(
            enums_dir_name=paths.enums_dir_name,
            structs_dir_name=paths.structs_dir_name,
            mapping=mapping.get('enums', OrderedDict()),
            key_words=key_words)
        self._container_name = 'elements'
        self.logger = logging.getLogger(self.__class__.__name__)
        self.enum_class = paths.path_to_enum_class
        self.methods = namedtuple('Methods', 'method_title description type deprecated')

    @property
    def container_name(self):
        return self._container_name

    def transform(self, item: Enum) -> dict:
        """
        Override
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        tmp = super(EnumsProducer, self).transform(item)
        what_where = self.prepare_imports(self.enum_class)
        tmp['extend'] = what_where.what
        tmp['imports'].add(what_where)
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
        description = self.extract_description(description)
        name = self.ending_cutter(name)
        deprecated = param.deprecated
        methods = self.methods(method_title=name, description=description, type=type_name, deprecated=deprecated)
        params = self.extract_param(param)

        imports = None
        return imports, methods, params

    def extract_param(self, param: EnumElement) -> namedtuple:
        """
        Evaluate and extract params
        :param param: sub-element (EnumElement) of element from initial Model
        :return: self.params
        """
        if getattr(param, 'hex_value', None) is not None:
            if len(str(param.hex_value)) > 1:
                value = '0x{}'.format(param.hex_value)
            else:
                value = '0x0{}'.format(param.hex_value)
        else:
            value = "'{}'".format(param.name)
        key = self.ending_cutter(param.primary_name)
        return self.params(key=key, value=value)

    @staticmethod
    def extract_type(param: EnumElement) -> str:
        """
        Override
        Evaluate and extract type
        :param param: sub-element (EnumElement) of element from initial Model
        :return: string with sub-element type
        """
        if getattr(param, 'hex_value', None) is not None or getattr(param, 'value', None) is not None:
            return 'Number'
        return 'String'
