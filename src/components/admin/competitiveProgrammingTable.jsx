import { useAdmin } from "@/store/adminContext";
import { useState } from "react";
import LoadingAnimation from "../common/ui/loadingAnimation";
import Link from "next/link";
import { UrlConstant } from "@/constants/urlConstant";
import { CompetitionCategoriesConstant } from "@/constants/competitionCategoriesConstant";
import { PaymentStatusConstant } from "@/constants/paymentStatusConstant";
import ConfirmationModal from "@/components/common/ui/confirmationModal";
import SuccessModal from "@/components/common/ui/successModal";
import { updateCompetitionStatus } from "@/repositories/supabase";

export default function CompetitiveProgrammingTable() {
  const { loading, competitiveProgramming } = useAdmin();
  const [searchEmail, setSearchEmail] = useState("");
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedCompetitionId, setSelectedCompetitionId] = useState(null);
  const [selectedUserEmail, setSelectedUserEmail] = useState(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleSearch = (event) => {
    setSearchEmail(event.target.value);
  };

  const handleStatusBg = (status) => {
    if (status === PaymentStatusConstant.notPaid) return "bg-red-500 text-white";
    if (status === PaymentStatusConstant.pendingVerification) return "bg-orange-500 text-white";
    if (status === PaymentStatusConstant.paid) return "bg-green-500 text-white";
    if (status === "-") return "text-white";
  };

  const filteredCompetitions = competitiveProgramming.filter((item) => item.userEmail.toLowerCase().includes(searchEmail.toLowerCase()));

  const openConfirmationModal = (competitionId, userEmail) => {
    setSelectedCompetitionId(competitionId);
    setSelectedUserEmail(userEmail);
    setShowConfirmationModal(true);
  };

  const closeConfirmationModal = () => {
    setShowConfirmationModal(false);
    setSelectedCompetitionId(null);
  };

  const handleConfirmVerification = async () => {
    setIsVerifying(true);
    try {
      await updateCompetitionStatus(selectedCompetitionId);
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
  return (
    <>
      <h2 className="mb-3 text-xl font-semibold">{CompetitionCategoriesConstant.cp}</h2>
      <input type="text" placeholder="Cari berdasarkan email" className="mb-4 py-3 px-7 rounded-full text-sm bg-gray-800 border border-white" value={searchEmail} onChange={handleSearch} />

      {loading && <LoadingAnimation />}
      {!loading && filteredCompetitions.length === 0 && <p className="text-lg font-medium text-center mt-4 text-gray-500">{searchEmail ? "Peserta tidak ditemukan" : "Belum ada peserta"}</p>}
      {!loading && filteredCompetitions.length > 0 && (
        <table className="w-full text-sm table-auto">
          <thead>
            <tr>
              <th className="border border-white">ID</th>
              <th className="border border-white">Nama</th>
              <th className="border border-white">Email</th>
              <th className="border border-white">Bukti Pembayaran</th>
              <th className="border border-white">Status</th>
              <th className="border border-white">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filteredCompetitions
              .filter((item) => item.competitions.length > 0)
              .map((item, index) => (
                <tr key={item.userId} className="hover:bg-gray-700">
                  <td className="border px-1 border-white">{index + 1}</td>
                  <td className="border px-1 border-white">{item.userName}</td>
                  <td className="border px-1 border-white">{item.userEmail}</td>
                  <td className="text-center border px-1 border-white">
                    {item.competitions[0].payment ? (
                      <Link className="hover:text-blue-800 underline text-sm" href={UrlConstant.paymentImageUrl + "competition/" + item.competitions[0].payment} target="blank">
                        Lihat bukti pembayaran
                      </Link>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className={`text-center border border-white ${handleStatusBg(item.competitions[0].status)}`}>{item.competitions[0].payment ? item.competitions[0].status : PaymentStatusConstant.notPaid}</td>
                  <td className="border text-center border-white">
                    {item.competitions[0].status === PaymentStatusConstant.paid && <div className="bg-green-500 py-4 ">Terverifikasi</div>}
                    {item.competitions[0].payment && item.competitions[0].status !== PaymentStatusConstant.paid && (
                      <button onClick={() => openConfirmationModal(item.competitions[0].id, item.userEmail)} className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 my-2 rounded">
                        Verifikasi
                      </button>
                    )}
                    {!item.competitions[0].payment && item.competitions[0].status !== PaymentStatusConstant.paid && <p className="my-4 text-white">-</p>}
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
