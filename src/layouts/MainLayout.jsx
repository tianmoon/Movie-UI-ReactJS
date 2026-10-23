import { Outlet } from "react-router-dom";
import Header from "../components/Header/HeaderTemp";
import Footer from "../components/Footer/Footer";

function MainLayout() {
  return (
    <>
      <Header />

      <main>
        <Outlet />
      </main>

      <Footer />
    </>
  );
}

export default MainLayout;