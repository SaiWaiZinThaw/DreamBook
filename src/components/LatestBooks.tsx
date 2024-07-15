import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { usefetchLatestBooks } from "@/hooks/useFetchBook";
import { getToken } from "@/services/authService";
import BookCard from "./BookCard";

const LatestBooks = () => {
  const { data: booksData, isLoading: isBooksLoading } = usefetchLatestBooks();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const navigate = useNavigate();
  const token = getToken();

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
  }, [token]);

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
    <div className="py-2 overflow-x-auto transition md:p-3">
      <div className="flex w-full h-[280px]">
        {!isBooksLoading &&
          booksData &&
          booksData.items.map((book) => (
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

export default LatestBooks;
