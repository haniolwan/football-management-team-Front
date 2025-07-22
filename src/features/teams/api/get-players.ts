import { queryOptions, useMutation, useQuery } from '@tanstack/react-query';

import { api } from '@/lib/api-client';
import { QueryConfig } from '@/lib/react-query';
import { Player } from '@/components/ui/table/types';
import { Team, User } from '@/types/api';

export type PlayersResponse = {
  user: User;
  team: Team;
  playersCreated?: Player[] | [];
  players?: Player[] | [];
};

const getUserPlayers = (): Promise<PlayersResponse> => {
  return api.get('/users/team');
};

const generatePlayers = (): Promise<PlayersResponse> => {
  return api.post('/users/team');
};

export const transfer = ({
  playerId,
  askingPrice,
}: {
  playerId: string;
  askingPrice: number;
}) => {
  return api.post(`/players/list/${playerId}`, {
    askingPrice,
  });
};

export const unTransfer = ({ playerId }: { playerId: string }) => {
  return api.post(`/players/unlist/${playerId}`);
};

export const getPlayers = (teamId?: string): Promise<PlayersResponse> => {
  if (teamId) {
    return getUserPlayers();
  } else {
    return generatePlayers();
  }
};

export const getTeamsQueryOptions = (teamId?: string) => {
  return queryOptions({
    queryKey: ['team/players', teamId],
    queryFn: () => getPlayers(teamId),
  });
};

type UseTeamsOptions = {
  teamId?: string;
  enabled?: boolean;
  queryConfig?: QueryConfig<typeof getTeamsQueryOptions>;
};

export const usePlayers = ({
  teamId,
  queryConfig = {},
}: UseTeamsOptions = {}) => {
  return useQuery({
    ...getTeamsQueryOptions(teamId),
    ...queryConfig,
  });
};

export const useTransfer = (config?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: transfer,
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });
};

export const useUnTransfer = (config?: {
  onSuccess?: () => void;
  onError?: (error: unknown) => void;
}) => {
  return useMutation({
    mutationFn: unTransfer,
    onSuccess: config?.onSuccess,
    onError: config?.onError,
  });
};
