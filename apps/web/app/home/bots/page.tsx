import { PageBody, PageHeader } from '@kit/ui/page';

import { routeIcons } from '~/config/navigation.config';

export default function BotsPage() {
  return (
    <>
      <PageHeader title="Bots" icon={routeIcons.bots} />

      <PageBody>
        <div className="animate-in fade-in flex flex-col space-y-4 pb-36 duration-500">
          Bots
        </div>
      </PageBody>
    </>
  );
}
