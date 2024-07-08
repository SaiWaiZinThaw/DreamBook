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
  }, [updateBook.isError]);

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

  const handleSaveClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    updateBook.mutate(updateData);
    setIsEditing(false);
  };

  const handleDeleteConfirm = (bookSlug: string) => {
    softDeleteBook(bookSlug, {
      onSuccess: () => {
        console.log("Book is soft deleted");
        refetch();
        navigate("/me/books");
      },
      onError: (error) => {
        console.log("Error deleting book", error);
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
                    coverImage={fetchABookAuthor?.coverImage}
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
                    className="w-[46px] md:w-[86px] md:h-[129px]"
                  />
                </div>

                <div className="border-slate-500 border border-dotted rounded-[8px] md:h-[252px]">
                  {isEditing ? (
                    <BookCoverChange
                      onFileChange={handleFileChange}
                      coverImage={fetchABookAuthor?.coverImage}
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
            </div>

            <div className="order-3 md:order-none ml-[12px] md:border-r md:w-[667px]">
              <div className="md:h-[581px]">
                <div className="items-center gap-1.5 grid md:mx-[32px] pt-2 md:pt-[30px] md:h-[74px]">
                  <Label
                    htmlFor="title"
                    className="flex justify-between md:ml-[38px] font-bold text-[14px] md:text-xl"
                  >
                    Book Title
                  </Label>

                  <Input
                    id="title"
                    className="md:w-[463px] h-[30px] md:h-[40px] text-slate-400 md:ml-[38px] rounded-[8px] border-slate-300"
                    type="text"
                    value={updateData.title}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, title: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex gap-1.5 md:ml-[32px] pt-[11px] md:pt-[15px] md:h-[113px]">
                  <Label
                    htmlFor="description"
                    className="flex justify-between md:ml-[38px] font-bold text-[14px] md:text-xl"
                  >
                    Description
                  </Label>

                  <ReactQuill
                    id="description"
                    value={updateData.description || ""}
                    onChange={(value) =>
                      setUpdateData({ ...updateData, description: value })
                    }
                    modules={quillModules}
                    theme="snow"
                    readOnly={!isEditing}
                    className="md:w-[526px] h-[46px] md:h-[79px] md:ml-[38px] text-slate-400 rounded-[8px] border-slate-300"
                  />
                </div>

                <div className="flex md:ml-[32px] pt-[12px] md:pt-[16px] md:h-[161px]">
                  <Label
                    htmlFor="keywords"
                    className="flex justify-between md:ml-[38px] font-bold text-[14px] md:text-xl"
                  >
                    Keywords
                  </Label>

                  <div className="md:flex md:flex-wrap md:ml-[36px]">
                    {keywords.map((keyword, index) => (
                      <div
                        key={index}
                        className="flex items-center bg-slate-200 text-slate-400 px-[5px] py-[2px] md:mr-[5px] mb-[5px] rounded-[8px]"
                      >
                        <span className="">{keyword}</span>
                        {isEditing && (
                          <button
                            onClick={() => handleDeleteKeyword(index)}
                            className="ml-[6px] focus:outline-none"
                          >
                            <BsX className="text-red-600" />
                          </button>
                        )}
                      </div>
                    ))}

                    {isEditing && (
                      <Input
                        id="keywords"
                        className="md:w-[123px] h-[30px] md:h-[40px] text-slate-400 rounded-[8px] border-slate-300"
                        type="text"
                        value={currentKeyword}
                        onChange={handleKeywordChange}
                        onKeyPress={handleKeyPress}
                        placeholder="Add keyword"
                      />
                    )}
                  </div>
                </div>

                <div className="md:flex gap-3 pt-[12px] md:pt-[16px] md:h-[70px] md:ml-[32px]">
                  <Label
                    htmlFor="author"
                    className="flex justify-between md:ml-[38px] font-bold text-[14px] md:text-xl"
                  >
                    Author
                  </Label>

                  <Input
                    id="author"
                    className="md:w-[187px] h-[30px] md:h-[40px] text-slate-400 rounded-[8px] border-slate-300"
                    type="text"
                    value={fetchABookAuthor?.user.name}
                    disabled
                  />
                </div>

                <div className="flex md:ml-[32px] pt-[8px] md:pt-[10px]">
                  <Label
                    htmlFor="slug"
                    className="flex justify-between md:ml-[38px] font-bold text-[14px] md:text-xl"
                  >
                    Slug
                  </Label>

                  <Input
                    id="slug"
                    className="md:w-[250px] h-[30px] md:h-[40px] text-slate-400 rounded-[8px] border-slate-300"
                    type="text"
                    value={updateData.slug}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, slug: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="md:flex gap-3 pt-[13px] md:pt-[16px] md:ml-[32px]">
                  <Label
                    htmlFor="status"
                    className="flex justify-between md:ml-[38px] font-bold text-[14px] md:text-xl"
                  >
                    Status
                  </Label>

                  <Input
                    id="status"
                    className="md:w-[190px] h-[30px] md:h-[40px] text-slate-400 rounded-[8px] border-slate-300"
                    type="text"
                    value={updateData.status}
                    onChange={(e) =>
                      setUpdateData({ ...updateData, status: e.target.value })
                    }
                    disabled={!isEditing}
                  />
                </div>

                <div className="flex justify-center pt-[26px] md:pt-[40px]">
                  {isEditing ? (
                    <>
                      <Button
                        onClick={handleCancelClick}
                        className="mr-[12px] w-[94px] h-[40px] rounded-[8px] bg-yellow-400 text-slate-100"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleSaveClick}
                        className="w-[94px] h-[40px] rounded-[8px] bg-slate-100 text-slate-400"
                      >
                        Save
                      </Button>
                    </>
                  ) : (
                    <Button
                      onClick={handleEditClick}
                      className="w-[94px] h-[40px] rounded-[8px] bg-yellow-400 text-slate-100"
                    >
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <AlertDialog>
        <AlertDialogTrigger>
          <Button
            className="w-[40px] h-[30px] md:mb-[55px] md:ml-[950px] md:mt-[32px] bg-slate-300 text-slate-400"
            onClick={() =>
              handleDeleteConfirm(
                updateData.slug || fetchABookAuthor?.slug || ""
              )
            }
          >
            <AiOutlineUser />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Attention</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogDescription>
            {`Are you sure you want to delete: ${DOMPurify.sanitize(
              fetchABookAuthor?.title || ""
            )}?`}
          </AlertDialogDescription>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="text-slate-100 bg-slate-500 rounded-[8px]"
              onClick={() =>
                handleDeleteConfirm(
                  updateData.slug || fetchABookAuthor?.slug || ""
                )
              }
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default BookDetails;
