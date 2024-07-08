import { BsHeartFill, BsEyeFill } from "react-icons/bs";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGetFavorite, useRemoveFavorite } from "@/hooks/useFavorites";

const Fav = () => {
  const [searchParams, setSearchParams] = useSearchParams({
    page: "1",
  });

  const [pageCount, setPageCount] = useState<number>(
    parseInt(searchParams.get("page") || "1", 10)
  );
  const { data, isLoading } = useGetFavorite({
    pageCount,
  });

  const removeFavorite = useRemoveFavorite();
  const navigate = useNavigate();

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPageCount(value);
  };

  useEffect(() => {
    const params: any = {};

    if (pageCount) {
      params.page = pageCount.toString();
    }

    setSearchParams(params);
  }, [setSearchParams, pageCount]);

  const hideBook = (
    event: React.MouseEvent<SVGElement, MouseEvent>,
    bookSlug: string
  ) => {
    const book = event.currentTarget.closest(`#${bookSlug}`);
    book?.classList.add("hidden");
    removeFavorite.mutate({ slug: bookSlug });
  };

  return (
    <div className="w-full h-full">

      <div className="flex flex-col justify-center w-full gap-5 p-4 md:p-10">
        <h1 className="text-xl font-bold text-center lg:text-2xl">
          Favorite Books
        </h1>
        <div className="grid grid-cols-2 gap-2 md:p-10 md:gap-4 md:grid-cols-4">
          {!isLoading &&
            data?.items.map((item: any) => (
              <div
                key={item.book.title}
                id={item.book.slug}
                className="relative bg-slate-100 shadow-md shadow-secondary-foreground mr-[21px] border rounded-[8px] min-w-[130px] max-w-[250px] h-[280px] book group"
              >
                <div className="group-hover:right-[10px] top-[20px] -right-3 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                    <BsHeartFill
                      className="text-red-500 cursor-pointer"
                      onClick={(event) => hideBook(event, item.book.slug)}
                    />
                  </div>

                  <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                    <BsEyeFill
                      className="text-slate-500 cursor-pointer"
                      onClick={() => navigate(`/book/${item.book.slug}`)}
                    />
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
                  <h1 className="line-clamp-1 h-6 font-bold text-[15px]">
                    {item.book.title}
                  </h1>
                  <div className="flex items-center gap-2">
                    <img
                      src={item.book.category.icon}
                      alt={item.book.category.title}
                      className="w-6"
                    />
                    <p className="line-clamp-1 font-Inter text-[12px] text-secondary-foreground">
                      {item.book.category.title}
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      navigate(`/profile/${item.book.user.userId}`)
                    }
                    className="flex items-center gap-3 mt-1 cursor-pointer"
                  >
                    <img
                      src={item.book.user.profilePicture}
                      alt={item.book.user.name}
                      className="rounded-full w-6 h-6"
                    />
                    <h2 className="font-medium text-[13px] text-black">
                      By {item.book.user.name}
                    </h2>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {!isLoading && (
          <Stack className="self-center" spacing={1}>
            <Pagination
              color="primary"
              count={data?.meta.totalPages}
              defaultPage={1}
              boundaryCount={1}
              onChange={handlePageChange}
              page={pageCount}
            />
          </Stack>
        )}
      </div>
    </div>
  );
};

export default Fav;
