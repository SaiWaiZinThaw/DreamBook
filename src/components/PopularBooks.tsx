import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { useEffect, useState } from "react";
import { useFetchPopularBooks } from "@/hooks/useFetchBook";
import { useNavigate } from "react-router-dom";
import { getToken } from "@/services/authService";
import BookCard from "./BookCard";
import BookCardSkeleton from "./BookCardSkeleton";

const PopularBooks = () => {
  const { data: booksData, isLoading: isBooksLoading } = useFetchPopularBooks();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const token = getToken();
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const navigate = useNavigate();
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
    if (booksData) {
      const newFavorites: { [key: string]: boolean } = {};
      booksData.items.forEach((book) => {
        newFavorites[book.bookId] = Boolean(book.isFavorite);
      });
      setFavorites(newFavorites);
    }
  }, [booksData]);

  useEffect(() => {
    if (!token) {
      setFavorites({});
    }
  }, [token]);

  return (
    <div className="w-full py-2 overflow-x-auto transition">
      {isBooksLoading ? (
        <div className="flex w-full mt-2 h-[280px]">
          <BookCardSkeleton key="skeleton-1" />
          <BookCardSkeleton key="skeleton-2" />
          <BookCardSkeleton key="skeleton-3" />
          <BookCardSkeleton className="hidden lg:block" key="skeleton-4" />
          <BookCardSkeleton className="hidden lg:block" key="skeleton-5" />
          <BookCardSkeleton className="hidden lg:block" key="skeleton-6" />
        </div>
      ) : (
        booksData && (
          <div className="flex w-full mt-2 h-[280px]">
            {booksData.items.map((book) => (
              <BookCard
                key={book.bookId}
                book={book}
                favorites={favorites}
                toggleFavorite={toggleFavorite}
              />
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default PopularBooks;
