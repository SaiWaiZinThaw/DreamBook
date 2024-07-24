import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Pagination from "@mui/material/Pagination";
import { BookFloatAnimation } from "@/assets";
import Stack from "@mui/material/Stack";
import { Input } from "@/components/ui/input";
import { FaPlus } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiPencil } from "react-icons/hi";
import { useDebounce } from "use-debounce";
import { useEffect, useState } from "react";
import { useFetchAllBookAuthor } from "@/hooks/useFetchABookAuthor";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";
import BookCardSkeleton from "@/components/BookCardSkeleton";

const Books = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category_ids: "[]",
    sortBy: "random",
  });
  const Theme = localStorage.getItem("theme");
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
  }
  const editHandler = (bookSlug: string) => {
    navigate(`/book-dashboard/${bookSlug}/book-details`);
  };

  return (
    <div className="items-end self-end h-full">
      <div className="flex flex-col items-center gap-5 p-10">
        <div className="flex justify-between lg:gap-0 gap-4 mt-4 h-[45px] lg:h-[50px] w-full">
          <div className="relative flex items-center w-8/12 gap-3 md:max-w-[280px] lg:w-full max-w-[100px]">
            <Select onValueChange={handleSortChange}>
              <SelectTrigger className="dark:border-dark-border  dark:text-white w-8/12 md:max-w-[280px] max-w-[100px] h-full text-xs lg:text-md">
                <SelectValue placeholder="Sort" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="random">Sort by Random</SelectItem>
                <SelectItem value="latest">Sort by Latest</SelectItem>
                <SelectItem value="a-z">Sort by A-Z</SelectItem>
                <SelectItem value="z-a">Sort by Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Input
            icon={<IoIosSearch className="lg:text-2xl" />}
            placeholder="Search"
            value={search}
            className="dark:text-white dark:placeholder:text-white dark:bg-dark-bg dark:!border-dark-border !border-black rounded-[8px] max-w-[200px] md:max-w-[280px] h-full lg:h-[42px] text-xs lg:text-md placeholder:text-xs"
            onChange={(event) => {
              setSearch(event.target.value);
              setPageCount(1);
            }}
          />
        </div>
        <button className="self-end flex items-center gap-2 p-2 h-[40px] rounded-[8px] bg-primary">
          <FaPlus className="text-[13px] md:text-sm text-white" />
          <span className="hidden md:block text-[12px] md:text-[14px] text-bold text-white">
            Create New Book
          </span>
        </button>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-4 md:py-10">
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:gap-4 md:grid-cols-4 md:py-10">
            {data?.items.map((book) => (
              <div
                key={book.bookId}
                id={book.bookId}
                className="relative dark:text-white dark:bg-[#2F2F2F] dark:border-none bg-slate-50 shadow-sm mr-[21px] border-border rounded-[8px] border lg:w-[232px] min-w-[160px] max-w-[210px] h-[280px] book group"
              >
                <div className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <HiPencil
                      className="cursor-pointer text-slate-500"
                      onClick={() => editHandler(book.slug)}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center dark:bg-[#3D3D3D] bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img
                    src={book.coverImage}
                    alt={book.title}
                    className="w-[120px] h-[140px]"
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
                    <p className="font-Inter text-[12px] text-secondary-foreground dark:text-white">
                      {book.category.title}
                    </p>
                  </div>
                  <div
                    onClick={() => profileNavigation(book.user.userId)}
                    className="flex items-center gap-3 mt-1 cursor-pointer"
                  >
                    <img
                      src={book.user.profilePicture}
                      alt={book.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <h2 className="text-[13px] text-black dark:text-white">
                      By {book.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        {!isLoading && data?.items.length === 0 && (
          <div className="top-0 bottom-0 left-0 flex flex-col items-center justify-center w-full mx-auto my-auto ">
            <img
              src={BookFloatAnimation}
              alt=""
              className="mb-[10px] w-[88px] h-[79px] book-animation"
            />
            <span className="mt-2 text-2xl text-gray-300">No Book Found</span>
          </div>
        )}
        {!isLoading && data?.items.length !== 0 && (
          <Stack className="self-center" spacing={1}>
            <Pagination
              color="primary"
              sx={{
                "& .MuiPaginationItem-root": {
                  color: Theme === "dark" ? "white" : "inherit",
                },
                "& .MuiPaginationItem-ellipsis": {
                  color: Theme === "dark" ? "white" : "inherit",
                },
              }}
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
