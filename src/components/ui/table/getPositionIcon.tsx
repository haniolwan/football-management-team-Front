import { User } from 'lucide-react';

export const getPositionIcon = (position: string) => {
  const iconClass = 'w-4 h-4';
  switch (position) {
    case 'GK':
      return (
        <div
          className={`${iconClass} bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}
        >
          G
        </div>
      );
    case 'DEF':
      return (
        <div
          className={`${iconClass} bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}
        >
          D
        </div>
      );
    case 'MID':
      return (
        <div
          className={`${iconClass} bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}
        >
          M
        </div>
      );
    case 'FWD':
      return (
        <div
          className={`${iconClass} bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-xs`}
        >
          F
        </div>
      );
    default:
      return <User className={`${iconClass} text-gray-500`} />;
  }
};
