import { Table } from './table';

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
  return (
    <Table title="My Team" columns={tableCols} players={[]} isLoading={true} />
  );
};
