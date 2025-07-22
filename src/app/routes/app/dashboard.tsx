import { ContentLayout } from '@/components/layouts';
import { Table } from '@/components/ui/table';
import { MyTeamTable } from '@/components/ui/table/my-team';
import { Tabs } from '@/components/ui/tabs';
import { useTeams } from '@/features/teams/api/get-teams';
import { useUser } from '@/lib/auth';
import { User } from '@/types/api';
import { DollarSign, Search, Users } from 'lucide-react';

const DashboardRoute = () => {
  const tabItems = [
    {
      value: 'my-team',
      label: 'My Team',
      icon: <Users className="h-4 w-4" />,
      content: <MyTeamTable />,
    },
    // {
    //   value: 'transfer-market',
    //   label: 'Transfer Market',
    //   icon: <DollarSign className="h-4 w-4" />,
    //   content: <Table title="Transfer Market" columns={[]} rows={[]} />,
    // },
    // {
    //   value: 'my-transfer-list',
    //   label: 'My Transfer List',
    //   icon: <Search className="h-4 w-4" />,
    //   content: <Table title="My Transfer List" columns={[]} rows={[]} />,
    // },
  ];

  return (
    <ContentLayout title="Dashboard">
      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-5">
        <DollarSign className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-semibold text-green-800">$5,000,000</p>
          <p className="text-sm text-green-600">Transfer Budget</p>
        </div>
      </div>

      <Tabs tabs={tabItems} defaultValue="my-team" />
    </ContentLayout>
  );
};

export default DashboardRoute;
