'use client';
import AdminDashboard from "@/components/Admin/admin";
import MainComponent from "@/components/main/BannerCard";
import { useAuth } from "@/providers/authProvider";
function App() {
   const { user } = useAuth();
  const allowedEmails =
    process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",") || [];
  return (
    <>
      {!allowedEmails.includes(user?.email || "") && <MainComponent />}
      {allowedEmails.includes(user?.email || "") && <AdminDashboard />}
    </>
  );
}

export default App;
