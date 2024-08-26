import AdminTabs from "@/components/admin/adminTabs";
import { AdminProvider } from "@/store/adminContext";

const AdminPage = ({}) => {
  return (
    <AdminProvider>
      <AdminTabs />
    </AdminProvider>
  );
};

export default AdminPage;
