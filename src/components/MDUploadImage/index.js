import { useState, useEffect } from "react";
import ReactImagePickerEditor from "react-image-picker-editor";
import PropTypes from "prop-types";
import "react-image-picker-editor/dist/index.css";
import "./style.css";

export default function UploadImage({ onSelectImage, defaultImg }) {
  const [imageSrc, setImageSrc] = useState(defaultImg);

  useEffect(() => {
    if (defaultImg) {
      setImageSrc(defaultImg);
    }
  }, [defaultImg]);
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
    compressInitial: 20,
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

UploadImage.defaultProps = {
  defaultImg: "",
};

UploadImage.propTypes = {
  onSelectImage: PropTypes.func.isRequired,
  defaultImg: PropTypes.string,
};
