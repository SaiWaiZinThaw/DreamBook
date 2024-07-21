import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUpdateBook } from "@/hooks/useFetchABookAuthor";
import ReactQuill from "react-quill";
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useFetchABookAuthor } from "@/hooks/useFetchABookAuthor";
import { BsX } from "react-icons/bs";
import { updateBookType } from "@/types/types";
import { BookCoverChange } from "./BookCoverChange";
import { useSoftDeleteBook } from "@/hooks/useDeleteBook";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";
import Switch from "../ui/toggle-switch";

const BookDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const { bookSlug } = useParams();
  const updateBook = useUpdateBook(bookSlug!);
  const { mutate: softDeleteBook } = useSoftDeleteBook();
  const { data: fetchABookAuthor, refetch } = useFetchABookAuthor(bookSlug!);
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(false);
  const [updateData, setUpdateData] = useState<updateBookType>({
    title: "",
    coverImage: undefined,
    description: "",
    keywords: [],
    status: "Draft",
    slug: "",
  });

  const handleToggle = () => {
    setIsOn((prevIsOn) => {
      const newIsOn = !prevIsOn;
      setUpdateData((prevData) => ({
        ...prevData,
        status: newIsOn ? "Published" : "Draft",
      }));
      return newIsOn;
    });
  };

  useEffect(() => {
    if (fetchABookAuthor) {
      setUpdateData({
        title: fetchABookAuthor.title || "",
        description: fetchABookAuthor.description || "",
        keywords: fetchABookAuthor.keywords || [],
        slug: fetchABookAuthor.slug || "",
        status: fetchABookAuthor.status || "Draft",
      });
      setKeywords(fetchABookAuthor.keywords || []);
      setIsOn(fetchABookAuthor.status === "Published");
    }
  }, [fetchABookAuthor]);

  useEffect(() => {
    if (updateBook.isError) {
      Swal.fire({
        title: "Error",
        text: updateBook.error.message,
        confirmButtonText: "Okay",
      });
      setIsOn(!isOn);
    }
  }, [updateBook.isError, updateBook.error, updateData.status]);

  useEffect(() => {
    if (updateBook.isSuccess) {
      navigate(`/book-dashboard/${updateBook.data.slug}/book-details`);
    }
  }, [updateBook.isSuccess]);

  const handleFileChange = (file: File) => {
    setUpdateData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentKeyword(event.target.value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentKeyword.trim()) {
      event.preventDefault();
      const trimmedKeyword = currentKeyword.trim();
      const newKeywords = [trimmedKeyword, ...keywords];
      setKeywords(newKeywords);
      setUpdateData((prev) => ({ ...prev, keywords: newKeywords }));
      setCurrentKeyword("");
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    updateBook.mutate(updateData);
    setIsEditing(false);
  };

  const handleDeleteConfirm = (bookSlug: string) => {
    softDeleteBook(bookSlug, {
      onSuccess: () => {
        refetch();
        navigate("/me/books");
      },
    });
  };

  const handleDeleteKeyword = (indexToDelete: number) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="container w-full h-full p-0 m-0">
      <div className="flex justify-between border-slate-300 px-10 border-b h-[50px] md:h-[80px]">
        <h1 className="self-center font-extrabold md:text-2xl">Book Details</h1>

        <div className="flex flex-col justify-center">
          {isEditing && (
            <span className="font-semibold text-[#6E8894] text-lg self-end">
              *Unsaved
            </span>
          )}
          <div className="flex items-center gap-1">
            {(!isOn && (
              <span className="text-xl font-bold text-secondary-foreground">
                Draft
              </span>
            )) || (
              <span className="text-xl font-bold text-primary">Public</span>
            )}
            <Switch
              isOn={isOn}
              handleToggle={handleToggle}
              isDisabled={isEditing}
            />
          </div>
        </div>
      </div>
      <div className="h-full lg:flex">
        <div className="lg:flex lg:flex-row-reverse">
          <div className="flex lg:flex-col justify-center md:ml-[35px]">
            <div className="order-1 lg:order-none md:mx-8 mt-[32px] md:w-[232px] md:h-[289px]">
              <h1 className="flex justify-center mb-[18.5px] font-bold text-[14px] md:text-xl">
                Cover Image
              </h1>

              <div className="flex justify-center items-center border-slate-500 border border-dotted rounded-[8px] md:w-[232px] md:h-[252px]">
                {isEditing ? (
                  <BookCoverChange
                    onFileChange={handleFileChange}
                    coverImage={fetchABookAuthor!.coverImage}
                  />
                ) : (
                  <img
                    src={fetchABookAuthor?.coverImage}
                    alt=""
                    className="p-3 w-[100px] md:w-[127px] h-[150px] md:h-[191px]"
                  />
                )}
              </div>
            </div>

            <div className="order-2 mx-8 mt-[30px] lg:none-order lg:mt-[84px] md:w-[232px] md:h-[314px]">
              <h1 className="flex justify-center mb-[11px] font-bold text-[14px] md:text-xl">
                Preview Card Design
              </h1>

              <div className="bg-slate-100 shadow-xl border rounded-[8px] md:w-[232px] md:max-h-full">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[100px] md:h-[160px]">
                  <img
                    src={fetchABookAuthor?.coverImage}
                    alt=""
                    className="w-[50px] md:w-[86px] md:h-[129px]"
                  />
                </div>

                <div className="ml-2">
                  <h1 className="font-bold text-[13px] md:text-[15px]">
                    {fetchABookAuthor?.title}
                  </h1>
                  <p className="flex mt-[1.5px] md:mt-1 font-Inter font-normal text-[10px] text-gray-500 md:text-[12px]">
                    <img
                      src={fetchABookAuthor?.category?.icon}
                      alt=""
                      className="mr-2 w-[14px] md:w-[20px] h-[14px] md:h-[20px]"
                    />
                    {fetchABookAuthor?.category?.title}
                  </p>
                  <h2 className="flex my-2 font-bold text-[11.5px] md:text-[13px]">
                    <img
                      src={fetchABookAuthor?.user?.profilePicture}
                      alt=""
                      className="mr-2 rounded-full w-[14px] md:w-[20px] h-[14px] md:h-[20px]"
                    />
                    By {fetchABookAuthor?.user?.name}
                  </h2>
                </div>
              </div>
            </div>
          </div>

          <div className="border-slate-300 order-3 lg:order-none ml-[12px] lg:border-r lg:w-[667px]">
            <div className="flex justify-end items-center mr-[21px] lg:h-[68px]">
              {isEditing ? (
                <>
                  <Button
                    variant="ghost"
                    className="text-[14px] md:text-base"
                    onClick={handleCancelClick}
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    variant="default"
                    className="text-[14px] md:text-base"
                    onClick={handleSaveClick}
                  >
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="default"
                  className="text-[14px] md:text-base"
                  onClick={handleEditClick}
                >
                  Edit
                </Button>
              )}
            </div>
            <div className="mt-[30px]">
              <div className="flex flex-col mx-[33px] lg:h-[620px]">
                <div className="w-full">
                  <Label
                    htmlFor="title"
                    className="text-sm font-bold md:text-lg"
                  >
                    Title
                  </Label>
                  <Input
                    id="title"
                    className="w-full md:w-[498px] md:h-[50px] text-base border border-gray-300 rounded-lg p-3"
                    value={updateData.title}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, title: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="mt-[30px]">
                  <Label
                    htmlFor="author"
                    className="text-sm font-bold md:text-lg"
                  >
                    Author
                  </Label>
                  <Input
                    id="author"
                    className="w-full md:w-[498px] md:h-[50px] text-base border border-gray-300 rounded-lg p-3"
                    value={fetchABookAuthor?.user?.name}
                    disabled
                  />
                </div>

                <div className="mt-[30px]">
                  <Label
                    htmlFor="description"
                    className="text-sm font-bold md:text-lg"
                  >
                    Description
                  </Label>
                  <div className="w-full md:w-[600px] h-[265px]">
                    {isEditing ? (
                      <ReactQuill
                        value={updateData.description}
                        onChange={(value) =>
                          setUpdateData({ ...updateData, description: value })
                        }
                        className="h-full md:h-[250px] border border-gray-300 rounded-lg p-3"
                      />
                    ) : (
                      <div
                        className="prose max-w-none"
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(
                            updateData.description || ""
                          ),
                        }}
                      ></div>
                    )}
                  </div>
                </div>

                <div className="mt-[30px]">
                  <Label
                    htmlFor="category"
                    className="text-sm font-bold md:text-lg"
                  >
                    Category
                  </Label>
                  <Input
                    id="category"
                    className="w-full md:w-[498px] md:h-[50px] text-base border border-gray-300 rounded-lg p-3"
                    value={fetchABookAuthor?.category?.title}
                    disabled
                  />
                </div>

                <div className="mt-[30px] w-full md:w-[498px] md:h-[103px]">
                  <Label
                    htmlFor="keywords"
                    className="text-sm font-bold md:text-lg"
                  >
                    Keywords
                  </Label>
                  <div className="flex flex-wrap items-center p-3 border border-gray-300 rounded-lg">
                    {isEditing ? (
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <div
                            key={index}
                            className="flex items-center px-2 py-1 text-blue-500 bg-blue-100 rounded-full"
                          >
                            {keyword}
                            <BsX
                              className="ml-1 cursor-pointer"
                              onClick={() => handleDeleteKeyword(index)}
                            />
                          </div>
                        ))}
                        <Input
                          id="keywords"
                          className="p-0 text-sm border-0 outline-none md:text-base focus:outline-none"
                          value={currentKeyword}
                          onChange={handleKeywordChange}
                          onKeyPress={handleKeyPress}
                          placeholder="Add keyword"
                        />
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {keywords.map((keyword, index) => (
                          <div
                            key={index}
                            className="px-2 py-1 text-blue-500 bg-blue-100 rounded-full"
                          >
                            {keyword}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="ghost"
                      className="text-red-500 font-bold mt-[30px] self-start"
                    >
                      Delete this book
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Are you absolutely sure?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This action cannot be undone. This will permanently
                        delete your book.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() =>
                          handleDeleteConfirm(fetchABookAuthor!.slug)
                        }
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
