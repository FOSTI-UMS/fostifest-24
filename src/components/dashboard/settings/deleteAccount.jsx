import CustomButton from "@/components/common/ui/customButton";

const DeleteAccount = ({}) => {
  return (
    <div className="my-5 border text-red-800 border-red-950 rounded-lg p-8">
      <h2 className="text-xl">Delete Account</h2>
      <hr className="my-4 border-red-950 w-44" />
      <div className="flex justify-between items-center">
        <p className="text-gray-400 w-[70%]">Setelah Anda menghapus repositori, keputusan ini tidak bisa diubah. Pastikan Anda benar-benar yakin sebelum melanjutkan.</p>
        <CustomButton as="button" type={"submit"} containerClassName={"w-[30%] m-0 border-red-700"} className={"text-sm px-10 bg-gradient-to-r from-transparent to-transparent text-red-700"} text={"Hapus"} />
      </div>
    </div>
  );
};

export default DeleteAccount;
