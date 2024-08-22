import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import { deleteFileFromStorage } from "@/lib/deleteFile";
import UploadBundleFileForm from "./uploadBundleFileForm";

const UploadBundleFileModal = ({
  title = "Unggah Bukti Pembayaran",
  onClose,
  onConfirm,
  message = "",
  className,
  accept = "image/jpg,image/jpeg,image/png",
  uploadedCompetitionFile,
  uploadedWorkshopFile,
  competitionBucket = "competition",
  workshopBucket = "workshop",
  workshopFolder,
  competitionFolder,
}) => {
  const [fileUrls, setFileUrls] = useState({ competition: "", workshop: "" });
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onWorkshopChange = (workshopUrl) => {
    setFileUrls((prevUrls) => ({ ...prevUrls, workshop: workshopUrl }));
  };
  
  const onCompetitionChange = (competitionUrl) => {
    setFileUrls((prevUrls) => ({ ...prevUrls, competition: competitionUrl }));
  };

  const handleUpload = async () => {
    if (uploadedCompetitionFile) {
      await deleteFileFromStorage(competitionBucket, uploadedCompetitionFile);
    }
    if (uploadedWorkshopFile) {
      await deleteFileFromStorage(workshopBucket, uploadedWorkshopFile);
    }
    console.log("COMPETTOTI: "+ fileUrls.competition )
    console.log("WORKSHOFD: "+ fileUrls.workshop )
    if (fileUrls.competition && fileUrls.workshop) {
      onConfirm(fileUrls.competition, fileUrls.workshop);
    }
  };

  const closeModal = async () => {
    try {
      if (fileUrls.competition) {
        setIsDeleting(true);
        await deleteFileFromStorage(competitionBucket, fileUrls.competition);
      }
      if (fileUrls.workshop) {
        await deleteFileFromStorage(workshopBucket, fileUrls.workshop);
      }
      setFileUrls({ competition: "", workshop: "" });
    } finally {
      setIsDeleting(false);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-200">{title}</h2>
        <UploadBundleFileForm
          competitionFolder={competitionFolder}
          workshopFolder={workshopFolder}
          uploadedCompetitionFile={uploadedCompetitionFile}
          uploadedWorkshopFile={uploadedWorkshopFile}
          title={message}
          accept={accept}
          onCompetitionChange={onCompetitionChange}
          onWorkshopChange={onWorkshopChange}
          onLoading={setLoading}
          color="main"
          competitionBucket={competitionBucket}
          workshopBucket={workshopBucket}
        />
        {isDeleting || loading ? (
          <LoadingAnimation className={"flex justify-end mt-4"} />
        ) : (
          <div className="flex justify-end space-x-4 mt-4">
            <CustomButton as="button" onClick={closeModal} containerClassName={"m-0 border-main-primary"} className={"text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary"} text={"Batal"} />
            <CustomButton as="button" onClick={handleUpload} containerClassName={"m-0"} className={`text-sm px-6 ${className}`} text={"Unggah"} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadBundleFileModal;
