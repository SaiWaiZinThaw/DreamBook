import { BookFloatAnimation } from "@/assets";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import "./animation-style.css";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BsPlus } from "react-icons/bs";
import { HiOutlineDotsVertical } from "react-icons/hi";
import "quill/dist/quill.snow.css";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useChapterCreate from "@/hooks/useChapterCreate";
import { createChapterData } from "@/types/types";
import ChapterForm from "./ChapterForm";
import { useParams } from "react-router-dom";
import {
  useDeleteChapter,
  useFetchAuthorAChapter,
} from "@/hooks/useFetchAuthorChapter";
import DOMPurify from "dompurify";

const Chapters = () => {
  const [activeTab, setActiveTab] = useState(null);
  const createChapterMutation = useChapterCreate();
  const { bookSlug } = useParams();
  const [chapterData, setChapterData] = useState<createChapterData>({
    title: "",
    content: "",
    status: "Published",
    priority: 0,
    slug: "",
  });

  const deleteChapter = useDeleteChapter();
  const [open, setOpen] = useState(false);

  const deleteHandler = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    const chapter = event.currentTarget.closest(".chapter");
    const chapterId = chapter?.id;
    deleteChapter.mutate(chapterId!);
  };

  const { data, isLoading, refetch } = useFetchAuthorAChapter(bookSlug!);

  if (!isLoading) {
    console.log(data);
  }

  useEffect(() => {
    if (deleteChapter.isSuccess) {
      alert("success");
      refetch();
    }
  }, [deleteChapter.isSuccess]);

  useEffect(() => {
    if (createChapterMutation.isSuccess) {
      setChapterData({
        title: "",
        content: "",
        status: "Draft",
        priority: 0,
        slug: "",
      });
      setOpen(false);
      refetch();
    }
  }, [createChapterMutation.isSuccess]);

  useEffect(() => {
    if (createChapterMutation.isError) {
      alert(createChapterMutation.error);
    }
  }, [createChapterMutation.isError]);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = { ...chapterData, slug: bookSlug! };
    createChapterMutation.mutate(data);
  };

  const handleTabClick = (value: any) => {
    setActiveTab(value === activeTab ? null : value);
  };

  return (
    <div className="w-full h-full">
      <div className="mx-0 px-0 w-full">
        <div className="flex flex-col w-full">
          <div className="flex border-slate-300 border-b w-full h-[40px] md:h-[80px]">
            <h1 className="md:my-[20px] md:pl-[40px] font-extrabold md:text-2xl">
              Chapters
            </h1>

            <Tabs
              defaultValue="status"
              className="bg-[#E0E0E0] md:my-[13px] ml-auto md:ml-[680px] rounded-[8px] w-[180px] md:w-[206px] h-[40px] text-slate-400"
            >
              <TabsList className="gap-x-2 w-full">
                <TabsTrigger
                  onClick={() => handleTabClick("draft")}
                  value="draft"
                  className={`bg-yellow-500 text-slate-100 rounded-[8px] w-[80px] md:w-[91px] md:h-[31px] ${
                    activeTab === "draft" ? "bg-yellow-500 text-slate-100" : ""
                  }`}
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => handleTabClick("public")}
                  value="public"
                  className={`bg-green-800 text-slate-100 rounded-[8px] md:w-[91px] w-[80px] md:h-[31px] ${
                    activeTab === "public" ? "bg-green-800 text-slate-100" : ""
                  }`}
                >
                  Public
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          <div className="flex flex-col justify-center md:px-8 md:py-4 w-full">
            {data &&
              !isLoading &&
              data.map((chapter: any) => (
                <div
                  key={chapter.chapterId}
                  className="flex flex-col justify-center shadow-secondary-foreground shadow-sm m-3 p-4 border border-border rounded-[8px] chapter"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-[16px] text-primary md:text-[18px]">
                      {chapter.title}
                    </span>
                    <DropdownMenu>
                      <DropdownMenuTrigger>
                        <HiOutlineDotsVertical className="text-xl" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="flex flex-col justify-center items-center">
                        <DropdownMenuItem className="border-b border-border text-primary">
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          id={chapter.chapterId}
                          className="text-red-500 chapter"
                          onClick={deleteHandler}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="md:px-4 line-clamp-1 text-[13px] md:text-[16px]" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(chapter?.content!) }} />
                  {/* <div >{chapter.content}</div> */}
                </div>
              ))}
          </div>
          {!data && !isLoading ? (
            <div className="flex flex-col h-[142px]">
              <div className="flex flex-col h-[142px]">
                <div className="top-[340px] left-[612px] absolute ml-[250px] transform -translate-x-1/2 -translate-y-1/2">
                  <img
                    src={BookFloatAnimation}
                    alt=""
                    className="mb-[10px] w-[88px] h-[79px] book-animation"
                  />
                  <span id="Shadow"></span>
                </div>

                <h1 className="mt-[330px] mb-4 md:ml-[490px] font-normal md:text-2xl">
                  Craft a Chapter
                </h1>
                <p className="ml-[330px] font-normal text-lg text-slate-500 text-opacity-75">
                  Could you please draft a comprehensive chapter for the book?
                </p>

                <div>
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                      <Button
                        className="flex bg-primary hover:bg-blue-500 mt-[24px] md:ml-[455px] border-none rounded-[5px] md:w-[225px] md:h-[52px] text-slate-100 md:text-lg hover:text-slate-200"
                        variant="outline"
                        onClick={() => setOpen(true)}
                      >
                        <BsPlus className="md:text-4xl" />
                        Create New Chapter
                      </Button>
                    </DialogTrigger>

                    <DialogContent className="bg-slate-50">
                      <DialogHeader className="flex justify-center items-center">
                        <DialogTitle className="font-bold text-xl">
                          Creating A Chapter
                        </DialogTitle>
                      </DialogHeader>
                      <ChapterForm
                        chapterData={chapterData}
                        setChapterData={setChapterData}
                      />
                      <DialogFooter className="ml-[683px] w-[135px] h-[43px]">
                        <Button
                          onClick={handleButton}
                          type="submit"
                          className="hover:bg-blue-500 text-slate-200 hover:text-300"
                        >
                          Save
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            </div>
          ) : (
            !isLoading && (
              <div className="flex flex-col h-[142px]">
                <div className="flex flex-col h-[142px]">
                  <div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          className="flex gap-1 bg-primary hover:bg-blue-500 mx-auto mt-[24px] md:ml-[455px] border-none rounded-[5px] md:w-[150px] md:h-[44px] text-slate-100 hover:text-slate-200"
                          variant="outline"
                        >
                          <BsPlus className="md:text-xl" />
                          New Chapter
                        </Button>
                      </DialogTrigger>

                      <DialogContent className="bg-slate-50">
                        <DialogHeader className="flex justify-center items-center">
                          <DialogTitle className="font-bold md:text-xl">
                            Creating A Chapter
                          </DialogTitle>
                        </DialogHeader>
                        <ChapterForm
                          chapterData={chapterData}
                          setChapterData={setChapterData}
                        />
                        <DialogFooter className="mx-auto md:ml-[683px] w-[135px] h-[43px]">
                          <Button
                            onClick={handleButton}
                            type="submit"
                            className="hover:bg-blue-500 text-slate-200 hover:text-300"
                          >
                            Save
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Chapters;