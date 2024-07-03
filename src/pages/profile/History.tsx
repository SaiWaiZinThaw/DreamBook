import { Sorting } from "@/assets";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useDeleteHistory, useFetchAllHistory } from "@/hooks/useBookHistory";
import { FaTrashCan } from "react-icons/fa6";

const History = () => {
  const { data: getHistory, isLoading, refetch } = useFetchAllHistory();
  const deleteHistory = useDeleteHistory();

  const handleDelete = (bookSlug: string) => {
    deleteHistory.mutate(bookSlug, {
      onSuccess: () => {
        refetch();
      },
      onError: (error) => {
        console.error("Error deleting history:", error);
      },
    });
  };

  return (
    <div className="w-full h-full">
      <div className="p-10">
        <div className="flex md:flex-row md:gap-0  flex-col h-[100px] justify-between items-center mb-4 md:h-[50px]">
          <div className="flex items-center w-full gap-3">
            <img src={Sorting} alt="sorting" className="h-[30px] md:h-[50px]" />
            <Select>
              <SelectTrigger className="w-[100px] md:w-[180px] h-[30px] md:h-[50px]">
                <SelectValue placeholder="Sort by default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sort by default</SelectItem>
                <SelectItem value="random">Sort by random</SelectItem>
                <SelectItem value="latest">Sort by Latest</SelectItem>
                <SelectItem value="A-Z">Sort by A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-auto  md:w-[380px]">
              <Input
                icon={<IoIosSearch className="text-2xl" />}
                placeholder="Search"
                className="!border-black rounded-[8px] md:h-full h-[30px]"
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2 md:p-10 md:gap-4 md:grid-cols-4">
          {!isLoading &&
            getHistory?.map((item) => (
              <div
                key={item.book.title}
                id={item.book.slug}
                className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] min-w-[150px] max-w-[232px] h-[280px] book group"
              >
                <div className="group-hover:right-[5px] top-[10px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div
                    onClick={() => handleDelete(item.book.slug)}
                    className="flex items-center justify-center w-8 h-8 border rounded-full cursor-pointer bg-slate-50 drop-shadow-xl"
                  >
                    <FaTrashCan className="text-red-500" />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.coverImage}
                    className="max-w-[120px] min-w-[100px] h-[140px]"
                  />
                </div>

                <div className="flex flex-col justify-center gap-1 ml-2">
                  <h1 className="line-clamp-1 h-6 font-bold text-[15px]">
                    {item.book.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.book.category.icon}
                      alt={item.book.category.title}
                      className="w-6"
                    />
                    <p className="font-Inter text-[12px] text-secondary-foreground line-clamp-1">
                      {item.book.category.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={item.user.profilePicture}
                      alt={item.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <h2 className="font-medium text-[13px] text-black">
                      By {item.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default History;
