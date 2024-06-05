import { Module } from '@nestjs/common';
import { UserSyncService } from './user-sync.service';
import { AssignDiscordRoles } from 'src/discord-guild/listeners/assign-discord-roles';
import { DiscordGuildModule } from 'src/discord-guild/discord-guild.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, DiscordGuildModule],
  providers: [UserSyncService, AssignDiscordRoles],
})
export class UserSyncModule {}
