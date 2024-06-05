import { Button } from "@/components/ui/button";
import useFetchCategories from "@/hooks/useFetchCategories";

const CategorySelect = () => {
  const { data, isLoading } = useFetchCategories();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-6 gap-x-8 grid grid-cols-2 w-[600px]"
    >
      {!isLoading &&
        data?.map((category) => (
          <div className="flex justify-between items-center bg-white px-4 py-2 rounded-[5px]">
            <div className="flex items-center gap-3">
              <input
                className="rounded-[50px] w-4 h-4"
                type="checkbox"
                id={category.categoryId}
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              ></input>
              <label
                className="flex items-center gap-3 font-bold font-Inter"
                htmlFor={category.categoryId}
              >
                <img src={category.icon} alt={category.title} />
                {category.title}
              </label>
            </div>
          </div>
        ))}
      <Button className="col-span-2" size={"full"}>
        Finish
      </Button>
    </form>
  );
};

export default CategorySelect;
