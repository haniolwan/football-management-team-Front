import { Form, Input, Select } from '../form';
import { Button } from '../button';
import { z } from 'zod';
import { useMarketPlayersMutation } from '@/features/teams/api/get-market-players';

export type Filters = {
  name: string;
  team_name: string;
  askingPrice: string;
  isListed: boolean;
  sortBy: string;
  sortType: string;
};

export const EmptyFilters = {
  name: '',
  team_name: '',
  askingPrice: '',
  sortBy: '',
  sortType: '',
  isListed: false,
};

type Props = {
  submitFilters: (filters: Filters) => void;
};

export const PlayerFilters = ({ submitFilters }: Props) => {
  const filterSchema = z.object({
    name: z.string(),
    team_name: z.string(),
    sortType: z.string(),
    sortBy: z.string(),
  });

  const sortTypeOptions = [
    { label: 'Type', value: '' },
    { label: 'asc', value: 'asc' },
    { label: 'desc', value: 'desc' },
  ];

  const sortByOptions = [
    { label: 'Column', value: '' },
    { label: 'name', value: 'name' },
    { label: 'Team', value: 'team_name' },
    { label: 'Asking price', value: 'askingPrice' },
  ];
  const players = useMarketPlayersMutation();

  return (
    <Form
      className="flex items-center p-3"
      onSubmit={(values) => {
        console.log(values);
        players.mutate(values);
      }}
      schema={filterSchema}
    >
      {({ register }) => (
        <div className="flex gap-4">
          <Input
            type="text"
            placeholder="Name"
            registration={register('name')}
          />
          <Input
            type="text"
            placeholder="Team Name"
            registration={register('team_name')}
          />
          <Select
            options={sortTypeOptions}
            registration={register('sortType')}
          />

          <Select options={sortByOptions} registration={register('sortBy')} />
          <div>
            <Button className="mt-1" isLoading={false} type="submit">
              Apply
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
