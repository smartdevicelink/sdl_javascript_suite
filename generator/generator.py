"""This is main runner of generator

"""

import logging
import re
import sys
from argparse import ArgumentParser
from collections import namedtuple
from datetime import date
from inspect import getfile
from itertools import groupby
from json import JSONDecodeError, loads
from os.path import basename
from pprint import pformat
from time import sleep

from jinja2 import Environment, FileSystemLoader, TemplateNotFound, UndefinedError
from pathlib2 import Path

ROOT = Path(__file__).absolute().parents[0]

sys.path.append(ROOT.parents[0].joinpath('lib/rpc_spec/InterfaceParser').as_posix())

try:
    from parsers.sdl_rpc_v2 import Parser
    from parsers.rpc_base import ParseError
    from model.interface import Interface
    from transformers.generate_error import GenerateError
    from transformers.common_producer import InterfaceProducerCommon
    from transformers.enums_producer import EnumsProducer
    from transformers.functions_producer import FunctionsProducer
    from transformers.structs_producer import StructsProducer
except ModuleNotFoundError as message:
    print('%s.\nprobably you did not initialize submodule', message)
    sys.exit(1)


class Generator:
    """
    This class contains only technical features, as follow:
    - parsing command-line arguments, or evaluating required Paths interactively;
    - calling parsers to get Model from xml;
    - calling producers to transform initial Model to dict used in jinja2 templates
    Not required to be covered by unit tests cause contains only technical features.
    """

    def __init__(self):
        self.logger = logging.getLogger(self.__class__.__name__)
        self._env = None
        self.paths_named = namedtuple('paths_named', 'path_to_enum_class path_to_struct_class path_to_request_class '
                                                     'path_to_response_class path_to_notification_class enums_dir_name '
                                                     'structs_dir_name functions_dir_name rpc_creator')

    @property
    def env(self):
        """
        :return: jinja2 Environment
        """
        return self._env

    @env.setter
    def env(self, value):
        """
        :param value: path with directory with templates
        :return: jinja2 Environment
        """
        if not Path(value).exists():
            self.logger.critical('Directory with templates not found %s', value)
            sys.exit(1)
        else:
            self._env = Environment(loader=FileSystemLoader(value))

    @property
    def get_version(self):
        """
        :return: current version of Generator
        """
        return InterfaceProducerCommon.version

    def config_logging(self, verbose):
        """
        Configure logging
        :param verbose: boolean
        """
        handler = logging.StreamHandler()
        handler.setFormatter(logging.Formatter(fmt='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
                                               datefmt='%m-%d %H:%M'))
        if verbose:
            handler.setLevel(logging.DEBUG)
            self.logger.setLevel(logging.DEBUG)
        else:
            handler.setLevel(logging.ERROR)
            self.logger.setLevel(logging.ERROR)
        logging.getLogger().handlers.clear()
        root_logger = logging.getLogger()
        root_logger.addHandler(handler)

    def evaluate_output_directory(self, output_directory):
        """
        :param output_directory: path to output_directory
        :return: validated path to output_directory
        """
        if output_directory.startswith('/'):
            path = Path(output_directory).absolute().resolve()
        else:
            path = ROOT.joinpath(output_directory).resolve()
        if not path.exists():
            self.logger.warning('Directory not found: %s, trying to create it', path)
            try:
                path.mkdir(parents=True, exist_ok=True)
            except OSError as message1:
                self.logger.critical('Failed to create directory %s, %s', path.as_posix(), message1)
                sys.exit(1)
        return path

    def get_parser(self):
        """
        Parsing command-line arguments, or evaluating required Paths interactively.
        :return: an instance of argparse.ArgumentParser
        """

        if len(sys.argv) == 2 and sys.argv[1] in ('-v', '--version'):
            print(self.get_version)
            sys.exit(0)

        Paths = namedtuple('Paths', 'name path')
        xml = Paths('source_xml', ROOT.parents[0].joinpath('lib/rpc_spec/MOBILE_API.xml'))
        required_source = not xml.path.exists()

        out = Paths('output_directory', ROOT.parents[0].joinpath('lib/js/src/rpc'))
        output_required = not out.path.exists()

        parser = ArgumentParser(description='Proxy Library RPC Generator')
        parser.add_argument('-v', '--version', action='store_true', help='print the version and exit')
        parser.add_argument('-xml', '--source-xml', '--input-file', required=required_source,
                            help='should point to MOBILE_API.xml')
        parser.add_argument('-xsd', '--source-xsd', required=False)
        parser.add_argument('-d', '--output-directory', required=output_required,
                            help='define the place where the generated output should be placed')
        parser.add_argument('-t', '--templates-directory', nargs='?', default=ROOT.joinpath('templates').as_posix(),
                            help='path to directory with templates')
        parser.add_argument('-r', '--regex-pattern', required=False,
                            help='only elements matched with defined regex pattern will be parsed and generated')
        parser.add_argument('--verbose', action='store_true', help='display additional details like logs etc')
        parser.add_argument('-e', '--enums', required=False, action='store_true',
                            help='only specified elements will be generated, if present')
        parser.add_argument('-s', '--structs', required=False, action='store_true',
                            help='only specified elements will be generated, if present')
        parser.add_argument('-m', '-f', '--functions', required=False, action='store_true',
                            help='only specified elements will be generated, if present')
        parser.add_argument('-y', '--overwrite', action='store_true',
                            help='force overwriting of existing files in output directory, ignore confirmation message')
        parser.add_argument('-n', '--skip', action='store_true',
                            help='skip overwriting of existing files in output directory, ignore confirmation message')

        args, unknown = parser.parse_known_args()

        if unknown:
            self.logger.critical('found unknown arguments: %s', ' '.join(unknown))
            parser.print_help(sys.stderr)
            sys.exit(1)

        if args.skip and args.overwrite:
            self.logger.critical('please select only one option skip or overwrite')
            sys.exit(1)

        if not args.enums and not args.structs and not args.functions:
            args.enums = args.structs = args.functions = True

        for intermediate in (xml, out):
            if not getattr(args, intermediate.name) and intermediate.path.exists():
                while True:
                    try:
                        if args.overwrite:
                            self.logger.warning('%s set to %s', intermediate.name, intermediate.path)
                            setattr(args, intermediate.name, intermediate.path.as_posix())
                            break
                            
                        confirm = input('Confirm default path {} for {} Y/Enter = yes, N = no'
                                        .format(intermediate.path, intermediate.name))
                        if confirm.lower() == 'y' or not confirm:
                            self.logger.warning('%s set to %s', intermediate.name, intermediate.path)
                            setattr(args, intermediate.name, intermediate.path.as_posix())
                            sleep(0.05)
                            break
                        if confirm.lower() == 'n':
                            self.logger.warning('provide argument %s', intermediate.name)
                            sys.exit(1)
                    except KeyboardInterrupt:
                        print('\nThe user interrupted the execution of the program')
                        sys.exit(1)

        args.output_directory = self.evaluate_output_directory(args.output_directory)

        self.logger.info('parsed arguments:\n%s', pformat((vars(args))))
        return args

    def versions_compatibility_validating(self):
        """version of generator script requires the same or lesser version of parser script.
        if the parser script needs to fix a bug (and becomes, e.g. 1.0.1) and the generator script stays at 1.0.0.
        As long as the generator script is the same or greater major version, it should be parsable.
        This requires some level of backward compatibility. E.g. they have to be the same major version.

        """

        regex = r'(\d+\.\d+).(\d)'

        parser_origin = Parser().get_version
        parser_split = re.findall(regex, parser_origin).pop()
        generator_split = re.findall(regex, self.get_version).pop()

        parser_major = float(parser_split[0])
        generator_major = float(generator_split[0])

        if parser_major > generator_major:
            self.logger.critical('Generator (%s) requires the same or lesser version of Parser (%s)',
                                 self.get_version, parser_origin)
            sys.exit(1)

        self.logger.info('Parser type: %s, version %s,\tGenerator version %s',
                         basename(getfile(Parser().__class__)), parser_origin, self.get_version)

    def get_paths(self, file_name=ROOT.joinpath('paths.ini')):
        """
        :param file_name: path to file with Paths
        :return: namedtuple with Paths to key elements
        """
        data = {}
        try:
            with file_name.open('r') as file:
                for line in file:
                    if line.startswith('#'):
                        self.logger.warning('commented property %s, which will be skipped', line.strip())
                        continue
                    if re.match(r'^(\w+)\s?=\s?(.+)', line):
                        if len(line.split('=')) > 2:
                            self.logger.critical('can not evaluate value, too many separators %s', str(line))
                            sys.exit(1)
                        name, var = line.partition('=')[::2]
                        if name.strip() in data:
                            self.logger.critical('duplicate key %s', name)
                            sys.exit(1)
                        data[name.strip().lower()] = var.strip()
        except FileNotFoundError as message1:
            self.logger.critical(message1)
            sys.exit(1)

        missed = list(set(self.paths_named._fields) - set(data.keys()))
        if missed:
            self.logger.critical('in %s missed fields: %s ', file, str(missed))
            sys.exit(1)

        return self.paths_named(**data)

    def get_mappings(self, file_name=ROOT.joinpath('mapping.json')):
        """
        The key name in *.json is equal to property named in jinja2 templates
        :param file_name: path to file with manual mappings
        :return: dictionary with custom manual mappings
        """

        try:
            with file_name.open('r') as file:
                intermediate = file.readlines()
            return loads(''.join(intermediate))
        except (FileNotFoundError, JSONDecodeError) as message1:
            self.logger.error(message1)
            return {}

    def write_file(self, file_name, template, data):
        """
        Calling producer/transformer instance to transform initial Model to dict used in jinja2 templates.
        Applying transformed dict to jinja2 templates and writing to appropriate file
        :param file_name: output js file
        :param template: name of template
        :param data: transformed moder ready for apply to Jinja2 template
        """
        try:
            render = self.env.get_template(template).render(data)
            with file_name.open('w', encoding='utf-8') as file:
                file.write(render)
        except (TemplateNotFound, UndefinedError, AttributeError) as message1:
            self.logger.error('skipping %s, %s', file_name.as_posix(), message1)

    def process(self, directory, skip, overwrite, items, transformer):
        """
        Process each item from initial Model. According to provided arguments skipping, overriding or asking what to to.
        :param directory: output directory for writing output files
        :param skip: if file exist skip it
        :param overwrite: if file exist overwrite it
        :param items: elements initial Model
        :param transformer: producer/transformer instance
        """
        directory.mkdir(parents=True, exist_ok=True)
        for item in items.values():
            data = transformer.transform(item)
            if 'template' in data:
                template = data['template']
            else:
                template = type(item).__name__.lower() + '_template.js'
            file = directory.joinpath(data['name'] + '.js')
            self.process_common(skip, overwrite, file, template, data)

    def process_function_name(self, file, dir_name, skip, overwrite, functions, transformer, mappings):
        """
        :param file:
        :param dir_name:
        :param skip:
        :param overwrite:
        :param functions:
        :param transformer:
        :param mappings:
        :return:
        """
        if dir_name.startswith('..'):
            dir_name = dir_name[1:]

        creator = namedtuple('creator', 'function_name class_name type')
        data = {'name': file.stem, 'imports': [], 'cases': [], 'year': date.today().year, }

        grouped = [{'name': k, 'type': [x for x in v]} for k, v in groupby(functions.values(), key=lambda x: x.name)]

        for item in grouped:
            name = item['name']
            for func in item['type']:
                kind = func.message_type.name.capitalize()
                if kind == 'Response':
                    name += kind
                key = name + kind
                if key in mappings and 'name' in mappings[key]:
                    name = mappings[key]['name']
                data['imports'].append(transformer.imports(what=name, wherefrom='{}/{}.js'.format(dir_name, name)))
                if kind != 'Response':
                    data['cases'].append(creator(name, name, kind.upper()))
                elif kind == 'Response' and len(item['type']) == 1:
                    data['cases'].append(creator(item['name'], name, kind.upper()))

        self.process_common(skip, overwrite, file, file.stem + '_template.js', data)

    def process_common(self, skip, overwrite, file, template, data):
        """
        :param skip:
        :param overwrite:
        :param file:
        :param template:
        :param data:
        :return:
        """
        if file.is_file():
            if skip:
                self.logger.info('Skipping %s', file.name)
                return
            if overwrite:
                self.logger.info('Overriding %s', file.name)
                self.write_file(file, template, data)
            else:
                while True:
                    try:
                        confirm = input('File already exists {}. Overwrite? Y/Enter = yes, N = no\n'
                                        .format(file.name))
                        if confirm.lower() == 'y' or not confirm:
                            self.logger.info('Overriding %s', file.name)
                            self.write_file(file, template, data)
                            break
                        if confirm.lower() == 'n':
                            self.logger.info('Skipping %s', file.name)
                            break
                    except KeyboardInterrupt:
                        print('\nThe user interrupted the execution of the program')
                        sys.exit(1)
        else:
            self.logger.info('Writing new %s', file.name)
            self.write_file(file, template, data)

    def filter_pattern(self, interface, pattern):
        """
        :param interface: initial Model
        :param pattern: regex-pattern from command-line arguments to filter element from initial Model
        :return: initial Model
        """
        names = tuple(interface.enums.keys()) + tuple(interface.structs.keys())

        if pattern:
            match = {i: {} for i in vars(interface).keys()}
            match['params'] = interface.params
            empty = True
            for key, value in vars(interface).items():
                if key == 'params':
                    continue
                for name, item in value.items():
                    if re.match(pattern, item.name):
                        if hasattr(item, 'message_type'):
                            log = '{}/{} {} match with {}'.format(
                                key, item.name, item.message_type.name.title(), pattern)
                        else:
                            log = '{}/{} match with {}'.format(key, item.name, pattern)
                        self.logger.info(log)
                        if key in match:
                            match[key][name] = item
                            empty = False
            if empty:
                self.logger.warning('no one match with %s', pattern)
                sys.exit(0)
            return Interface(**match), names
        return interface, names

    @staticmethod
    def evaluate_instance_directory(dir_name):
        """
        :param dir_name: property from paths.ini (ENUMS|STRUCTS|FUNCTIONS)_DIR_NAME
        :return: substring after float dot
        """
        pattern = re.search(r'^([./]*)(.+)', dir_name)
        if pattern:
            return pattern.group(2)
        raise GenerateError('Can not evaluate directory {}'.format(dir_name))

    def main(self):
        """
        Entry point for parser and generator
        :return: None
        """
        args = self.get_parser()
        self.config_logging(args.verbose)
        self.env = args.templates_directory

        self.versions_compatibility_validating()

        paths = self.get_paths()

        try:
            interface = Parser().parse(args.source_xml, args.source_xsd)
        except ParseError as error1:
            self.logger.error(error1)
            sys.exit(1)

        filtered, names = self.filter_pattern(interface, args.regex_pattern)

        mappings = self.get_mappings()

        functions_transformer = FunctionsProducer(paths, names, mappings)
        if args.enums and filtered.enums:
            directory = args.output_directory.joinpath(self.evaluate_instance_directory(paths.enums_dir_name))
            self.process(directory, args.skip, args.overwrite, filtered.enums,
                         EnumsProducer(paths, mappings))
        if args.structs and filtered.structs:
            directory = args.output_directory.joinpath(self.evaluate_instance_directory(paths.structs_dir_name))
            self.process(directory, args.skip, args.overwrite, filtered.structs,
                         StructsProducer(paths, names, mappings))
        if args.functions and filtered.functions:
            directory = args.output_directory.joinpath(self.evaluate_instance_directory(paths.functions_dir_name))
            self.process(directory, args.skip, args.overwrite, filtered.functions, functions_transformer)
        self.process_function_name(args.output_directory.joinpath(paths.rpc_creator), paths.functions_dir_name,
                                   args.skip, args.overwrite, interface.functions, functions_transformer,
                                   mappings.get('functions', {}))


if __name__ == '__main__':
    Generator().main()
