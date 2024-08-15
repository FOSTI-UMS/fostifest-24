import React from "react";
import CustomButton from "@/components/common/ui/customButton";

// await new Promise(resolve => setTimeout(resolve, 5000));


const ConfirmationModal = ({ onClose, onConfirm, message }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
      <div className="relative bg-gradient-to-r from-[#1f2a48] to-[#2b3e6f] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-lg font-bold mb-4 text-gray-200">Konfirmasi Pendaftaran</h2>
        <p className="text-gray-200 text-sm mb-6" dangerouslySetInnerHTML={{ __html: message }} />
        <div className="flex justify-end space-x-4">
          <CustomButton
            as="button"
            onClick={onClose}
            containerClassName={"m-0 border-main-primary"}
            className={"text-sm px-6 bg-gradient-to-r from-transparent to-transparent text-main-primary"}
            text={"Batal"}
          />
          <CustomButton
            as="button"
            onClick={onConfirm}
            containerClassName={"m-0"}
            className={"text-sm px-6"}
            text={"Yakin"}
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
