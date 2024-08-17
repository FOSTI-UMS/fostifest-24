const tus = require("tus-js-client");
const { v4 } = require("uuid");

const endpoint = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1`;

const fileUploadAction = async (
  bucketName,
  file,
  onProgress,
  onSuccess
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
    const fileName = `${v4()}.${file.name.split(".").pop()}`;
    const upload = new tus.Upload(file, {
      endpoint: `${endpoint}/upload/resumable`,
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
        console.log("WOWOW mANTAP: "+error)
        reject("Gagal mengunggah file, silakan coba lagi.");
      },
      onProgress: function (bytesUploaded, bytesTotal) {
        const percentage = (bytesUploaded / bytesTotal) * 100;
        onProgress(percentage);
      },
      onSuccess: function () {
        onSuccess(
          fileName,
          `${endpoint}/object/public/${bucketName}/${fileName}`
        );
        resolve();
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

module.exports = { fileUploadAction };
