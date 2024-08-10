import Logo from "../../../../public/images/logo/fostifest.png"
import Backround from "../../../../public/images/backround-login.jpeg"
import Image from "next/image";

const RegisterTim = ({}) => {
  return (
    <div className="flex min-h-screen">
    <div className="relative w-full md:w-1/2 bg-black flex flex-col justify-center items-center p-8">
        <div className="absolute top-8 left-8">
            <Image
                src={Logo}
                alt="Fostifest Logo"
                className="w-40"
            />
        </div>

        <div className="w-full max-w-sm mt-32"> 
            <h2 className="text-white text-xl mb-2">Selamat Datang di FOSTI Website</h2>
            <h3 className="text-white text-3xl font-bold mb-6">Create New Account</h3>
            <p className="text-white mb-8">
                Already a member? <a href="#" className="text-green-400">Log in</a>
            </p>

            <form className="w-full">
                <div className="relative mb-6">
                    <input
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                        id="leader-name"
                        type="text"
                        placeholder="Leader Name"
                    />
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Leader Name</label>
                </div>
                <div className="relative mb-6">
                    <select
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                        id="member"
                    >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </select>
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Member</label>
                </div>
                <div className="relative mb-6">
                    <input
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                        id="email"
                        type="email"
                        placeholder="youremail@example.com"
                    />
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Email</label>
                </div>
                <div className="relative mb-6">
                    <input
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                        id="instances"
                        type="text"
                        placeholder="Instances"
                    />
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Instances</label>
                </div>
                <div className="relative mb-6">
                    <input
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                        id="number"
                        type="tel"
                        placeholder="Phone Number"
                    />
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Phone Number</label>
                </div>
                <div className="relative mb-6">
                    <select
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                        id="competition"
                    >
                        <option>Competitive Programming</option>
                        <option>Software Development</option>
                        <option>UI/UX Design</option>
                    </select>
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Competition</label>
                </div>
                <div className="relative mb-6">
                    <input
                        type="checkbox"
                        id="workshop-checkbox"
                        style={{width: 18, height: 18}}
                        className="absolute right-3 top-3 transform translate-y-1/2"
                    />
                    <input
                        type="text"
                        readOnly
                        value="VUE JS"
                        className="w-full p-3 border-b-2 border-black rounded-md bg-white text-black focus:outline-none pl-3 pt-6"
                    />
                    <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Workshop</label>
                </div>
                <div className="mb-4">
                    <button
                        className="w-full p-3 rounded-full mt-5 bg-purple-600 text-white font-bold hover:bg-purple-700 focus:outline-none"
                        type="submit"
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    </div>

    <div className="p-5 hidden md:block md:w-1/2 overflow-hidden bg-black">
          <Image src={Backround} className="w-full h-full bg-cover bg-center rounded-2xl"></Image>
      </div>
</div>

  )
}

export default RegisterTim