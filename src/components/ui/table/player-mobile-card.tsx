import { useState } from 'react';
import { Player } from './types';
import { getPositionIcon } from './getPositionIcon';
import { formatValue, getRatingColor } from './badgeColor';
import { ArrowUpRight, ChevronDown, ChevronUp } from 'lucide-react';

type Props = {
  player: Omit<Player, 'createdAt' | 'updatedAt'>;
};
export const PlayerMobileCard = ({ player }: Props) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

  const toggleRow = (playerId: string) => {
    const newExpanded = new Set(expandedRows);
    if (newExpanded.has(playerId)) {
      newExpanded.delete(playerId);
    } else {
      newExpanded.add(playerId);
    }
    setExpandedRows(newExpanded);
  };

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
          <div className="grid grid-cols-2 gap-4 mb-4">
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
          <button
            className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2 font-medium rounded-lg shadow-md transition-all duration-200 ${
              player.isListed
                ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
                : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
            }`}
          >
            <span>{player.isListed ? 'Buy Player' : 'Transfer'}</span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  );
};
