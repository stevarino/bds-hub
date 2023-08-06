# BDH Hub

Runs a companion server for a BDS server. This add-on and companion server offers a Discord chat relay, player statistics, world status, and player location history.

## Features

 - Discord Chat Bridge, allowing players to chat with their phones or while away (awesome for those on consoles)
 - Current server status such as time, weather, and who's online
 - Gathers statitistics such as:
   - blocks broken
   - blocks placed
   - player deaths
   - deaths caused by players
   - damage to/from players
 - Player location over time
 - Planned features:
   - Achievements
   - Leadership boards
   - Pieces of Flair
   - Server health metrics
   - [Prometheus support](https://prometheus.io/)

## Requirements

 - [Bedrock Dedicated Server](https://www.minecraft.net/en-us/download/server/bedrock) (no realms, no LAN play sadly)
 - A Minecraft World with Beta APIs enabled
 - If Discord support is needed, [a set of bot credentials](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

## Commands

NOTE: All commands are shown as if bds-hub is installed from npm, and so use the `npx {command} {args}` syntax. If running from source, you can use the `npm run {command}` equivalents **but any arguments must be seperated from the command by a double hyphen (`--`)**.

```
# from npm install:
npx hubInstall --config=foo.yaml /path/to/world

# from source (not the hyphen seperator):
npm run hubInstall -- --config=foo.yaml /path/to/world
```

If not specified, all config paths are attempted to be loaded from `bds_hub.config.yaml`.

### hubConfig

`npx hubConfig [--config=path/to/config.yaml] [--force]`

Creates an example config file.

### hubInstall

`npx hubInstall [--config=path/to/config.yaml] [--dev] path/to/server`

Installs the bds-hub into the specified world. This includes the behavior pack, permissions, activation, and configuration information such as the hub server address.

Use `--dev` to install the the behavior pack development folder, allowing for faster development.


### hubStart

`npx hubStart [--config=path/to/config.yaml]`

Runs the hub server.

## URLs

The hub server exposes several endpoints that may be useful.

### /status

Returns the current world status, including weather, time of day, and online players.

### /query

In development.

## Setup Installation

```
// grab the package
npm install bds-hub

// set up config file (see bedrock_stats_config.example.yaml)
npx hubConfig --config=my_config.yaml
vim my_config.yaml

// install the plugin into your world
npx hubInstall  --config=my_config.yaml C:\blah-blah\bedrock-server-1.20.13.01\

// run the companion server
npx hubStart --config=my_config.yaml

// start your minecraft world
```

## Custom Dialogues and Menus

A key part of 
