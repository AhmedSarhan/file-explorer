import { useState } from "react";
import { useTraverseTree } from "./hooks/use-traverse-tree";
import explorer from "./data/explorer.json";
import "./App.css";
import { Folder } from "./components/file-explorer";

function App() {
  const [explorerData, setExplorerData] = useState(explorer);

  const { insertNode, deleteNode, updateNode } = useTraverseTree();

  const handleInsertNode = (
    folderId: string,
    item: string,
    isFolder: boolean
  ) => {
    const finalTree = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  const handleDeleteNode = (nodeId: string) => {
    const tempTree = deleteNode(explorerData, -1, nodeId);
    setExplorerData(tempTree);
  };

  const handleUpdateNode = (nodeId: string, newName: string) => {
    const updatedTree = updateNode(explorer, nodeId, newName);
    setExplorerData(updatedTree);
  };

  return (
    <div className="App">
      <Folder
        handleInsertNode={handleInsertNode}
        handleDeleteNode={handleDeleteNode}
        handleUpdateNode={handleUpdateNode}
        explorer={explorerData}
      />
    </div>
  );
}

export default App;
