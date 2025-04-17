import { PageBody, PageHeader } from '@kit/ui/page';

import { routeIcons } from '~/config/navigation.config';

export default function ListsPage() {
  return (
    <>
      <PageHeader title="Lists" icon={routeIcons.lists} />

      <PageBody>
        <div className="animate-in fade-in flex flex-col space-y-4 pb-36 duration-500">
          Lists
        </div>
      </PageBody>
    </>
  );
}
