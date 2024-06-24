
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

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const viewBook = (bookSlug: string) => {
    navigate(`/book/${bookSlug}`);
  };

  const toggleFavorite = (bookId: string, bookSlug: string) => {
    setFavorites((prevFavorites) => {
      const isFavorite = !prevFavorites[bookId];
      if (isFavorite) {
        addFavorite.mutate({ slug: bookSlug });
      } else {
        removeFavorite.mutate({ slug: bookSlug });
      }
      return { ...prevFavorites, [bookId]: isFavorite };
    });
  };

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
    <div className="flex flex-col w-full min-h-screen px-10 mx-0">
      <div className="flex justify-between mt-4 h-[42px] w-full">
        <div className="flex items-center w-full gap-3">
          <img src={Sorting} alt="sorting" />

          <Select onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by default" />
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
          icon={<IoIosSearch className="text-2xl" />}
          placeholder="Search"
          value={search}
          className="!border-black rounded-[8px] w-[280px] h-[42px]"
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </div>

      <div className="grid w-full grid-cols-4 gap-8 p-10">
        {!isBooksLoading &&
          booksData &&
          booksData.items.map((book: Book) => (
            <div
              key={book.bookId}
              id={book.bookId}
              className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] w-[232px] h-[280px] book group"
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
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img
                  src={book.coverImage}
                  alt={book.coverImage}
                  className="h-[140px] max-w-[120px]"
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
  );
};

export default CategoryBooks;
