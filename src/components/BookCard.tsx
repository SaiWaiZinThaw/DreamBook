import React from "react";
import { useNavigate } from "react-router-dom";
import { BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";
import { Book } from "@/types/types";
import { getToken } from "@/services/authService";
import { useGetMe } from "@/hooks/useUser";

interface BookCardProps {
  book: Book;
  favorites: { [key: string]: boolean };
  toggleFavorite: (bookId: string, bookSlug: string) => void;
}

const BookCard: React.FC<BookCardProps> = ({
  book,
  favorites,
  toggleFavorite,
}) => {
  const navigate = useNavigate();
  const token = getToken();
  const { data: me } = useGetMe(token!);
  const profileNavigation = (id: number) => {
    navigate(id === me?.userId ? "/me/info" : `/profile/${id}`);
  };

  const viewBook = (bookSlug: string) => {
    navigate(`/book/${bookSlug}`);
  };

  return (
    <div
      key={book.bookId}
      id={book.bookId}
      className="relative bg-slate-50 shadow-sm mr-[21px] border rounded-[8px]  lg:w-[232px] min-w-[160px] max-w-[210px] h-[280px] book group"
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
          alt={book.title}
          className="w-[120px] h-[140px]"
        />
      </div>

      <div className="flex flex-col justify-center gap-1 ml-2">
        <h1 className="line-clamp-1 h-6 font-bold text-[15px]">{book.title}</h1>
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
        <div
          onClick={() => profileNavigation(book.user.userId)}
          className="flex items-center gap-3 mt-1 cursor-pointer"
        >
          <img
            src={book.user.profilePicture}
            alt={book.user.name}
            className="w-6 h-6 rounded-full"
          />
          <h2 className="text-[13px] text-black">By {book.user.name}</h2>
        </div>
      </div>
    </div>
  );
};

export default BookCard;