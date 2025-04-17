import { PageBody, PageHeader } from '@kit/ui/page';

import { routeIcons } from '~/config/navigation.config';

import Dashboard from './_components/dashboard';

export default function HomePage() {
  return (
    <>
      <PageHeader title="Dashboard" icon={routeIcons.dashboard} />

      <PageBody>
        <Dashboard />
      </PageBody>
    </>
  );
}
