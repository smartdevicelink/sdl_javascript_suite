"""
Common transformation
"""

import logging
import re
import textwrap
from abc import ABC
from collections import namedtuple, OrderedDict
from datetime import date
from pathlib import Path

from model.array import Array
from model.float import Float
from model.enum import Enum
from model.function import Function
from model.integer import Integer
from model.struct import Struct
from transformers.generate_error import GenerateError


class InterfaceProducerCommon(ABC):
    """
    Common transformation
    """
    version = '1.0.0'

    def __init__(self, container_name, enums_dir_name, structs_dir_name,
                 enum_names=(), struct_names=(), mapping=OrderedDict()):
        self.logger = logging.getLogger(self.__class__.__name__)
        self.container_name = container_name
        self.enum_names = list(map(lambda e: self.replace_sync(e), enum_names))
        self.struct_names = list(map(lambda e: self.replace_sync(e), struct_names))
        self.enums_dir = enums_dir_name
        self.structs_dir = structs_dir_name
        self.mapping = mapping

    @property
    def get_version(self):
        """
        :return: current version of Generator
        """
        return self.version

    @property
    def imports(self):
        """
        :return: namedtuple imports(what='', wherefrom='')
        """
        return namedtuple('Imports', 'what wherefrom')

    @property
    def methods(self):
        """
        :return: namedtuple methods(
                            origin='', key='', method_title='', external='', description='', param_name='', type='',)
        """
        return namedtuple('Methods', 'origin key method_title external description param_name type')

    @property
    def params(self):
        """
        :return: namedtuple params(key='', value='')
        """
        return namedtuple('Params', 'key value')

    @staticmethod
    def replace_sync(name):
        """
        :param name: string with item name
        :return: string with replaced 'sync' to 'Sdl'
        """
        if name:
            return re.sub(r'^(s|S)ync(.+)$', r'\1dl\2', name)
        return name

    def transform(self, item) -> dict:
        """
        :param item: particular element from initial Model
        :return: dictionary to be applied to jinja2 template
        """
        imports = {}
        methods = {}
        params = {}

        for param in getattr(item, self.container_name).values():
            if isinstance(item, Function) and item.message_type.name == 'response' and \
                            param.name in ('success', 'resultCode', 'info'):
                self.logger.warning('%s of type %s/%s - skip parameter "%s"',
                                    item.name, type(item).__name__, item.message_type.name, param.name)
                continue

            _import, _methods, _params = self.common_flow(param, type(item))

            if _import:
                imports.update(_import)
            if _methods:
                methods.update({param.name: _methods})
            params.update({param.name: _params})

        name = self.replace_sync(item.name)
        render = {'year': date.today().year,
                  'file_name': name,
                  'name': name,
                  'imports': [self.imports(what=k, wherefrom=v) for k, v in imports.items()],
                  'methods': methods,
                  'params': params}

        if getattr(item, 'description', None):
            render.update({'description': textwrap.wrap(self.extract_description(item.description), 116)})
        if item.deprecated:
            render.update({'deprecated': item.deprecated})

        self.custom_mapping(render, item)

        render.update({'params': tuple(render['params'].values())})
        render.update({'methods': tuple(render['methods'].values())})

        return render

    def custom_mapping(self, render, item):
        """
        :param render: dictionarry with data ready to apply to Jinja2 template
        :param item: original item from parsed model
        :return:
        """
        if isinstance(item, Function):
            mapping_name = item.name + item.message_type.name.capitalize()
        else:
            mapping_name = item.name

        if mapping_name not in self.mapping:
            return
        custom = self.mapping[mapping_name]

        if 'params_additional' in custom:
            for param in custom['params_additional']:
                render['params'].update({param['key']: self.params(**param)})
            del custom['params_additional']
        if 'script' in custom:
            script = self.get_file_content(custom['script'])
            if script:
                if 'script' in render:
                    render['scripts'].append(script)
                else:
                    render['scripts'] = [script]
            del custom['script']

        for name, mapping in custom.copy().items():
            for sub_name, sub_mapping in mapping.copy().items():
                if sub_name == '-methods':
                    del render['methods'][name]
                    del custom[name]['-methods']
                if sub_name == 'script':
                    script = self.get_file_content(sub_mapping)
                    if script:
                        if 'script' in render:
                            render['scripts'].append(script)
                        else:
                            render['scripts'] = [script]
                    del custom[name]['script']
                if sub_name in render and name in render[sub_name]:
                    render[sub_name][name] = render[sub_name][name]._replace(**sub_mapping)
                    del custom[name][sub_name]
            if not custom[name]:
                del custom[name]

        render.update(custom)

    def common_flow(self, param, item_type):
        """
        Main transformation flow, for Struct and Function
        :param param: sub-element (Param, FunctionParam) of element from initial Model
        :param item_type: type of parent element from initial Model
        :return: tuple with 3 element, which going to be applied to jinja2 template
        """
        name, description = self.extract_name_description(param)
        type_name = self.extract_type(param)
        imports = None
        if name:
            if name in self.enum_names:
                imports = {name: '{}/{}.js'.format(self.enums_dir, name)}
            elif name in self.struct_names:
                if item_type is Struct:
                    import_path = '.'
                else:
                    import_path = self.structs_dir
                imports = {name: '{}/{}.js'.format(import_path, name)}
        param_name = self.replace_sync(param.name)
        key = self.key(param_name)

        short_name = re.sub(r'(?<=[a-z])(?=[A-Z])|(?<=[A-Z])(?=[A-Z][a-z])', '=^.^=', param_name) \
            .split('=^.^=').pop().lower()
        description = textwrap.wrap(description, 100 - len(type_name) - len(short_name))
        title = param_name[:1].upper() + param_name[1:]

        methods = self.methods(origin=param.name, key=key, method_title=title, external=name, description=description,
                               param_name=short_name, type=type_name)
        params = self.params(key=key, value="'{}'".format(param.name))
        return imports, methods, params

    def extract_imports(self, extend):
        """
        Extract imports from property PATH_TO_(STRUCT|REQUEST|RESPONSE|NOTIFICATION)_CLASS
        :param extend: property to be evaluated and converted to self.imports
        :return: self.imports
        """
        tmp = re.match(r'.+/(.+).js', extend)
        if tmp:
            return self.imports(what=tmp.group(1), wherefrom=extend)
        raise GenerateError('Can not extract imports from {}'.format(extend))

    @staticmethod
    def key(param: str):
        """
        Convert param string to uppercase and inserting underscores
        :param param: camel case string
        :return: string in uppercase with underscores
        """
        if re.match(r'^[A-Z_]+$', param):
            return 'KEY_' + param
        return 'KEY_' + re.sub(r'([a-z]|[A-Z]{2,})([A-Z]|\d$)', r'\1_\2', param).upper()

    @staticmethod
    def ending_cutter(name: str):
        """
        If string not contains only uppercase letters and end with 'ID' deleting 'ID' from end of string
        :param name: string to evaluate and deleting 'ID' from end of string
        :return: if match cut string else original string
        """
        if name.endswith('ID') and re.match(r'^(?=\w+[A-Z])(?=\w+[a-z])\w+$', name):
            return name[:-2]
        return name

    @staticmethod
    def extract_description(description):
        """
        Evaluate, align and delete @TODO
        :param description: list with description
        :return: evaluated string
        """
        return re.sub(r'(\s{2,}|\n|\[@TODO.+)', ' ', ''.join(description)).strip() if description else ''

    def extract_name_description(self, param):
        """
        Extracting and evaluating name, description from appropriate place
        :param param: sub-element (Param, FunctionParam) of element from initial Model
        :return: tuple with 2 element (name, description)
        """
        name = None
        description = None
        if getattr(param, 'description', None):
            description = param.description

        if getattr(param, 'primary_name', None):
            name = param.primary_name
        elif getattr(param, 'param_type', None):
            if getattr(param.param_type, 'name', None):
                name = param.param_type.name
                if not description and getattr(param.param_type, 'description', None):
                    description = param.param_type.description
            elif getattr(param.param_type, 'element_type', None) and \
                    getattr(param.param_type.element_type, 'name', None):
                name = param.param_type.element_type.name
                if not description and getattr(param.param_type.element_type, 'description', None):
                    description = param.param_type.element_type.description

        return self.replace_sync(name), self.extract_description(description)

    def extract_type(self, param):
        """
        Evaluate and extract type
        :param param: sub-element (Param, FunctionParam) of element from initial Model
        :return: string with sub-element type
        """

        def evaluate(instance):
            if isinstance(instance, (Struct, Enum)):
                return instance.name
            if isinstance(instance, (Integer, Float)):
                return 'Number'
            return type(instance).__name__

        if isinstance(param.param_type, Array):
            return 'Array<{}>'.format(evaluate(param.param_type.element_type))
        return self.replace_sync(evaluate(param.param_type))

    def get_file_content(self, file_name: str):
        """
        Used for getting content of custom scripts used in custom mapping
        :param file_name: relational path custom scripts
        :return: string with content of custom scripts
        """
        file_name = Path(__file__).absolute().parents[1].joinpath(file_name)
        try:
            with file_name.open('r') as file:
                intermediate = file.readlines()
            return ''.join(intermediate)
        except FileNotFoundError as message:
            self.logger.error(message)
            return ''
