import { Table } from './table';
import { useState } from 'react';
import { EmptyFilters, Filters } from './players-filters';
import { Player } from './types';
import { useMarketPlayers } from '@/features/teams/api/get-market-players';

const tableCols = [
  'Player',
  'Position',
  'Nationality',
  'Rating',
  'Value',
  'Status',
  'Action',
];

export const TransferMarketTable = () => {
  const [filters, setFilters] = useState<Filters>(EmptyFilters);

  const submitFilters = (newFilters: Filters) => {
    setFilters(newFilters);
  };
  const { data } = useMarketPlayers({ filters: filters });

  return (
    <Table
      pageId="transfer-market"
      title="Transfer Market"
      columns={tableCols}
      players={data}
      isLoading={false}
      submitFilters={submitFilters}
    />
  );
};
