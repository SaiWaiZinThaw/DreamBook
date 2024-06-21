import { LibraryHero } from "@/assets";
import { CategoryBooks } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useFetchAllBooks } from "@/hooks/useFetchBook";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const LibraryLayout = () => {
  const { data, isLoading } = useFetchCategories();
  const [searchParams, setSearchParams] = useSearchParams({
    search: "",
    category_ids: "",
    sortBy: "random",
  });

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    JSON.parse(searchParams.get("category_ids") || "[]")
  );
  const [sortBy, setSortBy] = useState(searchParams.get("sortBy") || "random");
  const [pageCount, setPageCount] = useState<number>(
    parseInt(searchParams.get("page") || "1")
  );

  const { data: booksData, isLoading: isBooksLoading } = useFetchAllBooks({
    search,
    selectedCategories,
    sortBy,
    pageCount,
  });

  const categoryHandler = (categoryId: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categoryId)
        ? prev.filter((id) => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  const handlePageChange = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    event.preventDefault();
    setPageCount(value);
  };

  useEffect(() => {
    const params: any = {};
    if (selectedCategories.length > 0) {
      params.category_ids = JSON.stringify(selectedCategories.join());
    }
    if (sortBy) {
      params.sort_by = sortBy;
    }
    if (search) {
      params.search = search;
    }
    if (pageCount) {
      params.page = pageCount;
    }

    setSearchParams(params);
  }, [search, sortBy, setSearchParams, selectedCategories, pageCount]);

  return (
    <div className="container w-screen px-0 mx-0">
      <div
        className="flex flex-col justify-center items-center bg-cover bg-no-repeat w-screen h-[370px] text-white"
        style={{ backgroundImage: `url(${LibraryHero})` }}
      >
        <h1 className="mt-6 text-4xl font-extrabold">Library</h1>
        <h2 className="my-3 mt-6 text-xl font-medium">
          Explore your favorite books
        </h2>
        <h2 className="text-xl font-medium">
          Reading is the best for get idea , Keep Reading
        </h2>
      </div>

      <div className="flex w-full mt-4">
        <div className="border-slate-400 mt-2 border-r w-[400px]">
          <h1 className="flex justify-center mt-[20px] font-extrabold text-2xl text-black">
            Categories
          </h1>

          <div className="flex flex-col justify-start gap-3 mt-[30px] ml-[30px]">
            <label
              key={"All"}
              className="flex items-center gap-2 text-lg font-medium"
            >
              <Checkbox />
              All
            </label>
            {!isLoading && data
              ? data.map((item) => (
                  <label
                    key={item.categoryId}
                    id={item.categoryId}
                    className="flex items-center gap-2 text-lg font-medium"
                  >
                    <Checkbox
                      onCheckedChange={() => {
                        categoryHandler(item.categoryId);
                      }}
                      checked={selectedCategories.includes(item.categoryId)}
                    />
                    {item.title}
                  </label>
                ))
              : "Loading"}
          </div>
        </div>

        <div className="flex flex-col items-center w-full">
          <CategoryBooks
            search={search}
            setSearch={setSearch}
            setSortBy={setSortBy}
            booksData={booksData}
            isBooksLoading={isBooksLoading}
          />

          <Stack spacing={1}>
            <Pagination
              color="primary"
              count={booksData?.meta.totalPages}
              defaultPage={1}
              boundaryCount={1}
              onChange={handlePageChange}
              page={pageCount}
            />
          </Stack>
        </div>
      </div>
    </div>
  );
};

export default LibraryLayout;
