import { useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import useFetchBooksAuthor from "@/hooks/useFetchBooksAuthor";
import { useRestoreBook } from "@/hooks/useRestore";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { useHardDeleteBook } from "@/hooks/useDeleteBook";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BiSolidChevronDown } from "react-icons/bi";
import { BiCog } from "react-icons/bi";

const Restore = () => {
  const navigate = useNavigate();
  const { data: fetchBooksAuthor, refetch } = useFetchBooksAuthor();
  const { mutate: restoreBookMutation } = useRestoreBook();
  const { mutate: hardDelete } = useHardDeleteBook();
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [allSelected, setAllSelected] = useState(false);
  const [viewMode, setViewMode] = useState<"card" | "list">("card");

  const handleRestore = (bookSlugs: string[]) => {
    restoreBookMutation(bookSlugs, {
      onSuccess: () => {
        refetch();
        navigate("/me/books");
      },
    });
  };

  const handleDelete = (bookSlugs: string[]) => {
    hardDelete(bookSlugs, {
      onSuccess: () => {
        setSelectedBooks([]);
        refetch();
      },
    });
  };

  const handleSelect = (bookSlug: string) => {
    setSelectedBooks((prevSelectedBooks) =>
      prevSelectedBooks.includes(bookSlug)
        ? prevSelectedBooks.filter((slug) => slug !== bookSlug)
        : [...prevSelectedBooks, bookSlug]
    );
  };

  const handleSelectAll = () => {
    if (allSelected) {
      setSelectedBooks([]);
    } else {
      if (fetchBooksAuthor?.items) {
        setSelectedBooks(fetchBooksAuthor.items.map((book: any) => book.slug));
      }
    }
    setAllSelected(!allSelected);
  };

  const handleRestoreAll = () => {
    if (selectedBooks.length > 0) {
      handleRestore(selectedBooks);
    }
  };

  const handleDeleteAll = () => {
    if (selectedBooks.length > 0) {
      handleDelete(selectedBooks);
    }
  };

  const toggleViewMode = (mode: "card" | "list") => {
    setViewMode(mode);
  };

  return (
    <div className="w-full mt-5">
      <div className="p-4 md:p-10">
        <div className="flex justify-between mx-4 mb-4">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex font-bold text-[14px] md:text-[16px]">
              <BiCog className="mt-1 mr-1 md:w-[19px] md:h-[19px] text-slate-700" />
              Style Settings{" "}
              <BiSolidChevronDown className="md:w-[24px] h-[24px] text-black" />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>View Mode</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toggleViewMode("card")}>
                Card View
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => toggleViewMode("list")}>
                List View
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <button
            onClick={handleSelectAll}
            className="bg-slate-300 p-2 rounded-[15px] font-medium text-[14px] md:text-[16px]"
          >
            {allSelected ? "Deselect All" : "Select All"}
          </button>
        </div>

        <div className="flex mx-4 my-5">
          <div
            className="flex p-2 mr-2 rounded bg-slate-300 w-fit h-fit"
            onClick={handleRestoreAll}
          >
            <PiArrowClockwiseBold className="mt-[2.5px] md:mt-[3.5px] mr-1" />
            <button className="text-[14px] md:text-[16px]">Restore All</button>
          </div>

          <div
            className="flex p-2 bg-red-600 rounded w-fit h-fit text-slate-200"
            onClick={handleDeleteAll}
          >
            <FaTrashCan className="mt-[3px] md:mt-1 mr-1 w-3 md:w-4" />
            <button className="text-[14px] md:text-[16px]">Delete All</button>
          </div>
        </div>

        {viewMode === "card" ? (
          <ul className="flex mx-4 gap-x-4">
            {fetchBooksAuthor?.items?.map((book: any) => (
              <div
                key={book.id}
                onClick={() => handleSelect(book.slug)}
                className={`mt-5 bg-slate-100 shadow-xl border rounded-[8px] w-[190px] md:w-[232px] h-fit ${
                  selectedBooks.includes(book.slug) ? "border-blue-500" : ""
                }`}
              >
                <div className="flex justify-between mt-2 mr-4">
                  <p className="relative bottom-6 bg-gray-500 ml-2 p-[2.5px] md:p-1 rounded-[8px] font-medium text-[14px] text-slate-50 md:text-[16px]">
                    {book.expireDayLeft} Days
                  </p>
                  <input
                    className={`${
                      selectedBooks.includes(book.slug)
                        ? " border-blue-500"
                        : "hidden"
                    }`}
                    onClick={() => handleSelect(book.slug)}
                    type="checkbox"
                    checked={selectedBooks.includes(book.slug)}
                    readOnly
                  />
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] md:h-[160px]">
                  <img
                    src={book.coverImage}
                    alt=""
                    className="w-[76px] md:w-[86px] h-[110px] md:h-[129px]"
                  />
                </div>
                <li className="mb-4">
                  <h2 className="px-3 font-semibold md:text-xl">
                    {book.title}
                  </h2>
                  <div className="flex items-center justify-center">
                    <div
                      onClick={() => handleRestore([book.slug])}
                      className="flex my-2 mr-5 text-blue-600"
                    >
                      <PiArrowClockwiseBold className="mt-[4.5px] md:w-[20px] md:h-[20px] font-extrabold" />
                    </div>
                    <div
                      onClick={() => handleDelete([book.slug])}
                      className="flex my-2 ml-2 text-red-600"
                    >
                      <FaTrashCan className="mt-[4.5px] w-[15px] md:w-[18px] h-[15px] md:h-[18px] font-extrabold" />
                    </div>
                  </div>
                </li>
              </div>
            ))}
          </ul>
        ) : (
          <div className="mx-4">
            <ul className="divide-y divide-gray-200">
              {fetchBooksAuthor?.items?.map((book: any) => (
                <li
                  key={book.id}
                  onClick={() => handleSelect(book.slug)}
                  className={`py-4 flex ${
                    selectedBooks.includes(book.slug) ? "bg-blue-100 px-2" : ""
                  }`}
                >
                  <div className="flex items-center h-12">
                    <input
                      type="checkbox"
                      checked={selectedBooks.includes(book.slug)}
                      readOnly
                      onClick={() => handleSelect(book.slug)}
                    />
                    <img
                      className="ml-4 rounded-[8px] w-8 md:w-11 h-8 md:h-11"
                      src={book.coverImage}
                      alt=""
                    />
                    <div className="ml-2">
                      <div className="font-medium text-[14px] text-gray-900 md:text-[16px]">
                        {book.title}
                      </div>
                      <div className="font-medium text-[12px] text-gray-500 md:text-[14px]">
                        {book.expireDayLeft} Days Left
                      </div>
                    </div>
                  </div>
                  <div className="flex ml-auto gap-x-4">
                    <button
                      onClick={() => handleRestore([book.slug])}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <PiArrowClockwiseBold className="md:w-5 md:h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete([book.slug])}
                      className="text-red-600 hover:text-red-900"
                    >
                      <FaTrashCan className="w-[12px] md:w-5 md:h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Restore;
