import {
  Bot,
  Building,
  Contact,
  LayoutDashboard,
  LayoutList,
  List,
  PhoneCall,
  Settings,
} from 'lucide-react';
import { z } from 'zod';

import { NavigationConfigSchema } from '@kit/ui/navigation-schema';

import pathsConfig from '~/config/paths.config';

const iconClasses = 'w-4';

const routes = [
  {
    label: 'AI Calling',
    children: [
      {
        label: 'Dashboard',
        path: pathsConfig.app.home,
        Icon: <LayoutDashboard className={iconClasses} />,
        end: true,
      },
      {
        label: 'Batches',
        path: pathsConfig.app.batches,
        Icon: <List className={iconClasses} />,
      },
      {
        label: 'Calls',
        path: pathsConfig.app.calls,
        Icon: <PhoneCall className={iconClasses} />,
      },
      {
        label: 'Bots',
        path: pathsConfig.app.bots,
        Icon: <Bot className={iconClasses} />,
      },
    ],
  },
  {
    label: 'Contacts',
    children: [
      {
        label: 'Contacts',
        path: pathsConfig.app.contacts,
        Icon: <Contact className={iconClasses} />,
      },
      {
        label: 'Lists',
        path: pathsConfig.app.lists,
        Icon: <LayoutList className={iconClasses} />,
      },
    ],
  },
  {
    label: 'Real Estate',
    children: [
      {
        label: 'Properties',
        path: pathsConfig.app.properties,
        Icon: <Building className={iconClasses} />,
      },
    ],
  },
] satisfies z.infer<typeof NavigationConfigSchema>['routes'];

// Admin navigation for the bottom of the sidebar
const adminRoutes = [
  {
    label: 'Admin',
    children: [
      {
        label: 'Settings',
        path: pathsConfig.app.profileSettings,
        Icon: <Settings className={iconClasses} />,
      },
    ],
  },
] satisfies z.infer<typeof NavigationConfigSchema>['routes'];

export const navigationConfig = NavigationConfigSchema.parse({
  routes,
  style: process.env.NEXT_PUBLIC_NAVIGATION_STYLE,
  sidebarCollapsed: process.env.NEXT_PUBLIC_HOME_SIDEBAR_COLLAPSED,
});

export const mobileNavigationConfig = NavigationConfigSchema.parse({
  routes: [...routes, ...adminRoutes],
  style: process.env.NEXT_PUBLIC_NAVIGATION_STYLE,
  sidebarCollapsed: process.env.NEXT_PUBLIC_HOME_SIDEBAR_COLLAPSED,
});

export const adminNavigationConfig = NavigationConfigSchema.parse({
  routes: adminRoutes,
  style: process.env.NEXT_PUBLIC_NAVIGATION_STYLE,
  sidebarCollapsed: process.env.NEXT_PUBLIC_HOME_SIDEBAR_COLLAPSED,
});

export const routeIcons = {
  dashboard: <LayoutDashboard className={iconClasses} />,
  batches: <List className={iconClasses} />,
  calls: <PhoneCall className={iconClasses} />,
  bots: <Bot className={iconClasses} />,
  contacts: <Contact className={iconClasses} />,
  lists: <LayoutList className={iconClasses} />,
  properties: <Building className={iconClasses} />,
  settings: <Settings className={iconClasses} />,
};
