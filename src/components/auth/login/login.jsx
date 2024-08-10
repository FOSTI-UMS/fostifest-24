import Logo from "../../../../public/images/logo/fostifest.png"
import Backround from "../../../../public/images/backround-login.jpeg"
import Image from "next/image";

const Login = ({}) => {
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
  
          <div className="w-full max-w-sm mt-24">
              <h2 className="text-white text-xl mb-2">Selamat Datang di FOSTI Website</h2>
              <h3 className="text-white text-3xl font-bold mb-6">Get Started</h3>
              <p className="text-white mb-8">
                  Don’t have an account? <a href="#" className="text-green-400">Sign up</a>
              </p>
  
              <form className="w-full">
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
                          id="password"
                          type="password"
                          placeholder="**********"
                      />
                      <label className="absolute top-3 left-3 transform -translate-y-1/2 bg-none px-1 text-black text-sm">Password</label>
                  </div>
                  <div className="mb-4">
                      <button
                          className="w-full p-3 rounded-full mt-5 bg-purple-600 text-white font-bold hover:bg-purple-700 focus:outline-none"
                          type="submit"
                      >
                          Sign in
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
  
  export default Login