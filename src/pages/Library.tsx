import { LibraryLayout } from "@/Layouts";
import { Footer } from "@/components";
import Nav from "@/components/Nav";
import { useAuth } from "@/contexts/AuthContext";

const Library = () => {
  const { showMenu } = useAuth();

  return (
    <div
      className={
        showMenu
          ? "relative w-screen h-screen overflow-hidden lg:overflow-auto"
          : " w-full h-full overflow-x-hidden lg:overflow-auto"
      }
    >
      <Nav />
      <LibraryLayout />
      <Footer />
    </div>
  );
};

export default Library;
