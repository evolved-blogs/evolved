"use client";
import { useState, useRef } from "react";
export default function RichTextEditor() {
  const editorRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>("");
  // Execute text formatting commands
  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
  };
  // Handle saving content
  const handleSubmit = async () => {
    try {
      const response = await fetch("/api/save-content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      });
      if (response.ok) {
        console.log("Content saved successfully!");
      } else {
        console.error("Error saving content");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <div className="p-4 border rounded-lg w-full max-w-2xl mx-auto">
      {/* Toolbar */}
      <div className="mb-2 space-x-2">
        <button onClick={() => formatText("bold")} className="p-2 border">
          B
        </button>
        <button onClick={() => formatText("italic")} className="p-2 border">
          I
        </button>
        <button onClick={() => formatText("underline")} className="p-2 border">
          U
        </button>
        <button
          onClick={() => formatText("insertUnorderedList")}
          className="p-2 border"
        >
          • List
        </button>
      </div>
      {/* Editable Content Area */}
      <div
        ref={editorRef}
        contentEditable
        className="border p-3 min-h-[200px] outline-none"
        onInput={() => setContent(editorRef.current?.innerHTML || "")}
      />
      {/* Save Button */}
      <button
        onClick={handleSubmit}
        className="mt-4 p-2 bg-blue-500 text-white"
      >
        Save Content
      </button>
      {/* Preview Section */}
      <h2 className="mt-6 text-lg font-bold">Preview:</h2>
      <div
        className="border p-3 min-h-[200px] bg-gray-100"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  );
}
