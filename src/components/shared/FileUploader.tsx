"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

type FileUploaderProps = {
  files: File[] | undefined;
  onChange: (files: File[]) => void;
};
const FileUploader = ({ files, onChange }: FileUploaderProps) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    onChange(acceptedFiles);
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
  });

  return (
    <div className="file-upload" {...getRootProps()}>
      <input {...getInputProps()} />
      <Image src="/icons/upload.svg" alt="upload" width={40} height={40} />
      <div className="file-upload_label">
        <p className="text-sm">
          <span className="text-blue-500">Click to Upload</span> or drag and
          drop
        </p>
        <p>PDF, DOC and XLS (MAX 5MB)</p>
        <p className="text-slate-800">
          Drag n drop some files here, or click to select files
        </p>
      </div>
    </div>
  );
};

export default FileUploader;
