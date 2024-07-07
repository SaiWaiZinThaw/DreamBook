import { useDeleteHistory, useFetchAllHistory } from "@/hooks/useBookHistory";
import { useEffect, useState } from "react";
import { FaTrashCan } from "react-icons/fa6";
import { useSearchParams } from "react-router-dom";
// import Pagination from "@mui/material/Pagination";
// import Stack from "@mui/material/Stack";
const History = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });
  const [pageCount, setPageCount] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const {
    data: getHistory,
    isLoading,
    refetch,
  } = useFetchAllHistory({
    pageCount,
  });
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
  console.log(setPageCount(1));

  // const handlePageChange = (
  //   event: React.ChangeEvent<unknown>,
  //   value: number
  // ) => {
  //   event.preventDefault();
  //   setPageCount(value);
  // };

  useEffect(() => {
    const params: any = {};

    if (pageCount) {
      params.page = pageCount.toString();
    }

    setSearchParams(params);
  }, [setSearchParams, pageCount]);

  return (
    <div className="w-full h-full">
      <div className="flex flex-col justify-center w-full gap-2 p-4 md:gap-0 md:p-10">
        <h1 className="text-xl font-bold text-center lg:text-2xl"> History</h1>
        <div className="grid grid-cols-2 gap-2 md:p-10 md:gap-4 md:grid-cols-4">

          {!isLoading &&
            getHistory?.map((item) => (
              <div
                key={item.book.title}
                id={item.book.slug}
                className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] min-w-[130px] max-w-[232px] h-[280px] book group"
              >
                <div className="group-hover:right-[5px] top-[10px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div
                    onClick={() => handleDelete(item.book.slug)}
                    className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8 cursor-pointer"
                  >
                    <FaTrashCan className="text-red-500" />
                  </div>
                </div>
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
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
                    <p className="line-clamp-1 font-Inter text-[11px] text-secondary-foreground md:text-[12px]">
                      {item.book.category.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 md:gap-3 mt-1">
                    <img
                      src={item.user.profilePicture}
                      alt={item.user.name}
                      className="rounded-full w-[18px] md:w-6 h-[18px] md:h-6"
                    />
                    <h2 className="font-semibold text-[12px] text-black md:text-[13px]">
                      By {item.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {/* {!isLoading && (
          <Stack className="self-center" spacing={1}>
            <Pagination
              color="primary"
              count={getHistory?.meta.totalPages}
              defaultPage={1}
              boundaryCount={1}
              onChange={handlePageChange}
              page={pageCount}
            />
          </Stack>
        )} */}
      </div>
    </div>
  );
};

export default History;
