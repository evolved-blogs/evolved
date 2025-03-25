import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { motion } from "framer-motion";

const FileUpload: React.FC<{ onFileChange: (file: File) => void }> = ({
  onFileChange,
}) => {
  const [image, setImage] = useState<string | null>(null); // Store the image preview
  const [dragging, setDragging] = useState<boolean>(false); // Track the drag status
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Reference to the file input element

  // Handle drag over event
  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragging(true);
  };

  // Handle drag leave event
  const handleDragLeave = (): void => {
    setDragging(false);
  };

  // Handle drop event
  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    setDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileChange(file);
    }
  };

  // Handle file input change event
  const handleFileInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      handleFileChange(file);
    }
  };

  // Handle file change (both from input and drag-and-drop)
  const handleFileChange = (file: File): void => {
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImage(reader.result as string); // Set the image preview (base64 encoded)
    };
    reader.readAsDataURL(file); // Read the file as base64

    // Pass the file to the parent component
    onFileChange(file);
  };

  // Handle remove image
  const handleRemoveImage = (): void => {
    setImage(null);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div
      className={`relative w-64 h-64 border-2 rounded-lg cursor-pointer overflow-hidden flex items-center justify-center transition-all ${
        dragging
          ? "border-blue-500 bg-blue-100"
          : "border-dashed border-gray-400"
      }`}
      onClick={() => fileInputRef.current && fileInputRef.current.click()}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileInputChange}
      />
      {image ? (
        <>
          <motion.img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          />
          <button
            onClick={handleRemoveImage}
            className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
          >
            X
          </button>
        </>
      ) : (
        <motion.div
          className="w-full h-full flex flex-col items-center justify-center text-gray-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-lg">
            {dragging ? "Drop your image here" : "Click or Drag to upload"}
          </p>
        </motion.div>
      )}
    </div>
  );
};

export default FileUpload;
