import AdminTabs from "@/components/admin/adminTabs";
import { AdminProvider } from "@/store/adminContext";
import { ToastContainer } from "react-toastify";

const AdminPage = ({}) => {
  return (
    <AdminProvider>
      <AdminTabs />
      <ToastContainer />
    </AdminProvider>
  );
};

export default AdminPage;
