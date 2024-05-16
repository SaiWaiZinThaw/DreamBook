import { Button, ButtonGroup } from "@chakra-ui/react";
import { Logo } from "../assets/index";
import { HiMiniUserCircle } from "react-icons/hi2";

const NavBar = () => {
  return (
    <div className="flex justify-between items-center shadow-slate-300 shadow-sm px-40 py-6 font-Inter">
      <div className="w-[70px]">
        <img src={Logo} alt={Logo} className="w-full" />
      </div>
      <nav>
        <ButtonGroup variant="ghost" size="md" gap="5">
          <Button
            fontWeight={"medium"}
            fontSize={"18px"}
            colorScheme="black"
            borderRadius="30px"
            overflow="auto"
            _hover={{ textDecoration: "none" }}
            _active={{ colorScheme: "blue", bgSize: "md", fontWeight: "bold" }}
          >
            Home
          </Button>
          <Button
            fontWeight={"medium"}
            fontSize={"18px"}
            colorScheme="black"
            borderRadius="30px"
            overflow="auto"
            _hover={{ textDecoration: "none" }}
            _active={{ colorScheme: "blue", bgSize: "md", fontWeight: "bold" }}
          >
            Library
          </Button>
          <Button
            fontWeight={"medium"}
            fontSize={"18px"}
            colorScheme="black"
            borderRadius="30px"
            overflow="auto"
            _hover={{ textDecoration: "none" }}
            _active={{ colorScheme: "blue", bgSize: "md", fontWeight: "bold" }}
          >
            Book Crafting
          </Button>
        </ButtonGroup>
      </nav>

      <div>
        <ButtonGroup colorScheme="blue" size="lg" gap="2">
          <Button
            variant="link"
            fontWeight="bold"
            _hover={{ textDecoration: "none" }}
            leftIcon={<HiMiniUserCircle className="text-[30px]" />}
          >
            Login
          </Button>
          <Button borderRadius="30px" overflow="auto">
            Register
          </Button>
        </ButtonGroup>
      </div>
    </div>
  );
};

export default NavBar;
