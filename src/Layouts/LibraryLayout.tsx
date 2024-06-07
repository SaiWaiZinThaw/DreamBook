import { LibraryHero } from "@/assets";
import { CategoryBooks } from "@/components";
import { Checkbox } from "@/components/ui/checkbox";
import { useFetchCategories } from "@/hooks/useFetchCategories";

const LibraryLayout = () => {
  const { data, isLoading } = useFetchCategories();
  // const token = getToken();

  // if (!token) {
  //   return <div>Error: Unable to fetch books. Token is missing.</div>;
  // }

  // const { data: books, isLoading: isBooksLoading } = useFetchAllBooks(token);

  // if (!isBooksLoading) {
  //   console.log(books);
  // }

  return (
    <div className="container px-0 mx-0">
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

      <div className="flex mt-4">
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
                    className="flex items-center gap-2 text-lg font-medium"
                  >
                    <Checkbox />
                    {item.title}
                  </label>
                ))
              : "Loading"}
          </div>
        </div>

        <div className="overflow-hidden">
          <CategoryBooks />
        </div>
      </div>
    </div>
  );
};

export default LibraryLayout;
