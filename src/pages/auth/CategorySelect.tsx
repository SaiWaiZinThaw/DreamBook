import { Button } from "@/components/ui/button";
import {
  useFetchCategories,
  useInterestedCategories,
} from "@/hooks/useFetchCategories";
import { useState } from "react";

interface Category {
  categoryId: string;
  title: string;
  icon: string;
}

const CategorySelect = () => {
  const interestedCategories = useInterestedCategories();
  const { data, isLoading } = useFetchCategories();
  const [selectedCategories, setSelectedCategories] = useState<{
    categoryIds: string[];
  }>({ categoryIds: [] });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Selected category IDs:", selectedCategories);
    // Assuming you want to mutate with the selectedCategories
    interestedCategories.mutate(selectedCategories);
  };

  const handleCheckboxChange = (categoryId: string) => {
    setSelectedCategories((prevSelected) => {
      if (prevSelected.categoryIds.includes(categoryId)) {
        return {
          categoryIds: prevSelected.categoryIds.filter(
            (id) => id !== categoryId
          ),
        };
      } else {
        return {
          categoryIds: [...prevSelected.categoryIds, categoryId],
        };
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-6 gap-x-8 grid grid-cols-2 w-[600px]"
    >
      {!isLoading &&
        data?.map((category: Category) => (
          <div
            key={category.categoryId}
            className="flex justify-between items-center bg-white px-4 py-2 rounded-[5px]"
          >
            <div className="flex items-center gap-3">
              <input
                className="rounded-[50px] w-4 h-4"
                type="checkbox"
                id={category.categoryId}
                onChange={() => handleCheckboxChange(category.categoryId)}
                checked={selectedCategories.categoryIds.includes(
                  category.categoryId
                )}
              />
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
      
      <Button className="col-span-2" size={"full"} type="submit">
        Finish
      </Button>
    </form>
  );
};

export default CategorySelect;
