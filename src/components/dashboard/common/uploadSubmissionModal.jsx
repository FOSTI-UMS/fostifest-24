import React, { useState } from "react";
import CustomButton from "@/components/common/ui/customButton";
import { mapToString } from "@/utils/utils";

const UploadSubmissionModal = ({ loadingAnimation = null, onClose, onConfirm }) => {
  const [inputValue, setInputValue] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const isValidDriveLink = (url) => {
    const driveLinkPattern = /^(https:\/\/)?(drive\.google\.com\/[^\s]+)/;
    return driveLinkPattern.test(url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!inputValue) {
      setErrorMessage("Mohon diisi!");
    } else if (!isValidDriveLink(inputValue)) {
      setErrorMessage("Link Google Drive tidak valid!");
    } else {
      setErrorMessage("");
      onConfirm(inputValue.trim());
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-200">Unggah Karya Anda</h2>
        <p className="text-gray-200 text-sm mb-6 select-none" dangerouslySetInnerHTML={{ __html: "Silahkan isi <strong>Link Google Drive Anda</strong> di bawah ini!" }} />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input type="text" maxLength={250} placeholder="Link Google Drive Anda" value={inputValue} onChange={handleInputChange} className="w-full text-sm p-2 mb-1 border border-gray-400 rounded bg-gray-800 text-gray-200" />
            {errorMessage && <p className="text-red-500 font-medium text-xs ms-1 select-none">{errorMessage}</p>}
          </div>
          <div className="flex justify-end space-x-4">
            <CustomButton as="button" type="button" onClick={onClose} containerClassName={"m-0 border-main-primary"} className={"text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary"} text={"Batal"} />
            <CustomButton as="button" type="submit" containerClassName={"m-0"} className={`text-sm px-6 `} text={loadingAnimation === null ? "Unggah" : ""} icon={loadingAnimation} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadSubmissionModal;
