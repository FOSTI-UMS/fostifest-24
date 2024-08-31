import { useAdmin } from "@/store/adminContext";
import { useState } from "react";
import LoadingAnimation from "../common/ui/loadingAnimation";
import Link from "next/link";
import { UrlConstant } from "@/constants/urlConstant";
import { PaymentStatusConstant } from "@/constants/paymentStatusConstant";
import ConfirmationModal from "@/components/common/ui/confirmationModal";
import SuccessModal from "@/components/common/ui/successModal";
import { updateWorkshopStatus } from "@/repositories/supabase";
import * as XLSX from "xlsx";
import CustomButton from "../common/ui/customButton";
import { toast } from "react-toastify";

export default function WorkshopTable() {
  const { loading, workshop } = useAdmin();
  const [searchEmail, setSearchEmail] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSearch = (event) => {
    setSearchEmail(event.target.value);
  };

  const handleStatusBg = (status) => {
    if (status === PaymentStatusConstant.notPaid || status === null) return "bg-red-500 text-white";
    if (status === PaymentStatusConstant.pendingVerification) return "bg-orange-500 text-white";
    if (status === PaymentStatusConstant.paid) return "bg-green-500 text-white";
  };

  const filteredWorkshop = workshop.filter((item) => item.userEmail.toLowerCase().includes(searchEmail.toLowerCase()));

  const openConfirmationModal = (workshopId, userEmail) => {
    setSelectedWorkshopId(workshopId);
    setSelectedUserEmail(userEmail);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedWorkshopId(null);
  };

  const handleConfirmVerification = async () => {
    setIsVerifying(true);
    try {
      await updateWorkshopStatus(selectedWorkshopId);
      setShowSuccessModal(true);
    } catch (error) {
    } finally {
      setIsVerifying(false);
      closeConfirmationModal();
    }
  };

  const closeSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const exportToExcel = () => {
    try {
      const dataToExport = workshop.map((item, _) => ({
        Nama: item.userName,
        Email: item.userEmail,
        "Nomor Telepon": item.numPhone,
        "Paket Bundling": item.bundle !== null ? "Ya" : "Tidak",
        "Bukti Pembayaran": item.workshopPayment ? UrlConstant.paymentImageUrl + "workshop/" + item.workshopPayment : "-",
        Status: item.workshopPayment ? item.workshopStatus : PaymentStatusConstant.notPaid,
      }));

      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.json_to_sheet(dataToExport);

      const headerStyle = {
        font: { bold: true, color: { rgb: "FFFFFF" } },
        fill: { fgColor: { rgb: "4F81BD" } },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
        alignment: { horizontal: "center", vertical: "center" },
      };

      const range = XLSX.utils.decode_range(worksheet["!ref"]);
      for (let col = range.s.c; col <= range.e.c; col++) {
        const cellAddress = XLSX.utils.encode_cell({ r: 0, c: col });
        worksheet[cellAddress].s = headerStyle;
      }

      const colWidths = [{ wpx: 200 }, { wpx: 200 }, { wpx: 300 }, { wpx: 300 }, { wpx: 100 }];

      worksheet["!cols"] = colWidths;

      const cellStyle = {
        alignment: { wrapText: true },
        border: {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } },
        },
      };

      for (let row = range.s.r; row <= range.e.r; row++) {
        for (let col = range.s.c; col <= range.e.c; col++) {
          const cellAddress = XLSX.utils.encode_cell({ r: row, c: col });
          if (!worksheet[cellAddress]) continue;
          worksheet[cellAddress].s = { ...worksheet[cellAddress].s, ...cellStyle };
        }
      }

      XLSX.utils.book_append_sheet(workbook, worksheet, "Workshop Data");

      XLSX.writeFile(workbook, "Workshop_Data.xlsx");
    } catch (error) {
      toast("Gagal meng-export data. Mohon coba lagi!", { type: "error" });
    }
  };

  return (
    <>
      <h2 className="mb-3 text-xl font-semibold">Workshop</h2>

      {!loading && <input type="text" placeholder="Cari berdasarkan email" className="mb-4 py-3 px-7  rounded-full text-sm bg-gray-800 border border-white" value={searchEmail} onChange={handleSearch} />}

      {!loading && <CustomButton text={"Export"} as="button" onClick={() => exportToExcel()} containerClassName={"mb-5"} className=" px-10 py-2 text-sm " />}

      {loading && <LoadingAnimation />}
      {!loading && filteredWorkshop.length === 0 && <p className="text-lg font-medium text-center mt-4 text-gray-500">{searchEmail ? "Peserta tidak ditemukan" : "Belum ada peserta"}</p>}
      {!loading && filteredWorkshop.length !== 0 && (
        <table className="w-full table-auto text-sm mb-20">
          <thead>
            <tr>
              <th className="border border-white">No</th>
              <th className="border border-white">Nama</th>
              <th className="border border-white">Email</th>
              <th className="border border-white">Nomor Telepon</th>
              <th className="border border-white">Paket Bundling</th>
              <th className="border border-white">Bukti Pembayaran</th>
              <th className="border border-white">Status</th>
              <th className="border border-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredWorkshop.map((item, index) => (
              <tr className="hover:bg-gray-700" key={item.userId}>
                <td className="border px-1 border-white text-center max-w-[30px]">{index + 1}</td>
                <td className="border px-1 border-white max-w-[100px] whitespace-normal break-words">{item.userName}</td>
                <td className="border px-1 border-white max-w-[100px] whitespace-normal break-words">{item.userEmail}</td>
                <td className="border px-1 border-white max-w-[100px] whitespace-normal break-words">{item.numPhone}</td>
                <td className={`border px-1 border-white text-center max-w-[20px] whitespace-normal break-words ${item.bundle !== null ? "bg-blue-500" : "bg-transparent"} `}>{item.bundle !== null ? "Ya" : "Tidak"}</td>
                <td className="text-center border px-1 border-white max-w-[30px] whitespace-normal break-words">
                  {item.workshopPayment ? (
                    <Link className="hover:text-blue-800 underline text-sm" href={UrlConstant.paymentImageUrl + "workshop/" + item.workshopPayment} target="_blank">
                      Lihat bukti pembayaran
                    </Link>
                  ) : (
                    "-"
                  )}
                </td>
                <td className={`text-center border border-white max-w-[100px] px-2 whitespace-nowrap break-words ${handleStatusBg(item.workshopStatus)}`}>{item.workshopPayment ? item.workshopStatus : PaymentStatusConstant.notPaid}</td>
                <td className="border text-center border-white max-w-[100px]  whitespace-nowrap break-words">
                  {item.workshopStatus === PaymentStatusConstant.paid && <div className="bg-green-500 py-4 px-2 ">Terverifikasi</div>}
                  {item.workshopPayment && item.workshopStatus !== PaymentStatusConstant.paid && (
                    <button onClick={() => openConfirmationModal(item.userId, item.userEmail)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-2 rounded">
                      Verifikasi
                    </button>
                  )}
                  {!item.workshopPayment && item.workshopStatus !== PaymentStatusConstant.paid && <p className="my-4 text-white">-</p>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {showConfirmationModal && (
        <ConfirmationModal
          title="Konfirmasi Verifikasi"
          message={`Apakah Anda yakin ingin memverifikasi pembayaran <strong>${selectedUserEmail}</strong>?`}
          onClose={closeConfirmationModal}
          onConfirm={handleConfirmVerification}
          confirmText={isVerifying ? "" : "Verifikasi"}
          className="bg-blue-600"
          loadingAnimation={isVerifying ? <LoadingAnimation /> : null}
        />
      )}

      {showSuccessModal && <SuccessModal message="Pembayaran telah berhasil diverifikasi!" onClose={closeSuccessModal} />}
    </>
  );
}
