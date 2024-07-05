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

    <div className="flex flex-col mx-0 px-6 lg:px-10 w-full min-h-screen">
      <div className="flex justify-between gap-4 lg:gap-0 mt-4 w-full h-[30px] lg:h-[50px]">
        <div className="flex items-center gap-3 w-8/12 lg:w-full">
          <img
            src={Sorting}
            alt="sorting"
            className="w-4/12 md:w-auto lg:w-auto h-full"
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


      <div className="gap-2 gap-y-4 lg:gap-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 py-6 p-4 lg:p-10 w-full">

        {!isBooksLoading &&
          booksData &&
          booksData.items.map((book: Book) => (
            <div
            // onClick={() => viewBook(book.slug)}
              key={book.bookId}
              id={book.bookId}
              className="relative md:gap-2 bg-slate-100 shadow-md shadow-slate-200 py-2 lg:py-0 border rounded-[8px] min-w-[150px] lg:min-w-[190px] md:max-w-[170px] lg:h-[280px] book group"
            >
              <div  className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                  {favorites[book.bookId] ? (
                    <BsHeartFill
                      className="text-red-500 cursor-pointer"
                      onClick={() => toggleFavorite(book.bookId, book.slug)}
                    />
                  ) : (
                    <BsHeart
                      className="text-slate-500 cursor-pointer"
                      onClick={() => toggleFavorite(book.bookId, book.slug)}
                    />
                  )}
                </div>

                <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                  <BsEyeFill
                    className="text-slate-500 cursor-pointer"
                    onClick={() => viewBook(book.slug)}
                  />
                </div>
              </div>
              <div onClick={() => viewBook(book.slug)} className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px] cursor-pointer">
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
                <div className="flex items-center gap-3 mt-1">
                  <img
                    src={book.user.profilePicture}
                    alt={book.user.name}

                    className="rounded-full w-5 lg:w-6 h-5 lg:h-6"

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
