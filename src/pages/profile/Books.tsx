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
import { NavLink } from "react-router-dom";
import { useFetchAllBooks } from "@/hooks/useFetchBook";
import { getToken } from "@/services/authService";
import { useState } from "react";
const Books = () => {
  const token = getToken() || "";
  const [active, setActive] = useState(false);

  const { data, isLoading } = useFetchAllBooks(token);

  return (
    <div className="w-full">
      <div className="p-10">
        <div className="flex items-center h-[50px] justify-between">
          <div className="flex items-center gap-3">
            <img src={Sorting} alt="sorting" className=" h-[50px]" />
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
            <Button className="w-[150px] flex items-center gap-5 rounded-[8px] h-full ">
              <FaPlus /> Create Book
            </Button>
          </NavLink>
        </div>
        <div className="grid grid-cols-4 p-10">
          {!isLoading &&
            data &&
            data.items.map((book) => (
              <div
                key={book.title}
                className="bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] w-[232px] h-[280px] relative group"
              >
                <div className="group-hover:right-[20px] top-[64px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    {active ? (
                      <BsHeartFill
                        className="text-red-500"
                        onClick={() => setActive(!active)}
                      />
                    ) : (
                      <BsHeart
                        className="text-slate-500"
                        onClick={() => setActive(!active)}
                      />
                    )}
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <BsEyeFill className="text-slate-500" />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img
                    src={book.coverImage}
                    alt={book.coverImage}
                    className=" h-[140px]"
                  />
                </div>

                <div className="ml-2">
                  <h1 className="text-xl font-bold">{book.title}</h1>
                  <p className="text-sm font-normal text-gray-500">
                    {book.category.title}
                  </p>
                  <h2 className="mt-3 font-medium text-md">{book.user.name}</h2>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Books;
