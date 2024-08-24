import React from "react";
import CustomButton from "@/components/common/ui/customButton";

const ConfirmationModal = ({isOnlyConfirm = false, title="Konfirmasi Pendaftaran",loadingAnimation = null ,confirmText = "Yakin", onClose, onConfirm, message, className }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-200">{title}</h2>
        <p className="text-gray-200 text-sm mb-6" dangerouslySetInnerHTML={{ __html: message }} />
        <div className="flex justify-end space-x-4">
          {!isOnlyConfirm &&
            <CustomButton
              as="button"
              onClick={onClose}
              containerClassName={"m-0 border-main-primary"}
              className={"text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
              text={"Batal"}
            />
          }
          <CustomButton
            as="button"
            onClick={onConfirm}
            containerClassName={"m-0"}
            className={`text-sm px-6 ${className}`}
            text={loadingAnimation === null ? confirmText : ""}
            icon={loadingAnimation}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
