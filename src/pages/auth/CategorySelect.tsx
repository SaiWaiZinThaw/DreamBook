import { Button } from "@/components/ui/button";
import {
  useFetchCategories,
  useInterestedCategories,
} from "@/hooks/useFetchCategories";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface Category {
  categoryId: string;
  title: string;
  icon: string;
}

const CategorySelect = () => {
  const navigate = useNavigate();
  const interestedCategories = useInterestedCategories();
  const { data, isLoading } = useFetchCategories();
  const [selectedCategories, setSelectedCategories] = useState<{
    categoryIds: string[];
  }>({ categoryIds: [] });
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedCategories.categoryIds.length < 3) {
      setShowError(true);
    } else {
      setShowError(false);
      interestedCategories.mutate(selectedCategories);
    }
  };
  const [showError, setShowError] = useState(false);


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

  useEffect(() => {
    if (interestedCategories.isSuccess) {
      navigate("/");
    }
  }, [interestedCategories.isSuccess]);

  return (
    <form
      onSubmit={handleSubmit}
      className="gap-2 gap-x-3 md:gap-6 md:gap-x-8 grid grid-cols-2 py-4 w-full md:w-[600px]"
    >
      {!isLoading &&
        data?.map((category: Category) => (
          <div
            key={category.categoryId}
            className="flex justify-between items-center bg-white px-4 py-2 rounded-[5px] h-[50px] md:h-auto"
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
                className="flex items-center gap-3 font-bold font-Inter lg-text-lg text-[12px]"
                htmlFor={category.categoryId}
              >
                <img
                  src={category.icon}
                  alt={category.title}
                  className="w-[20px] md:w-auto"
                />
                {category.title}
              </label>
            </div>
          </div>
        ))}

      {showError && (
        <div className="col-span-2 mt-2 text-red-500 text-sm">
          Please select at least 3 categories.
        </div>
      )}

      <Button className="col-span-2 mt-4" size={"full"} type="submit">
        Finish
      </Button>
    </form>
  );
};

export default CategorySelect;
