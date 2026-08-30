import { Button } from '@/shared/ui/Button';

import { openOptionsPage } from '../api/openOptionsPage';

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
