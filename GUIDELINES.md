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
- Rather than allowing property values to be directly manipulated, the use of ES6-style getters and setters (`get` and `set`) shall be implemented.
- Classes must contain a constructor, but the constructor _should not_ contain parameter type/value checking as a workaround for method overloading. For example, a semantic versioning class should have a constructor which accepts 3 parameters (major, minor, patch) and assigned to properties of the same/similar names prefixed with `_`. To also allow a semantic version string (e.g. "2.1.3") as input, a new `fromString(version)` method should be added to the class definition which parses the string and sets the proper `_major`, `_minor`, and `_patch` properties. See `/lib/js/util/Version.js` in the repository for an example.


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