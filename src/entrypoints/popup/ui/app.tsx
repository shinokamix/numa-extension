import { Button } from '@/shared/ui/button';

import { openOptionsPage } from '../api/open-options-page';

export function App() {
  const handleOpenSettings = () => {
    void openOptionsPage();
  };

  return (
    <main className="p-3">
      <Button type="button" onClick={handleOpenSettings}>
        Open settings
      </Button>
    </main>
  );
}
