import { Sorting } from "@/assets";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category_ids: "[]",
    sortBy: "random",
  });
  const token = getToken();
  const { data: me } = useGetMe(token!);
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

  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
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

  const navigate = useNavigate();
  if (!isLoading) {
    console.log(data);
  }
  const editHandler = (bookSlug: string) => {
    navigate(`/book-dashboard/${bookSlug}/book-details`);
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

            <div className="w-auto md:w-[380px]">
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
            <Button className="flex items-center gap-3 md:gap-5 rounded-[8px] w-[120px] md:w-[150px] h-full text-[13px] md:text-[15px]">
              <FaPlus /> Create Book
            </Button>
          </NavLink>
        </div>
        <div className="grid grid-cols-2 gap-2 md:gap-4 md:grid-cols-4 md:p-10">
          {!isLoading &&
            data &&
            data.items &&
            data.items.map((book) => (
              <div
                key={book.title}
                id={book.slug}
                className="relative bg-slate-50 shadow-sm mr-[21px] border rounded-[8px] lg:w-[232px] min-w-[180px] max-w-[210px] h-[280px] book group"
              >
                <div className="group-hover:right-[1px] top-[10px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
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
                    className="min-w-[100px] max-w-[120px] h-[140px]"
                  />
                </div>

                <div className="flex flex-col justify-center gap-1 ml-2">
                  <h1 className="line-clamp-1 h-6 font-bold text-[14px] md:text-[15px]">
                    {book.title}
                  </h1>
                  <div className="flex items-center gap-1 md:gap-2">
                    <img
                      src={book.category.icon}
                      alt={book.category.title}
                      className="w-[18px] md:w-6"
                    />
                    <p className="line-clamp-1 font-Inter text-[12px] text-secondary-foreground">
                      {book.category.title}
                    </p>
                  </div>
                  <div
                    onClick={() => profileNavigation(book.user.userId)}
                    className="flex items-center gap-1 mt-1 cursor-pointer md:gap-3"
                  >
                    <img
                      src={book.user.profilePicture}
                      alt={book.user.name}
                      className="rounded-full w-[18px] md:w-6 h-[18px] md:h-6"
                    />
                    <h2 className="font-semibold text-[12px] text-black md:text-[13px]">
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
