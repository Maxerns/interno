import React, { useState, useCallback } from 'react';
import { FileService, DirEntry } from '../../../bindings/github.com/Maxerns/interno';
import FileTree, { type FileSystemNode } from './FileTree';

// Joins a parent dir and entry name without doubling slashes if the
// parent already ends in "/" (e.g. a trailing-slash dialog result).
const joinPath = (parent: string, name: string) =>
  `${parent.replace(/\/+$/, '')}/${name}`;

const FileSidebar: React.FC = () => {
  const [rootPath, setRootPath] = useState<string | null>(null);
  const [entries, setEntries] = useState<DirEntry[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set());
  const [childrenMap, setChildrenMap] = useState<Record<string, DirEntry[]>>({});

  async function openFolder() {
    setError(null);
    const path = await FileService.OpenFolderDialog();
    if (!path) return; // cancel = "" + nil, just no-op
    setRootPath(path);
    setOpenFolders(new Set());
    setChildrenMap({});
    try {
      setEntries((await FileService.ReadDir(path)) ?? []);
    } catch (e) {
      setError(String(e));
    }
  }

  const handleToggle = useCallback((id: string) => {
    const isOpen = openFolders.has(id);
    setOpenFolders((prev) => {
      const next = new Set(prev);
      if (isOpen) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
    // First expand: lazily load this folder's children (id is the full path).
    if (!isOpen && !childrenMap[id]) {
      FileService.ReadDir(id).then(
        (kids) => setChildrenMap((m) => (m[id] ? m : { ...m, [id]: kids ?? [] })),
        (e) => setError(String(e)),
      );
    }
  }, [openFolders, childrenMap]);

  const buildNodes = useCallback((ents: DirEntry[], parentPath: string): FileSystemNode[] => {
    return ents.map((entry) => {
      const id = joinPath(parentPath, entry.name);
      const node: FileSystemNode = { id, name: entry.name, isFolder: entry.isDir };
      if (entry.isDir && openFolders.has(id) && childrenMap[id]) {
        node.children = buildNodes(childrenMap[id], id);
      }
      return node;
    });
  }, [openFolders, childrenMap]);

  return (
    <div className="bg-gray-50 border-r border-gray-200 p-4 w-64 h-full overflow-y-auto">
      <h3 className="text-lg font-semibold mb-3 text-gray-800">Project Navigator</h3>
      <button onClick={openFolder}>Open Folder</button>
      {error && <p>{error}</p>}

      {/* The FileTree component renders the root directory contents */}
      <div className='pt-1'>
        <FileTree
          nodes={rootPath ? buildNodes(entries, rootPath) : []}
          onToggle={handleToggle}
          openFolders={openFolders}
        />
      </div>

    </div>
  );
};

export default FileSidebar;
