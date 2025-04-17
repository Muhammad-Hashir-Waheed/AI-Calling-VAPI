import { PageBody, PageHeader } from '@kit/ui/page';

import { routeIcons } from '~/config/navigation.config';

export default function CallsPage() {
  return (
    <>
      <PageHeader title="Calls" icon={routeIcons.calls} />

      <PageBody>
        <div className="animate-in fade-in flex flex-col space-y-4 pb-36 duration-500">
          Calls
        </div>
      </PageBody>
    </>
  );
}
