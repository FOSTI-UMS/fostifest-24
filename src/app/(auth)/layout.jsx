import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Layout = ({ children }) => {
  return (
    <>
      {children}
      <ToastContainer />
    </>
  );
};

export default Layout;
