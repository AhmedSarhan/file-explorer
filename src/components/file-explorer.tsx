import React, { useState } from "react";
import {
  FaAngleDown,
  FaAngleRight,
  FaFile,
  FaFileCirclePlus,
  FaFolderClosed,
  FaFolderOpen,
  FaFolderPlus,
  FaPenToSquare,
  FaTrashCan,
} from "react-icons/fa6";

interface ShowInput {
  visible: boolean;
  isFolder: boolean | null;
}

export const Folder = ({
  handleInsertNode,
  handleDeleteNode,
  handleUpdateNode,
  explorer,
}: {
  handleInsertNode: (folderId: string, item: string, isFolder: boolean) => void;
  handleDeleteNode: (folderId: string) => void;
  handleUpdateNode: (folderId: string, newName: string) => void;
  explorer: any;
}) => {
  console.log(explorer);

  const [expand, setExpand] = useState(false);
  const [showInput, setShowInput] = useState<ShowInput>({
    visible: false,
    isFolder: null as boolean | null,
  });

  const [showUpdateField, setShowUpdateField] = useState({
    visible: false,
    isFolder: null,
  });

  const handleNewFolder = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isFolder: boolean
  ) => {
    e.stopPropagation();

    setExpand(true);
    setShowInput({
      visible: true,
      isFolder,
    });
  };

  function handleDeleteFolder(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    // isFolder: boolean
  ) {
    e.stopPropagation();

    handleDeleteNode(explorer.id);
  }

  function handleUpdateFolder(newValue: string, isFolder: boolean | null) {
    console.log(newValue);
    setShowUpdateField({
      // @ts-ignore
      isFolder,
      visible: true,
    });
  }

  const addNewFolder = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode, target } = e;
    const inputValue = (target as HTMLInputElement).value;

    if (keyCode === 13 && inputValue) {
      // Logic
      handleInsertNode(explorer.id, inputValue, showInput.isFolder as boolean);
      setShowInput((prevState: ShowInput) => ({
        ...prevState,
        visible: false,
      }));
    }
  };

  const updateNode = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const { keyCode, target } = e;
    const inputValue = (target as HTMLInputElement).value;

    if (keyCode === 13 && inputValue) {
      handleUpdateNode(explorer.id, inputValue);
      setShowUpdateField({ ...showUpdateField, visible: false });
    }
  };

  if (explorer.isFolder) {
    return (
      <div
        style={{
          marginTop: "10px",
        }}
      >
        {!showUpdateField.visible && (
          <div className="folder" onClick={() => setExpand(!expand)}>
            {expand ? (
              <span>
                <FaAngleDown />
              </span>
            ) : (
              <span>
                <FaAngleRight />
              </span>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: "10px",
              }}
            >
              {expand ? (
                <FaFolderOpen style={{ color: "#FFD43B" }} />
              ) : (
                <FaFolderClosed style={{ color: "#FFD43B" }} />
              )}
              <span>{explorer.name}</span>
            </div>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button
                onClick={(e) => handleNewFolder(e, true)}
                style={{ background: "none", border: "none" }}
              >
                <FaFolderPlus />
              </button>
              <button
                onClick={(e) => handleNewFolder(e, false)}
                style={{ background: "none", border: "none" }}
              >
                <FaFileCirclePlus />
              </button>
              <button
                onClick={() => handleUpdateFolder(explorer.name, true)}
                style={{ background: "none", border: "none" }}
              >
                <FaPenToSquare />
              </button>
              <button
                onClick={(e) => handleDeleteFolder(e)}
                style={{ background: "none", border: "none" }}
              >
                <FaTrashCan />
              </button>
            </div>
          </div>
        )}

        <div
          style={{
            display: showUpdateField ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showUpdateField.visible && (
            <div
              className="inputContainer"
              style={{ display: "flex", width: "200px" }}
            >
              <span style={{ marginRight: "1rem" }}>
                {showUpdateField.isFolder ? (
                  <FaFolderClosed style={{ color: "#FFD43B" }} />
                ) : (
                  <FaFile />
                )}
              </span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={(e) => updateNode(e)}
                onBlur={() =>
                  setShowUpdateField({ ...showUpdateField, visible: false })
                }
                autoFocus
              />
            </div>
          )}
        </div>

        <div
          style={{ display: expand ? "block" : "none", paddingLeft: "20px" }}
        >
          {showInput.visible && (
            <div
              className="inputContainer"
              style={{ width: "250px", paddingLeft: "10px" }}
            >
              <span style={{ marginRight: "1rem" }}>
                {showInput.isFolder ? (
                  <FaFolderClosed style={{ color: "#FFD43B" }} />
                ) : (
                  <FaFile />
                )}
              </span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={(e) => addNewFolder(e)}
                onBlur={() => setShowInput({ ...showInput, visible: false })}
                autoFocus
              />
            </div>
          )}
          {explorer.items.map((exp: any) => {
            return (
              <Folder
                key={exp.id}
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleUpdateNode={handleUpdateNode}
                explorer={exp}
              />
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <div className="file">
        {!showUpdateField.visible && (
          <div>
            <i className="fa-file fa-regular"></i>&nbsp;&nbsp;{explorer.name}
          </div>
        )}
        <div
          style={{
            display: showUpdateField ? "block" : "none",
            paddingLeft: "20px",
          }}
        >
          {showUpdateField.visible && (
            <div className="inputContainer" style={{ width: "200px" }}>
              <span style={{ marginRight: "1rem" }}>
                {showUpdateField.isFolder ? (
                  <FaFolderClosed style={{ color: "#FFD43B" }} />
                ) : (
                  <FaFile />
                )}
              </span>
              <input
                type="text"
                className="inputContainer__input"
                onKeyDown={(e) => updateNode(e)}
                onBlur={() =>
                  setShowUpdateField({ ...showUpdateField, visible: false })
                }
                autoFocus
              />
            </div>
          )}
        </div>

        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <button
            onClick={() => handleUpdateFolder(explorer.name, false)}
            style={{ background: "none", border: "none" }}
          >
            <FaPenToSquare />
          </button>
          <button className="deleteBtn" onClick={(e) => handleDeleteFolder(e)}>
            <FaTrashCan />
          </button>
        </div>
      </div>
    );
  }
};
