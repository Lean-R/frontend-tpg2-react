import Nav from "@components/nav";

const Header = ({ onToggleSidebar, sidebarOpen }) => {
  return <Nav onToggleSidebar={onToggleSidebar} sidebarOpen={sidebarOpen} />;
};

export default Header;
