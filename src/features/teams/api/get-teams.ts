import { queryOptions, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
// import { Team } from '@/types/api';

export const getTeams = (): Promise<{ data: any[] }> => {
  return api.get('/players');
};

export const getTeamsQueryOptions = () => {
  return queryOptions({
    queryKey: ['teams'],
    queryFn: () => getTeams(),
  });
};

type UseTeamsOptions = {
  enabled?: boolean;
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

export const useTeams = ({
  // enabled = false,
  queryConfig = {},
}: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions(),
    ...queryConfig,
  });
};
