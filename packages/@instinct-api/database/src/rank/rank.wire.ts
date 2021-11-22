import {userWire} from '../user';
import {Rank, RankDTO} from '@instinct-prj/interface';
import {
  booleanToPermissionStatus,
  permissionStatusToBoolean,
  RankEntityStruct,
} from './rank.types';

export function rankWire(rankEntity: RankEntityStruct): Rank {
  return {
    id: rankEntity.id!,
    name: rankEntity.name,
    badge: rankEntity.badge,
    users:
      rankEntity.users !== undefined
        ? rankEntity.users!.map(user => userWire(user))
        : undefined,
    permissions: {
      websiteManageBans: permissionStatusToBoolean(
        rankEntity.websiteManageBans
      ),
      websiteManageConfig: permissionStatusToBoolean(
        rankEntity.websiteManageConfig
      ),
      websiteManageUsers: permissionStatusToBoolean(
        rankEntity.websiteManageUsers
      ),
      websiteManageRanks: permissionStatusToBoolean(
        rankEntity.websiteManageRanks
      ),
      websiteManageNews: permissionStatusToBoolean(
        rankEntity.websiteManageNews
      ),
      websiteShowStaff: permissionStatusToBoolean(rankEntity.websiteShowStaff),
      websiteShowAdminPanel: permissionStatusToBoolean(
        rankEntity.websiteShowAdminPanel
      ),
      websiteManageBetaCodes: permissionStatusToBoolean(
        rankEntity.websiteManageBetaCodes
      ),
      websiteManageGuestbook: permissionStatusToBoolean(
        rankEntity.websiteManageGuestbook
      ),
      websiteManageEmulator: permissionStatusToBoolean(
        rankEntity.websiteManageEmulator
      ),
      websiteManageComments: permissionStatusToBoolean(
        rankEntity.websiteManageComments
      ),
      websiteManageForums: permissionStatusToBoolean(
        rankEntity.websiteManageForums
      ),
    },
  };
}

export function rankDataTransferObjectToEntity(
  rankDTO: RankDTO
): RankEntityStruct {
  return {
    name: rankDTO.name,
    badge: rankDTO.badge,
    level: rankDTO.level,
    websiteManageBans: booleanToPermissionStatus(rankDTO.websiteManageBans),
    websiteManageConfig: booleanToPermissionStatus(rankDTO.websiteManageConfig),
    websiteManageUsers: booleanToPermissionStatus(rankDTO.websiteManageUsers),
    websiteManageRanks: booleanToPermissionStatus(rankDTO.websiteManageRanks),
    websiteManageNews: booleanToPermissionStatus(rankDTO.websiteManageNews),
    websiteShowStaff: booleanToPermissionStatus(rankDTO.websiteShowStaff),
    websiteShowAdminPanel: booleanToPermissionStatus(
      rankDTO.websiteShowAdminPanel
    ),
    websiteManageBetaCodes: booleanToPermissionStatus(
      rankDTO.websiteManageBetaCodes
    ),
    websiteManageGuestbook: booleanToPermissionStatus(
      rankDTO.websiteManageGuestbook
    ),
    websiteManageEmulator: booleanToPermissionStatus(
      rankDTO.websiteManageEmulator
    ),
    websiteManageComments: booleanToPermissionStatus(
      rankDTO.websiteManageComments
    ),
    websiteManageForums: booleanToPermissionStatus(rankDTO.websiteManageForums),
  };
}
