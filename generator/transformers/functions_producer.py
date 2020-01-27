"""
Functions transformation
"""
import logging

from model.function import Function
from transformers.common_producer import InterfaceProducerCommon


class FunctionsProducer(InterfaceProducerCommon):
    """
    Functions transformation
    """

    def __init__(self, paths, enum_names, struct_names, mapping=None):
        super(FunctionsProducer, self).__init__(
            container_name='params',
            enums_dir_name=paths.enums_dir_name,
            structs_dir_name=paths.structs_dir_name,
            enum_names=enum_names,
            struct_names=struct_names,
            mapping=mapping['functions'] if mapping and 'functions' in mapping else {})
        self.logger = logging.getLogger(self.__class__.__name__)
        self.request_class = paths.path_to_request_class
        self.response_class = paths.path_to_response_class
        self.notification_class = paths.path_to_notification_class

    def transform(self, item: Function) -> dict:
        """
        Override
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        list(map(item.params.__delitem__, filter(item.params.__contains__, ['success', 'resultCode', 'info'])))
        render = super(FunctionsProducer, self).transform(item)
        render.update({'func': self.ending_cutter(item.function_id.name)})
        if item.message_type.name == 'response':
            render.update({'file_name': item.name + item.message_type.name.capitalize()})
        name = None
        if item.message_type.name == 'request':
            name = self.request_class
        elif item.message_type.name == 'response':
            name = self.response_class
            render['name'] = render['name'] + 'Response'
        elif item.message_type.name == 'notification':
            name = self.notification_class
        if name:
            what_where = self.extract_imports(name)
            render.update({'extend': what_where.what})
            render['imports'].add(what_where)
        render['imports'].add(self.imports(what='FunctionID', wherefrom='{}/FunctionID.js'.format(self.enums_dir)))
        return render
