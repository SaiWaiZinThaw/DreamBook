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

const History = () => {
  return (
    <div className="w-full ">
      <div className="p-10">
        <div className="flex items-center h-[50px] justify-between">
          <div className="flex items-center gap-3">
            <img src={Sorting} alt="sorting" className=" h-[50px]" />
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
          <Button className="w-[100px] flex items-center gap-5 rounded-[8px] h-full ">
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default History;
