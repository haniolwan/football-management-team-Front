import { useState } from 'react';
import { Player } from './types';
import { getPositionIcon } from './getPositionIcon';
import { formatValue, getRatingColor } from './badge-color';
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  DollarSign,
  TrashIcon,
} from 'lucide-react';
import { useTransfer, useUnTransfer } from '@/features/teams/api/get-players';
import { ConfirmButton } from './confirm-button';
import { useUser } from '@/lib/auth';
import { useBuyPlayer } from '@/features/teams/api/buy-market-players';

type Props = {
  pageId: string;
  player: Omit<Player, 'createdAt' | 'updatedAt'>;
};
export const PlayerMobileCard = ({ pageId, player }: Props) => {
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [askingPrice, setAskingPrice] = useState({
    open: false,
    value: 0,
  });

  const toggleRow = (playerId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(playerId)) {
      newExpanded.delete(playerId);
    } else {
      newExpanded.add(playerId);
    }
    setExpandedRows(newExpanded);
  };

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
    <div
      key={player.id}
      className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
    >
      <div
        className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
        onClick={() => toggleRow(player.id)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {player.name
                .split(' ')
                .map((n: string) => n[0])
                .join('')}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 dark:text-white truncate">
                {player.name}
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                {getPositionIcon(player.position)}
                <span>{player.position}</span>
                <span>•</span>
                <span className={`font-bold ${getRatingColor(player.rating)}`}>
                  {player.rating}
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold text-green-600 dark:text-green-400 text-sm">
              {formatValue(player.value)}
            </span>
            {expandedRows.has(player.id) ? (
              <ChevronUp className="w-5 h-5 text-gray-400" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-400" />
            )}
          </div>
        </div>
      </div>

      {expandedRows.has(player.id) && (
        <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-800">
          <div className="grid grid-cols-2 gap-4 mb-4 max-lg:p-4">
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                Age & Team
              </div>
              <div className="text-sm text-gray-900 dark:text-white">
                {player.age} • {player.team?.name}
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                Nationality
              </div>
              <div className="text-sm text-gray-900 dark:text-white flex items-center gap-1">
                <span>{player.nationality}</span>
              </div>
            </div>
            <div>
              <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                Status
              </div>
              <span
                className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  player.isListed
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                    : 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
                }`}
              >
                {player.isListed ? 'Listed' : 'Not Listed'}
              </span>
            </div>
            {player.askingPrice && (
              <div>
                <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                  Asking Price
                </div>
                <div className="text-sm font-bold text-green-600 dark:text-green-400">
                  {formatValue(player.askingPrice)}
                </div>
              </div>
            )}
          </div>

          {(() => {
            const isMyPlayer = userData.teamId === player.teamId;

            if (pageId === 'transfer-market') {
              if (!isMyPlayer) {
                return (
                  <ConfirmButton
                    label="Buy Player"
                    onClick={() =>
                      buyPlayer.mutate({
                        playerId: player.id,
                        teamId: player.teamId,
                      })
                    }
                    variant="success"
                  />
                );
              } else {
                return (
                  <ConfirmButton
                    label="Remove"
                    onClick={() =>
                      unTransferPlayer.mutate({
                        playerId: player.id,
                      })
                    }
                    variant="danger"
                  />
                );
              }
            }

            if (pageId === 'my-transfer-list') {
              return (
                <ConfirmButton
                  label="Remove"
                  onClick={() =>
                    unTransferPlayer.mutate({
                      playerId: player.id,
                    })
                  }
                  variant="danger"
                />
              );
            }

            // Default for user’s own team (not transfer list or market)
            if (isMyPlayer) {
              return (
                <ConfirmButton
                  label="Transfer"
                  onClick={() =>
                    transferPlayer.mutate({
                      playerId: player.id,
                      askingPrice: askingPrice.value,
                    })
                  }
                  variant="primary"
                />
              );
            }

            return null;
          })()}
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
        </div>
      )}
    </div>
  );
};
