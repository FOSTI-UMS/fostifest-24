import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";
import UploadFileForm from "./uploadFileForm";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { deleteFileFromStorage } from "@/lib/deleteFile";
import { toast } from "react-toastify";

const UploadFileModal = ({
  title = "Unggah Bukti Pembayaran dengan Format .png .jpg atau .jpeg",
  onClose,
  onConfirm,
  message = "",
  className,
  accept = "image/jpg,image/jpeg,image/png",
  bucket,
  folder = "",
  uploadedFile,
  maxSizeMB = 5,
  validFileTypes = ["image/jpg", "image/jpeg", "image/png"],
}) => {
  const [fileUrl, setFileUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleFileChange = (url) => {
    setFileUrl(url);
  };

  const handleUpload = async () => {
    if (uploadedFile && uploadedFile !== "") {
      await deleteFileFromStorage(bucket, uploadedFile);
    }
    if (fileUrl) {
      onConfirm(fileUrl);
    } else {
      toast("file belum dipilih. Mohon pilih file terlebih dahulu!", { type: "error" });
    }
  };

  const closeModal = async () => {
    try {
      if (fileUrl) {
        setIsDeleting(true);
        await deleteFileFromStorage(bucket, fileUrl);
        setFileUrl("");
      }
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-200">{title}</h2>
        <UploadFileForm title={message} accept={accept} bucket={bucket} onChange={handleFileChange} onLoading={setLoading} color="main" folder={folder} maxSizeMB={maxSizeMB} validFileTypes={validFileTypes} />
        {isDeleting || loading ? (
          <LoadingAnimation className="flex justify-end mt-4" />
        ) : (
          <div className="flex justify-end space-x-4 mt-4">
            <CustomButton as="button" onClick={closeModal} containerClassName="m-0 border-main-primary" className="text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary" text="Batal" />
            <CustomButton as="button" onClick={handleUpload} containerClassName="m-0" className={`text-sm px-6 ${className}`} text="Unggah" />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFileModal;
