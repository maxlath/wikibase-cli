# Config

Allows to persist options

```sh
wd config <key> [value]
```

## Summary

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [commands](#commands)
  - [get](#get)
  - [set](#set)
  - [reset](#reset)
  - [path](#path)
  - [clear](#clear)
- [options](#options)
  - [username and password](#username-and-password)
  - [bot](#bot)
  - [lang](#lang)
  - [json](#json)
  - [clipboard](#clipboard)
  - [verbose](#verbose)
  - [custom Wikibase instance](#custom-wikibase-instance)
  - [custom SPARQL endpoint](#custom-sparql-endpoint)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->


## commands
### get
```sh
# output the current config and the help menu
wd config
# output the config value for the key 'clipboard'
wd config clipboard
```

### set
```sh
wd config clipboard true
```

### reset
To reset an option to its current value without having to [`clear`](#clear) the whole config, pass it the value `default`
```sh
wd config instance default
```

### path
get config file path
```sh
wd config path
```

### clear
clear the whole config (use [`reset`](#reset) if you just want to reset one option)
```sh
wd config clear
```

## options

### username and password
Required for [write operations](https://github.com/maxlath/wikidata-cli/blob/master/docs/write_operations.md)
(Alternatively, we might be able to use OAuth once [this issue](https://github.com/maxlath/wikidata-cli/issues/25) is resolved)

:warning: the password is persisted on your file system as clear text (until we find a better way to do that)
```
wd config username myusername
wd config password myuserpassword
```

### bot
Setting a bot flag on requests made by a bot account is [required](https://www.wikidata.org/wiki/Wikidata:Bots#All_bots) and can be done by setting the `config.bot` value:
```sh
# Default: false
wd config bot true
```

### lang
set the prefered language (same as `-l, --lang`)
```sh
# Default: process.env.LANG.slice(0, 2)
wd config lang nl
```

### json
format the output of commands as JSON, when possible (same as `-j, --json`)
```sh
# Default: false
wd config json true
```

### clipboard
copy command results to the clipboard, when this option is available (same as `-c, --clipboard`)
```sh
# Default: false
wd config clipboard true
```

### verbose
set commands to print verbose output (same as `-v, --verbose`)
```sh
# Default: false
wd config verbose true
```

### custom Wikibase instance
You may want to use those commands against a different [Wikibase](http://wikiba.se) than `wikidata.org` (same as `-i, --instance`)
```sh
# Default: https://wikidata.org/w/api.php
wd config instance https://mywikibase.instance/w/api.php
# Come back to the default setting
wd config instance default
```
You're all set to make requests against your custom instance:
```sh
wd label Q1
wd claims Q1
wd data Q1
wd open Q1
```

### custom SPARQL endpoint
You can also set a custom SPARQL endpoint (same as `-e, --sparql-endpoint`)
```sh
# Default: https://query.wikidata.org/sparql
wd config sparql-endpoint https://example.com/sparql
# Come back to the default setting
wd config sparql-endpoint default
```
You're all set to make requests against your custom instance:
```sh
wd query --property P2002 --object timberners_lee
```
