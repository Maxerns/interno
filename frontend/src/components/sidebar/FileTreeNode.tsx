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
  // State hook passed down from parent if needed for styling
  isExpanded?: boolean; 
}

const FileTreeNode: React.FC<FileTreeNodeProps> = ({ node, onToggle, isExpanded = false }) => {
  if (node.isFolder) {
    return (
      <button
        type="button"
        aria-expanded={isExpanded}
        onClick={() => onToggle(node.id)}
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
    <div
      style={{ padding: '2px 0 2px 8px' }}
    >
      <span>{node.name}</span>
    </div>
  );
};

export default FileTreeNode;
