import { motion } from "framer-motion";
import React, { forwardRef } from "react";

interface ToolbarProps {
  formatText: (command: string, value?: string) => void;
  toolbarPosition: { top: number; left: number };
}

const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(
  { formatText, toolbarPosition },
  ref
) {
  return (
    <motion.div
      key="toolbar"
      ref={ref}
      initial={{ opacity: 0, scale: 0.8, y: -10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.8, y: -10 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="absolute p-2 bg-white border rounded shadow-lg space-x-2 z-10"
      style={{
        top: `${toolbarPosition.top + 50}px`,
        left: `${toolbarPosition.left}px`,
      }}
    >
      <button
        onClick={() => formatText("formatBlock", "h1")}
        className="p-2 border"
      >
        Title
      </button>
      <button
        onClick={() => formatText("formatBlock", "h2")}
        className="p-2 border"
      >
        Subtitle
      </button>
      <button
        onClick={() => formatText("formatBlock", "p")}
        className="p-2 border"
      >
        Description
      </button>
      <button
        onClick={() => {
          const url = prompt("Enter the URL");
          if (url) formatText("createLink", url);
        }}
        className="p-2 border"
      >
        Link
      </button>
      <button
        onClick={() => {
          const input = document.createElement("input");
          input.type = "file";
          input.accept = "image/*";

          input.onchange = async (event) => {
            const file = (event.target as HTMLInputElement).files?.[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = () => {
                const imageUrl = reader.result as string;
                formatText("insertImage", imageUrl);
              };
              reader.readAsDataURL(file);
            }
          };

          input.click();
        }}
        className="p-2 border"
      >
        Image
      </button>
      <button
        onClick={() => formatText("bold")}
        className="p-2 border font-bold"
      >
        B
      </button>
      <button
        onClick={() => formatText("italic")}
        className="p-2 border italic"
      >
        I
      </button>
      <button onClick={() => formatText("underline")} className="p-2 border">
        U
      </button>
    </motion.div>
  );
});

Toolbar.displayName = "Toolbar";

export default Toolbar;
