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
import { useGetFavorite, useRemoveFavorite } from "@/hooks/useFavorites";
import { BsHeartFill, BsEyeFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Fav = () => {
  const { data, isLoading } = useGetFavorite();
  const removeFavorite = useRemoveFavorite();
  const navigate = useNavigate();
  const hideBook = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    Bookslug: string
  ) => {
    const book = event.currentTarget.closest(`#${Bookslug}`);
    book?.classList.add("hidden");
    removeFavorite.mutate({ slug: Bookslug });
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
        <div className="grid grid-cols-2 gap-2 p-10 lg:gap-4 lg:grid-cols-4">
          {!isLoading &&
            data?.items.map((item: any) => (
              <div
                key={item.book.title}
                id={item.book.slug}
                className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] max-w-[232px] h-[280px] book group"
              >
                <div className="group-hover:right-[10px] top-[40px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <BsHeartFill
                      className="text-red-500 cursor-pointer"
                      onClick={(event) => hideBook(event, item.book.slug)}
                    />
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <BsEyeFill
                      className="cursor-pointer text-slate-500"
                      onClick={() => navigate(`/book/${item.book.slug}`)}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img
                    src={item.book.coverImage}
                    alt={item.book.coverImage}
                    className="max-w-[120px] h-[140px]"
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
                    <p className="font-Inter text-[12px] text-secondary-foreground">
                      {item.book.category.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 mt-1">
                    <img
                      src={item.book.user.profilePicture}
                      alt={item.book.user.name}
                      className="w-6 h-6 rounded-full"
                    />
                    <h2 className="text-[13px] text-black">
                      By {item.book.user.name}
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

export default Fav;
