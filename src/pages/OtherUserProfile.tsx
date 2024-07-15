import Nav from "@/components/Nav";
import { useGetMe, useGetOther, useGetUserBook } from "@/hooks/useUser";
import { useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { BsHeartFill, BsHeart, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAddFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { getToken } from "@/services/authService";
const OtherUserProfile = () => {
  const { userId } = useParams();
  const { data: userData, isLoading: ProfileIsLoading } = useGetOther(userId!);
  const {
    data: userBookData,
    isLoading: BookIsLoading,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
  } = useGetUserBook(userId!);
  const addFavorite = useAddFavorite();
  const removeFavorite = useRemoveFavorite();
  const [favorites, setFavorites] = useState<{ [key: string]: boolean }>({});
  const navigate = useNavigate();
  const token = getToken();
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
  const { data: me } = useGetMe(token!);

  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };

  useEffect(() => {
    if (userBookData) {
      const newFavorites: { [key: string]: boolean } = {};
      userBookData.pages.forEach((item) =>
        item.items.forEach((book) => {
          newFavorites[book.bookId] = Boolean(book.isFavorite);
        })
      );
      setFavorites(newFavorites);
    }
  }, [userBookData]);
  return (
    <div className="flex flex-col items-center w-full h-full gap-3">
      <Nav />
      <div className="flex flex-col w-full h-full p-10">
        {!ProfileIsLoading && (
          <div className="flex items-center justify-center w-full gap-5 p-4 border-b rounded-sm shadow-sm md:gap-20 md:flex-row border-b-border shadow-border ">
            <div className="flex flex-col items-center gap-2 ">
              <img
                src={userData?.profilePicture}
                className="md:w-[200px] md:h-[200px] h-[80px] w-[80px] rounded-full"
                alt={userData?.name}
              />
              <span className="text-xl font-bold md:text-3xl text-primary">
                {userData?.name}
              </span>
            </div>
            <div className="flex flex-col gap-5 md:gap-10">
              <div className="flex h-full gap-5 md:gap-10">
                <div className="flex flex-col">
                  <span className="text-sm font-bold md:text-lg ">Joined</span>
                  <p className="text-sm font-medium">
                    {format(parseISO(userData?.cratedAt!), " MMM, yyyy")}
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold md:text-lg ">Gender</span>
                  <span className="text-sm font-medium">
                    {userData?.gender}
                  </span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold md:text-lg ">
                    Total Books
                  </span>
                  <span className="text-sm font-medium text-center">
                    {userBookData?.pages[0].meta.totalItems}
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold md:text-lg ">Bio</span>
                <p className="text-sm font-medium line-clamp-1">
                  {userData?.bio}
                </p>
              </div>
            </div>
          </div>
        )}
        {!BookIsLoading && (
          <div className="flex flex-col items-center p-5">
            <h2 className="text-3xl font-bold text-bold">Books</h2>
            <div className="grid grid-cols-2 gap-5 p-3">
              {userBookData?.pages.map((item) =>
                item.items.map((book) => (
                  <div
                    key={book.title}
                    id={book.slug}
                    className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] min-w-[150px] max-w-[232px] h-[280px] book group"
                  >
                    <div className="group-hover:right-[10px] top-[20px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                      <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                        {favorites[book.bookId] ? (
                          <BsHeartFill
                            className="text-red-500 cursor-pointer"
                            onClick={() =>
                              toggleFavorite(book.bookId, book.slug)
                            }
                          />
                        ) : (
                          <BsHeart
                            className="cursor-pointer text-slate-500"
                            onClick={() =>
                              toggleFavorite(book.bookId, book.slug)
                            }
                          />
                        )}
                      </div>

                      <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                        <BsEyeFill
                          className="cursor-pointer text-slate-500"
                          onClick={() => navigate(`/book/${book.slug}`)}
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
                ))
              )}
            </div>
          </div>
        )}
        {userBookData?.pages[0].items.length !== 0 &&
        hasNextPage &&
        !isFetching ? (
          <Button
            className="bg-primary rounded-[6px] w-24 self-center"
            onClick={() => fetchNextPage()}
          >
            Load More
          </Button>
        ) : (
          isFetchingNextPage && (
            <Button disabled className="rounded-[8px] w-24 self-center">
              <Loader2 className="text-white animate-spin" />
            </Button>
          )
        )}
      </div>
    </div>
  );
};

export default OtherUserProfile;
