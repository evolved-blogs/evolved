"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "../box";
import { CreateBlogQuery } from "@src/services";
import { createBlog } from "@src/services";
import Input from "../input/Input";
import { useForm } from "react-hook-form";
import Image from "next/image";

interface RichTextEditorProps {
  onSave?: (content: CreateBlogQuery) => Promise<{ success: boolean }>;
}

export default function RichTextEditor({ onSave }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const { control,getValues } = useForm<CreateBlogQuery>();
  const placeholderText = "Write a fresh blog here...";
  const [typedText, setTypedText] = useState("");
  const [image, setImage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragging, setDragging] = useState(false);

  const formatText = (command: string, value: string = "") => {
    document.execCommand(command, false, value);
    if (editorRef.current) {
      setContent(editorRef.current.innerHTML);
    }
    updateToolbarPosition();
  };

  const handleSubmit = async () => {
    const rawHTML = editorRef.current ? editorRef.current.innerHTML : "";
    const title = getValues("title");
    try {
      const response = await createBlog({ content: rawHTML, title: title, thumbnail: image });
      if (response) {
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

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

        setShowToolbar(true);
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
    let index = 0;
    const interval = setInterval(() => {
      setTypedText(placeholderText.slice(0, index));
      index++;
      if (index > placeholderText.length) clearInterval(interval);
    }, 100); // Typing speed

    return () => clearInterval(interval);
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

  const handleImageUpload = (file) => {
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Create preview URL
      setImage(imageUrl);
    }
  };

  // Handle file selection via input
  const handleFileInputChange = (event) => {
    handleImageUpload(event.target.files[0]);
  };

  // Handle drag events
  const handleDragOver = (event) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setDragging(false);
    if (event.dataTransfer.files.length > 0) {
      handleImageUpload(event.dataTransfer.files[0]);
    }
  };

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
      <div className="flex flex-col space-y-4">
        <Input
          control={control}
          name="title"
          label="Title"
          placeholder="Enter your blog title"
          isRequired
        ></Input>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="border p-3 min-h-[200px] outline-none ck_editor"
          contentEditable
          ref={editorRef}
          suppressContentEditableWarning
          onInput={() => setContent(editorRef.current?.innerHTML || "")}
          onBlur={() => setTimeout(() => setShowToolbar(false), 200)} // Hide toolbar when clicking outside
          // className="absolute left-3 top-3 text-gray-400 pointer-events-none"
        >
          {content === "" ? (
            <span className="font-semibold text-3xl text-gray-400">
              {typedText}
            </span>
          ) : (
            typedText
          )}
        </motion.div>
        <div  className={`relative w-64 h-64 border-2 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
          dragging
            ? "border-blue-500 bg-blue-100"
            : "border-dashed border-gray-400"
        }`}
        onClick={() => fileInputRef.current && fileInputRef.current.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}>
        <input
          type="file"
          accept="image/*"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileInputChange}
        />
         {image ? (
          <motion.img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
        ) : (
          // Show add button or drag text
          <motion.div
            className="w-full h-full flex flex-col items-center justify-center text-gray-500"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* <Plus size={40} className="mb-2" /> */}

            <p className="text-lg">
              {dragging ? "Drop your image here" : "Click or Drag to upload"}
            </p>
          </motion.div>
        )}
        </div>
        {/* <div
          ref={editorRef}
          contentEditable
          className="border p-3 min-h-[200px] outline-none ck_editor"
          onInput={() => setContent(editorRef.current?.innerHTML || "")}
          onBlur={() => setTimeout(() => setShowToolbar(false), 200)} // Hide toolbar when clicking outside
        ></div> */}

        <button
          onClick={handleSubmit}
          className="mt-4 p-2 bg-blue-500 text-white rounded shadow-md w-1/4"
        >
          Publish Blog
        </button>
      </div>
    </Box>
  );
}
