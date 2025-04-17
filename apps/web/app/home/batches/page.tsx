import { PageBody, PageHeader } from '@kit/ui/page';

import { routeIcons } from '~/config/navigation.config';

export default function BatchesPage() {
  return (
    <>
      <PageHeader title="Batches" icon={routeIcons.batches} />

      <PageBody>
        <div className="animate-in fade-in flex flex-col space-y-4 pb-36 duration-500">
          Batches
        </div>
      </PageBody>
    </>
  );
}
