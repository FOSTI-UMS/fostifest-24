/**
 * Below are the status that are used for payment status.
 */
const notPaid = "Belum Bayar";
const pendingVerification = "Menunggu Verifikasi";
const paid = "Sudah Bayar";

export const PaymentStatusConstant = { notPaid, pendingVerification, paid };

export const StatusStyles = {
  [PaymentStatusConstant.notPaid]: "bg-red-700",
  [PaymentStatusConstant.pendingVerification]: "bg-orange-400",
  [PaymentStatusConstant.paid]: "bg-green-600",
};
