"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "../box";
import { CreateBlogQuery } from "@src/services";
import { createBlog } from "@src/services";

interface RichTextEditorProps {
  onSave?: (content: CreateBlogQuery) => Promise<{ success: boolean }>;
}

export default function RichTextEditor({ onSave }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  // Execute text formatting commands
  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
    updateToolbarPosition();
  };

  // Handle saving content
  const handleSubmit = async () => {
    const rawHTML = editorRef.current ? editorRef.current.innerHTML : "";

    console.log("raw:", rawHTML);

    console.log("Content:", content);
    try {
      const response = await createBlog({ content: rawHTML, title: "My Blog" });
      if (response) {
        console.log("Content saved successfully!");
      } else {
        console.error("Error saving content");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Update toolbar position
  const updateToolbarPosition = () => {
    if (editorRef.current) {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        const editorRect = editorRef.current.getBoundingClientRect();

        setToolbarPosition({
          top: rect.top - editorRect.top - 40,
          left: rect.left - editorRect.left,
        });

        setShowToolbar(true); // Show toolbar when text is selected
      }
    }
  };

  useEffect(() => {
    document.addEventListener("selectionchange", updateToolbarPosition);
    return () => {
      document.removeEventListener("selectionchange", updateToolbarPosition);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        toolbarRef.current &&
        !toolbarRef.current.contains(event.target as Node) &&
        editorRef.current &&
        !editorRef.current.contains(event.target as Node)
      ) {
        setTimeout(() => setShowToolbar(false), 300);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  console.log("toolbarPosition:", toolbarPosition);

  return (
    <Box className="relative">
      <AnimatePresence>
        {showToolbar && (
          <motion.div
            key="toolbar"
            ref={toolbarRef}
            initial={{ opacity: 0, scale: 0.8, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute p-2 bg-white border rounded shadow-lg space-x-2 z-10"
            style={{
              top: `${toolbarPosition.top}px`,
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
            <button onClick={() => formatText("bold")} className="p-2 border">
              B
            </button>
            <button onClick={() => formatText("italic")} className="p-2 border">
              I
            </button>
            <button
              onClick={() => formatText("underline")}
              className="p-2 border"
            >
              U
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        className="border p-3 min-h-[200px] outline-none ck_editor"
        onInput={() => setContent(editorRef.current?.innerHTML || "")}
        onBlur={() => setTimeout(() => setShowToolbar(false), 200)} // Hide toolbar when clicking outside
      ></div>
      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white rounded"
      >
        Publish Blog
      </button>
    </Box>
  );
}
