import { ContentLayout } from '@/components/layouts';
import { PlayerPositions } from '@/components/ui/player-positions/player-positions';
import { MyTeamTable } from '@/components/ui/table/my-team';
import { MyTransfersTable } from '@/components/ui/table/my-transfers-table';
import { TransferMarketTable } from '@/components/ui/table/transfer-market-table';
import { Tabs } from '@/components/ui/tabs';
import { usePlayers } from '@/features/teams/api/get-players';
import { useUser } from '@/lib/auth';
import { formatBudget } from '@/utils/budget-formatter';
import { DollarSign, Search, Users } from 'lucide-react';

const DashboardRoute = () => {
  const { data: userData } = useUser();
  const { data, isLoading } = usePlayers({ teamId: userData.teamId });

  const tabItems = [
    {
      value: 'my-team',
      label: 'My Team',
      icon: <Users className="h-4 w-4" />,
      content: <MyTeamTable players={data?.players} isLoading={isLoading} />,
    },
    {
      value: 'transfer-market',
      label: 'Transfer Market',
      icon: <DollarSign className="h-4 w-4" />,
      content: <TransferMarketTable />,
    },
    {
      value: 'my-transfer-list',
      label: 'My Transfer List',
      icon: <Search className="h-4 w-4" />,
      content: (
        <MyTransfersTable players={data?.players} isLoading={isLoading} />
      ),
    },
  ];

  return (
    <ContentLayout title="Dashboard">
      <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg mb-5">
        <DollarSign className="h-5 w-5 text-green-600" />
        <div>
          <p className="font-semibold text-green-800">
            {formatBudget(data?.budget)}
          </p>
          <p className="text-sm text-green-600">Transfer Budget</p>
        </div>
      </div>
      <PlayerPositions players={data?.players} />

      <Tabs tabs={tabItems} defaultValue="my-team" />
    </ContentLayout>
  );
};

export default DashboardRoute;
