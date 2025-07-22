import { useUser } from '@/lib/auth';
import { Table } from './table';
import { useTeams } from '@/features/teams/api/get-teams';
import { useState } from 'react';
import { EmptyFilters, Filters } from './players-filters';
import { usePlayers } from '@/features/teams/api/get-players';

const tableCols = [
  'Player',
  'Position',
  'Nationality',
  'Rating',
  'Value',
  'Status',
  'Action',
];

export const MyTeamTable = () => {
  const { data: userData } = useUser();

  const [filters, setFilters] = useState<Filters>(EmptyFilters);

  const submitFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };

  const { data, isLoading } = usePlayers({ teamId: userData.teamId });

  console.log(data);
  return (
    <Table
      title="My Team"
      columns={tableCols}
      players={data?.players}
      isLoading={isLoading}
      submitFilters={submitFilters}
    />
  );
};
