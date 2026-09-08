import { useState } from 'react';
import FileSidebar from './components/sidebar/FileSidebar';

function App() {
  const [_openPaths, setOpenPaths] = useState<string[]>([]);
  const [activePath, setActivePath] = useState<string | null>(null);

  function openFile(path: string) {
    setOpenPaths((prev) => (prev.includes(path) ? prev : [...prev, path]));
    setActivePath(path);
  }
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <FileSidebar onOpenFile={openFile} />

      <main style={{ flex: 1, padding: '2rem' }}>
        <h1>Interno</h1>
        {activePath ?? 'Select a file'}
      </main>
    </div>
  );
}

export default App;
