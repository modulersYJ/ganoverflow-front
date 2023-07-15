import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { RecoilRoot } from "recoil";
import { Container } from "./Container";
import React from "react";

export function FolderFileNoOrderDND() {
  return (
    <div className="FolderFileNoOrderDND">
      <RecoilRoot>
        <DndProvider backend={HTML5Backend}>
          <Container />
        </DndProvider>
      </RecoilRoot>
    </div>
  );
}
