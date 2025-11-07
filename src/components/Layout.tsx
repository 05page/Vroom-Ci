import { useLocation } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isLandingPage = location.pathname === "/";
  const isDashboard = location.pathname === "/dashboard";

  // No layout wrapper for landing page and dashboard
  if (isLandingPage || isDashboard) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-background">
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;
