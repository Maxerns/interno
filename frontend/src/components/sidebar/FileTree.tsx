import React from 'react';
import FileTreeNode from './FileTreeNode';

export type FileSystemNode = {
  id: string;
  name: string;
  isFolder: boolean;
  children?: FileSystemNode[];
};

interface FileTreeProps {
  nodes: FileSystemNode[];
  onToggle: (id: string) => void;
  openFolders: Set<string>;
}

const FileTree: React.FC<FileTreeProps> = ({ nodes, onToggle, openFolders }) => {
  return (
    <div>
      {nodes.map((node) => {
        const isExpanded = node.isFolder && openFolders.has(node.id);
        return (
          <React.Fragment key={node.id}>
            {/* Render the current node */}
            <FileTreeNode
              node={node}
              onToggle={onToggle}
              isExpanded={isExpanded}
            />

            {/* If expanded, recursively render its children */}
            {isExpanded && node.children && (
              <div style={{ marginLeft: 12 }}>
                <FileTree nodes={node.children} onToggle={onToggle} openFolders={openFolders} />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default FileTree;
