"use client";
import { memo } from "react";
import { Editor } from "@tiptap/react";
import { BubbleMenu } from "@tiptap/react/menus";
import BlockStyleTool from "./ToolBar/BlockStyleTool";
import ButtonTool from "./ToolBar/ButtonTool";
import EditTableTool from "./ToolBar/EditTableTool";
function BubbleMenuBar({ editor }: { editor: Editor | null }) {
  return (
    <>
      {editor && (
        <BubbleMenu
          options={{
            strategy: "absolute",
            placement: "top-end",
          }}
          editor={editor}
        >
          <div className="bg-white flex items-center flex-wrap gap-x-0.5 border border-gray-300 shadow-md">
            <BlockStyleTool editor={editor} />

            <ButtonTool editor={editor} visibleTools={[2, 3, 4, 5, 6, 7]} />

            <EditTableTool editor={editor} />
          </div>
        </BubbleMenu>
      )}
    </>
  );
}

export default memo(BubbleMenuBar);
