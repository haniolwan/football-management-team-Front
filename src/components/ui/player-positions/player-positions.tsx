type Player = {
  position: 'Attacker' | 'Midfielder' | 'Defender' | 'Goalkeeper';
};

type Props = {
  players?: Player[];
};

const STYLES: Record<Player['position'], { bg: string; text: string }> = {
  Attacker: {
    bg: 'bg-red-100',
    text: 'text-red-700',
  },
  Midfielder: {
    bg: 'bg-blue-100',
    text: 'text-blue-700',
  },
  Defender: {
    bg: 'bg-green-100',
    text: 'text-green-700',
  },
  Goalkeeper: {
    bg: 'bg-yellow-100',
    text: 'text-yellow-700',
  },
};

export const PlayerPositions = ({ players }: Props) => {
  const counts = players?.reduce(
    (acc, player) => {
      acc[player.position] = (acc[player.position] || 0) + 1;
      return acc;
    },
    {} as Record<Player['position'], number>,
  );

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
      {Object.entries(STYLES).map(([position, { bg, text }]) => (
        <div
          key={position}
          className={`rounded-2xl p-4 shadow-sm ${bg} ${text} flex flex-col items-center justify-center`}
        >
          <span className="text-2xl font-semibold">
            {counts?.[position as Player['position']] || 0}
          </span>
          <span className="text-sm mt-1 tracking-wide">{position}</span>
        </div>
      ))}
    </div>
  );
};
