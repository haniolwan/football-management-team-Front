import { useMutation, UseMutationOptions } from '@tanstack/react-query';
import { api } from '@/lib/api-client';

type BuyPlayerPayload = {
  playerId: string;
  teamId: number;
};

export const buyPlayer = ({ playerId, teamId }: BuyPlayerPayload) => {
  return api.post(`/players/purchase/${teamId}/${playerId}`);
};

export const useBuyPlayer = (
  options?: UseMutationOptions<unknown, unknown, BuyPlayerPayload>,
) => {
  return useMutation({
    mutationFn: buyPlayer,
    ...options,
  });
};
