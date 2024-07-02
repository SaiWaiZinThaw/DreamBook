import { BookCraftImg } from "@/assets";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { AiOutlineUser } from "react-icons/ai";
import "quill/dist/quill.snow.css";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { getToken } from "@/services/authService";
import useBookCreate from "@/hooks/useBookCreate";
import { CreateBookData } from "@/types/types";
import { useState, useEffect, useRef } from "react";
import Quill from "quill";
import "quill/dist/quill.snow.css";
import { Label } from "@/components/ui/label";
import { BsX } from "react-icons/bs";
import {
  FaBold,
  FaListUl,
  FaListOl,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
} from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";
import { useGetMe } from "@/hooks/useUser";
import { Creating } from "./ui/loading-button";
import DOMPurify from "dompurify";

const CreateBook = () => {
  const navigate = useNavigate();
  const [currentKeyword, setCurrentKeyword] = useState("");
  const quillRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<Quill | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isBoldActive, setIsBoldActive] = useState(false);
  const [isItalicActive, setIsItalicActive] = useState(false);
  const [isUnderlineActive, setIsUnderlineActive] = useState(false);
  const isLeftActive = false;
  const isCenterActive = false;
  const isRightActive = false;
  const [isBulletActive, setIsBulletActive] = useState(false);
  const [keywordError, setKeywordError] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titleError, setTitleError] = useState(false);
  const [isOrderActive, setIsOrderActive] = useState(false);
  const token = getToken() || "";
  const { data: fetchMyProfile } = useGetMe(token);
  const { data: fetchCategories } = useFetchCategories();
  const createBookMutation = useBookCreate();
  const [formData, setFormData] = useState<CreateBookData>({
    title: "",
    coverImage: "",
    description: "",
    keywords: [],
    status: "Draft",
    categoryId: "",
  });
  console.log(token);

  useEffect(() => {
    if (quillRef.current) {
      quillInstance.current = new Quill(quillRef.current, {
        theme: "snow",
        modules: {
          toolbar: false,
        },
      });
      quillRef.current.focus();

      quillInstance.current.on("text-change", () => {
        const sanitizedHtml = DOMPurify.sanitize(
          quillInstance.current!.root.innerHTML || ""
        );
        setFormData((prev) => ({
          ...prev,
          description: sanitizedHtml,
        }));

        setTimeout(() => {
          const editorLength = quillInstance.current?.getLength() || 0;
          quillInstance.current?.setSelection(editorLength, 0);
        }, 0);
      });

      if (formData.description) {
        const sanitizedHtml = DOMPurify.sanitize(formData.description);
        quillInstance.current.clipboard.dangerouslyPasteHTML(sanitizedHtml);
      }
    }
  }, [formData.description && quillRef]);

  const applyFormat = (format: string) => {
    if (quillInstance.current) {
      const cursorPosition = quillInstance.current.getSelection()?.index;
      if (cursorPosition !== null && cursorPosition !== undefined) {
        const isApplied =
          quillInstance.current.getFormat(cursorPosition)?.[format];
        const isBulletApplied =
          quillInstance.current.getFormat(cursorPosition)?.list === "bullet";
        const isOrderedApplied =
          quillInstance.current.getFormat(cursorPosition)?.list === "ordered";
        if (isApplied) {
          quillInstance.current.format(format, false);
        } else if (isBulletApplied && format === "bullet") {
          quillInstance.current.format("list", false);
        } else if (isOrderedApplied && format === "ordered") {
          quillInstance.current.format("list", false);
        } else {
          switch (format) {
            case "bold":
              quillInstance.current.format("bold", true);
              break;
            case "italic":
              quillInstance.current.format("italic", true);
              break;
            case "underline":
              quillInstance.current.format("underline", true);
              break;
            case "bullet":
              quillInstance.current.format("list", "bullet");
              break;
            case "ordered":
              quillInstance.current.format("list", "ordered");
              break;
            default:
              break;
          }
        }
      }
    }
  };

  const handleBold = () => {
    applyFormat("bold");
    setIsBoldActive(!isBoldActive);
  };

  const handleItalic = () => {
    applyFormat("italic");
    setIsItalicActive(!isItalicActive);
  };

  const handleUnderline = () => {
    applyFormat("underline");
    setIsUnderlineActive(!isUnderlineActive);
  };
  const handleBullet = () => {
    applyFormat("bullet");
    setIsBulletActive(!isBulletActive);
  };
  const handleOrder = () => {
    applyFormat("ordered");
    setIsOrderActive(!isOrderActive);
  };

  const alignLeft = () => {
    if (quillInstance.current) {
      quillInstance.current.format("align", false);
      quillInstance.current.format("align", "left");
    }
  };

  const alignCenter = () => {
    if (quillInstance.current) {
      quillInstance.current.format("align", false);
      quillInstance.current.format("align", "center");
    }
  };

  const alignRight = () => {
    if (quillInstance.current) {
      quillInstance.current.format("align", false);
      quillInstance.current.format("align", "right");
    }
  };

  useEffect(() => {
    if (
      (createBookMutation.isSuccess && fetchMyProfile !== null) ||
      undefined
    ) {
      const createdBookSlug = createBookMutation.data?.slug;
      if (createdBookSlug) {
        navigate(`/book-dashboard/${createdBookSlug}/book-details`);
      }
    }
  }, [(createBookMutation.isSuccess && fetchMyProfile !== null) || undefined]);

  useEffect(() => {
    if (createBookMutation.isError) {
      createBookMutation.error.message;
    }
  }, [createBookMutation.isError]);

  const selectRef = useRef<HTMLSelectElement>(null);
  const handleChange = () => {
    if (selectRef.current) {
      const selectedOption =
        selectRef.current.options[selectRef.current.selectedIndex];
      const selectedId = selectedOption.id;
      setFormData((prev) => ({
        ...prev,
        categoryId: selectedId,
      }));
      setSelectedCategory(selectRef.current.value);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (fetchMyProfile) {
      createBookMutation.mutate(formData);
      console.log(formData);
    } else if (formData.title.trim() === "") {
      setTitleError(true);
    } else if (formData.keywords.length === 0) {
      setKeywordError(true);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const file = event?.target?.files[0];
      setFormData((prev) => ({
        ...prev,
        coverImage: file,
      }));
    }
  };

  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      title: event.target.value,
    }));
    if (event.target.value.trim() !== "") {
      setTitleError(false);
    }
  };

const handleBlur = () => {
  setTitleError(formData.title.trim() === "");
  setKeywordError(formData.keywords.length === 0);
};

  const handleDeleteKeyword = (indexToDelete: any) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      keywords: prevFormData.keywords.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  const handleKeywordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentKeyword(event.target.value);
    if (event.target.value.trim() !== "") {
      setKeywordError(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && currentKeyword.trim()) {
      event.preventDefault();
      const trimmedKeyword = currentKeyword.trim();
      setFormData((prev) => ({
        ...prev,
        keywords: [trimmedKeyword, ...prev.keywords],
      }));
      setCurrentKeyword("");
    }
  };

  return (
    <div>
      <div className="flex mt-[42px] ml-[110px] w-[660px] h-[53px] text-md">
        <div
          className="flex my-[12.5px] w-[83px] h-[28px] text-blue-700 text-opacity-60 cursor-pointer"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft className="mx-2 mt-1" />
          <h2>Back</h2>
        </div>

        <div className="ml-[24px] w-[374px] h-[53px]">
          <h1 className="my-[8px] font-bold text-3xl">Creating A New Book</h1>
        </div>
      </div>

      <form className="flex" onSubmit={handleSubmit}>
        <div className="mt-[50px] ml-[110px] w-[199px] h-[327px]">
          <div className="h-[284px]">
            {formData.coverImage instanceof File ? (
              <img
                src={URL.createObjectURL(formData.coverImage)}
                alt="Uploaded Cover"
                className="rounded-[8px] w-full h-full object-cover"
              />
            ) : (
              <label
                htmlFor="fileInput"
                className="flex flex-col justify-center items-center border-slate-500 border border-dotted rounded-[8px] h-[284px] cursor-pointer"
              >
                <img
                  src={BookCraftImg}
                  alt=""
                  className="w-[48px] h-[48px] object-cover"
                />
                <h3 className="flex px-[10px] py-[10px] font-extrabold text-slate-500 text-sm">
                  Drop your images here or browse JPG, JPEG or PNG
                </h3>
                <p className="mx-[33px] font-semibold text-[12px] text-slate-500">
                  The size must be <br /> (123 x 123 ) px
                </p>
              </label>
            )}
          </div>
          <div className="flex justify-center mt-[16px] h-[27px]">
            <input
              onChange={handleFileChange}
              name="coverImage"
              type="file"
              className="hidden"
              id="fileInput"
            />
            <label htmlFor="fileInput">
              <h1 className="font-extrabold text-[19px] text-primary">
                Select Book Cover
              </h1>
            </label>
          </div>
        </div>

        <div className="ml-[95px] w-[667px]">
          <div className="h-[581px]">
            <div className="items-center gap-1.5 grid mx-[32px] pt-[30px] w-[603px] h-[74px]">
              <Label htmlFor="title" className="font-semibold text-[16px]">
                Title
              </Label>
              <div className="relative">
                <Input
                  onChange={handleTitleChange}
                  value={formData.title}
                  name="title"
                  type="text"
                  id="title"
                  placeholder="Title"
                  onBlur={handleBlur}
                  required
                />
                <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" />
              </div>
              {titleError && (
                <div className="ml-[10px] font-bold text-red-500 text-sm">
                  <h1>* Please fill the title</h1>
                </div>
              )}
            </div>

            <div className="items-center gap-1.5 grid mx-[32px] pt-[60px] w-[603px] h-[74px]">
              <Label htmlFor="category" className="font-semibold text-[16px]">
                Category
              </Label>
              <div className="relative">
                <select
                  name="category"
                  id="category"
                  className={`border-slate-300 pl-[16px] border rounded w-[603px] h-[45px] font-extrabold ${
                    selectedCategory === "" ? "text-slate-300" : ""
                  }`}
                  ref={selectRef}
                  onChange={handleChange}
                  defaultValue=""
                >
                  <option value="" disabled className="font-extrabold">
                    Select Category
                  </option>
                  {fetchCategories?.map((category: any) => (
                    <option
                      key={category.categoryId}
                      className="font-extrabold"
                      id={category.categoryId}
                    >
                      {category.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="items-center gap-1.5 grid mx-[32px] pt-[90px] w-[603px] h-[74px]">
              <Label htmlFor="keywords" className="font-semibold text-[16px]">
                Keywords
              </Label>
              <Input
                onChange={handleKeywordChange}
                value={currentKeyword}
                onKeyPress={handleKeyPress}
                name="keywords"
                type="text"
                id="keywords"
              />
              <div>
                <ul className="absolute flex space-x-2 ml-4">
                  {formData.keywords.map((keyword, index) => (
                    <li
                      key={index}
                      className="flex border-primary px-2 py-1 border border-opacity-55 rounded-md text-slate-600"
                    >
                      {keyword}
                      <BsX
                        onClick={() => handleDeleteKeyword(index)}
                        className="mt-[5px] cursor-pointer"
                      />
                    </li>
                  ))}
                </ul>
              </div>
              {keywordError && (
                <div className="ml-[10px] font-bold text-red-500 text-sm">
                  * Please add at least one keyword
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
              <div
                ref={quillRef}
                className="border-slate-300 border rounded w-full h-[200px]"
              />
              <div className="relative">
                <div className="bottom-0 absolute mb-[8px] ml-[25px]">
                  <button
                    type="button"
                    onClick={handleBold}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isBoldActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaBold className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleItalic}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isItalicActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaItalic className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleUnderline}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isUnderlineActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaUnderline className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={alignLeft}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isLeftActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaAlignLeft className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={alignCenter}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isCenterActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaAlignCenter className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={alignRight}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isRightActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaAlignRight className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleBullet}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isBulletActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaListUl className="w-[17px] h-[17px]" />
                  </button>
                  <button
                    type="button"
                    onClick={handleOrder}
                    className={`border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]  ${
                      isOrderActive ? "bg-blue-500 text-slate-100" : ""
                    }`}
                  >
                    <FaListOl className="w-[17px] h-[17px]" />
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  id="description"
                  name="description"
                  placeholder="Description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: DOMPurify.sanitize(e.target.value),
                    }))
                  }
                  className="hidden"
                />
              </div>
            </div>
          </div>

          {!createBookMutation.isPending ? (
            <div className="flex bg-primary mx-[32px] my-10 rounded-[8px] w-[603px] h-[43px] text-center">
              <button
                type="submit"
                className="justify-center mx-[256px] text-white"
              >
                Create Now
              </button>
            </div>
          ) : (
            <div>
              <Creating />
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default CreateBook;
