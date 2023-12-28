"use client";
import { Dispatch, SetStateAction } from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

const QuillEditor = ({
  description,
  setDescription,
}: {
  description?: string;
  setDescription: Dispatch<SetStateAction<string>>;
}) => {
  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      [{ list: "ordered" }, { list: "bullet" }],
      ["bold", "italic", "underline"],
    ],
  };

  const formats = ["header", "bold", "italic", "underline", "list", "bullet"];

  return (
    <div>
      <ReactQuill
        modules={modules}
        formats={formats}
        value={description}
        onChange={(e: string) => setDescription(e)}
      />
    </div>
  );
};

export default QuillEditor;
