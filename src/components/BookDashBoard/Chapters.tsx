// import { BookFloatAnimation, ChapterOutline, FooterImg, LightCommentOutline, LightMenuBook } from "@/assets"
// import { NavLink, useNavigate } from "react-router-dom"
// import { FaArrowLeft } from "react-icons/fa";
// import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { useEffect, useRef, useState } from "react";
// import  "./animation-style.css";
// import { Button } from "@/components/ui/button"
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { BsPlus } from "react-icons/bs";
// import useChapterCreate from "@/hooks/useChapterCreate";
// import { createChapterData } from "@/types/types";
// import { getToken } from "@/services/authService";

// const Chapters = () => {
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState(null);
//   const [content, setContent] = useState<string>("");
//   const createChapterMutation = useChapterCreate();
//   const [chapterData, setChapterData] = useState<createChapterData>({
//     title: "",
//     content: "",
//     status: "",
//     priority: 0,
//     bookId: 1,
//   });

//   // const [savedChapters, setSavedChapters] = useState([]);
//   useEffect(() => {
//     if (createChapterMutation.isSuccess) {
//       console.log(createChapterMutation.data);
//       getToken();
//     }
//   }, [createChapterMutation.isSuccess]);

//   useEffect(() => {
//     if (createChapterMutation.isError) {
//       alert("Error");
//     }
//   }, [createChapterMutation.isError]);

//   const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
//     e.preventDefault();
//     const data = { ...chapterData };
//     createChapterMutation.mutate(data);
//     console.log(data);

//   }

//   const handleTabClick = (value:any) => {
//     setActiveTab(value === activeTab ? null : value);
//   };

// // In this Section, Save the chapter content to the state or perform any necessary actions
//   // const handleSaveChapter = () => {
//   //   setSavedChapters([...savedChapters, content]);
//   // };

//   return (
//     <div className="mx-0 px-0 w-screen container">
//       <div className="flex">
//         <div className="bg-primary bg-opacity-90 w-[296px]">
//           <div className="border-slate-300 border-b h-[80px]">
//               <img src={FooterImg} alt=""  className="mx-[33.5px] py-[7.5px] w-[223px]"/>
//           </div>

//           <div className="mt-[54px]">
//            <NavLink className={({isActive}) => isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""} to={'/book-dashboard/book-details'}>
//               <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
//                 <img src={LightMenuBook} alt="" className="mr-[8px] w-[24px] h-[31px]" />
//                 <h1 className="font-semibold text-lg text-slate-100">Book Details</h1>
//               </div>
//            </NavLink>

//             <NavLink className={({isActive}) => isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""} to={'/book-dashboard/chapters'}>
//               <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
//                 <img src={ChapterOutline} alt="" className="mr-[8px] w-[24px] h-[24px]" />
//                 <h1 className="font-semibold text-lg text-slate-100">Chapters</h1>
//               </div>
//             </NavLink>

//             <NavLink className={({isActive}) => isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""} to={'/book-dashboard/comments'}>
//               <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
//                 <img src={LightCommentOutline} alt="" className="mr-[8px] w-[24px] h-[24px]" />
//                 <h1 className="font-semibold text-lg text-slate-100">Comments</h1>
//               </div>
//             </NavLink>
//           </div>

//           <div className="flex border-slate-300 mt-[607px] pt-[23px] pl-[19px] border-t h-[71px] text-white cursor-pointer" onClick={() => navigate(-1)}>
//             <FaArrowLeft className="mt-[4px] mr-[8px] w-[20px] h-[20px]"/>
//             <h1 className="font-medium text-lg">Exit to Booklists</h1>
//           </div>
//         </div>

//         <div className="flex flex-col">
//             <div className="flex border-slate-300 border-b h-[80px]">
//               <h1 className="my-[20px] pl-[40px] font-extrabold text-2xl">Chapters</h1>

//               <Tabs defaultValue="status" className="bg-slate-200 my-[13px] ml-[680px] rounded-[8px] w-[206px] h-[40px] text-slate-400">
//                 <TabsList className="gap-x-2 w-full">
//                   <TabsTrigger onClick={() => handleTabClick('draft')} value="draft" className={`bg-yellow-500 text-slate-100 rounded-[8px] w-[91px] h-[31px] ${activeTab === 'draft' ? 'bg-yellow-500 text-slate-100' : ''}`}>Draft</TabsTrigger>
//                   <TabsTrigger onClick={() => handleTabClick('public')} value="public"  className={`bg-green-800 text-slate-100 rounded-[8px] w-[91px] h-[31px] ${activeTab === 'public' ? 'bg-green-800 text-slate-100' : ''}`}>Public</TabsTrigger>
//                 </TabsList>
//               </Tabs>
//             </div>

//             <div className="flex flex-col h-[142px]">
//               <div className="top-[340px] left-[612px] absolute ml-[250px] transform -translate-x-1/2 -translate-y-1/2">
//                 <img src={BookFloatAnimation} alt="" className="mb-[10px] w-[88px] h-[79px] book-animation"/>
//                 <span id="Shadow"></span>
//               </div>

//                 <h1 className="mt-[330px] mb-4 ml-[490px] font-normal text-2xl">Craft a Chapter</h1>
//                 <p className="ml-[330px] font-normal text-lg text-slate-500 text-opacity-75">Could you please draft a comprehensive chapter for the book?</p>

//                 <form>
//                   <Dialog>
//                     <DialogTrigger asChild>
//                       <Button className="flex bg-primary hover:bg-blue-500 mt-[24px] ml-[455px] border-none w-[235px] h-[52px] text-lg text-slate-100 hover:text-slate-200" variant="outline">
//                         <BsPlus className="text-4xl"/>
//                         Create New Chapter
//                       </Button>
//                     </DialogTrigger>
//                     <DialogContent className="bg-slate-50 lg:w-[922px] lg:h-[573px]">
//                       <DialogHeader className="flex justify-center items-center">
//                         <DialogTitle className="font-bold text-xl">Creating A Chapter</DialogTitle>
//                       </DialogHeader>
//                       <div className="gap-4 grid py-4">
//                         <div className="items-center gap-1.5 grid mx-[32px]">
//                           <Label htmlFor="title" className="font-semibold text-[16px]">Title</Label>

//                           <div className="relative">
//                               <Input
//                                 type="text"
//                                 name="title"
//                                 value={chapterData.title}
//                                 onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
//                                 setChapterData((prev) => ({
//                                   ...prev,
//                                   title: event.target.value,
//                                 }));
//                               }}
//                               id="title"
//                               placeholder="Title"
//                               className="border-slate-300 border"/>
//                           </div>
//                         </div>

//                         <div className="items-center gap-1.5 grid mx-[32px]">

//                         </div>

//                       </div>
//                       <DialogFooter className="ml-[683px] w-[135px] h-[43px]">
//                         <Button onClick={handleButton} className="hover:bg-blue-500 text-slate-200 hover:text-300">Save</Button>
//                       </DialogFooter>
//                     </DialogContent>
//                   </Dialog>
//                 </form>
//             </div>

//         </div>
//       </div>
//     </div>
//   )
// }

// export default Chapters

import {
  BookFloatAnimation,
  ChapterOutline,
  FooterImg,
  LightCommentOutline,
  LightMenuBook,
} from "@/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
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
import "quill/dist/quill.snow.css";

import useChapterCreate from "@/hooks/useChapterCreate";
import { createChapterData } from "@/types/types";
import { getToken } from "@/services/authService";
import ChapterForm from "./ChapterForm";

const Chapters = () => {
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState(null);
  const createChapterMutation = useChapterCreate();

  const [chapterData, setChapterData] = useState<createChapterData>({
    title: "",
    content: "",
    status: "draft",
    priority: 0,
  });
  // const [savedChapters, setSavedChapters] = useState([]);

  useEffect(() => {
    if (createChapterMutation.isSuccess) {
      console.log(createChapterMutation.data);
      getToken();
    }
  }, [createChapterMutation.isSuccess]);

  useEffect(() => {
    if (createChapterMutation.isError) {
      alert("Error");
    }
  }, [createChapterMutation.isError]);

  const handleButton = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const data = { ...chapterData };
    createChapterMutation.mutate(data);
    console.log(data);
  };

  const handleTabClick = (value: any) => {
    setActiveTab(value === activeTab ? null : value);
  };

  // In this Section, Save the chapter content to the state or perform any necessary actions
  // const handleSaveChapter = () => {
  //   setSavedChapters([...savedChapters, content]);
  // };

  return (
    <div className="mx-0 px-0 w-screen container">
      <div className="flex">
        <div className="bg-primary bg-opacity-90 w-[296px]">
          <div className="border-slate-300 border-b h-[80px]">
            <img
              src={FooterImg}
              alt=""
              className="mx-[33.5px] py-[7.5px] w-[223px]"
            />
          </div>

          <div className="mt-[54px]">
            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""
              }
              to={"/book-dashboard/book-details"}
            >
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img
                  src={LightMenuBook}
                  alt=""
                  className="mr-[8px] w-[24px] h-[31px]"
                />
                <h1 className="font-semibold text-lg text-slate-100">
                  Book Details
                </h1>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""
              }
              to={"/book-dashboard/chapters"}
            >
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img
                  src={ChapterOutline}
                  alt=""
                  className="mr-[8px] w-[24px] h-[24px]"
                />
                <h1 className="font-semibold text-lg text-slate-100">
                  Chapters
                </h1>
              </div>
            </NavLink>

            <NavLink
              className={({ isActive }) =>
                isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""
              }
              to={"/book-dashboard/comments"}
            >
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img
                  src={LightCommentOutline}
                  alt=""
                  className="mr-[8px] w-[24px] h-[24px]"
                />
                <h1 className="font-semibold text-lg text-slate-100">
                  Comments
                </h1>
              </div>
            </NavLink>
          </div>

          <div
            className="flex border-slate-300 mt-[607px] pt-[23px] pl-[19px] border-t h-[71px] text-white cursor-pointer"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft className="mt-[4px] mr-[8px] w-[20px] h-[20px]" />
            <h1 className="font-medium text-lg">Exit to Booklists</h1>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex border-slate-300 border-b h-[80px]">
            <h1 className="my-[20px] pl-[40px] font-extrabold text-2xl">
              Chapters
            </h1>

            <Tabs
              defaultValue="status"
              className="bg-slate-200 my-[13px] ml-[680px] rounded-[8px] w-[206px] h-[40px] text-slate-400"
            >
              <TabsList className="gap-x-2 w-full">
                <TabsTrigger
                  onClick={() => handleTabClick("draft")}
                  value="draft"
                  className={`bg-yellow-500 text-slate-100 rounded-[8px] w-[91px] h-[31px] ${
                    activeTab === "draft" ? "bg-yellow-500 text-slate-100" : ""
                  }`}
                >
                  Draft
                </TabsTrigger>
                <TabsTrigger
                  onClick={() => handleTabClick("public")}
                  value="public"
                  className={`bg-green-800 text-slate-100 rounded-[8px] w-[91px] h-[31px] ${
                    activeTab === "public" ? "bg-green-800 text-slate-100" : ""
                  }`}
                >
                  Public
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          <div className="flex flex-col h-[142px]">
            <div className="top-[340px] left-[612px] absolute ml-[250px] transform -translate-x-1/2 -translate-y-1/2">
              <img
                src={BookFloatAnimation}
                alt=""
                className="mb-[10px] w-[88px] h-[79px] book-animation"
              />
              <span id="Shadow"></span>
            </div>

            <div className="flex flex-col h-[142px]">
              <div className="top-[340px] left-[612px] absolute ml-[250px] transform -translate-x-1/2 -translate-y-1/2">
                <img
                  src={BookFloatAnimation}
                  alt=""
                  className="mb-[10px] w-[88px] h-[79px] book-animation"
                />
                <span id="Shadow"></span>
              </div>

              <h1 className="mt-[330px] mb-4 ml-[490px] font-normal text-2xl">
                Craft a Chapter
              </h1>
              <p className="ml-[330px] font-normal text-lg text-slate-500 text-opacity-75">
                Could you please draft a comprehensive chapter for the book?
              </p>

              <div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      className="flex bg-primary hover:bg-blue-500 mt-[24px] ml-[455px] border-none w-[235px] h-[52px] text-lg text-slate-100 hover:text-slate-200"
                      variant="outline"
                    >
                      <BsPlus className="text-4xl" />
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
        </div>
      </div>
    </div>
  );
};

export default Chapters;
