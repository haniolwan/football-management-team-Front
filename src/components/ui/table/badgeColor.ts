export const getPositionBadgeColor = (position: string) => {
  switch (position) {
    case 'Goalkeeper':
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
    case 'Defender':
      return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
    case 'Midfielder':
      return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
    case 'Attacker':
      return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
    default:
      return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200';
  }
};

export const formatValue = (value: number) => {
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(1)}M`;
  } else if (value >= 1000) {
    return `$${(value / 1000).toFixed(0)}K`;
  }
  return `$${value}`;
};

export const getRatingColor = (rating: number) => {
  if (rating >= 90) return 'text-green-600 dark:text-green-400';
  if (rating >= 80) return 'text-blue-600 dark:text-blue-400';
  if (rating >= 70) return 'text-yellow-600 dark:text-yellow-400';
  return 'text-gray-600 dark:text-gray-400';
};
