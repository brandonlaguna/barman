import { useState } from "react";
import ReactImagePickerEditor from "react-image-picker-editor";
import PropTypes from "prop-types";
import "react-image-picker-editor/dist/index.css";
import "./style.css";

export default function UploadImage({ onSelectImage }) {
  const [imageSrc, setImageSrc] = useState("");

  const handleSetImage = (image) => {
    setImageSrc(image);
    onSelectImage(image);
  };
  const config2 = {
    borderRadius: "8px",
    language: "es",
    width: "100%",
    height: "160px",
    objectFit: "contain",
    compressInitial: null,
    hideDownloadBtn: true,
  };

  return (
    <ReactImagePickerEditor
      config={config2}
      imageSrcProp={imageSrc}
      imageChanged={(newDataUri) => {
        handleSetImage(newDataUri);
      }}
      style={{
        width: "100%",
      }}
    />
  );
}

UploadImage.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
};
