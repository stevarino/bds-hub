import {Client, Events, GatewayIntentBits, Partials, TextChannel} from 'discord.js';
import { ConfigFile, O } from '../bds_hub_bp/scripts/types';

// https://discordapi.com/permissions.html#67111936
const PERMISSIONS = 67111936;

const channelUrl = new RegExp('^https://discord\\.com/channels/([0-9]+)/([0-9]+)$');

export class DiscordClient {
  config: ConfigFile;
  client: Client<true>|undefined;
  channels: O<TextChannel> = {};

  inbound: string[] = [];

  constructor(config: ConfigFile) {
    this.config = config;
    if (config.discord !== undefined) {
    }
  }

  async start() {
    if (this.config.discord === undefined) return;
    console.info(`Permissions Link: https://discord.com/oauth2/authorize?client_id=${this.config.discord.app_id}&scope=bot&permissions=${PERMISSIONS}`);
    const client = new Client({
      partials: [Partials.Channel],
      intents: [
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.Guilds,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.MessageContent,
      ],
    });

    client.on(Events.ClientReady, c => this.setup(c));
    client.login(this.config.discord.token);
  }

  async setup(client: Client<true>) {
    this.client = client;
    const guilds = new Set<string>();
    console.info(`Discord logged in as ${client.user.tag}`);
    const channels: [string, string, string][] = [];
    for (const channel of this.config.discord?.channels ?? []) {
      const match = channelUrl.exec(channel);
      if (match === null) {
        throw new Error(`Invalid discord channel: ${channel}`);
      }
      const [url, g, ch] = [match[0], match[1], match[2]];
      if (!guilds.has(g)) {
        const guild = await client.guilds.fetch({guild: g});
        const profile = await guild.members.fetch(client.user.id);
        await profile.setNickname(this.config.discord?.nick ?? 'BedrockStats');
        console.info('Discord Guild setup: ', guild.name);
      }
      const channelObj = await client.channels.fetch(ch);
      if (channelObj === null) {
        throw new Error(`Not registered with channel: ${url}`);
      }
      if (!channelObj.isTextBased()) {
        throw new Error(`Not a text based channel: ${url}`);
      }
      this.channels[ch] = channelObj as TextChannel;
      console.info('Discord Channel setup: ', channelObj.url)
    }
    
    client.on(Events.MessageCreate, async (m) => {
      if (m.author.bot || this.channels[m.channelId] === undefined || m.guild === null) {
        return;
      }
      const user = (await m.guild.members.fetch(m.author)).user;
      let username = user.username;
      if (user.discriminator !== '0') {
        username = `${username}#${user.discriminator}`
      }
      const gamertag = this.config.discord?.users[username];
      let msg = `[${username}] ${m.content}`;
      if (gamertag !== undefined) {
        msg = `<${gamertag}> ${m.content}`;
      }
      this.inbound.push(msg);
    });
    console.info('Discord ready!');
  }

  sendMessage(msg: string) {
    for (const channel of Object.values(this.channels)) {
      channel.send(msg);
    }
  }
}