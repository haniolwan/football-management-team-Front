import {
  User,
  MapPin,
  Star,
  DollarSign,
  ArrowUpRight,
  Trophy,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { getPositionIcon } from './getPositionIcon';
import {
  formatValue,
  getPositionBadgeColor,
  getRatingColor,
} from './badgeColor';
import { useState } from 'react';

type Props = {
  title: string;
  columns: string[];
  rows: string[];
};

export const Table = ({ title, columns, rows }: Props) => {
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

  const players = [
    {
      id: '1',
      name: 'Lionel Messi',
      position: 'FWD',
      age: 36,
      nationality: 'Argentina',
      value: 25000000,
      rating: 93,
      isListed: true,
      askingPrice: 30000000,
      team: 'Inter Miami',
    },
    {
      id: '2',
      name: 'Virgil van Dijk',
      position: 'DEF',
      age: 32,
      nationality: 'Netherlands',
      value: 45000000,
      rating: 89,
      isListed: false,
      askingPrice: null,
      team: 'Liverpool',
    },
    {
      id: '3',
      name: 'Luka Modrić',
      position: 'MID',
      age: 38,
      nationality: 'Croatia',
      value: 15000000,
      rating: 87,
      isListed: true,
      askingPrice: 20000000,
      team: 'Real Madrid',
    },
    {
      id: '4',
      name: 'Thibaut Courtois',
      position: 'GK',
      age: 31,
      nationality: 'Belgium',
      value: 35000000,
      rating: 88,
      isListed: false,
      askingPrice: null,
      team: 'Real Madrid',
    },
  ];

  return (
    <div className="w-full mx-auto p-3 sm:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200 dark:border-gray-600">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            {title}
          </h2>
        </div>

        {/* Mobile Card View */}
        <div className="block lg:hidden">
          {players.map((player) => (
            <div
              key={player.id}
              className="border-b border-gray-200 dark:border-gray-700 last:border-b-0"
            >
              {/* Card Header */}
              <div
                className="p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800"
                onClick={() => toggleRow(player.id)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                      {player.name
                        .split(' ')
                        .map((n) => n[0])
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
                        <span
                          className={`font-bold ${getRatingColor(player.rating)}`}
                        >
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

              {/* Expanded Content */}
              {expandedRows.has(player.id) && (
                <div className="px-4 pb-4 bg-gray-50 dark:bg-gray-800">
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <div className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase mb-1">
                        Age & Team
                      </div>
                      <div className="text-sm text-gray-900 dark:text-white">
                        {player.age} • {player.team}
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
          ))}
        </div>

        {/* Desktop Table View */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-600">
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Player
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Position
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Nationality
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    Rating
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    Value
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wider">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {players.map((player) => (
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
                          Age {player.age} • {player.team}
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
                      <Star
                        className={`w-4 h-4 ${getRatingColor(player.rating)}`}
                      />
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
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
