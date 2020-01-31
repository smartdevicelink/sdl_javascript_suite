# Proxy Library RPC Generator

## Overview

This script provides the possibility to auto-generate JavaScript code based on a given SDL MOBILE_API XML specification.

## Requirements

The script requires Python 3.5 pre-installed in the system. This is the minimal Python 3 version that has not reached the end-of-life (https://devguide.python.org/devcycle/#end-of-life-branches).

Some required libraries are described in `requirements.txt` and should be pre-installed by the command:
```shell script
pip install -r requirements.txt
```
Please also make sure before usage the 'lib/rpc_spec' Git submodule is successfully initialized, because the script uses the XML parser provided there.

## Usage
```shell script
usage: generator.py [-h] [-v] [-xml SOURCE_XML] [-xsd SOURCE_XSD]
                    [-d OUTPUT_DIRECTORY] [-t [TEMPLATES_DIRECTORY]]
                    [-r REGEX_PATTERN] [--verbose] [-e] [-s] [-m] [-y] [-n]

Proxy Library RPC Generator

optional arguments:
  -h, --help            show this help message and exit
  -v, --version         print the version and exit
  -xml SOURCE_XML, --source-xml SOURCE_XML, --input-file SOURCE_XML
                        should point to MOBILE_API.xml
  -xsd SOURCE_XSD, --source-xsd SOURCE_XSD
  -d OUTPUT_DIRECTORY, --output-directory OUTPUT_DIRECTORY
                        define the place where the generated output should be
                        placed
  -t [TEMPLATES_DIRECTORY], --templates-directory [TEMPLATES_DIRECTORY]
                        path to directory with templates
  -r REGEX_PATTERN, --regex-pattern REGEX_PATTERN
                        only elements matched with defined regex pattern will
                        be parsed and generated
  --verbose             display additional details like logs etc
  -e, --enums           only specified elements will be generated, if present
  -s, --structs         only specified elements will be generated, if present
  -m, -f, --functions   only specified elements will be generated, if present
  -y, --overwrite       force overwriting of existing files in output
                        directory, ignore confirmation message
  -n, --skip            skip overwriting of existing files in output
                        directory, ignore confirmation message
```

# JavaScript ES6 Transformation rules

## Overview
These are the general transformation rules for RPC classes of SDL JavaScript Suite Library. The description of base classes, already included in the library, is not provided here, for details please view the source code. 

The JSDoc is used for inline documentation of generated code. All non-XML values should follow Architecture & Contribution Guidelines (GUIDELINES.md)

These rules based on the current `develop` branch state (commit:`c5b3b448e008dadc9a5b66addde17633ac957700`) of [`smartdevicelink/sdl_javascript_suite`](https://github.com/smartdevicelink/sdl_javascript_suite) repository.

## The License Header
All files should start from the comment with the license information.

```javascript
/*
* Copyright (c) [year], SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/
```
Where `[year]` in the copyright line is the current year.

## `<enum>`
Each Enum class should be stored as a single script file in the folder named `enums` and the name of the script file should be equal to the value from the `"name"` attribute of `<enum>` followed by the extension `.js`.

Example:
```shell script
enums/ImageType.js
```
The script should import the base Enum class and the produced class should extend it. The name of the class is the value from the `"name"` attribute of `<enum>`. The constructor has no params and should call `super()`.

The class should have the next JSDoc comment:
```javascript
/**
 * [description]
 * @typedef {Enum} [enum_name]
 * @property {Object} _MAP
 */
```
Where `[description]` is `<description>` of the current `<enum>`, if exists, and `[enum_name]` is the value of the `"name"` attribute.

The constructor should have the next JSDoc comment:
```javascript
/**
 * @constructor
 */
```

Example:
```javascript
import { Enum } from '_path_to_base_classes_/Enum.js';

/**
 * Contains information about the type of image.
 * @typedef {Enum} ImageType
 * @property {Object} _MAP
 */
class ImageType extends Enum {

    /**
     * @constructor
     */
    constructor() {
        super();
    }
}
```
The set of `<element>` should be mapped to the frozen object and put into the private static property `_MAP`. 

The following list are general rules for keys and values of this object:

1. The `"name"` attribute is the base value for both the key and the value of the mapped object.
2. In case if the `"internal_name"` attribute exists, this should be used for the key instead of the `"name"` attribute.
3. In case if the `"value"` attribute exists, this attribute should be used for the value instead of the `"name"` attribute.
4. In case if the `"hexvalue"` attribute exists, this attribute should be used for the value instead of the `"value"` and `"name"` attributes.
5. Uses of the "sync" prefix shall be replaced with "sdl" (where it would not break functionality). E.g. `SyncMsgVersion -> SdlMsgVersion`. This applies to member variables and their accessors. The key used when creating the RPC message JSON should match that of the RPC Spec.
6. The `_MAP` keys and static getters of the `FunctionID` enum shall not include the ID suffix. e.g. `RegisterAppInterfaceID -> RegisterAppInterface`.

According to ES6 standard, static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration.

Example:
```javascript
ImageType._MAP = Object.freeze({
    'STATIC': 'STATIC',
    'DYNAMIC': 'DYNAMIC',
});
```

For each `<element>` the static getter method should be defined in the class. The name of the getter is the `"internal_name"` or `"name"` attribute value, the same as `_MAP` keys. The returned value is the value from the frozen object described above taken by the corresponding key.

The getter should have the next JSDoc comment:
```javascript
/**
 * [description]
 * @return {[enum_type]}
 */
```
Where `[description]` is `<description>` of the current `<element>`, if exists, and `[enum_type]` is the one of `String` or `Number`.

Example:
```javascript
/**
 * @return {String}
 */
static get STATIC() {
    return ImageType._MAP.STATIC;
}

/**
 * @return {String}
 */
static get DYNAMIC() {
    return ImageType._MAP.DYNAMIC;
}
```
The base Enum class requires subclasses to override and implement the `valueForKey` method with one parameter named `"key"`. This implementation should return a given enumeration **`value`** if the provided **`key`** exists in the collection (otherwise `null`) using the _valueForKey(key) private method found in the base Enum class.

This method should have the next JSDoc comment:
```javascript
/**
 * A method for subclasses to implement that does what _keyForValue does
 * @param key - A primitive value to find the matching key for in the map of the subclass
 * @return {*} - Returns a key if found, or null if not found
 */
```

Example:
```javascript
/**
 * Get the value for the given enum key
 * @param key - A key to find in the map of the subclass
 * @return {*} - Returns a value if found, or null if not found
 */
static valueForKey (key) {
    return ImageType._valueForKey(key, ImageType._MAP);
}
```
Also the base Enum class requires subclasses to override and implement the `keyForValue` method with one parameter named `"value"`. This implementation should return a given enumeration **`key`** if the provided **`value`** exists in the collection (otherwise `null`) using the __keyForValue(value) private method found in the base Enum class.

This method should have the next JSDoc comment:
```javascript
/**
 * Get the key for the given enum value
 * @param value - A primitive value to find the matching key for in the map of the subclass
 * @return {*} - Returns a key if found, or null if not found
 */
```

Example:
```javascript
/**
 * Get the key for the given enum value
 * @param value - A primitive value to find the matching key for in the map of the subclass
 * @return {*} - Returns a key if found, or null if not found
 */
static keyForValue (value) {
    return ImageType._keyForValue(value, ImageType._MAP);
}
```
After the `_MAP` definition, the script should export the produced class.

Example:
```javascript
export { ImageType };
```

### Below are examples of `<enum>` with different `<element>` attributes


#### Example with only `"name"` attribute:

XML:
```xml
<enum name="ImageType" since="2.0">
    <description>Contains information about the type of image.</description>
    <element name="STATIC" />
    <element name="DYNAMIC" />
</enum>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { Enum } from '_path_to_base_classes_/Enum.js';

/**
 * Contains information about the type of image.
 * @typedef {Enum} ImageType
 * @property {Object} _MAP
 */
class ImageType extends Enum {
    /**
    * @constructor
    */
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get STATIC () {
        return ImageType._MAP.STATIC;
    }

    /**
     * @return {String}
     */
    static get DYNAMIC () {
        return ImageType._MAP.DYNAMIC;
    }

    /**
    * Get the value for the given enum key
    * @param value - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return ImageType._valueForKey(key, ImageType._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return ImageType._keyForValue(value, ImageType._MAP);
    }
}

ImageType._MAP = Object.freeze({
    'STATIC': 'STATIC',
    'DYNAMIC': 'DYNAMIC',
});

export { ImageType };
```

#### Example with `"internal_name"` and `"name"` attribute:

XML:
```xml
<enum name="VrCapabilities" since="1.0">
    <description>Contains information about the VR capabilities.</description>
    <element name="TEXT" internal_name="VR_TEXT"/>
</enum>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { Enum } from '_path_to_base_classes_/Enum.js';

/**
 * Contains information about the VR capabilities.
 * @typedef {Enum} VrCapabilities
 * @property {Object} _MAP
 */
class VrCapabilities extends Enum {
    constructor () {
        super();
    }

    /**
     * @return {String}
     */
    static get VR_TEXT () {
        return VrCapabilities._MAP.VR_TEXT;
    }

    /**
    * Get the value for the given enum key
    * @param key - A key to find in the map of the subclass
    * @return {*} - Returns a value if found, or null if not found
    */
    static valueForKey (key) {
        return VrCapabilities._valueForKey(key, VrCapabilities._MAP);
    }

    /**
    * Get the key for the given enum value
    * @param value - A primitive value to find the matching key for in the map of the subclass
    * @return {*} - Returns a key if found, or null if not found
    */
    static keyForValue (value) {
        return VrCapabilities._keyForValue(value, VrCapabilities._MAP);
    }
}

VrCapabilities._MAP = Object.freeze({
    'VR_TEXT': 'TEXT',
});

export { VrCapabilities };
```

#### Example with `"value"` attribute:

XML:
```xml
<enum name="PredefinedWindows" since="6.0">
    <element name="DEFAULT_WINDOW" value="0">
        <description>The default window is a main window pre-created on behalf of the app.</description>
    </element>
    <element name="PRIMARY_WIDGET" value="1">
        <description>The primary widget of the app.</description>
    </element>
</enum>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/
import { Enum } from '_path_to_base_classes_/Enum.js';

/**
 * @typedef {Enum} PredefinedWindows
 * @property {Object} _MAP
 */
class PredefinedWindows extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * The primary widget of the app.
     * @return {Number}
     */
    static get PRIMARY_WIDGET () {
        return PredefinedWindows._MAP.PRIMARY_WIDGET;
    }

    /**
     * The default window is a main window pre-created on behalf of the app.
     * @return {Number}
     */
    static get DEFAULT_WINDOW () {
        return PredefinedWindows._MAP.DEFAULT_WINDOW;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return PredefinedWindows._valueForKey(key, PredefinedWindows._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return PredefinedWindows._keyForValue(value, PredefinedWindows._MAP);
    }
}

PredefinedWindows._MAP = Object.freeze({
    'PRIMARY_WIDGET': 1,
    'DEFAULT_WINDOW': 0,
});

export { PredefinedWindows };
```

#### Example with `"hexvalue"` attribute:

XML:
```xml
<enum name="FunctionID" internal_scope="base" since="1.0">
    <description>Enumeration linking function names with function IDs in SmartDeviceLink protocol. Assumes enumeration starts at value 0.</description>
    <element name="RESERVED" value="0" since="1.0" />
    <element name="RegisterAppInterfaceID" value="1" hexvalue="1" since="1.0" />
    <element name="SliderID" value="26" hexvalue="1A" since="2.0" />
</enum>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/
import { Enum } from '_path_to_base_classes_/Enum.js';

/**
 * Enumeration linking function names with function IDs in SmartDeviceLink protocol. Assumes enumeration starts at value 0.
 * @typedef {Enum} FunctionID
 * @property {Object} _MAP
 */
class FunctionID extends Enum {
    /**
     * @constructor
     */
    constructor () {
        super();
    }

    /**
     * @return {Number}
     */
    static get RESERVED () {
        return FunctionID._MAP.RESERVED;
    }

    /**
     * @return {Number}
     */
    static get RegisterAppInterface () {
        return FunctionID._MAP.RegisterAppInterface;
    }

    /**
     * @return {Number}
     */
    static get Slider () {
        return FunctionID._MAP.Slider;
    }

    /**
     * Get the value for the given enum key
     * @param key - A key to find in the map of the subclass
     * @return {*} - Returns a value if found, or null if not found
     */
    static valueForKey (key) {
        return FunctionID._valueForKey(key, FunctionID._MAP);
    }

    /**
     * Get the key for the given enum value
     * @param value - A primitive value to find the matching key for in the map of the subclass
     * @return {*} - Returns a key if found, or null if not found
     */
    static keyForValue (value) {
        return FunctionID._keyForValue(value, FunctionID._MAP);
    }
}

FunctionID._MAP = Object.freeze({
    'RESERVED': 0x0,
    'RegisterAppInterface': 0x1,
    'Slider': 0x1A,
});

export { FunctionID };
```

## `<struct>`
Each Struct class should be stored as a single script file in the folder named `structs` and the name of the script file should be equal to the value from the `"name"` attribute of `<struct>` following by the extension `.js`.

Example:
```shell script
structs/VehicleDataResult.js
```

The script should import the base `RpcStruct` class and the produced class should extend it. The name of the class is the value from the `"name"` attribute of `<struct>`. 

The script should also import any Enum and Struct classes, that are used in the represented structure. 

The constructor has one parameter named `parameters` to pass the JavaScript object with initial values of the represented structure and should call `super(parameters)` to pass this object into the base class.

The class should have the next JSDoc comment:
```javascript
/**
 * [description]
 */
```
Where `[description]` is `<description>` of the current `<struct>`, if exists.

The constructor should have the next JSDoc comment:
```javascript
/**
 * @constructor
 */
```

Example:
```javascript
import { RpcStruct } from '_path_to_base_classes_/RpcStruct.js';
import { VehicleDataType } from '../enums/VehicleDataType.js';
import { VehicleDataResultCode } from '../enums/VehicleDataResultCode.js';

/**
 * Individual published data request result
 */
class VehicleDataResult extends RpcStruct {

    /**
     * @constructor
     */
    constructor(parameters) {
        super(parameters);
    }
}
```

The set of `<param>` should be mapped to the static properties of the new class by following rules:

1. The name of the property is the `SCREAMING_SNAKE_CASE` formatted value of the `"name"` attribute of `<param>` with the `KEY_` prefix.
2. The value of the property is the value of the `"name"` attribute of `<param>`
3. Uses of the "sync" prefix shall be replaced with "sdl" (where it would not break functionality). E.g. `KEY_SYNC_MSG_VERSION -> KEY_SDL_MSG_VERSION`. This applies to member variables and their accessors. The key used when creating the RPC message JSON should match that of the RPC Spec.

According to ES6 standard, static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration.

Example:
```javascript
VehicleDataResult.KEY_DATA_TYPE = 'dataType';
VehicleDataResult.KEY_RESULT_CODE = 'resultCode';
VehicleDataResult.KEY_OEM_CUSTOM_DATA_TYPE = 'oemCustomDataType';
```

For each `<param>` the getter and setter methods should be defined in the class:

1. The name of the getter is the `PascalCase` formatted value of the `"name"` attribute with the `get` prefix, for the setter the prefix should be `set`.
2. Uses of the "sync" prefix shall be replaced with "sdl" (where it would not break functionality). E.g. `SyncMsgVersion -> SdlMsgVersion`. This applies to member variables and their accessors. The key used when creating the RPC message JSON should match that of the RPC Spec.
3. If the `<param>` has the `"type"` attribute value as one of `Boolean`, `Float`, `Integer`, `String`:
    * The getter should call and return the result of the `this.getParameter` method, where the single parameter is the value of the corresponding static property described above; 
    * The setter should call the `this.setParameter` method, where the first parameter is the value of the corresponding static property described above, the second is the value passed into setter;
    * The setter should return `this` instance to support the chaining.
4. If the `<param>` has the `"type"` attribute value as the one of `<enum>` or `<struct>` name:
    * The getter should call and return the result of the `this.getObject` method, where the first parameter is the corresponding Struct or Enum class, the second is the value of the corresponding static property described above; 
    * The setter should validate the received value by calling the `this.validateType` method, where the fist parameter is the Struct or Enum class corresponding to the `"type"` attribute value of `<param>`, the second is the value itself;
    * The setter should call the `this.setParameter` method, where the first parameter is the value of the corresponding static property described above, the second is the value passed into setter;
    * The setter should return `this` instance to support the chaining.

The setter should have the next JSDoc comment:
```javascript
/**
 * @param {[param_type]} [value_name] [description]
 * @return {[struct_name]}
 */
```
Where `[param_type]` is the `"type"` attribute, `[value_name]` is the lowercase last part of the `"name"` attribute, `[description]` is `<description>` of the current `<param>`, if exists, and `[struct_name]` is the `"name"` attribute of the current Struct.

The getter should have the next JSDoc comment:
```javascript
/**
 * @return {[param_type]}
 */
```
Where `[param_type]` is the `"type"` attribute of the current `<param>`.


Examples:
```javascript
/**
 * @param {VehicleDataType} type  Defined published data element type.
 * @return {VehicleDataResult}
 */
setDataType(type) {
    this.validateType(VehicleDataType, type);
    this.setParameter(VehicleDataResult.KEY_DATA_TYPE, type);
    return this;
}
 
/**
 * @return {VehicleDataType}
 */
getDataType() {
    return this.getObject(VehicleDataType, VehicleDataResult.KEY_DATA_TYPE);
}

/**
 * @param {String} type  Type of requested oem specific parameter
 * @return {VehicleDataResult}
 */
setOemCustomDataType(type) {
    this.setParameter(VehicleDataResult.KEY_OEM_CUSTOM_DATA_TYPE, type);
    return this;
}
 
/**
 * @return {String}
 */
getOemCustomDataType() {
    return this.getParameter(VehicleDataResult.KEY_OEM_CUSTOM_DATA_TYPE);
}
```

After the static properties definition, the script should export the produced class.

Example:
```javascript
export { VehicleDataResult };
```

### Below is the full example of the Struct class with simple and Enum parameters inside:

XML:
```xml
<struct name="VehicleDataResult" since="2.0">
    <description>Individual published data request result</description>
    <param name="dataType" type="VehicleDataType" mandatory="true">
        <description>Defined published data element type.</description>
    </param>
    <param name="resultCode" type="VehicleDataResultCode" mandatory="true">
        <description>Published data result code.</description>
    </param>
    <param name="oemCustomDataType" type="String" mandatory="false" since="6.0">
        <description>Type of requested oem specific parameter </description>
    </param>
</struct>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { RpcStruct } from '_path_to_base_classes_/RpcStruct.js';
import { VehicleDataType } from '../enums/VehicleDataType.js';
import { VehicleDataResultCode } from '../enums/VehicleDataResultCode.js';

/**
 * Individual published data request result
 */
class VehicleDataResult extends RpcStruct {
    /**
     * @constructor
     */
    constructor (parameters) {
        super(parameters);
    }

    /**
     * @param {VehicleDataType} type - Defined published data element type.
     * @return {VehicleDataResult}
     */
    setDataType (type) {
        this.validateType(VehicleDataType, type);
        this.setParameter(VehicleDataResult.KEY_DATA_TYPE, type);
        return this;
    }

    /**
     * @return {VehicleDataType}
     */
    getDataType () {
        return this.getObject(VehicleDataType, VehicleDataResult.KEY_DATA_TYPE);
    }

    /**
     * @param {VehicleDataResultCode} code - Published data result code.
     * @return {VehicleDataResult}
     */
    setResultCode (code) {
        this.validateType(VehicleDataResultCode, code);
        this.setParameter(VehicleDataResult.KEY_RESULT_CODE, code);
        return this;
    }

    /**
     * @return {VehicleDataResultCode}
     */
    getResultCode () {
        return this.getObject(VehicleDataResultCode, VehicleDataResult.KEY_RESULT_CODE);
    }

    /**
     * @param {String} type - Type of requested oem specific parameter
     * @return {VehicleDataResult}
     */
    setOemCustomDataType (type) {
        this.setParameter(VehicleDataResult.KEY_OEM_CUSTOM_DATA_TYPE, type);
        return this;
    }

    /**
     * @return {String}
     */
    getOemCustomDataType () {
        return this.getParameter(VehicleDataResult.KEY_OEM_CUSTOM_DATA_TYPE);
    }
}

VehicleDataResult.KEY_DATA_TYPE = 'dataType';
VehicleDataResult.KEY_RESULT_CODE = 'resultCode';
VehicleDataResult.KEY_OEM_CUSTOM_DATA_TYPE = 'oemCustomDataType';

export { VehicleDataResult };
```

## `<function>`

Each Function class should be stored as a single script file in the folder named `messages` and the name of the script is the value from the `"name"` attribute of `<function>` (followed by additional suffix `Response` if the `"messagetype"` attribute is set to `response`) followed by the extension `.js`.

Example:
```shell script
messages/AddCommand.js
messages/AddCommandResponse.js
messages/OnLanguageChange.js
```

There are some prerequisites for the Function class:

1. Based on the value of the `"messagetype"` attribute of `<function>`, the script should import the base class `RpcRequest`, `RpcResponse` or `RpcNotification` class and the produced class should extend the imported base class.
2. The script should import `enums/FunctionID.js` to get the `functionID` hex value of the current RPC function. The key of the required `<element>` of `FunctionID` enum is the value of the `"functionID"` attribute of `<function>`.
3. The script should import all Enum and Struct classes, that are used by the representing function. 
4. The name of the class is the value from the `"name"` attribute of `<function>` (followed by additional suffix `Response` if the `"messagetype"` attribute is set to `response`), e.g. `AddCommand`, `AddCommandResponse`, `OnLanguageChange`. 
5. The constructor has one parameter named `store` to pass the JavaScript object with initial values of the function params and should call `super(store)` to pass this object into the parent class.
6. The constructor should call `this.setFunctionName` method with the correspond `FunctionID` value described in the point 2, e.g. `FunctionID.AddCommandID`.

The class should have the next JSDoc comment:
```javascript
/**
 * [description]
 */
```
Where `[description]` is `<description>` of the current `<function>`, if exists.

The constructor should have the next JSDoc comment:
```javascript
/**
 * @constructor
 */
```

Example:
```javascript
import { RpcRequest } from '_path_to_base_classes_/RpcRequest.js';
import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../enums/Image.js';
import { MenuParams } from '../enums/MenuParams.js';
 
/**
 * Adds a command to the in application menu. Either menuParams or vrCommands must be provided.
 */
class AddCommand extends RpcRequest {

    /**
     * @constructor
     */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.AddCommandID);
    }
}
```

Example:
```javascript
import { RpcResponse } from '_path_to_base_classes_/RpcResponse.js';
import { FunctionID } from '../enums/FunctionID.js';

class AddCommandResponse extends RpcResponse {
 
    /**
     * @constructor
     */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.AddCommandID);
    }
}
```

Example:
```javascript
import { RpcNotification } from '_path_to_base_classes_/RpcNotification.js';
import { FunctionID } from '../enums/FunctionID.js';
import { Language } from '../enums/Language.js';
import { MenuParams } from '../enums/MenuParams.js';
 
class OnLanguageChange extends RpcNotification {

    /**
     * @constructor
     */
    constructor(store) {
        super(store);
        this.setFunctionName(FunctionID.OnLanguageChangeID);
    }
}
```

The set of `<param>` should be mapped to the static properties of the new class by following rules:

1. The name of the property is the `SCREAMING_SNAKE_CASE` formatted value of the `"name"` attribute of `<param>` with the `KEY_` prefix.
2. Uses of the "sync" prefix shall be replaced with "sdl" (where it would not break functionality). E.g. `SyncMsgVersion -> SdlMsgVersion`. This applies to member variables and their accessors. The key used when creating the RPC message JSON should match that of the RPC Spec.
3. The value of the property is the value of the "name" attribute of <param>
4. The exclusion are `<param>` with name `success`, `resultCode` and `info` of `<function>` with the attribute `messagetype="response"`, in this case they should be omitted.

According to ES6 standard, static (class-side) data properties and prototype data properties must be defined outside of the ClassBody declaration.

Example:
```javascript
AddCommand.KEY_CMD_ID = 'cmdID';
OnLanguageChange. KEY_LANGUAGE = 'language';
OnLanguageChange.KEY_HMI_DISPLAY_LANGUAGE = 'hmiDisplayLanguage';
```

For each `<param>` the getter and setter methods should be defined in the class:

1. The name of the getter is the `PascalCase` formatted value of the `"name"` attribute with the `get` prefix, for the setter the prefix should be `set`.
2. If the `<param>` has the `"type"` attribute value as one of `Boolean`, `Float`, `Integer`, `String`:
    * The getter should call and return the result of the `this.getParameter` method, where the single parameter is the value of the corresponding static property described above; 
    * The setter should call the `this.setParameter` method, where the first parameter is the value of the corresponding static property described above, the second is the value passed into setter;
    * The setter should return `this` instance to support the chaining.
3. If the `<param>` has the `"type"` attribute value as the one of `<enum>` or `<struct>` name:
    * The getter should call and return the result of the `this.getObject` method, where the first parameter is the corresponding Struct or Enum class, the second is the value of the corresponding static property described above; 
    * The setter should validate the received value by calling the `this.validateType` method, where the fist parameter is the Struct or Enum class corresponding to the `"type"` attribute value of `<param>`, the second is the value itself;
    * The setter should call the `this.setParameter` method, where the first parameter is the value of the corresponding static property described above, the second is the value passed into setter;
    * The setter should return `this` instance to support the chaining.
4. The exclusion are `<param>` with name `success`, `resultCode` and `info` of `<function>` with the attribute `messagetype="response"`, in this case they should be omitted.

The setter should have the next JSDoc comment:
```javascript
/**
 * @param {[param_type]} [value_name] [description]
 * @return {[struct_name]}
 */
```
Where `[param_type]` is the `"type"` attribute, `[value_name]` is the lowercase last part of the `"name"` attribute, `[description]` is `<description>` of the current `<param>`, if exists, and `[struct_name]` is the `"name"` attribute of the current Struct.

The getter should have the next JSDoc comment:
```javascript
/**
 * @return {[param_type]}
 */
```
Where `[param_type]` is the `"type"` attribute of the current `<param>`.

Example:
```javascript
/**
 * @param {Number} cmdid  unique ID of the command to add.
 * @return {AddCommand}
 */
setCmdID(id) {
    this.setParameter(AddCommand.KEY_CMD_ID, id);
    return this;
}
 
/**
 * @return {Number}
 */
getCmdID() {
    return this.getParameter(AddCommand.KEY_CMD_ID);
}
 
/**
 * @param {MenuParams} params  Optional sub value containing menu parameters
 * @return {AddCommand}
 */
setMenuParams(menuParams) {
    this.validateType(MenuParams, menuParams);
    this.setParameter(AddCommand.KEY_MENU_PARAMS, menuParams);
    return this;
}
 
/**
 * @return {MenuParams}
 */
getMenuParams() {
    return this.getObject(MenuParams, AddCommand.KEY_MENU_PARAMS);
}
 
/**
 * @param {Language} language  Current display language
 * @return {OnLanguageChange}
 */
setHmiDisplayLanguage(language) {
    this.validateType(Language, language);
    this.setParameter(OnLanguageChange.KEY_HMI_DISPLAY_LANGUAGE, language);
    return this;
}
   
/**
 * @return {Language}
 */
getHmiDisplayLanguage() {
    return this.getObject(Language, OnLanguageChange.KEY_HMI_DISPLAY_LANGUAGE);
}
```

After the static properties definition, the script should export the produced class.

Example:
```javascript
export { AddCommand };
```

### Below are full examples for Request, Response and Notification.
#### Request Example:

XML:
```xml
<function name="AddCommand" functionID="AddCommandID" messagetype="request" since="1.0">
    <description>
        Adds a command to the in application menu.
        Either menuParams or vrCommands must be provided.
    </description>
     
    <param name="cmdID" type="Integer" minvalue="0" maxvalue="2000000000" mandatory="true">
        <description>unique ID of the command to add.</description>
    </param>
     
    <param name="menuParams" type="MenuParams" mandatory="false">
        <description>Optional sub value containing menu parameters</description>
    </param>
     
    <param name="vrCommands" type="String" minsize="1" maxsize="100" maxlength="99" array="true" mandatory="false">
        <description>
            An array of strings to be used as VR synonyms for this command.
            If this array is provided, it may not be empty.
        </description>
    </param>
     
    <param name="cmdIcon" type="Image" mandatory="false" since="2.0">
        <description>
            Image struct determining whether static or dynamic icon.
            If omitted on supported displays, no (or the default if applicable) icon shall be displayed.
        </description>
    </param>
     
</function>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { RpcRequest } from '_path_to_base_classes_/RpcRequest.js';
import { FunctionID } from '../enums/FunctionID.js';
import { Image } from '../structs/Image.js';
import { MenuParams } from '../structs/MenuParams.js';

/**
 * Adds a command to the in application menu. Either menuParams or vrCommands must be provided.
 */
class AddCommand extends RpcRequest {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.AddCommand);
    }

    /**
     * @param {Number} id - unique ID of the command to add.
     * @return {AddCommand}
     */
    setCmdID (id) {
        this.setParameter(AddCommand.KEY_CMD_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getCmdID () {
        return this.getParameter(AddCommand.KEY_CMD_ID);
    }

    /**
     * @param {MenuParams} params - Optional sub value containing menu parameters
     * @return {AddCommand}
     */
    setMenuParams (params) {
        this.validateType(MenuParams, params);
        this.setParameter(AddCommand.KEY_MENU_PARAMS, params);
        return this;
    }

    /**
     * @return {MenuParams}
     */
    getMenuParams () {
        return this.getObject(MenuParams, AddCommand.KEY_MENU_PARAMS);
    }

    /**
     * @param {Array<String>} commands - An array of strings to be used as VR synonyms for this command. If this array
     *                                   is provided, it may not be empty.
     * @return {AddCommand}
     */
    setVrCommands (commands) {
        this.setParameter(AddCommand.KEY_VR_COMMANDS, commands);
        return this;
    }

    /**
     * @return {Array<String>}
     */
    getVrCommands () {
        return this.getParameter(AddCommand.KEY_VR_COMMANDS);
    }

    /**
     * @param {Image} icon - Image struct determining whether static or dynamic icon. If omitted on supported displays,
     *                       no (or the default if applicable) icon shall be displayed.
     * @return {AddCommand}
     */
    setCmdIcon (icon) {
        this.validateType(Image, icon);
        this.setParameter(AddCommand.KEY_CMD_ICON, icon);
        return this;
    }

    /**
     * @return {Image}
     */
    getCmdIcon () {
        return this.getObject(Image, AddCommand.KEY_CMD_ICON);
    }
}

AddCommand.KEY_CMD_ID = 'cmdID';
AddCommand.KEY_MENU_PARAMS = 'menuParams';
AddCommand.KEY_VR_COMMANDS = 'vrCommands';
AddCommand.KEY_CMD_ICON = 'cmdIcon';

export { AddCommand };
```

#### Response Example:

> Please pay attention that no other parameters for this example except "info", "success" and "resultCode", thus they were omitted and only the constructor and other parameters are present)

XML:
```xml
<function name="PerformInteraction" functionID="PerformInteractionID" messagetype="response" since="1.0">
    <param name="success" type="Boolean" platform="documentation" mandatory="true">
        <description> true if successful; false, if failed </description>
    </param>
    
    <param name="resultCode" type="Result" platform="documentation" mandatory="true">
        <description>See Result</description>
        <element name="SUCCESS"/>
        <element name="INVALID_DATA"/>
        <element name="OUT_OF_MEMORY"/>
        <element name="TOO_MANY_PENDING_REQUESTS"/>
        <element name="APPLICATION_NOT_REGISTERED"/>
        <element name="GENERIC_ERROR"/>
        <element name="REJECTED"/>
        <element name="INVALID_ID"/>
        <element name="DUPLICATE_NAME"/>
        <element name="TIMED_OUT"/>
        <element name="ABORTED"/>
        <element name="UNSUPPORTED_RESOURCE"/>
        <element name="WARNINGS"/>
    </param>
    
    <param name="info" type="String" maxlength="1000" mandatory="false" platform="documentation">
        <description>Provides additional human readable info regarding the result.</description>
    </param>
    
    <param name="choiceID" type="Integer" minvalue="0" maxvalue="2000000000" mandatory="false">
        <description>
            ID of the choice that was selected in response to PerformInteraction.
            Only is valid if general result is "success:true".
        </description>
    </param>
    
    <param name="manualTextEntry" type="String" maxlength="500" mandatory="false" since="3.0">
        <description>
            Manually entered text selection, e.g. through keyboard
            Can be returned in lieu of choiceID, depending on trigger source
        </description>
    </param>
    
    <param name="triggerSource" type="TriggerSource" mandatory="false">
        <description>
            See TriggerSource
            Only is valid if resultCode is SUCCESS.
        </description>
    </param>
    
</function>
```

The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { RpcResponse } from '_path_to_base_classes_/RpcResponse.js';
import { FunctionID } from '../enums/FunctionID.js';
import { TriggerSource } from '../enums/TriggerSource.js';

class PerformInteractionResponse extends RpcResponse {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.PerformInteraction);
    }

    /**
     * @param {Number} id - ID of the choice that was selected in response to PerformInteraction. Only is valid if
     *                      general result is "success:true".
     * @return {PerformInteractionResponse}
     */
    setChoiceID (id) {
        this.setParameter(PerformInteractionResponse.KEY_CHOICE_ID, id);
        return this;
    }

    /**
     * @return {Number}
     */
    getChoiceID () {
        return this.getParameter(PerformInteractionResponse.KEY_CHOICE_ID);
    }

    /**
     * @param {String} entry - Manually entered text selection, e.g. through keyboard Can be returned in lieu of
     *                         choiceID, depending on trigger source
     * @return {PerformInteractionResponse}
     */
    setManualTextEntry (entry) {
        this.setParameter(PerformInteractionResponse.KEY_MANUAL_TEXT_ENTRY, entry);
        return this;
    }

    /**
     * @return {String}
     */
    getManualTextEntry () {
        return this.getParameter(PerformInteractionResponse.KEY_MANUAL_TEXT_ENTRY);
    }

    /**
     * @param {TriggerSource} source - See TriggerSource Only is valid if resultCode is SUCCESS.
     * @return {PerformInteractionResponse}
     */
    setTriggerSource (source) {
        this.validateType(TriggerSource, source);
        this.setParameter(PerformInteractionResponse.KEY_TRIGGER_SOURCE, source);
        return this;
    }

    /**
     * @return {TriggerSource}
     */
    getTriggerSource () {
        return this.getObject(TriggerSource, PerformInteractionResponse.KEY_TRIGGER_SOURCE);
    }
}

PerformInteractionResponse.KEY_CHOICE_ID = 'choiceID';
PerformInteractionResponse.KEY_MANUAL_TEXT_ENTRY = 'manualTextEntry';
PerformInteractionResponse.KEY_TRIGGER_SOURCE = 'triggerSource';

export { PerformInteractionResponse };
```
#### Notification Example:
XML:
```xml
<function name="OnLanguageChange" functionID="OnLanguageChangeID" messagetype="notification" since="2.0">
    <param name="language" type="Language" mandatory="true">
        <description>Current SDL voice engine (VR+TTS) language</description>
    </param>
    <param name="hmiDisplayLanguage" type="Language" mandatory="true">
        <description>Current display language</description>
    </param>
</function>
```
The Output:
```javascript
/*
* Copyright (c) 2019, SmartDeviceLink Consortium, Inc.
* All rights reserved.
*
* Redistribution and use in source and binary forms, with or without
* modification, are permitted provided that the following conditions are met:
*
* Redistributions of source code must retain the above copyright notice, this
* list of conditions and the following disclaimer.
*
* Redistributions in binary form must reproduce the above copyright notice,
* this list of conditions and the following
* disclaimer in the documentation and/or other materials provided with the
* distribution.
*
* Neither the name of the SmartDeviceLink Consortium Inc. nor the names of
* its contributors may be used to endorse or promote products derived
* from this software without specific prior written permission.
*
* THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
* AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
* IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
* ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
* LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
* CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
* SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
* INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
* CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
* ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
* POSSIBILITY OF SUCH DAMAGE.
*/

import { RpcNotification } from '_path_to_base_classes_/RpcNotification.js';
import { FunctionID } from '../enums/FunctionID.js';
import { Language } from '../enums/Language.js';

class OnLanguageChange extends RpcNotification {
    /**
     * @constructor
     */
    constructor (store) {
        super(store);
        this.setFunctionName(FunctionID.OnLanguageChange);
    }

    /**
     * @param {Language} language - Current SDL voice engine (VR+TTS) language
     * @return {OnLanguageChange}
     */
    setLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(OnLanguageChange.KEY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getLanguage () {
        return this.getObject(Language, OnLanguageChange.KEY_LANGUAGE);
    }

    /**
     * @param {Language} language -  Current display language
     * @return {OnLanguageChange}
     */
    setHmiDisplayLanguage (language) {
        this.validateType(Language, language);
        this.setParameter(OnLanguageChange.KEY_HMI_DISPLAY_LANGUAGE, language);
        return this;
    }

    /**
     * @return {Language}
     */
    getHmiDisplayLanguage () {
        return this.getObject(Language, OnLanguageChange.KEY_HMI_DISPLAY_LANGUAGE);
    }
}

OnLanguageChange.KEY_LANGUAGE = 'language';
OnLanguageChange.KEY_HMI_DISPLAY_LANGUAGE = 'hmiDisplayLanguage';

export { OnLanguageChange };
```

# Custom mapping

## Overview

There are cases named `edge cases` when it is not possible to get the required info from XML or some manual additions are required in generated classes. For that purpose the generator includes the custom mapping file `mapping.json` that allows to add required customizations.

## Structure

The customization script contains the JSON object. Below is the schema:

```json
{
    ["enums"|"structs"|"functions"]: {
        [enum_name|struct_name|function_name]: {
            [element_name|param_name]: {
                "-methods": {},
                "methods": {
                    "method_title": [custom_method_title],
                    "key": [custom_key_name],
                    "description": [custom_description]
                },
                "params": {
                    "key": [custom_key_name]
                    "value": [custom_value]
                },
            },
            "params": [
                {
                    "key": [custom_param_name],
                    "value": [custom_param_value]
                }
            ],
            "script": [path_to_custom_code]
        }
    }
}
```

Root keys in the structure are `"enums"`, `"structs"` and `"functions"`. The key on the next level is the corresponding name of required `<enum>`, `<struct>` or `<function>`. On the next level, the name of `<element>` or `<param>` is expected. Also, at this level, it is possible to add any custom code into class from the file via the `script` key and to add custom params to class properties via an array from `params` key. See the detailed description below.

The mapping object does not provide the possibility to create brand new `<enum>`, `<struct>` or `<function>`, and their child elements in this way. The customization is allowed only for existing XML elements, unexisting names of elements and their child elements defined int the mapping object will be ignored.

## Adding the custom code
As described above the custom code could be added via `script` key. The value of this key should be the path to the file. The code will be included as-is directly into the class, therefore only comments and method definitions are allowed in this file.

Example:
```json
{
    "functions": {
        "PutFileRequest": {
            "script": "templates/scripts/PutFileRequest.js"
        }
    }
}
```

The content of the `templates/scripts/PutFileRequest.js` file is:
```javascript
// ------ Not part of the RPC spec itself -----

/**
 * @param {Uint8Array} fileData
 * @return {PutFile}
 */
setFileData(fileData) {
    this.setBulkData(fileData);
    return this;
}
/**
 * @return {Uint8Array}
 */
getFileData() {
    return this.getBulkData();
}

//----------------- END -----------------------
```
This code will be included into `PutFileRequest` class of the `messages/PutFileRequest.js` file as-is.

## Adding custom parameters
As described above the custom code could be added via `params` key. The value of this key should be the array of objects. Each that object should include `key` and `value` properties for defining the name and the value of the new parameter.

Following example demonstrates the object and the code that will be generated for Enums and Structs/Functions:
```json
{
    "key": "APP_ID_MAX_LENGTH",
    "value": 10
}
```

In Enums this will produce the new property in the static `_MAP` object
```javascript
_EnumClass_._MAP = Object.freeze({
    // ...,
    'APP_ID_MAX_LENGTH': 10,
    // ...
});
```

In Structs/Functions this will produce the new static property
```javascript
// ...
_StructClass_.APP_ID_MAX_LENGTH = 10;
// ...
```
```javascript
// ...
_FunctionClass_.APP_ID_MAX_LENGTH = 10;
// ...
```

## Customization the `<element>` of `<enum>` or the `<param>` of `<struct>`/`<function>`
In order of this customization it is possible to change the name and description of getter/setter methods and the name and value of corresponding static property. Additionally it is possible to remove getter/setter methods.

### Changing the name and description of getter/setter methods
To change the name and description of getter/setter methods it needs to define `methods.method_title` value.

Example:
```json
{
    "enums": {
        "AudioType": {
            "PCM": {
                "methods": {
                    "method_title": "Wave",
                    "description": "Linear Wave!"
                }
            }
        }
    }
}
```

This will replace the `PCM` method name to `Wave` and `Linear PCM.` description to `Linear Wave!`, please pay attention the `_MAP` still has the `PCM` key.
```javascript
     /*
     * Linear Wave!
     * @return {String}
     */
    static get Wave () {
        return AudioType._MAP.PCM;
    }
```

### Changing the name and value of corresponding static property
To change the name of corresponding static property it needs to define `params.key` value.

To change the value of corresponding static property it needs to define `params.value` value.

Example:
```json
{
    "enums": {
        "AudioType": {
            "PCM": {
                "methods": {
                    "key": "Wave"
                },
                "params": {
                    "key": "Wave",
                    "value": "NEW_PCM"
                }
            }
        }
    }
}
```

The result will the following. Please pay attention that in case if the name of the static property was changed, you should also define the same `methods.key` value, otherwise the key will be unchanged in getter/setter methods.
```javascript

class AudioType extends Enum {
// ...
     /*
     * Linear PCM.
     * @return {String}
     */
    static get PCM () {
        return AudioType._MAP.Wave; // will be old `AudioType._MAP.PCM` if `methods.key` is not defined
    }
// ...
}

AudioType._MAP = Object.freeze({
    // ...,
    'Wave': "NEW_PCM", // old key/value PCM: "PCM"
    // ...
});
```

### Removing getter/setter methods
To remove getter/setter methods it needs to define `-methods` key, the value of this key doesn't matter.

Example:
```json
{
    "enums": {
        "AudioType": {
            "PCM": {
                "-methods": {}
            }
        }
    }
}
```

This will remove `static get PCM` method from the class and only the `_MAP` key/value will be generated.
