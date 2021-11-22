import {Rank} from './Rank';

export interface RankDTO {
  name: string;
  badge: string;
  level: number;
  users: number[];
  websiteShowStaff: boolean;
  websiteShowAdminPanel: boolean;
  websiteManageNews: boolean;
  websiteManageRanks: boolean;
  websiteManageUsers: boolean;
  websiteManageBans: boolean;
  websiteManageConfig: boolean;
  websiteManageBetaCodes: boolean;
  websiteManageGuestbook: boolean;
  websiteManageEmulator: boolean;
  websiteManageComments: boolean;
  websiteManageForums: boolean;
}

export function rankWireToRankDTO(rankWire: Rank): RankDTO {
  return {
    name: rankWire.name,
    badge: rankWire.badge,
    level: 1,
    users: rankWire.users!.map(_ => _.id),
    websiteShowStaff: rankWire.permissions.websiteShowStaff,
    websiteShowAdminPanel: rankWire.permissions.websiteShowAdminPanel,
    websiteManageBans: rankWire.permissions.websiteManageBans,
    websiteManageNews: rankWire.permissions.websiteManageNews,
    websiteManageUsers: rankWire.permissions.websiteManageUsers,
    websiteManageRanks: rankWire.permissions.websiteManageRanks,
    websiteManageConfig: rankWire.permissions.websiteManageConfig,
    websiteManageBetaCodes: rankWire.permissions.websiteManageBetaCodes,
    websiteManageGuestbook: rankWire.permissions.websiteManageGuestbook,
    websiteManageEmulator: rankWire.permissions.websiteManageEmulator,
    websiteManageComments: rankWire.permissions.websiteManageComments,
    websiteManageForums: rankWire.permissions.websiteManageForums,
  };
}
