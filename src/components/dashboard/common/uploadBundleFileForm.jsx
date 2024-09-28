import Image from "next/image";
import { useEffect, useState } from "react";
import { deleteFileFromStorage } from "@/lib/deleteFile";
import { toast } from "react-toastify";
import { SvgConstants } from "@/constants/svgConstant";
import { SelectFile } from "./fileInput";
import CustomButton from "@/components/common/ui/customButton";
import LoadingAnimation from "@/components/common/ui/loadingAnimation";
import fileUploadAction from "@/lib/uploadFile";

const UploadBundleFileForm = ({ accept, competitionBucket, workshopBucket, onWorkshopChange, onCompetitionChange, onLoading, color, competitionFolder, workshopFolder, maxSizeMB, validFileTypes }) => {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [competitionFileName, setCompetitionFileName] = useState("");
  const [workshopFileName, setWorkshopFileName] = useState("");
  const [newFileUrl, setNewFileUrl] = useState("");
  const [fileUploadColor, setFileUploadColor] = useState("main");
  const [isDragging, setIsDragging] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (newFileUrl != "") {
      setFileUploadColor("main");
    } else {
      setFileUploadColor(color);
    }
  }, [color, newFileUrl]);

  const handleFileChange = async (file) => {
    if (file) {
      const fileSizeMB = file.size / (1024 * 1024);

      if (fileSizeMB > maxSizeMB) {
        toast(`Ukuran file terlalu besar, maksimal ${maxSizeMB}MB.`, { type: "error" });
        return;
      }

      if (!validFileTypes.includes(file.type)) {
        toast("Mohon unggah file dengan format yang valid.", { type: "error" });
        return;
      }
      try {
        setLoading(true);
        onLoading(true);
        setFileName(file.name);
        await fileUploadAction(
          competitionBucket,
          file,
          (percentComplete) => {
            setProgress(percentComplete);
          },
          (filename, url) => {
            setFileName(filename);
            setNewFileUrl(url);
            setCompetitionFileName(filename);
            onCompetitionChange(filename);
          },
          competitionFolder,
          maxSizeMB,
          validFileTypes
        );
        await fileUploadAction(
          workshopBucket,
          file,
          (percentComplete) => {
            setProgress(percentComplete);
          },
          (filename, url) => {
            setFileName(filename);
            setNewFileUrl(url);
            setWorkshopFileName(filename);
            onWorkshopChange(filename);
          },
          workshopFolder,
          maxSizeMB,
          validFileTypes
        );
      } catch (error) {
        toast("Gagal mengunggah file. Harap coba lagi!", { type: "error" });
      } finally {
        setLoading(false);
        onLoading(false);
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    let isValidType = false;
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    const types = validFileTypes;
    for (let i = 0; i < types.length; i++) {
      if (file.type.includes(types[i])) {
        handleFileChange(file);
        isValidType = true;
        break;
      }
    }
    if (!isValidType) {
      toast("Mohon unggah file dengan yang sesuai.", { type: "error" });
    }
  };

  const handleRemoveFile = async () => {
    try {
      setIsDeleting(true);

      await deleteFileFromStorage(competitionBucket, competitionFileName);
      await deleteFileFromStorage(workshopBucket, workshopFileName);

      setCompetitionFileName("");
      setWorkshopFileName("");
      onWorkshopChange("");
      onCompetitionChange("");
      setNewFileUrl("");
      setFileName("");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full relative flex items-center justify-center flex-col ">
      {!loading ? (
        <div
          className={` border-2 border-dashed ${fileUploadColor === "main" ? "border-gray-500" : "border-red-500"} file-upload-container top-0 p-5 w-full flex items-center justify-center flex-col rounded-2xl h-[380px] z-50 bg-[#0F172A]`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {newFileUrl !== "" ? (
            <>
              {accept !== "image/jpg,image/jpeg,image/png" ? (
                <div className="flex flex-col relative justify-center overflow-hidden h-full w-full">
                  <p>{newFileUrl}</p>
                  <CustomButton
                    as="button"
                    containerClassName="mx-auto mt-0 h-8 rounded-md"
                    className="text-xs rounded-md bg-gradient-to-tr from-red-600 to-red-500"
                    text={isDeleting ? "" : "Hapus"}
                    icon={isDeleting && <LoadingAnimation className="h-5 w-5" />}
                    onClick={handleRemoveFile}
                  />
                </div>
              ) : (
                <div className="relative w-full h-full">
                  <Image src={newFileUrl} alt="Student ID" className="rounded-lg h-full w-full hover absolute object-contain" width={1080} height={1080} />
                  <CustomButton
                    as="button"
                    containerClassName={"absolute top-0 right-0 mt-0 h-8 rounded-md"}
                    className={"text-xs  rounded-md bg-gradient-to-tr from-red-600 to-red-500"}
                    text={isDeleting ? "" : "Hapus"}
                    icon={isDeleting && <LoadingAnimation className={"h-5 w-5"} />}
                    onClick={handleRemoveFile}
                  />
                </div>
              )}
            </>
          ) : (
            <div className="w-full flex items-center justify-center flex-col z-10">
              <Image height={100} src={fileUploadColor === "red" ? SvgConstants.cloudUploadIconDanger : SvgConstants.cloudUploadIcon} alt="Cloud Upload" />
              <div className={`md:w-1/2 text-center flex items-center justify-center flex-col ${fileUploadColor === "red" ? "text-red-500" : "text-gray-border-gray-500"}`}>
                <p className={`align-middle`}>{"Drag & Drop your file here"}</p>
                <p className={`align-middle`}>{"or"}</p>
              </div>
              <SelectFile id="file" accept={accept} type="file" onChange={(e) => handleFileChange(e.target.files[0])} className="hidden" />
              <CustomButton
                as="button"
                onClick={() => {
                  document.getElementById("file")?.click();
                }}
                containerClassName={"p-0 h-8 rounded-lg mt-5"}
                className={`py-3 text-xs rounded-lg ${fileUploadColor === "red" ? "bg-red-500" : "bg-gray-border-gray-500"} hover:bg-${fileUploadColor}-300 z-10`}
                text={"Select File"}
              />
            </div>
          )}
        </div>
      ) : (
        <div className={`w-full h-[380px] border-dashed border-gray-500 bg-[#0F172A] flex items-center justify-center flex-col rounded-2xl p-3  border-2`}>
          <div className={`relative w-full rounded-2xl p-5 bg-gradient-to-r from-[#1f2a48] to-[rgb(43,62,111)] text-white flex items-center justify-between`}>
            <div>
              <Image src={SvgConstants.fileOutlineIcon} alt="Cloud Upload" className="w-10 h-10" />
            </div>
            <div className="w-full">
              <div className="w-full px-2">
                <div className="w-full flex items-center justify-end sm:justify-between">
                  <p className="overflow-hidden hidden md:block">{fileName}</p>
                  <p>{Math.round(progress)}%</p>
                </div>
                <div className="w-full">
                  <div className="w-full h-2 border-2 rounded-2xl">
                    <div className={`h-[5px] bg-main-primary rounded-2xl delay-100 animate-in`} style={{ width: `${progress}%` }}></div>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <Image id="cancel-button" src={SvgConstants.cancelOutlineIcon} className="w-10 h-10 cursor-pointer" alt="Cancel" />
            </div>
          </div>
        </div>
      )}
      {isDragging ? <div className="h-[9999px] w-screen bg-black bg-opacity-40 absolute z-0" /> : null}
    </div>
  );
};

export default UploadBundleFileForm;
