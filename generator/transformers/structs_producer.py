"""
Structs transformation
"""

import logging

from model.struct import Struct
from transformers.common_producer import InterfaceProducerCommon


class StructsProducer(InterfaceProducerCommon):
    """
    Structs transformation
    """

    def __init__(self, paths, enum_names, struct_names, mapping=None):
        super(StructsProducer, self).__init__(
            container_name='members',
            enums_dir_name=paths.enums_dir_name,
            structs_dir_name=paths.structs_dir_name,
            enum_names=enum_names,
            struct_names=struct_names,
            mapping=mapping['structs'] if mapping and 'structs' in mapping else {})
        self.logger = logging.getLogger(self.__class__.__name__)
        self.struct_class = paths.path_to_struct_class

    def transform(self, item: Struct) -> dict:
        """
        Override
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        tmp = super(StructsProducer, self).transform(item)
        what_where = self.extract_imports(self.struct_class)
        tmp.update({'extend': what_where.what})
        tmp['imports'].append(what_where)
        return tmp
