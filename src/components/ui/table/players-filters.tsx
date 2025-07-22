import React, { useState } from 'react';

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
  const [filters, setFilters] = useState(EmptyFilters);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    submitFilters(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-4 max-w-md mt-3">
      <input
        type="text"
        name="name"
        value={filters.name}
        onChange={handleChange}
        placeholder="Player Name"
        className="border p-2 rounded"
      />

      {/* <select
        name="team_name"
        value={filters.team_name}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Select Team</option>
        <option value="Barcelona">Barcelona</option>
        <option value="Real Madrid">Real Madrid</option>
        <option value="Liverpool">Liverpool</option>
      </select>

      <select
        name="sortType"
        value={filters.sortType}
        onChange={(e) => {
          setFilters((prev) => ({
            ...prev,
            sortBy: 'askingPrice',
            sortType: e.target.value,
          }));
        }}
        className="border p-2 rounded"
      >
        <option value="">Sort by Asking Price</option>
        <option value="asc">Lowest to Highest</option>
        <option value="desc">Highest to Lowest</option>
      </select> */}

      <button
        type="submit"
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Filter
      </button>
    </form>
  );
};
