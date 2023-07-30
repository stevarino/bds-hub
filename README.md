# BDH Hub

Runs a companion server for a BDS server. This add-on and companion server offers a Discord chat relay, player statistics, world status, and player location history.

## Features

 - Discord Chat Bridge, allowing players to chat with their phones or while away (awesome for those on consoles)
 - Current server status such as time, weather, and who's online
 - Gathers statitistics such as:
 - - blocks broken
 - - blocks placed
 - - player deaths
 - - deaths caused by players
 - - damage to/from players
 - (Coming Soon) Ways to see this information...
 - Player location over time
 - (Coming Soon) Achievements
 - (Coming Soon) Leadership boards
 - (Coming Soon) Pieces of Flair
 - (Coming Soon) Server health metrics
 - (Coming Soon) [Prometheus support](https://prometheus.io/)

## Requirements

 - [Bedrock Dedicated Server](https://www.minecraft.net/en-us/download/server/bedrock) (no realms, no LAN play sadly)
 - A Minecraft World with Beta APIs enabled
 - If Discord support is needed, [a set of bot credentials]J(https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

## Setup Installation

```
// grab the package
npm install bds-hub

// set up config file (see bedrock_stats_config.example.yaml)
vim my_config.yaml

// install the plugin into your world
npx bdsHubInstall  --config=my_config.yaml C:\blah-blah\bedrock-server-1.20.13.01\ 

// run the companion server
npx bdsHubStart --config=my_config.yaml

// start your minecraft world
```

