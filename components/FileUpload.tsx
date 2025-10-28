
import React, { useState, useRef, ChangeEvent } from 'react';
import { UploadIcon } from './icons';

interface FileUploadProps {
  label: string;
}

const FileUpload: React.FC<FileUploadProps> = ({ label }) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="w-full">
      <p className="text-sm text-gray-700 font-medium mb-2">{label}</p>
      <div 
        onClick={handleClick}
        className="flex flex-col items-center justify-center w-full h-40 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <UploadIcon className="w-10 h-10 mb-3 text-gray-400" />
          {fileName ? (
            <p className="font-semibold text-brand-green">{fileName}</p>
          ) : (
            <>
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold text-brand-green-light">Browse files</span> or drop here
              </p>
              <p className="text-xs text-gray-500">
                Supported file types: PDF, JPEG, PNG. Max file size: 5 MB.
              </p>
               <p className="text-xs text-gray-500">
                Recommended format: PDF. Ensure files are clear and properly labeled.
              </p>
            </>
          )}
        </div>
        <input ref={inputRef} type="file" className="hidden" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default FileUpload;
