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
import { Button } from "@/components/ui/button";
import { useDeleteHistory, useFetchAllHistory } from "@/hooks/useBookHistory";
import { FaTrashCan } from "react-icons/fa6";

const History = () => {
  const {data: getHistory, refetch} = useFetchAllHistory();
  const deleteHistory = useDeleteHistory();

  const handleDelete = (bookSlug:string) => {
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
    <div className="w-full">
      <div className="p-10">
        <div className="flex justify-between items-center h-[50px]">
          <div className="flex items-center gap-3">
            <img src={Sorting} alt="sorting" className="h-[50px]" />
            <Select>
              <SelectTrigger className="w-[180px] h-[50px]">
                <SelectValue placeholder="Sort by default" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Sort by default</SelectItem>
                <SelectItem value="random">Sort by random</SelectItem>
                <SelectItem value="latest">Sort by Latest</SelectItem>
                <SelectItem value="A-Z">Sort by A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="w-[380px]">
              <Input
                icon={<IoIosSearch className="text-2xl" />}
                placeholder="Search"
                className="!border-black rounded-[8px]"
              />
            </div>
          </div>
          <Button className="flex items-center gap-5 rounded-[8px] w-[100px] h-full">
            Search
          </Button>
        </div>

        <div className="mt-5">
          <ul className="flex gap-x-4 mx-4">
            {
              getHistory?.map((historyItem:any) => (
                <div key={historyItem.id}  className="relative bg-slate-100 shadow-xl border rounded-[8px] w-[232px] group">
                  <div className="group-hover:right-[10px] top-[20px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                   <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                   <FaTrashCan onClick={() => handleDelete(historyItem.book.slug)} className="text-red-500 cursor-pointer"/>
                   </div>
                  </div>
                  <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                    <img src={historyItem.book.coverImage} alt="" className="w-[86px] h-[129px]" />
                  </div>
                  <h1 className="px-3 font-semibold text-xl">{historyItem.book.title}</h1>

                  {/* <p className="flex mt-1 font-Inter font-normal text-[12px] text-gray-500">
                    <img src={historyItem?.book.category?.icon} alt="" className="mr-2 w-[20px] h-[20px]"/>
                    {historyItem?.book.category?.title}
                  </p> */}

                    <h2 className="flex my-2 px-3 font-bold text-[13px]">
                      <img src={historyItem.user.profilePicture} alt="" className="mr-2 rounded-full w-[20px] h-[20px]"/>
                      By {historyItem.user.name}

                    </h2>
                   
                  <div  />
                </div>
              ))
            }
          </ul>
        </div>
      </div>
    </div>
  );
};

export default History;
