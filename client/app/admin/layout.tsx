import { AdminSidebar } from "@/components";
import "./global.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="admin__dashboard">
      <AdminSidebar />
      {children}
    </section>
  );
}
