import React from 'react';

// Define a simple type for files/folders
type FileSystemNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children?: FileSystemNode[];
};

interface FileTreeNodeProps {
  node: FileSystemNode;
  // Function to handle toggling (expanding/collapsing) a folder
  onToggle: (id: string) => void;
  // Function to handle selecting a file/folder
  onSelect: (id: string) => void;
  // State hook passed down from parent if needed for styling
  isExpanded?: boolean;
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({
  node,
  onToggle,
  onSelect,
  isExpanded = false,
}) => {
  if (node.isFolder) {
    return (
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => (node.isFolder ? onToggle(node.id) : onSelect(node.id))}     
        style={{
          display: 'block',
          width: '100%',
          background: 'transparent',
          border: 0,
          color: 'inherit',
          font: 'inherit',
          textAlign: 'left',
          cursor: 'pointer',
          padding: '2px 0 2px 8px',
        }}
      >
        <span aria-hidden="true">{isExpanded ? '▾ ' : '▸ '}</span>
        <span>{node.name}</span>
      </button>
    );
  }

  return (
    <div onClick={() => onSelect(node.id)} style={{ padding: '2px 0 2px 8px', cursor: 'pointer' }}>
      <span>{node.name}</span>
    </div>
  );
};

export default FileTreeNode;
