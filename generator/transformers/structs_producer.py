"""
Structs transformation
"""

import logging
from collections import OrderedDict

from model.struct import Struct
from transformers.common_producer import InterfaceProducerCommon


class StructsProducer(InterfaceProducerCommon):
    """
    Structs transformation
    """

    def __init__(self, paths, names, mapping=OrderedDict(), key_words=()):
        super(StructsProducer, self).__init__(
            enums_dir_name=paths.enums_dir_name,
            structs_dir_name=paths.structs_dir_name,
            names=names,
            mapping=mapping.get('structs', OrderedDict()),
            key_words=key_words)
        self._container_name = 'members'
        self.logger = logging.getLogger(self.__class__.__name__)
        self.struct_class = paths.path_to_struct_class

    @property
    def container_name(self):
        return self._container_name

    def transform(self, item: Struct) -> dict:
        """
        Override
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        tmp = super(StructsProducer, self).transform(item)
        what_where = self.prepare_imports(self.struct_class)
        tmp['extend'] = what_where.what
        tmp['imports'].add(what_where)
        return tmp
