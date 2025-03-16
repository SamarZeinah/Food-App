import React, { useState } from "react";
import { DropzoneArea } from "mui-file-dropzone";

const FileUploader = ({ onChange ,fileObjects}) => {
  console.log("fileObjects",fileObjects);
  const [files, setFiles] = useState([]);
  const handleChange = (newFiles) => {
    setFiles(newFiles);
    console.log("Selected files:", newFiles);
    if (onChange) {
      onChange(newFiles); // Pass the files to the parent component
    }
  };

  return (
    <DropzoneArea
      acceptedFiles={["image/*", "application/pdf"]} // Accepts images & PDFs
      dropzoneText={
        <span>
          Drag & Drop or <span className="base-color">Choose a Item Image</span> to Upload
        </span>
      }
      onChange={handleChange}
      maxFileSize={5000000} // 5MB max file size
      showPreviews={true}
      showPreviewsInDropzone={false}
      filesLimit={3} // Max 3 files
      initialFiles={fileObjects.length>0?[fileObjects[0].recipe]:[]}


    />
  );
};

export default FileUploader;

