import {UrlConstant}  from "@/constants/urlConstant";
import { v4 as uuidv4 } from "uuid";
import { Upload } from "tus-js-client";

const fileUploadAction = async (
  bucketName,
  file,
  onProgress,
  onSuccess,
  folder = "" 
) => {
  const fileSize = file.size / 1000;

  if (fileSize > 5000) {
    throw new Error("Ukuran file terlalu besar, maksimal 5MB.");
  }
  
  const validImageTypes = ["image/jpg", "image/jpeg", "image/png"];

  if (!validImageTypes.includes(file.type)) {
    throw new Error("Mohon unggah file dengan format JPG, JPEG, atau PNG.");
  }

  return new Promise((resolve, reject) => {
    const fileName = `${folder}${uuidv4()}.${file.name.split(".").pop()}`;
    const upload =new Upload(file, {
      endpoint: `${UrlConstant.storageUrl}/upload/resumable`,
      retryDelays: [0, 3000, 5000, 10000, 20000],
      headers: {
        authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
      },
      uploadDataDuringCreation: true,
      removeFingerprintOnSuccess: true,
      metadata: {
        bucketName: bucketName,
        objectName: fileName,
        contentType: file.type,
        cacheControl: 3600,
      },
      chunkSize: 6 * 1024 * 1024,
      onError: function (error) {
        reject("Gagal mengunggah file, silakan coba lagi.");
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = (bytesUploaded / bytesTotal) * 100;
        onProgress(percentage);
      },
      onSuccess: function () {
        const fileUrl = `${UrlConstant.storageUrl}/object/public/${bucketName}/${fileName}`;
        onSuccess(fileName, fileUrl);
        resolve({ fileName, fileUrl });
      },
    });

    upload.findPreviousUploads().then((previousUploads) => {
      if (previousUploads.length) {
        upload.resumeFromPreviousUpload(previousUploads[0]);
      }
      const cancelButton = document.getElementById("cancel-button");
      cancelButton?.addEventListener("click", () => {
        upload
          .abort(true)
          .then(() => {
            resolve();
          })
          .catch(() => {
            reject("Gagal menghentikan unggahan.");
          });
      });
      upload.start();
    }).catch((error) => {
      reject("Terjadi kesalahan saat mencari unggahan sebelumnya.");
    });
  });
};

export default fileUploadAction;