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
import { useNavigate } from "react-router-dom";
import { Book, fetchBookData } from "@/types/types";
import { Sorting } from "@/assets";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";

interface CategoryBooksProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  booksData: fetchBookData | undefined;
  isBooksLoading: boolean;
}

const CategoryBooks: React.FC<CategoryBooksProps> = ({
  search,
  setSearch,
  setSortBy,
  booksData,
  isBooksLoading,
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const token = getToken();
  const me = useGetMe(token!);
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const viewBook = (bookSlug: string) => {
    navigate(`/book/${bookSlug}`);
  };

  const profileNavigation = (id: number) => {
    if (id === me.data?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };

  const toggleFavorite = (bookId: string, bookSlug: string) => {
    if (token) {
      setFavorites((prevFavorites) => {
        const isFavorite = !prevFavorites[bookId];
        if (isFavorite) {
          addFavorite.mutate({ slug: bookSlug });
        } else {
          removeFavorite.mutate({ slug: bookSlug });
        }
        return { ...prevFavorites, [bookId]: isFavorite };
      });
    } else {
      navigate("/auth/login");
    }
  };

  useEffect(() => {
    if (!token) {
      setFavorites({});
    }
  });

  useEffect(() => {
    if (booksData) {
      const newFavorites: { [key: string]: boolean } = {};
      booksData.items.forEach((book) => {
        newFavorites[book.bookId] = Boolean(book.isFavorite);
      });
      setFavorites(newFavorites);
    }
  }, [booksData]);

  return (
    <div className="flex flex-col w-full min-h-screen px-6 mx-0 lg:px-10">
      <div className="flex justify-between lg:gap-0 gap-4 mt-4 h-[30px] lg:h-[50px] w-full">
        <div className="flex items-center w-8/12 gap-3 lg:w-full">
          <img
            src={Sorting}
            alt="sorting"
            className="w-4/12 h-full md:w-auto lg:w-auto"
          />

          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-8/12 lg:w-[180px] h-full text-xs lg:text-md">
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
          className="!border-black rounded-[8px] w-full lg:w-[280px] h-full lg:h-[42px] text-xs lg:text-md placeholder:text-xs"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 p-4 py-6 gap-y-4 md:grid-cols-3 lg:p-10 lg:gap-3 lg:grid-cols-4">
        {!isBooksLoading &&
          booksData &&
          booksData.items.map((book: Book) => (
            <div
              key={book.bookId}
              id={book.bookId}
              className="relative md:gap-2 bg-slate-100 shadow-sm shadow-slate-200 py-2 lg:py-0 border rounded-[8px] min-w-[150px] lg:min-w-[190px] md:max-w-[170px] lg:h-[280px] book group"
            >
              <div className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                  {favorites[book.bookId] ? (
                    <BsHeartFill
                      className="text-red-500 cursor-pointer"
                      onClick={() => toggleFavorite(book.bookId, book.slug)}
                    />
                  ) : (
                    <BsHeart
                      className="cursor-pointer text-slate-500"
                      onClick={() => toggleFavorite(book.bookId, book.slug)}
                    />
                  )}
                </div>

                <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                  <BsEyeFill
                    className="cursor-pointer text-slate-500"
                    onClick={() => viewBook(book.slug)}
                  />
                </div>
              </div>
              <div
                onClick={() => viewBook(book.slug)}
                className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px] cursor-pointer"
              >
                <img
                  src={book.coverImage}
                  alt={book.coverImage}
                  className="w-[100px] lg:max-w-[120px] h-[120px] lg:h-[140px]"
                />
              </div>

              <div className="flex flex-col justify-center gap-1 ml-2">
                <h1 className="line-clamp-1 h-6 font-bold text-[13px] lg:text-[15px]">
                  {book.title}
                </h1>
                <div className="flex items-center gap-2">
                  <img
                    src={book.category.icon}
                    alt={book.category.title}
                    className="w-4 lg:w-6"
                  />
                  <p className="font-Inter text-[12px] text-secondary-foreground">
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
                    className="w-5 h-5 rounded-full lg:w-6 lg:h-6"
                  />
                  <h2 className="text-[12px] text-black lg:text-[13px]">
                    By {book.user.name}
                  </h2>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CategoryBooks;
