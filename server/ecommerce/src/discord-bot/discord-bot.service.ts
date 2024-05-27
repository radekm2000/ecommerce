import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Client, IntentsBitField } from 'discord.js';
import { DiscordBot } from './src/discordbot';
import 'dotenv/config';
import { Ping } from './src/commands/ping';
import { ProfileCommand } from './src/commands/profile';
import { UsersService } from 'src/users/users.service';
import { InventoryCommand } from './src/commands/inventory';
import { ProductsService } from 'src/products/products.service';
import { ReviewsCommand } from './src/commands/reviews';
import { RemoveProduct as RemoveProductCommand } from './src/commands/remove-product';
import { TrackedUsersCommand } from './src/commands/trackers/tracked-users';
import { FollowersService } from 'src/followers/followers.service';
import { StartTrackingCommand } from './src/commands/trackers/start-tracking';
import { StopTrackingCommand } from './src/commands/trackers/stop-tracking';

@Injectable()
export class DiscordBotService implements OnModuleInit {
  public discordBot: DiscordBot;
  private readonly bot: Client;
  private readonly botToken: string;
  private readonly botApplicationId: string;

  constructor(
    private userService: UsersService,
    private productsService: ProductsService,
    private followersService: FollowersService,
  ) {
    this.botToken = process.env.DISCORD_BOT_TOKEN;
    this.botApplicationId = process.env.DISCORD_CLIENT_ID;
    this.bot = new Client({
      intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMessages,
      ],
      allowedMentions: {
        parse: ['everyone', 'roles', 'users'],
      },
    });

    this.discordBot = new DiscordBot({
      bot: this.bot,
      botToken: this.botToken,
      botApplicationId: this.botApplicationId,
      commands: [
        new Ping(),
        new ProfileCommand({ userService: this.userService }),
        new InventoryCommand({
          productsService: this.productsService,
          usersService: this.userService,
        }),
        new ReviewsCommand({ usersService: this.userService }),
        new RemoveProductCommand({
          productService: productsService,
          usersService: userService,
        }),
        new TrackedUsersCommand({ usersService: this.userService }),

        new StartTrackingCommand({
          followersService: this.followersService,
          usersService: this.userService,
        }),
        new StopTrackingCommand({
          followersService: this.followersService,
          usersService: this.userService,
        }),
      ],
    });
  }

  async onModuleInit() {
    await this.discordBot.start();
  }
}
