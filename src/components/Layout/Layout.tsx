import Header from "../Header/Header";

interface LayoutProps {
    children: React.ReactNode;
    redirect?: string;
    navigateback?: boolean;
  }


const Layout: React.FC<LayoutProps> = ({ children, redirect, navigateback }) => {
  return (
    <div>
      <Header redirect={redirect} navigateback={navigateback}/>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
