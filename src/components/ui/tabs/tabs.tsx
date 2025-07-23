'use client';

import * as TabsPrimitive from '@radix-ui/react-tabs';
import { Button } from '@/components/ui/button';
import { cn } from '@/utils/cn';
import { useState } from 'react';

type Tab = {
  value: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
};

export function Tabs({ tabs, defaultValue, className }: TabsProps) {
  const [selectedTab, setSelectedTab] = useState(
    defaultValue || tabs[0]?.value,
  );

  return (
    <TabsPrimitive.Root
      defaultValue={defaultValue || tabs[0]?.value}
      className={cn('w-full', className)}
      onValueChange={(val) => setSelectedTab(val)}
    >
      <TabsPrimitive.List className="flex max-md:justify-center space-x-2 border-b my-4">
        {tabs.map((tab) => (
          <TabsPrimitive.Trigger asChild key={tab.value} value={tab.value}>
            <Button
              variant="ghost"
              size="lg"
              icon={tab.icon}
              className={cn(
                selectedTab === tab.value
                  ? 'text-green-600 !border-green-600 hover:text-green-700'
                  : 'hover:text-gray-600 hover:border-gray-300',
                'rounded-none border-transparent data-[state=active]:border-primary data-[state=active]:text-green-600',
                'flex flex-row items-center justify-center gap-2 sm:justify-start',
              )}
            >
              {tab.label}
            </Button>
          </TabsPrimitive.Trigger>
        ))}
      </TabsPrimitive.List>

      {tabs.map((tab) => (
        <TabsPrimitive.Content
          key={tab.value}
          value={tab.value}
          className="p-4"
        >
          {tab.content}
        </TabsPrimitive.Content>
      ))}
    </TabsPrimitive.Root>
  );
}
