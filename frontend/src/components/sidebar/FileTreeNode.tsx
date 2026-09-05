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
  const handleToggleClick = () => {
    if (node.isFolder) {
      onToggle(node.id);
    }
  };

  return (
    <div
      onClick={handleToggleClick}
      style={{ cursor: node.isFolder ? 'pointer' : 'default', padding: '2px 0 2px 8px' }}
    >
      <span>{node.isFolder ? (isExpanded ? '▾ ' : '▸ ') : ''}</span>
      <span>{node.name}</span>
    </div>
  );
};

export default FileTreeNode;
