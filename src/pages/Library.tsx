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
          ? "relative w-screen h-screen overflow-hidden"
          : " w-full h-full overflow-x-hidden"
      }
    >
      <Nav />
      <LibraryLayout />
      <Footer />
    </div>
  );
};

export default Library;
