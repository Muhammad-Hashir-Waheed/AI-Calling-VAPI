import type { User } from '@supabase/supabase-js';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarNavigation,
  SidebarTrigger,
} from '@kit/ui/shadcn-sidebar';

import { AppLogo } from '~/components/app-logo';
import { ProfileAccountDropdownContainer } from '~/components/personal-account-dropdown-container';
import {
  adminNavigationConfig,
  navigationConfig,
} from '~/config/navigation.config';
import { Tables } from '~/lib/database.types';

import { SidebarViewFilter } from './sidebar-view-filter';

export function HomeSidebar(props: {
  account?: Tables<'accounts'>;
  user: User;
}) {
  return (
    <Sidebar collapsible={'icon'}>
      <SidebarHeader
        className={
          'mb-8 h-16 justify-center group-data-[state=expanded]:px-9 group-data-[state=expanded]:pt-12'
        }
      >
        <div
          className={
            'flex items-center justify-between space-x-2 group-data-[state=collapsed]:flex-col-reverse group-data-[state=collapsed]:gap-2'
          }
        >
          <div>
            <AppLogo className={'max-w-full'} />
          </div>
          <SidebarTrigger className="text-muted-foreground hover:text-secondary-foreground hidden h-4.5 w-4.5 cursor-pointer lg:inline-flex" />
        </div>
      </SidebarHeader>

      <SidebarContent className="flex flex-1 flex-col group-data-[state=expanded]:px-6">
        <SidebarNavigation config={navigationConfig} />

        <div className="mt-auto pt-4">
          <div className="pt-2">
            <SidebarViewFilter />
          </div>
          <SidebarNavigation config={adminNavigationConfig} />
        </div>
      </SidebarContent>

      <SidebarFooter>
        <ProfileAccountDropdownContainer
          user={props.user}
          account={props.account}
        />
      </SidebarFooter>
    </Sidebar>
  );
}
