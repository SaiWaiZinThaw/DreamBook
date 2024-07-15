import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Book, fetchBookData } from "@/types/types";
import { Sorting } from "@/assets";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { getToken } from "@/services/authService";
import BookCard from "./BookCard";
import { useFetchCategories } from "@/hooks/useFetchCategories";

interface CategoryBooksProps {
  search: string;
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setSortBy: React.Dispatch<React.SetStateAction<string>>;
  setPageCount: React.Dispatch<React.SetStateAction<number>>;
  booksData: fetchBookData | undefined;
  selectedCategories: string[];
  isBooksLoading: boolean;
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
}

const CategoryBooks: React.FC<CategoryBooksProps> = ({
  search,
  setSearch,
  setPageCount,
  setSortBy,
  booksData,
  isBooksLoading,
  selectedCategories,
  setSelectedCategories,
}) => {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const token = getToken();
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };
  const { data, isLoading } = useFetchCategories();
  const categoryHandler = (categoryId: string) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
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
        <div className="relative flex items-center w-8/12 gap-3 lg:w-full">
          <img
            src={Sorting}
            alt="sorting"
            className="w-4/12 h-full md:w-auto lg:w-auto"
          />
          <div className="bg-white w-[100px] hidden top-0">
            {!isLoading && data
              ? data.map((item) => (
                  <label
                    key={item.categoryId}
                    id={item.categoryId}
                    className="flex items-center gap-2 font-medium  md:text-[16px] text-[10px]"
                  >
                    <Checkbox
                      onCheckedChange={() => {
                        categoryHandler(item.categoryId);
                      }}
                      checked={selectedCategories.includes(item.categoryId)}
                    />
                    {item.title}
                  </label>
                ))
              : "Loading"}
          </div>

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
            setPageCount(1);
          }}
        />
      </div>

      <div className="grid w-full grid-cols-2 gap-2 py-6 gap-y-4 md:grid-cols-3 lg:gap-4 lg:grid-cols-4">
        {!isBooksLoading &&
          booksData &&
          booksData.items.map((book: Book) => (
            <BookCard
              key={book.bookId}
              book={book}
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          ))}
      </div>
    </div>
  );
};

export default CategoryBooks;
