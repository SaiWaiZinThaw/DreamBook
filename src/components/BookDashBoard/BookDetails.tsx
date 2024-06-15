import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import { Input } from "@/components/ui/input";
import { useUpdateBook } from "@/hooks/useFetchABookAuthor";

import { Label } from "@/components/ui/label";
import { AiOutlineUser } from "react-icons/ai";
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
import { getToken } from "@/services/authService";
import { BsX } from "react-icons/bs";
import { updateBookType } from "@/types/types";
import { BookCoverChange, BookCoverPreview } from "./BookCoverChange";
import { useSoftDeleteBook } from "@/hooks/useDeleteBook";

const BookDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const { bookSlug } = useParams();
  const updateBook = useUpdateBook(bookSlug!);
  const {mutate: softDeleteBook} = useSoftDeleteBook();
  const token = getToken() || "";
  const { data: fetchABookAuthor } = useFetchABookAuthor(token, bookSlug!);

  const [isOn, setIsOn] = useState(true);
  const [updateData, setUpdateData] = useState<updateBookType>({
    title: "",
    coverImage: undefined,
    description: "",
    keywords: [],
    status: "draft",
    slug: "",
  });

  useEffect(() => {
    if (fetchABookAuthor?.status === "Draft") {
      setIsOn(true);
      console.log(isOn);
    } else if (fetchABookAuthor?.status === "Published") {
      setIsOn(false);
      console.log(isOn);
    }
  }, [fetchABookAuthor?.status]);

  useEffect(() => {
    if (isOn) {
      setUpdateData((prev) => ({
        ...prev,
        status: "Published",
      }));
      updateBook.mutate(updateData);
    } else {
      setUpdateData((prev) => ({
        ...prev,
        status: "D  raft",
      }));
      updateBook.mutate(updateData);
    }
  }, [isOn]);

  useEffect(() => {
    if (fetchABookAuthor) {
      setUpdateData((prev) => ({
        ...prev,
        title: fetchABookAuthor.title || "",
        description: fetchABookAuthor.description || "",
        keywords: fetchABookAuthor.keywords || [],
        status: fetchABookAuthor.status || "",
        slug: fetchABookAuthor.slug || "",
      }));
    }
  }, [fetchABookAuthor]);

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

  const toggleButton = () => {
    setIsOn(!isOn);
  };

  useEffect(() => {
    if (fetchABookAuthor?.keywords) {
      setKeywords(fetchABookAuthor.keywords);
    }
  }, [fetchABookAuthor]);

  // Function to handle edit button click
  const handleEditClick = () => {
    setIsEditing(true); // Set edit mode to true
  };

  // Function to handle cancel button click
  const handleCancelClick = () => {
    setIsEditing(false); // Set edit mode to false
  };

  // Function to handle save button click
  const handleSaveClick = (e: any) => {
    e.preventDefault();
    updateBook.mutate(updateData);
    console.log(updateData);
    // Logic to save changes
    setIsEditing(false); // Set edit mode to false
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = (bookSlug: string) => {
    softDeleteBook(bookSlug, {
      onSuccess: () => {
        console.log("Book is soft delete")
      },
      onError: (error) => {
        console.log("Error to delete", error)
      }
    })
    
  };

  const handleDeleteKeyword = (indexToDelete: any) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((_, index) => index !== indexToDelete)
    );
  };

  return (
    <div className="mx-0 px-0 w-full h-full container">
      <div className="flex border-slate-300 border-b h-[80px]">
        <h1 className="my-[20px] pl-[40px] font-extrabold text-2xl">
          Book Details
        </h1>

        <div
          className="flex gap-x-2 bg-slate-200 my-[13px] ml-[650px] rounded-[8px] w-[190px] h-[40px] text-slate-400"
          onClick={toggleButton}
        >
          <button
            className={`p-2 w-[91px] rounded-[8px] ${
              isOn ? "bg-yellow-400 text-slate-100" : "bg-gray-200"
            }`}
          >
            Draft
          </button>
          <button
            className={`p-2 w-[91px] rounded-[8px] ${
              !isOn ? "bg-green-400 text-slate-100" : "bg-gray-200"
            }`}
          >
            Public
          </button>
        </div>
      </div>
      <div className="flex h-full">
        <div className="border-slate-300 ml-[12px] border-r w-[667px]">
          <div className="h-[581px]">
            <div className="items-center gap-1.5 grid mx-[32px] pt-[30px] w-[603px] h-[74px]">
              <Label htmlFor="title" className="font-semibold text-[16px]">
                Title
              </Label>
              <div className="relative">
                {isEditing ? (
                  <Input
                    type="text"
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                      setUpdateData((prev) => ({
                        ...prev,
                        title: event.target.value,
                      }));
                    }}
                    value={updateData.title}
                    id="title"
                    className="border-slate-300 border text-black"
                  />
                ) : (
                  <h1
                    id="title"
                    className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[45px] font-semibold text-black"
                  >
                    {fetchABookAuthor?.title}
                  </h1>
                )}
                {/* <Input  type="text" id="title" placeholder={fetchABookAuthor.title}  className="border-slate-300 border text-black"/> */}
                {/* <h1 id="title" className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[45px] font-semibold text-black">{fetchABookAuthor?.title}</h1> */}
                <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" />
              </div>
            </div>

            <div className="items-center gap-1.5 grid mx-[32px] pt-[60px] w-[603px] h-[74px]">
              <Label htmlFor="category" className="font-semibold text-[16px]">
                Category
              </Label>
              <div className="relative">
                <h1
                  id="category"
                  className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[45px] font-semibold text-black"
                >
                  {fetchABookAuthor?.category.title}
                </h1>
              </div>
            </div>

            <div className="items-center gap-1.5 grid mx-[32px] pt-[90px] w-[603px] h-[74px]">
              <Label htmlFor="keywords" className="font-semibold text-[16px]">
                Keywords
              </Label>
              {isEditing ? (
                <div className="w-[603px]">
                  <Input
                    type="text"
                    id="keywords"
                    value={currentKeyword}
                    onChange={handleKeywordChange}
                    onKeyPress={handleKeyPress}
                    className="py-[8.5px] rounded-[5px] h-[45px] font-semibold text-black"
                  />
                </div>
              ) : (
                <div className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[45px] font-semibold text-black">
                  {keywords.map((keyword, index) => (
                    <span
                      key={index}
                      className="inline-block bg-gray-200 mr-2 mb-2 px-3 py-1 rounded-full font-semibold text-slate-950 text-sm"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              )}

              {isEditing && (
                <div className="flex">
                  {keywords.map((keyword, index) => (
                    <div key={index} className="flex items-center">
                      <span className="flex bg-gray-200 mr-2 mb-2 px-3 py-1 rounded-full font-semibold text-slate-950 text-sm">
                        {keyword}
                        <BsX
                          onClick={() => handleDeleteKeyword(index)}
                          className="mt-[5px] cursor-pointer"
                        />
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="items-center gap-1.5 grid mx-[32px] pt-[120px] w-[603px] h-[176px]">
              <Label
                htmlFor="description"
                className="font-semibold text-[16px]"
              >
                Description
              </Label>
              {isEditing ? (
                <textarea
                  onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
                    setUpdateData((prev) => ({
                      ...prev,
                      description: event.target.value,
                    }));
                  }}
                  value={updateData.description}
                  id="description"
                  className="border-slate-300 pt-[15px] pl-[25px] border rounded-[5px] h-[290px]"
                />
              ) : (
                <p className="border-slate-300 pt-[15px] pl-[25px] border rounded-[5px] h-[290px]">
                  {fetchABookAuthor?.description}
                </p>
              )}
            </div>
          </div>

          <div className="flex mt-[130px] ml-[390px] rounded-[8px] h-[43px]">
            <div className="">
              {isEditing ? (
                <>
                  <Button
                    onClick={handleCancelClick}
                    className="bg-white hover:bg-white text-slate-900 hover:text-slate-500"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSaveClick}
                    className="bg-primary hover:bg-blue-400 rounded-[8px] text-slate-100 hover:text-slate-200"
                  >
                    Save
                  </Button>
                </>
              ) : (
                <>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        className="border-none w-[111px] text-red-600 hover:text-red-400"
                        variant="outline"
                      >
                        Delete
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-slate-50 rounded-none">
                      <AlertDialogHeader>
                        <AlertDialogTitle className="font-extrabold text-red-600 text-xl">
                          Are you sure want to delete?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          The book will be deleted permanently and will not be
                          recovered.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel className="border-none">
                          Cancel
                        </AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDeleteConfirm(fetchABookAuthor?.slug!)}
                          className="hover:bg-blue-400 rounded-[8px] text-slate-100 hover:text-slate-200"
                        >
                          Yes! Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>

                  <Button
                    onClick={handleEditClick}
                    className="bg-primary hover:bg-blue-400 rounded-[8px] text-slate-100 hover:text-slate-200"
                  >
                    Edit
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col ml-[35px]">
          <div className="mx-8 mt-[32px] w-[232px] h-[289px]">
            <h1 className="flex justify-center mb-[18.5px] font-bold text-xl">
              Cover Image
            </h1>

            <div className="border-slate-500 border border-dotted rounded-[8px] h-[252px]">
              {isEditing && fetchABookAuthor ? (
                <BookCoverChange
                  onFileChange={handleFileChange}
                  coverImage={fetchABookAuthor.coverImage}
                />
              ) : (
                <img
                  src={fetchABookAuthor?.coverImage}
                  alt=""
                  className="mx-[52.5px] my-[30px] w-[127px] h-[191px]"
                />
              )}
            </div>
          </div>

          <div className="mx-8 mt-[84px] w-[232px] h-[314px]">
            <h1 className="flex justify-center mb-[11px] font-bold text-xl">
              Preview Card Design
            </h1>

            <div className="bg-slate-100 shadow-xl border rounded-[8px] w-[232px] h-[280px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img
                  src={fetchABookAuthor?.coverImage}
                  alt=""
                  className="w-[86px] h-[129px]"
                />
              </div>

              <div className="ml-2">
                <h1 className="font-bold text-xl">{fetchABookAuthor?.title}</h1>
                <p className="font-normal text-gray-500 text-sm">
                  {fetchABookAuthor?.category.title}
                </p>
                <h2 className="mt-3 font-medium text-md">
                  {fetchABookAuthor?.user.name}
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;

