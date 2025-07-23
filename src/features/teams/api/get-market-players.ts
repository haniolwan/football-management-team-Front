import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Player } from '@/components/ui/table/types';
import { Team, User } from '@/types/api';

export type Filters = {
  name: string;
  team_name: string;
  // askingPrice: string;
  // isListed: boolean;
  sortBy: string;
  sortType: string;
};

export type PlayersResponse = {
  user: User;
  team: Team;
  players?: Player[] | [];
};

const getMarketPlayers = (filters?: Filters): Promise<PlayersResponse> => {
  return api.get('/players', {
    params: {
      ...(filters && {
        ...(filters.name && { name: filters.name }),
        ...(filters.team_name && { team_name: filters.team_name }),
      }),
    },
  });
};

export const getTeamsQueryOptions = (filters?: Filters) => {
  return queryOptions({
    queryKey: ['market/players', filters],
    queryFn: () => getMarketPlayers(filters),
  });
};

type UseTeamsOptions = {
  filters?: Filters;
  enabled?: boolean;
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

export const useMarketPlayers = ({
  filters,
  queryConfig = {},
}: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions(filters),
    ...queryConfig,
  });
};

export const useMarketPlayersMutation = () => {
  return useMutation({
    mutationFn: (filters: Filters) => getMarketPlayers(filters),
  });
};
