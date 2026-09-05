import FileSidebar from './components/sidebar/FileSidebar';

function App() {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <FileSidebar />

      <main style={{ flex: 1, padding: '2rem' }}>
        <h1>Interno</h1>
        <p>Select a file from the project navigator to get started.</p>
      </main>
    </div>
  );
}

export default App
