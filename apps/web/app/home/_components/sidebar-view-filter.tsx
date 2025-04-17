'use client';

import { useState } from 'react';

import { Filter } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@kit/ui/dropdown-menu';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  useSidebar,
} from '@kit/ui/shadcn-sidebar';
import { Switch } from '@kit/ui/switch';
import { Tabs, TabsList, TabsTrigger } from '@kit/ui/tabs';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@kit/ui/tooltip';
import { Trans } from '@kit/ui/trans';
import { cn } from '@kit/ui/utils';

type ViewType = 'sales' | 'rentals' | 'all';
type ScopeType = 'agent' | 'team';

export function SidebarViewFilter() {
  const { open } = useSidebar();
  const [viewType, setViewType] = useState<ViewType>('all');
  const [scopeType, setScopeType] = useState<ScopeType>('agent');

  // Handle the toggle switch change
  const handleScopeChange = () => {
    setScopeType(scopeType === 'agent' ? 'team' : 'agent');
  };

  // Get display name based on view type
  const getViewTypeDisplayName = (type: ViewType) => {
    switch (type) {
      case 'sales':
        return 'Sales';
      case 'rentals':
        return 'Rentals';
      case 'all':
        return 'All';
      default:
        return 'All';
    }
  };

  return (
    <SidebarGroup>
      <SidebarGroupLabel className={cn({ hidden: !open })}>
        <Trans i18nKey="View" defaults="View" />
      </SidebarGroupLabel>

      <SidebarGroupContent>
        <div className="space-y-4 px-1">
          {/* Tabs filter - Expanded state */}
          {open ? (
            <Tabs
              value={viewType}
              onValueChange={(v) => setViewType(v as ViewType)}
              className="w-full"
            >
              <TabsList className="h-fit w-full justify-between bg-transparent p-0">
                <TabsTrigger
                  value="sales"
                  className="bg-brand-50 data-[state=active]:bg-brand-600 data-[state=active]:text-brand-slate-50 text-brand-slate-700 flex-1 rounded-xs rounded-r-none text-xs"
                >
                  Sales
                </TabsTrigger>
                <TabsTrigger
                  value="rentals"
                  className="bg-brand-50 data-[state=active]:bg-brand-600 data-[state=active]:text-brand-slate-50 text-brand-slate-700 flex-1 rounded-none text-xs"
                >
                  Rentals
                </TabsTrigger>
                <TabsTrigger
                  value="all"
                  className="bg-brand-50 data-[state=active]:bg-brand-600 data-[state=active]:text-brand-slate-50 text-brand-slate-700 flex-1 rounded-xs rounded-l-none text-xs"
                >
                  All
                </TabsTrigger>
              </TabsList>
            </Tabs>
          ) : (
            /* Dropdown menu - Collapsed state */
            <div className="flex justify-center">
              <DropdownMenu>
                <TooltipProvider delayDuration={300}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger className="bg-sidebar-accent/10 hover:bg-sidebar-accent/20 text-sidebar-accent-foreground flex h-8 w-8 items-center justify-center rounded-md focus:outline-none">
                        <Filter className="h-4 w-4" />
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent side="right" align="center">
                      <p>Filter by: {getViewTypeDisplayName(viewType)}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <DropdownMenuContent align="center" className="w-32">
                  <DropdownMenuItem
                    className={cn(
                      'text-xs',
                      viewType === 'sales' && 'bg-accent',
                    )}
                    onClick={() => setViewType('sales')}
                  >
                    Sales
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn(
                      'text-xs',
                      viewType === 'rentals' && 'bg-accent',
                    )}
                    onClick={() => setViewType('rentals')}
                  >
                    Rentals
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className={cn('text-xs', viewType === 'all' && 'bg-accent')}
                    onClick={() => setViewType('all')}
                  >
                    All
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}

          {/* Switch filter */}
          {open ? (
            /* Switch filter - Expanded state */
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center justify-between gap-2">
                <div
                  className={cn('cursor-pointer text-xs font-medium')}
                  onClick={() => setScopeType('agent')}
                >
                  Agent
                </div>

                <Switch
                  checked={scopeType === 'team'}
                  onCheckedChange={handleScopeChange}
                  id="scope-toggle"
                  aria-label="Toggle between agent and team view"
                />

                <div
                  className={cn('cursor-pointer text-xs font-medium')}
                  onClick={() => setScopeType('team')}
                >
                  Team
                </div>
              </div>
            </div>
          ) : (
            /* Switch filter - Collapsed state */
            <div className="flex flex-col items-center gap-2">
              <div className="text-muted-foreground text-[10px]">
                {scopeType === 'agent' ? 'Agent' : 'Team'}
              </div>

              <TooltipProvider delayDuration={300}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="flex items-center">
                      <Switch
                        checked={scopeType === 'team'}
                        onCheckedChange={handleScopeChange}
                        id="scope-toggle"
                        aria-label="Toggle between agent and team view"
                      />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    <p>
                      View Scope: {scopeType === 'agent' ? 'Agent' : 'Team'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          )}
        </div>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
