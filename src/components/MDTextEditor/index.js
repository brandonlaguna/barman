import { useState, useRef } from "react";
import JoditEditor from "jodit-react";
import "./style.css";

export default function MDTextEditor() {
  const editor = useRef(null);
  const [content, setContent] = useState("Start writing");
  const config = {
    readonly: false,
    height: 400,
  };
  const handleUpdate = (event) => {
    const editorContent = event.target.innerHTML;
    setContent(editorContent);
  };

  return (
    <JoditEditor
      ref={editor}
      value={content}
      config={config}
      onBlur={handleUpdate}
      onChange={(newContent) => console.log(newContent)}
    />
  );
}
