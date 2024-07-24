import BookCardSkeleton from "@/components/BookCardSkeleton";
import { useDeleteHistory, useFetchAllHistory } from "@/hooks/useBookHistory";
import { useGetMe } from "@/hooks/useUser";
import { getToken } from "@/services/authService";
import { FaTrashCan } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const History = () => {
  const navigate = useNavigate();
  const { data: getHistory, isLoading, refetch } = useFetchAllHistory();
  const deleteHistory = useDeleteHistory();
  const token = getToken();
  const { data: me } = useGetMe(token!);
  const handleDelete = (bookSlug: string) => {
    deleteHistory.mutate(bookSlug, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const profileNavigation = (id: number) => {
    if (id === me?.userId) {
      navigate("/me/info");
    } else {
      navigate(`/profile/${id}`);
    }
  };

  return (
    <div className="flex flex-col items-center w-full h-full">
      <div className="flex flex-col items-center w-full gap-2 p-4 md:gap-0 md:p-10">
        <h1 className="text-xl font-bold text-center lg:text-2xl dark:text-white">
          History
        </h1>
        {isLoading ? (
          <div className="grid grid-cols-1 gap-4 py-4 md:gap-4 md:grid-cols-4">
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
            <BookCardSkeleton />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 py-4 md:gap-4 md:grid-cols-4">
            {getHistory?.map(
              (item) =>
                item.book && (
                  <div
                    key={item.book.title}
                    id={item.book.title}
                    className="relative dark:text-white dark:bg-[#2F2F2F] dark:border-none bg-slate-50 shadow-sm mr-[21px] border rounded-[8px] lg:w-[232px] min-w-[180px] max-w-[210px] h-[280px] book group"
                  >
                    <div className="group-hover:right-[5px] top-[10px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                      <div
                        onClick={() => handleDelete(item.book.slug)}
                        className="flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer bg-slate-50 drop-shadow-xl"
                      >
                        <FaTrashCan className="text-red-500" />
                      </div>
                    </div>
                    <div className="flex justify-center items-center dark:bg-[#3D3D3D] bg-slate-300 m-2 rounded-[8px] h-[160px]">
                      <img
                        src={item.book.coverImage}
                        alt={item.book.coverImage}
                        className="min-w-[100px] max-w-[120px] h-[140px]"
                      />
                    </div>

                    <div className="flex flex-col justify-center gap-1 ml-2">
                      <h1 className="line-clamp-1 h-6 font-bold text-[14px] md:text-[15px]">
                        {item.book.title}
                      </h1>
                      <div className="flex items-center gap-1 md:gap-2">
                        <img
                          src={item.book.category.icon}
                          alt={item.book.category.title}
                          className="w-[18px] md:w-6"
                        />
                        <p className="line-clamp-1 font-Inter text-[11px] text-secondary-foreground md:text-[12px] dark:text-white">
                          {item.book.category.title}
                        </p>
                      </div>
                      <div
                        onClick={() => profileNavigation(item.user.userId)}
                        className="flex items-center gap-1 mt-1 cursor-pointer md:gap-3"
                      >
                        <img
                          src={item.user.profilePicture}
                          alt={item.user.name}
                          className="rounded-full w-[18px] md:w-6 h-[18px] md:h-6"
                        />
                        <h2 className="font-semibold text-[12px] text-black md:text-[13px] dark:text-white">
                          By {item.user.name}
                        </h2>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default History;
