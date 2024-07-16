import { Hero, Footer } from "@/components";
import Nav from "@/components/Nav";
import { useAuth } from "@/contexts/AuthContext";
const Home = () => {
  const { showMenu } = useAuth();
  return (
    <div
      className={
        showMenu
          ? "relative w-screen h-screen overflow-hidden flex flex-col items-center dark:bg-neutral-600"
          : "relative w-full h-full overflow-x-hidden dark:bg-neutral-600"
      }
    >
      <Nav />
      <Hero />
      <Footer />
    </div>
  );
};

export default Home;
