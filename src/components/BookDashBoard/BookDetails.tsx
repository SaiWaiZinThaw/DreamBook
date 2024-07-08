import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { useUpdateBook } from "@/hooks/useFetchABookAuthor";
import ReactQuill from "react-quill";
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
import { BsX } from "react-icons/bs";
import { updateBookType } from "@/types/types";
import { BookCoverChange } from "./BookCoverChange";
import { useSoftDeleteBook } from "@/hooks/useDeleteBook";
import DOMPurify from "dompurify";
import "react-quill/dist/quill.snow.css";
import Swal from "sweetalert2";

const BookDetails = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentKeyword, setCurrentKeyword] = useState("");
  const [keywords, setKeywords] = useState<string[]>([]);
  const { bookSlug } = useParams();
  const updateBook = useUpdateBook(bookSlug!);
  const { mutate: softDeleteBook } = useSoftDeleteBook();
  const { data: fetchABookAuthor, refetch } = useFetchABookAuthor(bookSlug!);
  const navigate = useNavigate();
  const [isOn, setIsOn] = useState(true);
  const [updateData, setUpdateData] = useState<updateBookType>({
    title: "",
    coverImage: undefined,
    description: "",
    keywords: [],
    status: "Draft",
    slug: "",
  });

  const draftToggleButton = () => {
    setIsOn(true);
    setUpdateData((prev) => ({
      ...prev,
      status: "Draft",
    }));
    updateBook.mutate(updateData);
  };

  const publishToggleButton = () => {
    setIsOn(false);
    setUpdateData((prev) => ({
      ...prev,
      status: "Published",
    }));
    updateBook.mutate(updateData);
  };

  useEffect(() => {
    if (fetchABookAuthor) {
      setUpdateData((prev) => ({
        ...prev,
        title: fetchABookAuthor.title || "",
        description: fetchABookAuthor.description || "",
        keywords: fetchABookAuthor.keywords || [],
        slug: fetchABookAuthor.slug || "",
        status: fetchABookAuthor.status || "",
      }));
      if (fetchABookAuthor.status === "Published") {
        setIsOn(false);
      } else {
        setIsOn(true);
      }
      if (fetchABookAuthor.keywords) {
        setKeywords(fetchABookAuthor.keywords);
      }
    }
  }, [fetchABookAuthor]);

  const handleFileChange = (file: File) => {
    setUpdateData((prev) => ({
      ...prev,
      coverImage: file,
    }));
  };

  useEffect(() => {
    if (updateBook.isError) {
      Swal.fire({
        title: "Error",
        text: updateBook.error.message,
        confirmButtonText: "Okay",
      });
      setIsOn(false);
    }
  });

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

  useEffect(() => {
    if (fetchABookAuthor?.keywords) {
      setKeywords(fetchABookAuthor.keywords);
    }
  }, [fetchABookAuthor]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  const handleSaveClick = (e: any) => {
    e.preventDefault();
    updateBook.mutate(updateData);
    console.log(updateData);
    setIsEditing(false);
  };

  const handleDeleteConfirm = (bookSlug: string) => {
    softDeleteBook(bookSlug, {
      onSuccess: () => {
        console.log("Book is soft delete");
        refetch();
        navigate("/me/books");
      },
      onError: (error) => {
        console.log("Error to delete", error);
      },
    });
  };

  const handleDeleteKeyword = (indexToDelete: number) => {
    setKeywords((prevKeywords) =>
      prevKeywords.filter((_, index) => index !== indexToDelete)
    );
  };

  const quillModules = {
    toolbar: false,
  };

  return (
    <div className="container w-full h-full p-0 m-0">
      <div className="flex justify-between border-slate-300 border-b h-[50px] md:h-[80px]">
        <h1 className="md:my-[20px] md:pl-[40px] font-extrabold md:text-2xl">
          Book Details
        </h1>

        <div className="flex md:gap-x-2 bg-slate-200 md:my-[13px] md:ml-[650px] rounded-[8px] w-[120px] md:w-[190px] h-[30px] md:h-[40px] text-slate-400">
          <button
            onClick={draftToggleButton}
            className={`md:p-2 w-[91px] rounded-[8px] ${
              isOn ? "bg-yellow-400 text-slate-100" : "bg-gray-200"
            }`}
          >
            Draft
          </button>
          <button
            onClick={publishToggleButton}
            className={`md:p-2 w-[91px] rounded-[8px] ${
              !isOn ? "bg-green-400 text-slate-100" : "bg-gray-200"
            }`}
          >
            Public
          </button>
        </div>
      </div>
      <div className="h-full md:flex">
        <div className="md:flex md:flex-row-reverse">
          <div className="flex md:flex-col justify-center md:ml-[35px]">
            <div className="order-1 md:order-none md:mx-8 mt-[32px] md:w-[232px] md:h-[289px]">
              <h1 className="flex justify-center mb-[18.5px] font-bold text-[14px] md:text-xl">
                Cover Image
              </h1>

              <div className="border-slate-500 border border-dotted rounded-[8px] md:h-[252px]">
                {isEditing ? (
                  <BookCoverChange
                    onFileChange={handleFileChange}
                    coverImage={fetchABookAuthor!.coverImage}
                  />
                ) : (
                  <img
                    src={fetchABookAuthor?.coverImage}
                    alt=""
                    className="md:mx-[52.5px] md:my-[30px] p-3 w-[100px] md:w-[127px] h-[150px] md:h-[191px]"
                  />
                )}
              </div>
            </div>

            <div className="order-2 mx-8 mt-[30px] md:none-order md:mt-[84px] md:w-[232px] md:h-[314px]">
              <h1 className="flex justify-center mb-[11px] font-bold text-[14px] md:text-xl">
                Preview Card Design
              </h1>

              <div className="bg-slate-100 shadow-xl border rounded-[8px] md:w-[232px] md:max-h-full">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[100px] md:h-[160px]">
                  <img
                    src={fetchABookAuthor?.coverImage}
                    alt=""
                    className="md:w-[86px] md:h-[129px]"
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

          <div className="border-slate-300 order-3 md:order-none ml-[12px] md:border-r md:w-[667px]">
            <div className="md:h-[581px]">
              <div className="items-center gap-1.5 grid md:mx-[32px] pt-2 md:pt-[30px] md:h-[74px]">
                <Label htmlFor="title" className="font-semibold md:text-[16px]">
                  Title
                </Label>
                <div className="relative">
                  {isEditing ? (
                    <Input
                      type="text"
                      onChange={(
                        event: React.ChangeEvent<HTMLInputElement>
                      ) => {
                        setUpdateData((prev) => ({
                          ...prev,
                          title: event.target.value,
                        }));
                      }}
                      value={updateData.title}
                      id="title"
                      className="border-slate-300 border text-[12.5px] text-black md:text-[16px]"
                    />
                  ) : (
                    <h1
                      id="title"
                      className="border-slate-300 py-2 md:py-[8.5px] pl-[16px] border rounded-[5px] w-full h-[35px] md:h-[45px] font-semibold text-[12.5px] text-black md:text-[16px]"
                    >
                      {fetchABookAuthor?.title}
                    </h1>
                  )}
                  <AiOutlineUser className="top-[10px] md:top-[12.7px] right-2 absolute md:w-[21px] md:h-[21px] text-gray-400" />
                </div>
              </div>

              <div className="items-center gap-1.5 grid md:mx-[32px] pt-6 md:pt-[60px]">
                <Label
                  htmlFor="category"
                  className="font-semibold md:text-[16px]"
                >
                  Category
                </Label>
                <div className="relative">
                  <h1
                    id="category"
                    className="border-slate-300 py-2 md:py-[8.5px] pl-[16px] border rounded-[5px] w-full h-[35px] md:h-[45px] font-semibold text-[12.5px] text-black md:text-[16px]"
                  >
                    {fetchABookAuthor?.category?.title! ||
                      "Category Not Available"}
                  </h1>
                </div>
              </div>

              <div className="items-center gap-1.5 grid md:mx-[32px] pt-6 md:pt-[90px] h-[74px]">
                <Label
                  htmlFor="keywords"
                  className="font-semibold md:text-[16px]"
                >
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
                      className="py-[8.5px] rounded-[5px] h-[35px] md:h-[45px] font-semibold text-black"
                    />
                  </div>
                ) : (
                  <div className="border-slate-300 py-[2px] md:py-[8.5px] pl-[16px] border rounded-[5px] h-[35px] md:h-[45px] font-semibold text-black">
                    {keywords.map((keyword, index) => (
                      <span
                        key={index}
                        className="inline-block bg-gray-200 mr-2 mb-2 md:px-3 md:py-1 p-1 rounded-full font-semibold text-[12.5px] text-slate-950 md:text-sm"
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
                        <span className="flex px-3 py-1 mb-2 mr-2 text-sm font-semibold bg-gray-200 rounded-full text-slate-950">
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

              <div className="items-center gap-1.5 grid md:mx-[32px] pt-6 md:pt-[120px] h-[140px] md:h-[176px]">
                <Label
                  htmlFor="description"
                  className="font-semibold md:text-[16px]"
                >
                  Description
                </Label>

                {isEditing ? (
                  <ReactQuill
                    value={updateData.description}
                    onChange={(content) => {
                      const sanitizedContent = DOMPurify.sanitize(content);
                      setUpdateData((prev) => ({
                        ...prev,
                        description: sanitizedContent,
                      }));
                    }}
                    className="border-slate-300 pt-2 md:pt-[15px] pl-[25px] border rounded-[5px] md:h-[290px] text-[12.5px] md:text-[16px]"
                    modules={quillModules}
                  />
                ) : (
                  <div className="border-slate-300 pt-2 md:pt-[15px] pl-[25px] border rounded-[5px] h-[120px] md:h-[290px] text-[12.5px] md:text-[16px]">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: DOMPurify.sanitize(
                          fetchABookAuthor?.description!
                        ),
                      }}
                    />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end mt-[50px] md:mt-[170px] md:mr-4 rounded-[8px] h-[43px]">
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
                          className="border-none md:w-[111px] text-red-600 md:text-md hover:text-red-400"
                          variant="outline"
                        >
                          Delete
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="rounded-none bg-slate-50">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-xl font-extrabold text-red-600">
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
                            onClick={() =>
                              handleDeleteConfirm(fetchABookAuthor!.slug!)
                            }
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
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
