import React, { useState, useEffect } from "react";
import { DropzoneArea } from "mui-file-dropzone";

const FileUploader = ({ onChange, fileObjects }) => {
  const [files, setFiles] = useState([]);

  // Preparing initial files for Edit mode
  useEffect(() => {
    if (fileObjects && fileObjects.length > 0) {
      setFiles(fileObjects.map((fileObject) => fileObject.recipe || fileObject));
    }
  }, [fileObjects]);

  const handleChange = (newFiles) => {
    setFiles(newFiles); // Update files in the component's state
    if (onChange) {
      onChange(newFiles); // Pass files to the parent component
    }
  };

  // Handle removing an image
  const handleRemoveFile = (index) => {
    const updatedFiles = files.filter((_, i) => i !== index); // Remove the file at the given index
    setFiles(updatedFiles);
    if (onChange) {
      onChange(updatedFiles); // Pass the updated files to the parent component
    }
  };

  return (
    <>
      {/* Dropzone for uploading files */}
      <DropzoneArea
        acceptedFiles={["image/*", "application/pdf"]}
        dropzoneText={
          <span>
            Drag & Drop or <span className="base-color">Choose a Item Image</span> to Upload
          </span>
        }
        onChange={handleChange}
        maxFileSize={5000000} // 5MB max file size
        showPreviews={false} // Disable default preview
        showPreviewsInDropzone={false}
        filesLimit={1} // Maximum 3 files
      />

      {/* Custom preview with a trash icon */}
      <div>
        {files.length > 0 && (
          <div className="mt-4">
            <p>
              <strong>Review:</strong>
            </p>
            {files.map((file, index) => (
              <div
                key={index}
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                {/* Image preview */}
                <img
                  src={
                    typeof file === "string" ? file : URL.createObjectURL(file)
                  }
                  alt={`Uploaded ${index + 1}`}
                  style={{
                    width: "150px",
                    height: "150px",
                    borderRadius: "10px",
                  }}
                />
                {/* Trash icon for removing image */}
                <button
                  onClick={() => handleRemoveFile(index)} // Remove image on click
                  style={{
                    position: "absolute",
                    top: "5px",
                    right: "5px",
                    backgroundColor:"gray",
                    color: "white",
                    border: "none",
                    borderRadius: "50%",
                    cursor: "pointer",
                    width: "30px",
                    height: "30px",
                  }}
                >
                  <i className="fa-solid fa-trash"></i>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default FileUploader;
