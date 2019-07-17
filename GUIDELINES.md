# Architecture & Contribution Guidelines
Note: This is a living document managed by the SDL Project Maintainer and may change as new questions and/or discoveries arise during technical implementation.

### File Structure

#### Common Library
Common library files shall be stored in the `/lib/js` directory, grouped into subdirectories by their logic type (e.g. protocol, transport, session, rpc, manager, util), similar to the Java Suite.

#### Node.js Library
Node.js library files shall be stored in the `/lib/node` directory, grouped into subdirectories in the same way as common files.

#### Example Projects
Example projects shall be located in the `/examples/js` and `/examples/node` directories, respectively.


### Object-oriented Programming
- Concepts must be broken down into classes for an object-oriented programming methodology.
- Although ECMAScript does not yet officially support private properties, properties shall be named with an underscore prefix to avoid conflict with getters and setters and to allow for an easy transition to private properties when they become available.
- Rather than promoting the direct manipulation of property values, the use of prefixed `get` and `set` methods shall be used. For example: `setMajor(major)` and `getMajor()`.
- All `set` methods should return `this` in order to support method chaining.
- Classes must contain a constructor, but the constructor _should not_ contain parameter type/value checking as a workaround for method overloading. For example, a semantic versioning class should have a constructor which accepts 3 parameters (major, minor, patch) and assigned to properties of the same/similar names prefixed with `_`. To also allow a semantic version string (e.g. "2.1.3") as input, a new `fromString(version)` method should be added to the class definition which parses the string and sets the proper `_major`, `_minor`, and `_patch` properties. See `/lib/js/util/Version.js` in the repository for an example.
- Constructor parameters should be optional in most cases to support utilizing class methods as a helper without the need to initialize an instance with valid parameters.


### Enumerations
Since JavaScript does not offer traditional enumerations, an abstract `Enum` class has been defined (see `/lib/js/util/Enum.js`) which shall be extended for the purpose of creating new enumerations. Each extended enumeration class must be named with the suffix `Type`, contain a constructor which calls `super()`, use ES6-style getters as `static` methods to support simple dot-access notation, and contain a `static valueForString(value)` method which returns a given enumeration **value** (not key) if it exists in the collection (otherwise `null`). See `/lib/js/transport/enums/TransportType.js` for an example.

### Module Exports & Imports

#### Common
All common files (that is, files strictly built upon ECMA-Script 2017) shall export their components via the named convention (e.g. `export { BaseTransport };`). Likewise, imports shall always use the named convention and use relative file paths (e.g. `import { BaseTransport } from '../transport/BaseTransport.js';`).

#### Node.js
For development purposes, Node.js shall utilize the `esm` NPM module to support the common library's `import { Name } from '...'` syntax without the need for a build/transpiling process. The module is included in `/examples/node/hello-sdl/package.json` and the corresponding `npm start` command is configured to use the module upon start-up. Prior to official release, a build process may be determined by the Project Maintainer and implemented to eliminate the `esm` dependency for third-party developers.

For Node.js-specific components, ES module syntax shall be used. For example, `module.exports = WebsocketServer;` for exports; `const WebsocketServer = require('../transport/WebsocketServer.js');` for imports. See `/lib/node/transport/WebsocketServer.js` for a brief example of importing a Common library class, extending it, and exporting it as an ES module.


### Choosing asynchronous control methods
For event-driven tasks which are called many times throughout an application's lifecycle, such as connection listeners, function passing shall be used. For example, the `TransportListener` class method `onPacketReceived` will be executed multiple times during an application's lifecycle, and should therefore pass a function to be called upon a triggering event.

In cases where logic must be chained, Promises shall be used. For example, setting an application icon requires to first send a `PutFile` RPC, followed by a `SetAppIcon` RPC. Since these commands must happen sequentially, a Promise should be used to avoid creating nested callbacks.


### Documentation
__All methods__ must be documented immediately prior to their declaration using the following format:

```
/**
    * [Description of what the method does.]
    * @param [param_name] [param_description]
    * @return [What the method returns.]
*/
```


# Code Style Guidelines

### References

Use `const` or `let` for references (block-scoped). Avoid the use of `var` (function-scoped). eslint: `prefer-const`, `no-const-assign`, `no-var`

```javascript
	const one = 1;
	let two = 2;
```

Group `const` references together, followed by your `let` references.

```javascript
const one = 1;
const two = 2;
const three = 3;
const four = 4;
let name = 'Livio';
let website = 'livio.io';
```

Use dot notation to access object properties. eslint: `dot-notation`

```javascript
const thing = {
	one: 1,
	two: 2,
	three: 3,
};
let result = thing.one * thing.two;
```

Use bracket notation to dynamically access object properties.

```javascript
const thing = {
	one: 1,
	two: 2,
	three: 3,
};
let key = 'one';
let result = thing[key];
```


### Naming Convention

- Avoid the use of single-letter names. eslint `id-length`.
- Objects, functions, and instances should use camelCase.
- Exported constants and constant class properties should be entirely uppercased.
- Class names shall use PascalCase. eslint: `new-cap`
- Acronyms should either be all uppercased or lowercased.
- Private class properties shall be indicated by using an underscore to prefix their name. These properties are still technically publicly accessible, but should not be directly accessed outside of the scope of their class definition.
- Properties and methods which are `boolean` should be prefixed with `is`, `can`, or `has`. e.g. `isEnabled()` and `hasTitle()`


### Semicolons

Please use them. eslint: `semi`


### Commas

Trailing commas should be used, even for the last item in an array or object. Do not use leading commas. eslint: `comma-style`, `comma-dangle`

```javascript
let thing = {
	one: 1,
	two: 2,
	three: 3,
	timesFour(param) {
		return param * 4;
	},
};
```

### Spacing & Tabs

- Tabs should not be used. 4 consecutive spaces should be used in lieu of a tab. eslint: `indent`
- Function signatures should include a single space after the `function` keyword and closing parenthesis. e.g. `function a(b) { ... }`. eslint: `space-before-function-paren`, `space-before-blocks`
- Use a single space before the opening parenthesis in control statements. e.g. `if (isEnabled) { ... }` eslint: `keyword-spacing`
- Pad curly braces with spaces on each side. e.g. `const thing = { key: 'value' };` eslint: `object-curly-spacing`
- Square brackets should not be padded with spaces. e.g. `const things = [1, 2, 3];` eslint: `array-bracket-spacing`
- Do not pad block internals with blank lines. eslint: `padded-blocks`
- Leave a blank line between blocks to separate logic concepts.


### Blocks, Controls, and Comparison Operators

- Use curly braces with multi-line blocks, but not single-line blocks. eslint: `nonblock-statement-body-position`
- In an if-else statement, put `else` on the same line as the closing `if` curly brace, e.g. `} else {`. eslint: `brace-style`
- If control statement conditions exceed the maximum line length or become difficult to read, conditions should be grouped and separated onto new lines, each line starting with a logical operator.
- Enclose operators with parentheses when mixing them so the logic can be easily understood by other developers. eslint: `no-mixed-operators`
- Do not nest ternary operations, or use unneeded ternaries. eslint: `no-nested-ternary`, `no-unneeded-ternary`
- Use curly braces in case/default handlers of `switch` statements to create logic blocks. eslint: `no-case-declarations`
- Shortcut comparisons (e.g. `if (isEnabled) { ... }` for booleans are acceptable, but explicit comparisons should be used for strings and numbers (e.g. `if (things.length > 0) { ... }`.
- Use strict comparison operators, e.g. `===` instead of `==`. eslint: `eqeqeq`

### Objects & Arrays

Use literal syntax to create objects and arrays. eslint: `no-new-object`

```javascript
let thing = {};
let things = [];
```

Adding items to an array should always be done via `.push(item)`.

```javascript
let things = [];
things.push({
	name: 'one',
	email: 'hello@example.com',
});
```

Use short-hand object methods. eslint: `object-shorthand`

```javascript
const thing = {
	one: 1,

	genTwo(param) {
		return obj.one + param;
	},
}
```

Property keys should not be wrapped in quotes unless required.

```javascript
const thing = {
	one: 1,
    two: 2,
    'special-thing': 'should be avoided',
}
```

### Strings

- Use single quotes for strings, e.g. `'example'`. eslint: `quotes`
- Do *not* use escaped line breaks or string concatenation to make long strings more readable. Instead, use your editor's text-wrapping option.
- Use template strings when inserting dynamic values into a string, e.g. `Hello, ${name}!`. eslint: `prefer-template`, `template-curly-spacing`
- Only escape characters in a string when necessary. eslint: `no-useless-escape`


### Event Listeners

Event listener registrars should always accept a function reference as input which is executed upon the event being emitted. The event method should be named with a prefix of `on`.

```javascript
function onEventListener(runThis) {
	runThis(payload);
}
```


### Comments

- Use `/** ... */` for multi-line comments
- Use `//` for single-line comments
- All comment lines should start with a space (as to not be back-to back with a `*` or `/` character). eslint: `spaced-comment`
- To make note of an identified problem, use `// FIXME: ...`
- To make note of an identified future solution, use `// TODO: ...`