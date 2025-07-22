import { useState } from 'react';
import { Player } from './types';
import { getPositionIcon } from './getPositionIcon';
import {
  formatValue,
  getPositionBadgeColor,
  getRatingColor,
} from './badgeColor';
import { ArrowUpRight, Star } from 'lucide-react';

type Props = {
  player: Omit<Player, 'createdAt' | 'updatedAt'>;
};
export const PlayerDesktopCard = ({ player }: Props) => {
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
        <button
          className={`inline-flex items-center gap-2 px-4 py-2 font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 group-hover:scale-105 ${
            player.isListed
              ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white'
              : 'bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white'
          }`}
        >
          <span>{player.isListed ? 'Buy' : 'Transfer'}</span>
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </td>
    </tr>
  );
};
