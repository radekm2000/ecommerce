import { Inject, Injectable, Logger } from '@nestjs/common';
import { DiscordGuildService } from '../discord-guild.service';
import { EventEmitter2, OnEvent } from '@nestjs/event-emitter';
import { DiscordEvents } from 'src/events/constants/events';
import { SyncUserRolesEvent } from 'src/utils/dtos/types';
import 'dotenv/config';

@Injectable()
export class AssignDiscordRoles {
  private logger: Logger;

  constructor(
    @Inject(DiscordGuildService)
    private discordGuildService: DiscordGuildService,
  ) {
    this.logger = new Logger(AssignDiscordRoles.name);
  }

  @OnEvent(DiscordEvents.SyncUserRoles, { async: true })
  public async handleUserSyncRoles(payload: SyncUserRolesEvent) {
    this.logger.log(`Handling SyncUserRoles event for user ${payload.user.id}`);
    const rolesToAssign = [];
    const rolesToRemove = [];

    const REVIEWER_ROLE_ID = process.env.REVIEWER_ROLE_ID ?? '';
    const VENDOR_ROLE_ID = process.env.VENDOR_ROLE_ID ?? '';

    if (REVIEWER_ROLE_ID) {
      if (payload.user.reviews.length > 0) {
        rolesToAssign.push(REVIEWER_ROLE_ID);
      }
    } else {
      rolesToRemove.push(REVIEWER_ROLE_ID);
    }

    if (VENDOR_ROLE_ID) {
      if (payload.user.products.length > 0) {
        rolesToAssign.push(VENDOR_ROLE_ID);
      } else {
        rolesToRemove.push(VENDOR_ROLE_ID);
      }
    }

    await Promise.all([
      rolesToAssign.map((role) =>
        this.discordGuildService.assignRoles(payload.user.discordId, role),
      ),
      rolesToRemove.map((role) =>
        this.discordGuildService.removeRoles(payload.user.discordId, role),
      ),
    ]);
  }
}
