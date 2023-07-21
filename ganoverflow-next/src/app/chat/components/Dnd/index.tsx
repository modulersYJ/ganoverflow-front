import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Container } from "./Container";
import React from "react";
import { TLoadThisChatHandler } from "@/interfaces/chat";

export function FolderFileNoOrderDND({
  loadThisChatHandler,
}: {
  loadThisChatHandler: TLoadThisChatHandler;
}) {
  return (
    <div className="FolderFileNoOrderDND">
      <DndProvider backend={HTML5Backend}>
        <Container loadThisChatHandler={loadThisChatHandler} />
      </DndProvider>
    </div>
  );
}
