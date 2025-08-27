"use client";
import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import toast from "react-hot-toast";

export function ResumeDropzone({ onUploaded }: { onUploaded?: (path: string) => void }) {
  const [progress, setProgress] = useState<number>(0);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;
    try {
      const { data } = await axios.post("/api/uploads/sign-url", {
        fileName: file.name,
        contentType: file.type,
      });
      const signedUrl = data.url as string;
      await axios.put(signedUrl, file, {
        headers: { "Content-Type": file.type },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded / (e.total || 1)) * 100);
          setProgress(pct);
        },
      });
      toast.success("Uploaded resume");
      if (onUploaded) onUploaded(data.path as string);
      setProgress(0);
    } catch (_error: unknown) {
      toast.error("Upload failed");
      setProgress(0);
    }
  }, [onUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [".docx"],
    },
  });

  return (
    <div className="space-y-2">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded p-6 text-center cursor-pointer ${
          isDragActive ? "bg-gray-50" : ""
        }`}
        aria-label="Resume upload dropzone"
      >
        <input {...getInputProps()} />
        <p>Drag and drop a resume here, or click to select</p>
        <p className="text-xs text-gray-500">PDF, DOC, DOCX</p>
      </div>
      {progress > 0 && (
        <div className="w-full bg-gray-200 h-2 rounded" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div className="bg-blue-600 h-2 rounded" style={{ width: `${progress}%` }} />
        </div>
      )}
    </div>
  );
}

