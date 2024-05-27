import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} from 'discord.js';
import { SlashCommand } from '../slash-command';
import { UsersService } from 'src/users/users.service';
import { FollowersService } from 'src/followers/followers.service';

const TRACKED_USER_OPTION_NAME = 'username';

type Config = {
  usersService: UsersService;
  followersService: FollowersService;
};

export class StopTrackingCommand implements SlashCommand {
  readonly config: any = new SlashCommandBuilder()
    .setName('stop-tracking')
    .setDescription('Stop tracking given user')
    .setDMPermission(true)
    .addStringOption((option) =>
      option
        .setName(TRACKED_USER_OPTION_NAME)
        .setDescription('Username of the user to stop tracking')
        .setRequired(true)
        .setAutocomplete(true),
    );

  private readonly usersService: UsersService;
  private readonly followersService: FollowersService;

  constructor(config: Config) {
    this.usersService = config.usersService;
    this.followersService = config.followersService;
  }

  public autocomplete = async (interaction: AutocompleteInteraction) => {
    const value = interaction.options.getFocused().toLowerCase();

    const users = await this.getUsers(interaction.user.id);

    const choices = users
      .filter((user) => user.username.toLowerCase().includes(value))
      .slice(0, 25);

    await interaction.respond(
      choices.map((choice) => ({
        name: choice.username,
        value: choice.userId.toString(),
      })),
    );
  };

  public execute = async (interaction: ChatInputCommandInteraction) => {
    const discordUserId = interaction.user.id;
    const userToTrackArg = interaction.options.getString(
      TRACKED_USER_OPTION_NAME,
    );

    if (!userToTrackArg) {
      await interaction.reply({
        content: `Missing "${userToTrackArg} option"`,
        ephemeral: true,
      });
    }

    await this.followersService.stopTracking(
      parseInt(userToTrackArg),
      discordUserId,
    );

    await interaction.reply({
      content: [`You stopped tracking.`].join('\n'),
      ephemeral: true,
    });
  };

  private getUsers = async (discordUserId: string) => {
    const users = await this.usersService.getUsers();

    const filteredUsers = users.filter(
      (user) => user.discordId !== discordUserId,
    );

    const choices = filteredUsers.map((user) => ({
      username: user.username,
      userId: user.id,
    }));

    return choices;
  };
}
