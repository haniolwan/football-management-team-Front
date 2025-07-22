import { User, MapPin, Star, DollarSign, Trophy } from 'lucide-react';
import { PlayerMobileCard } from './player-mobile-card';
import { Player } from './types';
import { PlayerDesktopCard } from './player-desktop-card';
import { LoadingSkelton } from './loading-skelton';
import { useTeams } from '@/features/teams/api/get-teams';

type Props = {
  title: string;
  columns: string[];
  players: Player[] | [];
  isLoading: boolean;
};

export const Table = ({ title, columns, players, isLoading }: Props) => {
  return (
    <div className="w-full mx-auto p-3 sm:p-6">
      <div className="bg-white dark:bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 px-4 sm:px-6 py-3 sm:py-4 border-b border-gray-200">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white flex items-center gap-2">
            <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
            {title}
          </h2>
        </div>

        <div className="block lg:hidden">
          {!players && !isLoading ? (
            <>show empty state</>
          ) : isLoading ? (
            <LoadingSkelton />
          ) : (
            players.map((player) => (
              <PlayerMobileCard key={player.id} player={player} />
            ))
          )}
        </div>

        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full">
            {!isLoading && (
              <thead>
                <tr className="bg-gray-50 dark:bg-gray-800 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      Player
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Position
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      Nationality
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4" />
                      Rating
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4" />
                      Value
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-center text-xs font-semibold text-gray-700 uppercase tracking-wider">
                    Action
                  </th>
                </tr>
              </thead>
            )}
            <tbody className="divide-y divide-gray-200">
              {!players || players.length === 0 ? (
                <tr className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
                  <td
                    colSpan={7}
                    className="text-center py-6 text-gray-500 dark:text-gray-400"
                  >
                    No players found.
                  </td>
                </tr>
              ) : isLoading ? (
                <LoadingSkelton />
              ) : (
                players.map((player) => (
                  <PlayerDesktopCard key={player.id} player={player} />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
