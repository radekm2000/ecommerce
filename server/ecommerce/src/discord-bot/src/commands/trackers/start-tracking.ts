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

export class StartTrackingCommand implements SlashCommand {
  readonly config: any = new SlashCommandBuilder()
    .setName('start-tracking')
    .setDescription(
      'Track given user and get notified anytime user lists a new item.',
    )
    .setDMPermission(true)
    .addStringOption((option) =>
      option
        .setName(TRACKED_USER_OPTION_NAME)
        .setDescription('Username of the user to start tracking')
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
        content: `Missing "${TRACKED_USER_OPTION_NAME} option"`,
        ephemeral: true,
      });
    }

    if (!this.isValidUser(parseInt(userToTrackArg))) {
      await interaction.reply({
        content:
          'Invalid user ID. Please select a valid user from the autocomplete options.',
        ephemeral: true,
      });
      return;
    }

    await this.followersService.startTracking(
      parseInt(userToTrackArg),
      discordUserId,
    );

    await interaction.reply({
      content: [
        `You will get notified about all products listed from now on from this user.`,
        `Remember to enable DMs in the server privacy settings so the bot can DM you.`,
      ].join('\n'),
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

  private isValidUser = (trackArg: number) => {
    return !isNaN(trackArg);
  };
}
