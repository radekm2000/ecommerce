import { Inject, Injectable, Logger, UseGuards } from '@nestjs/common';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { Interval } from '@nestjs/schedule';
import { AssignDiscordRoles } from 'src/discord-guild/listeners/assign-discord-roles';
import { DiscordEvents } from 'src/events/constants/events';
import { UsersService } from 'src/users/users.service';
import { SyncUserRolesEvent } from 'src/utils/dtos/types';

@Injectable()
export class UserSyncService {
  private logger: Logger;

  constructor(
    @Inject(UsersService) private userService: UsersService,
    private eventEmitter: EventEmitter2,
  ) {
    this.logger = new Logger(UserSyncService.name);
  }

  @Interval(60 * 60 * 1000)
  public async syncUserEvent() {
    try {
      const users = await this.userService.findAllDiscordUsers();
      if (!users) {
        return;
      }

      this.logger.log('Emitting SyncUserRoles event for all Discord users');

      for (const user of users) {
        this.eventEmitter.emit(DiscordEvents.SyncUserRoles, { user });
      }
    } catch (error) {
      this.logger.error(`Error in syncUserEvent: ${error.message}`);
    }
  }
}
