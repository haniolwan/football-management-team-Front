import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Player } from '@/components/ui/table/types';
import { Team, User } from '@/types/api';

type PlayerFilters = {
  teamId?: number;
  team_name?: string;
  name?: string;
  isListed?: boolean;
};

export type PlayersResponse = {
  user: User;
  team: Team;
  playersCreated?: Player[];
  players?: Player[];
};

const getPlayersByTeam = (
  filters: PlayerFilters,
): Promise<{ data: PlayersResponse }> => {
  const params: Record<string, any> = {
    name: filters.name,
    team_name: filters.team_name,
  };

  if (filters.isListed !== undefined) {
    params.isListed = filters.isListed;
  }

  return api.get('/players', { params });
};

// Generate players (POST)
const generatePlayers = (): Promise<{ data: PlayersResponse }> => {
  return api.post('/users/team');
};

export const getPlayers = (
  filters: PlayerFilters = {},
): Promise<{ data: PlayersResponse }> => {
  if (filters.teamId) {
    return getPlayersByTeam(filters);
  } else {
    return generatePlayers();
  }
};

export const getTeamsQueryOptions = (filters?: PlayerFilters) => {
  return queryOptions({
    queryKey: ['players', filters],
    queryFn: () => getPlayers(filters),
  });
};

type UseTeamsOptions = {
  filters?: PlayerFilters;
  enabled?: boolean;
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

export const useTeams = ({
  filters,
  queryConfig = {},
}: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions(filters),
    ...queryConfig,
  });
};
