"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Box } from "../box";
import { CreateBlogQuery } from "@src/services";
import { createBlog } from "@src/services";
import Input from "../../atoms/input/Input";
import { useForm } from "react-hook-form";
import Image from "next/image";
import { Upload } from "../upload";
import Toolbar from "./Toolbar";
import { uploadFile } from "@src/services/upload/upload";
import { useRouter } from "next/navigation";
import { Urls } from "@src/enum";
import { addToast } from "@heroui/react";

interface RichTextEditorProps {
  onSave?: (content: CreateBlogQuery) => Promise<{ success: boolean }>;
}

export default function RichTextEditor({ onSave }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const toolbarRef = useRef<HTMLDivElement>(null);
  const [content, setContent] = useState<string>("");
  const [showToolbar, setShowToolbar] = useState(false);
  const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });
  const { control, getValues } = useForm<CreateBlogQuery>();
  const placeholderText = "Write a fresh blog here...";
  const [typedText, setTypedText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();
  const onFileChange = (file: File | null) => {
    setFile(file || null);
  };

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
      if (!file) {
        alert("Please upload a thumbnail for the blog");
        return;
      }
      const { fileUrl } = await uploadFile({ file });
      const response = await createBlog({
        content: rawHTML,
        title: title,
        thumbnail: fileUrl,
      });
      if (response) {
        addToast({
          title: "Congratulations!",
          description: "Your blog has been published.",
          color: "success",
        });
        router.push(Urls.Home);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const updateToolbarPosition = () => {
    if (!editorRef.current) return;

    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();
      const editorRect = editorRef.current.getBoundingClientRect();

      setToolbarPosition({
        top: rect.top - editorRect.top - 5,
        left: rect.left - editorRect.left,
      });

      setShowToolbar(true);
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

  return (
    <Box className="relative mt-10">
      <AnimatePresence>
        {showToolbar && (
          <Toolbar
            ref={toolbarRef}
            toolbarPosition={toolbarPosition}
            formatText={formatText}
          />
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
          animate={{ opacity: 1, top: 0 }}
          transition={{ duration: 0.5 }}
          className="border p-3 min-h-[200px] outline-none ck_editor"
          contentEditable
          ref={editorRef}
          suppressContentEditableWarning
          onInput={() => setContent(editorRef.current?.innerHTML || "")}
          onBlur={() => setTimeout(() => setShowToolbar(false), 200)}
        >
          {/* {content === "" ? (
            <span className="font-semibold text-3xl text-gray-400">
              {typedText}
            </span>
          ) : (
            typedText
          )} */}
          {typedText}
        </motion.div>
        <Upload onFileChange={onFileChange} />

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
