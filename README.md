# BDS Hub

Runs a companion server for a BDS server. This add-on and companion server offers a Discord chat relay, player statistics, world status, and player location history.

## Features

 - Discord Chat Bridge, allowing players to chat with their phones or while away (awesome for those on consoles)
 - Current server status such as time, weather, and who's online
 - Expanded dialogue features, including branching menus, conditionals, etc.
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

## Installation

 -[ ] Add packs
 -[ ] Add to world_*_packs.json
 -[ ] permissions.json

## Requirements

 - [Bedrock Dedicated Server](https://www.minecraft.net/en-us/download/server/bedrock) (no realms, no LAN play sadly)
 - A Minecraft World with Beta APIs enabled
 - If Discord support is needed, [a set of bot credentials](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

 Why is a BDS server necessary? Some API features are only available through that, and a Hub companinion server is used to track longterm state of the game.

 There is a possibiilty of converting the game to use a more modular design so Realm/LAN/Local play is doable, so if this is of interest let me know. This would primarily include the dialogue and menu options, but not the telebots or player stats such as broken blocks.

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

## Bootstrapping an NPC

Give yourself a "command" book with the following config:

```
actions:
  give_book_action:
    action: Give
    args:
      item: enchanted_book
      nameTag: Ye Olde Magic Booke
      lore: ["Just an old book.", "§ksecret password§r", "Nothing special"]
      enchantments: { vanishing: 1 }
items:
  - lore: [null, "§ksecret password§r"]
    menu:
      title: Ye Olde Magic Booke
      buttons:
        - text: Admin Settings
          require_tag: admin
          action: admin_menu
        - text: NPC Management
          if_has_tag: admin
          then:
            action: ManageNpcs
            args:
              admin: true
          else:
            action: ManageNpcs
        - text: Blocks Broken
          action: BlocksBroken
        - text: Blocks Placed
          action: BlocksPlaced
chats:
  - equals: boop
    require_tag: admin
    action: give_book_action
```

This does three things:
 
 - the `actions`` section: defines an action to give a book with specific properties.
 - the `items` category: defines that when an item is used that has those specific properties (`lore[1]` in this case), open the book menu that includes a special admin section.
 - the `chats` section: when a user tagged as `admin` says "boop" in chat, run the `give_book_action` action defined in the first section.

So start the game with this config installed, tag yourself as admin (`tag "{playername}" add admin`), say boop, and get book! From there you can easily add NPCs, Transport NPCs, assign them tags, etc.

## The Script file: Custom Dialogues and Menus

A key part of this plugin is the ability to create a dialogue tree, where NPCs can respond to users, remember their choices, choose random responses, etc.

To do this, the Script file defines `actors`, `scenes`, `actions`, `items`, and `chats`.

### Actors

These function similarly to the `/dialogue change` command in vanilla Minecraft. Specify a `tag:` or `name:` field to target an NPC (`tag` is strongly recommended), and a `scene:` field to target a specific scene, and that's it.

If `npc_name:` is specified here, overrides the `npc_name:` field on any pointed-to scene objects. If multiple actors point to the same scene, copies of the scene will be produced for each actor.

### Scenes

A scene is very similar to the [vanilla Minecraft scene files (intentionally so)](https://learn.microsoft.com/en-us/minecraft/creator/documents/npcdialogue#create-an-individual-scene). Specify an `id:` (was `scene_tag:` in vanilla), an optional `npc_name:`, `text:` that the npc weill say, and a set of one to six buttons.

Each button defines a "transition" - basically a thing to do after interactions to decide the next interaction. More on those below in the Actions section.

One major limitation of scenes is that they need to be defined at pack build time, so cannot dynamically change their text or add/remove buttons based on player actions.

### Actions

The actions section is a named collection of transitions. This allows you to reuse transitions elsewhere by referring to them by name.

### Transitions

A transition is a description of what will be done next. See `src\behavior_pack\src\types\transitionTypes.ts` for a detailed overview, but here is a summary of all the transitions defined:

 - `action: {actionName}` - a named action, either built in to the Hub code or defined in the `actions` section. Accepts an additional `args` dictionary for additinoal properties specific to each action.
 - `menu: {menu_object}` - a menu of buttons similar to a scene (less prominent text and no dialogue window though), with each button having their own linked transition.
- `scene: {scene_name}` - display a scene, similar to as defined above.
- `command: {command_text}` - runs the given command, replacing `@p` with the current player.
- `if_has_tag: {tag_name}` - loigical branch, with further transitions defined under `then:` and `else:` fields.
- `has_item: {object_description}` - another logical branch with `then` and `else` transiitons, but looking through a players inventory matching conditions. The conditions can be by `name:`, `type:`, and/or `lore:` (with lore being an array of 1-3 items, `null` indicating not to match against).
- `sequence: [transition list]` - A list of tranistions performed in order, with the following one not executingg until the previous one has ran (as best can be determined).
- `wait {ticks}` - times out for the given number of ticks, before proceeeding.
- `random: [transition list]` - A randomly chosen transition is chosen, with an optional `weights: [number list]`. For example, `random: [a,b,c]` will choose each item randomly 33%, but `random: [a,b,c]; weights: [3]` will assign `a` 60% of the time (3/5) and `b` or `c` each 20% of the time.
- `apply_tag: {tag_name}` - Applies the given tag to a player.
- `remove_tag: {tag_name}` - Removes the given tag from a player.
- `sound: {sound_name}` - Plays the given sound for the player ([see sounds.json](https://minecraft.fandom.com/wiki/Sounds.json/Bedrock_Edition_values)). Can be given `volume:`, `pitch:`, and `minVolume:` fields (defaulting to 1).

### Built-In Actions

Built-in Actions are similar to transitions, but often have more complicated logic or little customization so are expressed just through code. They are not designed to be easily compositable with other transitions.

- `action: Time` - A demo action, displays the current time and remembers how many times it was asked.
- `action: InventoryInspect` - A debug action, displaying properties of the current player's inventory.
- `action: Teleport` - An admin action to teleport to a given player or bot (npc).
- `action: Give` - Gives an item to the player, with `args` of `qty:`, `enchantments: [[{enchantment_name}, {level}], ...]`, `lore: ["lore text", ...]`, and `name: {name-tag}`.
- `action: BlocksBroken` - Displays a list of all blocks broken by the player.
- `action: BlocksPlaced` - Displays a list of all blocks placed by the player.
- `action: NpcTravel` - Performs a fast travel to another teleportation NPC, selectable through a given menu. Automatically linked to the npc discussion scene when activating a teleportation npc.
- `action: CreateNPC` - Creates a new NPC with various properties. Due to limitations of the API, some manual steps such as name and appearance will need to be manually set up.
- `action: ManageNpcs` - Allows for NPCs to be managed by their owners. Accepts an `args.admin: true` field to allow for admins to manage all NPCs.

## NPCs

