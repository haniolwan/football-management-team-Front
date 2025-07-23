import { Table } from './table';
import { useState } from 'react';
import { EmptyFilters, Filters } from './players-filters';
import { Player } from './types';

const tableCols = [
  'Player',
  'Position',
  'Nationality',
  'Rating',
  'Value',
  'Status',
  'Action',
];

export const MyTransfersTable = ({
  players,
  isLoading,
}: {
  players?: Player[];
  isLoading: boolean;
}) => {
  const listedPlayers = players?.filter((pl) => pl.isListed);
  return (
    <Table
      pageId="my-transfer-list"
      title="My Transfers list"
      columns={tableCols}
      players={listedPlayers}
      isLoading={isLoading}
    />
  );
};
