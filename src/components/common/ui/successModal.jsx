import CustomButton from "@/components/common/ui/customButton";
import { LottieConstant } from "@/constants/lottieConstant";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SuccessModal = ({message, onClose}) => {
  return <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
  <div className="relative bg-gradient-to-r from-[#1f2a48] to-[rgb(43,62,111)] p-6 rounded-lg shadow-lg w-full max-w-md flex flex-col items-center justify-center">
    <Lottie className="h-[200px] w-[200px]" animationData={LottieConstant.success} height={15} width={15} />
    <p className="font text-gray-200 text-center mb-3" dangerouslySetInnerHTML={{ __html: message }}/>
    <div className="flex justify-center">
      <CustomButton
        as="button"
        onClick={onClose}
        containerClassName={"m-0 border-main-primary"}
        className={"text-sm px-8 bg-gradient-to-r from-green-600 to-green-400 "}
        text={"Selesai"}
      />
    </div>
  </div>
</div>
}

export default SuccessModal