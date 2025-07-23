import { useState } from 'react';
import { Player } from './types';
import { getPositionIcon } from './getPositionIcon';
import {
  formatValue,
  getPositionBadgeColor,
  getRatingColor,
} from './badge-color';
import { DollarSign, Star } from 'lucide-react';
import { useTransfer, useUnTransfer } from '@/features/teams/api/get-players';
import { ConfirmButton } from './confirm-button';
import { useUser } from '@/lib/auth';
import { useBuyPlayer } from '@/features/teams/api/buy-market-players';

type Props = {
  pageId: string;
  player: Omit<Player, 'createdAt' | 'updatedAt'>;
};
export const PlayerDesktopCard = ({ pageId, player }: Props) => {
  const [askingPrice, setAskingPrice] = useState({
    open: false,
    value: 0,
  });

  const transferPlayer = useTransfer({
    onSuccess: () => {
      setAskingPrice({
        open: false,
        value: 0,
      });
    },
  });

  const unTransferPlayer = useUnTransfer({
    onSuccess: () => {
      setAskingPrice({
        open: false,
        value: 0,
      });
    },
  });

  const buyPlayer = useBuyPlayer({
    onSuccess: () => {
      setAskingPrice({
        open: false,
        value: 0,
      });
    },
  });

  const { data: userData } = useUser();

  return (
    <tr
      key={player.id}
      className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
    >
      <td className="px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
            {player.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </div>
          <div>
            <div className="font-semibold text-gray-900 dark:text-white">
              {player.name}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Age {player.age} • {player.team?.name}
            </div>
          </div>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          {getPositionIcon(player.position)}
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPositionBadgeColor(player.position)}`}
          >
            {player.position}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <span className="text-gray-700 dark:text-gray-300 font-medium">
            {player.nationality}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center gap-2">
          <Star className={`w-4 h-4 ${getRatingColor(player.rating)}`} />
          <span
            className={`text-lg font-bold ${getRatingColor(player.rating)}`}
          >
            {player.rating}
          </span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-lg font-bold text-green-600 dark:text-green-400">
          {formatValue(player.value)}
        </span>
        {player.askingPrice && (
          <div className="text-xs text-gray-500 dark:text-gray-400">
            Ask: {formatValue(player.askingPrice)}
          </div>
        )}
      </td>
      <td className="px-6 py-4">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
            player.isListed
              ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
          }`}
        >
          {player.isListed ? 'Listed' : 'Not Listed'}
        </span>
      </td>
      <td className="px-6 py-4 text-center">
        {pageId === 'transfer-market' ? (
          userData.teamId !== player.teamId ? (
            <ConfirmButton
              label="Buy Player"
              onClick={() =>
                buyPlayer.mutate({
                  playerId: player.id,
                  teamId: userData.teamId,
                })
              }
              variant="success"
            />
          ) : (
            <ConfirmButton
              label="Remove"
              onClick={() =>
                unTransferPlayer.mutate({
                  playerId: player.id,
                })
              }
              variant="danger"
            />
          )
        ) : (
          <ConfirmButton
            label="Transfer"
            onClick={() => {
              if (askingPrice.open) {
                transferPlayer.mutate({
                  playerId: player.id,
                  askingPrice: askingPrice.value,
                });
              } else {
                setAskingPrice((prev) => ({ ...prev, open: true }));
              }
            }}
            variant="primary"
          />
        )}
        {askingPrice.open && (
          <div className="relative w-full mt-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <DollarSign className="w-4 h-4 text-gray-400" />
            </div>
            <input
              type="number"
              value={askingPrice.value}
              onChange={(e) =>
                setAskingPrice((prev) => ({
                  ...prev,
                  value: Number(e.target.value),
                }))
              }
              placeholder={`${player.value}`}
              className="w-full pl-10 pr-4 py-2 font-medium rounded-lg shadow-md border border-gray-300 
                   bg-gradient-to-r from-gray-50 to-gray-100 
                   focus:from-blue-50 focus:to-blue-100 
                   focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200
                   transition-all duration-200 
                   placeholder-gray-400 text-gray-700"
            />
          </div>
        )}
      </td>
    </tr>
  );
};
