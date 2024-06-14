import {
  AutocompleteInteraction,
  ChatInputCommandInteraction,
} from 'discord.js';
import { describe } from 'node:test';
import { StartTrackingCommand } from 'src/discord-bot/src/commands/trackers/start-tracking';
import { FollowersService } from 'src/followers/followers.service';
import { UsersService } from 'src/users/users.service';
import { Follow } from 'src/utils/entities/followers.entity';

const TRACKED_USER_OPTION_NAME = 'username';

describe('Start-Tracking command test', () => {
  let command: StartTrackingCommand;

  const mockUsersService = {
    getUsers: jest.fn().mockResolvedValue([
      { username: 'testuser1', discordId: '123', id: 1 },
      { username: 'testuser2', discordId: '456', id: 2 },
    ]),
  };

  const mockFollowersService = {
    startTracking: jest.fn().mockResolvedValue({} as Follow),
  };

  beforeEach(() => {
    command = new StartTrackingCommand({
      followersService: mockFollowersService as unknown as FollowersService,
      usersService: mockUsersService as unknown as UsersService,
    });
  });

  it('should handle missing user ID option in execute', async () => {
    const interaction = {
      user: { id: '123' },
      options: { getString: jest.fn().mockReturnValue(null) },
      reply: jest.fn(),
    } as unknown as ChatInputCommandInteraction;

    await command.execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith({
      content: `Missing "${TRACKED_USER_OPTION_NAME} option"`,
      ephemeral: true,
    });
  });

  it('should handle invalid user ID in execute', async () => {
    const interaction = {
      user: { id: '123' },
      options: { getString: jest.fn().mockReturnValue('invalidID') },
      reply: jest.fn(),
    } as unknown as ChatInputCommandInteraction;

    await command.execute(interaction);
    expect(interaction.reply).toHaveBeenCalledWith({
      content:
        'Invalid user ID. Please select a valid user from the autocomplete options.',
      ephemeral: true,
    });
  });

  it('should autocomplete usernames correctly', async () => {
    const interaction = {
      options: {
        getFocused: jest.fn().mockReturnValue('test'),
      },
      respond: jest.fn(),
      user: { id: '999' },
    } as unknown as AutocompleteInteraction;

    await command.autocomplete(interaction);

    expect(mockUsersService.getUsers).toHaveBeenCalledTimes(1);

    expect(interaction.respond).toHaveBeenCalledWith([
      { name: 'testuser1', value: '1' },
      { name: 'testuser2', value: '2' },
    ]);
  });

  it('should start tracking valid user', async () => {
    const interaction = {
      user: { id: '123' },
      options: { getString: jest.fn().mockReturnValue('1') },
      reply: jest.fn(),
    } as unknown as ChatInputCommandInteraction;

    const userToTrackId = parseInt('1');
    const myDiscordUserId = '123';

    await command.execute(interaction);
    expect(mockFollowersService.startTracking).toHaveBeenCalledWith(
      userToTrackId,
      myDiscordUserId,
    );
    expect(interaction.reply).toHaveBeenCalledWith({
      content: [
        `You will get notified about all products listed from now on from this user.`,
        `Remember to enable DMs in the server privacy settings so the bot can DM you.`,
      ].join('\n'),
      ephemeral: true,
    });
  });
});
