const { name } = require('./package.json')
throw new Error(`you can't require ${name}: this module only exposes executables (see "bin" in package.json)`)
