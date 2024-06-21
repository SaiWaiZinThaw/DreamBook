import { Sorting } from "@/assets";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BsHeartFill, BsHeart, BsEyeFill } from "react-icons/bs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import { getToken } from "@/services/authService";
import { useState } from "react";
import { useFetchAllBookAuthor } from "@/hooks/useFetchABookAuthor";
const Books = () => {
  const token = getToken() || "";
  const [active, setActive] = useState(false);

  const { data, isLoading } = useFetchAllBookAuthor(token);
  const navigate = useNavigate();

  const editHandler = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const book = event.currentTarget.closest(".book")!;
    const bookId = book.id;
    navigate(`/book-dashboard/${bookId}/book-details`);
  };

  return (
    <div className="w-full">
      <div className="p-10">
        <div className="flex justify-between items-center h-[50px]">
          <div className="flex items-center gap-3">
            <img src={Sorting} alt="sorting" className="h-[50px]" />
            <Select>
              <SelectTrigger className="w-[180px] h-[50px]">
                <SelectValue placeholder="Sort by default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sort by default</SelectItem>
                <SelectItem value="random">Sort by random</SelectItem>
                <SelectItem value="latest">Sort by Latest</SelectItem>
                <SelectItem value="A-Z">Sort by A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-[380px]">
              <Input
                icon={<IoIosSearch className="text-2xl" />}
                placeholder="Search"
                className="!border-black rounded-[8px]"
              />
            </div>
          </div>
          <NavLink to="/book-create" className="h-full">
            <Button className="flex items-center gap-5 rounded-[8px] w-[150px] h-full">
              <FaPlus /> Create Book
            </Button>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 gap-2 p-10 lg:grid-cols-4 lg:gap-4">
          {!isLoading &&
            data &&
            data.items &&
            data.items.map((book) => (
              <div
                key={book.title}
                id={book.slug}
                className="relative book bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] max-w-[232px] h-[280px] group"
              >
                <div className="group-hover:right-[10px] top-[20px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    {active ? (
                      <BsHeartFill
                        className="text-red-500 cursor-pointer"
                        onClick={() => setActive(!active)}
                      />
                    ) : (
                      <BsHeart
                        className="cursor-pointer text-slate-500"
                        onClick={() => setActive(!active)}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <BsEyeFill className="cursor-pointer text-slate-500" />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <HiPencil
                      className="cursor-pointer text-slate-500"
                      onClick={editHandler}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img
                    src={book.coverImage}
                    alt={book.coverImage}
                    className="max-w-[120px] h-[140px]"
                  />
                </div>

                <div className="flex flex-col justify-center gap-1 ml-2">
                  <h1 className="line-clamp-1 h-6 font-bold text-[15px]">
                    {book.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={book.category.icon}
                      alt={book.category.title}
                      className="w-6"
                    />
                    <p className="font-Inter text-[12px] text-secondary-foreground">
                      {book.category.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={book.user.profilePicture}
                      alt={book.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <h2 className="text-[13px] text-black">
                      By {book.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
