"""
Functions transformation
"""
import logging
import textwrap
from collections import namedtuple, OrderedDict

from model.function import Function
from model.param import Param
from transformers.common_producer import InterfaceProducerCommon


class FunctionsProducer(InterfaceProducerCommon):
    """
    Functions transformation
    """

    def __init__(self, paths, names, mapping=OrderedDict(), key_words=()):
        super(FunctionsProducer, self).__init__(
            enums_dir_name=paths.enums_dir_name,
            structs_dir_name=paths.structs_dir_name,
            names=names,
            mapping=mapping.get('functions', OrderedDict()),
            key_words=key_words)
        self._container_name = 'params'
        self.logger = logging.getLogger(self.__class__.__name__)
        self.request_class = paths.path_to_request_class
        self.response_class = paths.path_to_response_class
        self.notification_class = paths.path_to_notification_class

    @property
    def container_name(self):
        return self._container_name

    def transform(self, item: Function) -> dict:
        """
        Override
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        list(map(item.params.__delitem__, filter(item.params.__contains__, ['success', 'resultCode', 'info'])))
        render = super(FunctionsProducer, self).transform(item)
        render['func'] = self.ending_cutter(item.function_id.name)
        if item.message_type.name == 'response':
            render['file_name'] = item.name + item.message_type.name.capitalize()
        name = None
        if item.message_type.name == 'request':
            name = self.request_class
        elif item.message_type.name == 'response':
            name = self.response_class
            render['name'] = render['name'] + 'Response'
        elif item.message_type.name == 'notification':
            name = self.notification_class
        if name:
            what_where = self.prepare_imports(name)
            render['extend'] = what_where.what
            render['imports'].add(what_where)
        render['imports'].add(self.imports(what='FunctionID', wherefrom='{}/FunctionID.js'.format(self.enums_dir)))

        params = OrderedDict()
        for param in getattr(item, self._container_name).values():
            param.origin = param.name
            param.name = self.replace_keywords(param.name)
            p = self.extract_param(param)
            params.update({param.name: p})
        '''
        if params:
            render['params'] = tuple(params.values())
        '''
        return render

    def extract_param(self, param: Param):
        p = OrderedDict()
        p['title'] = param.name[:1].upper() + param.name[1:]
        p['key'] = 'KEY_' + self.key(param.name)
        p['mandatory'] = param.is_mandatory
        p['last'] = param.name
        if param.since:
            p['since'] = param.since
        p['deprecated'] = param.deprecated
        p['origin'] = param.origin
        p['values'] = self.extract_values(param)
        d = self.extract_description(param.description)
        if param.name == 'success':
            d = 'whether the request is successfully processed'
        if param.name == 'resultCode':
            d = 'additional information about a response returning a failed outcome'
        '''
        if d:
            p['description'] = textwrap.wrap(d, 90)
        '''
        Params = namedtuple('Params', sorted(p))
        return Params(**p)