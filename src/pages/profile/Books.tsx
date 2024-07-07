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
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FaPlus } from "react-icons/fa";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useFetchAllBookAuthor } from "@/hooks/useFetchABookAuthor";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category_ids: "[]",
    sortBy: "random",
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [deBounceSearch] = useDebounce(search, 500);
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "random");
  const [pageCount, setPageCount] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const { data, isLoading } = useFetchAllBookAuthor({
    deBounceSearch,
    sortBy,
    pageCount,
  });
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPageCount(value);
  };

  useEffect(() => {
    const params: any = {};

    if (sortBy) {
      params.sort_by = sortBy;
    }
    if (deBounceSearch) {
      params.search = deBounceSearch;
    }
    if (pageCount) {
      params.page = pageCount.toString();
    }

    setSearchParams(params);
  }, [deBounceSearch, sortBy, setSearchParams, pageCount]);
  const [active, setActive] = useState(false);

  const navigate = useNavigate();
  if (!isLoading) {
    console.log(data);
  }
  const editHandler = (bookSlug: string) => {
    navigate(`/book-dashboard/${bookSlug}/book-details`);
  };

  const viewHandler = (bookSlug: string) => {
    navigate(`/book/${bookSlug}`);
  };

  return (
    <div className="w-full h-full ">
      <div className="flex flex-col items-center gap-5 p-10">
        <div className="w-full flex md:flex-row md:gap-0  flex-col h-[100px] justify-between items-center mb-4 md:h-[50px]">
          <div className="flex items-center w-full gap-3">
            <img src={Sorting} alt="sorting" className="h-[30px] md:h-[50px]" />
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="w-[100px] md:w-[180px] h-[30px] md:h-[50px]">
                <SelectValue placeholder="Sort by default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sort by default</SelectItem>
                <SelectItem value="random">Sort by random</SelectItem>
                <SelectItem value="latest">Sort by Latest</SelectItem>
                <SelectItem value="a-z">Sort by A-Z</SelectItem>
                <SelectItem value="z-a">Sort by Z-A</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-auto  md:w-[380px]">
              <Input
                icon={<IoIosSearch className="text-2xl" />}
                placeholder="Search"
                value={search}
                onChange={(event) => {
                  setSearch(event.target.value);
                }}
                className="!border-black rounded-[8px] md:h-full h-[30px]"
              />
            </div>
          </div>
          <NavLink to="/book-create" className="h-[40px] md:h-full self-end">
            <Button className="flex items-center gap-3 md:gap-5 text-[13px] md:text-[15px] rounded-[8px] w-[120px] md:w-[150px] h-full">
              <FaPlus /> Create Book
            </Button>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 gap-2 md:p-10 md:gap-4 md:grid-cols-4">
          {!isLoading &&
            data &&
            data.items &&
            data.items.map((book) => (
              <div
                key={book.title}
                id={book.slug}
                className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] min-w-[150px] max-w-[232px] h-[280px] book group"
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
                    <BsEyeFill
                      onClick={() => viewHandler(book.slug)}
                      className="cursor-pointer text-slate-500"
                    />
                  </div>
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <HiPencil
                      className="cursor-pointer text-slate-500"
                      onClick={() => editHandler(book.slug)}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img
                    src={book.coverImage}
                    alt={book.coverImage}
                    className="max-w-[120px] min-w-[100px] h-[140px]"
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
                    <p className="font-Inter text-[12px] text-secondary-foreground line-clamp-1">
                      {book.category.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={book.user.profilePicture}
                      alt={book.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <h2 className="font-medium text-[13px] text-black">
                      By {book.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!isLoading && (
          <Stack className="self-center" spacing={1}>
            <Pagination
              color="primary"
              count={data?.meta.totalPages}
              defaultPage={1}
              boundaryCount={1}
              onChange={handlePageChange}
              page={pageCount}
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Books;
