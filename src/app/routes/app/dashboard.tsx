import { ContentLayout } from '@/components/layouts';
import { Tabs } from '@/components/ui/tabs';
import { useUser } from '@/lib/auth';
import { DollarSign, EditIcon, Lock, Search, User, Users } from 'lucide-react';

const DashboardRoute = () => {
  const user = useUser();

  const tabItems = [
    {
      value: 'my-team',
      label: 'My Team',
      icon: <Users className="h-4 w-4" />,
      content: <p>My Team Content</p>,
    },
    {
      value: 'transfer-market',
      label: 'Transfer Market',
      icon: <DollarSign className="h-4 w-4" />,
      content: <p>Transfer Market Content</p>,
    },
    {
      value: 'my-transfer-list',
      label: 'My Transfer List',
      icon: <Search className="h-4 w-4" />,
      content: <p>Transfer List</p>,
    },
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

      <Tabs tabs={tabItems} defaultValue="account" />
    </ContentLayout>
  );
};

export default DashboardRoute;
