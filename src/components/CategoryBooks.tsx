import { Sorting } from "@/assets";
import { useState } from "react";
import { BsHeartFill, BsHeart, BsEyeFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useFetchAllBooks } from "@/hooks/useFetchBook";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useParams } from "react-router-dom";
const CategoryBooks = () => {
  const [active, setActive] = useState(false);
  const { page } = useParams();
  const pageNumber = parseInt(page!);
  const { data, isLoading } = useFetchAllBooks(pageNumber);
  const viewBook = (event: React.MouseEvent<SVGElement, MouseEvent>) => {
    const book = event.currentTarget.closest(".book")!;
    const bookId = book.id;
    console.log(bookId!);
  };
  return (
    <div className="flex flex-col mx-0 px-0 w-full min-h-screen">
      <div className="flex justify-between mx-[45px] mt-4 h-[42px]">
        <div className="flex items-center gap-3">
          <img src={Sorting} alt="sorting" />

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by default" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">Sort by default</SelectItem>
              <SelectItem value="random">Sort by random</SelectItem>
              <SelectItem value="latest">Sort by Latest</SelectItem>
              <SelectItem value="A-Z">Sort by A-Z</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-self-end w-[380px] h-[32px]">
          <Input
            icon={<IoIosSearch className="text-2xl" />}
            placeholder="Search"
            className="!border-black rounded-[8px] w-[380px] h-[42px]"
          />
        </div>
      </div>

      <div className="gap-8 grid grid-cols-4 p-10 w-full">
        {!isLoading &&
          data &&
          data.items.map((book) => (
            <div
              key={book.title}
              id={book.bookId}
              className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] w-[232px] h-[280px] book group"
            >
              <div className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                  {active ? (
                    <BsHeartFill
                      className="text-red-500 cursor-pointer"
                      onClick={() => setActive(!active)}
                    />
                  ) : (
                    <BsHeart
                      className="text-slate-500 cursor-pointer"
                      onClick={() => setActive(!active)}
                    />
                  )}
                </div>

                <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                  <BsEyeFill
                    className="text-slate-500 cursor-pointer"
                    onClick={viewBook}
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
                    className="rounded-full w-6 h-6"
                  />
                  <h2 className="text-[13px] text-black">
                    By {book.user.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
      </div>
      <div className="mt-auto w-full">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={`${pageNumber - 1}`} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`${pageNumber}`}>
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`${pageNumber + 1}`}>
                {pageNumber + 1}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={`${pageNumber + 2}`}>
                {pageNumber + 2}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={`${pageNumber + 1}`} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default CategoryBooks;
