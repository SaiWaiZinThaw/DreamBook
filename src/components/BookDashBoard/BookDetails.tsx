import { ChapterOutline, FooterImg, LightCommentOutline, LightMenuBook, BestSelf } from "@/assets"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import { FaArrowLeft } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
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
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { useFetchABookAuthor } from "@/hooks/useFetchABookAuthor";
import { getToken } from "@/services/authService";
import { BsX } from "react-icons/bs";

const BookDetails = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [keywords, setKeywords] = useState([]);
  const {bookId} = useParams();
  console.log(bookId);
  const token = getToken() || "";
  const { data: fetchABookAuthor}  = useFetchABookAuthor(token, parseInt(bookId!))
  console.log(fetchABookAuthor)
  const [isOn, setIsOn] = useState(true);

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
  const handleSaveClick = () => {
    // Logic to save changes
    setIsEditing(false); // Set edit mode to false
  };

  // Function to handle delete confirmation
  const handleDeleteConfirm = () => {
    // Logic to delete book
    // navigate(-1); // Example: Navigate back
  };

  const handleDeleteKeyword = (indexToDelete:any) => {
    setKeywords((prevKeywords) => prevKeywords.filter((_, index) => index !== indexToDelete));
  };


  return (
    <div className="mx-0 px-0 w-screen container">
      <div className="flex">
        <div className="bg-primary bg-opacity-90 w-[296px]">
          <div className="border-slate-300 border-b h-[80px]">
            <img src={FooterImg} alt=""  className="mx-[33.5px] py-[7.5px] w-[223px]"/>
          </div>
          

          <div className="mt-[54px]">
           <NavLink className={({isActive}) => isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""} to={`/book-dashboard/${bookId}/book-details`}>
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img src={LightMenuBook} alt="" className="mr-[8px] w-[24px] h-[31px]" />
                <h1 className="font-semibold text-lg text-slate-100">Book Details</h1>
              </div>
           </NavLink>

            <NavLink className={({isActive}) => isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""} to={'/book-dashboard/chapters'}>
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img src={ChapterOutline} alt="" className="mr-[8px] w-[24px] h-[24px]" />
                <h1 className="font-semibold text-lg text-slate-100">Chapters</h1>
              </div>
            </NavLink>

            <NavLink className={({isActive}) => isActive ? "bg-slate-300 bg-opacity-50 flex w-[296px]" : ""} to={'/book-dashboard/comments'}>
              <div className="flex mb-[8px] py-[13.5px] pl-[16px] h-[56px]">
                <img src={LightCommentOutline} alt="" className="mr-[8px] w-[24px] h-[24px]" />
                <h1 className="font-semibold text-lg text-slate-100">Comments</h1>
              </div>
            </NavLink>
          </div>

          <div className="flex border-slate-300 mt-[670px] pt-[23px] pl-[19px] border-t h-[71px] text-white cursor-pointer" onClick={() => navigate(-1)}>
            <FaArrowLeft className="mt-[4px] mr-[8px] w-[20px] h-[20px]"/>
            <h1 className="font-medium text-lg">Exit to Booklists</h1>
          </div>
        </div>

        <div className="flex flex-col">
        <div className="flex border-slate-300 border-b h-[80px]">
          <h1 className="my-[20px] pl-[40px] font-extrabold text-2xl">Book Details</h1>

          <div className="flex gap-x-2 bg-slate-200 my-[13px] ml-[650px] rounded-[8px] w-[190px] h-[40px] text-slate-400" onClick={toggleButton}>
              <button className={`p-2 w-[91px] rounded-[8px] ${isOn ? 'bg-yellow-400 text-slate-100' : 'bg-gray-200'}`}>Draft</button>
              <button className={`p-2 w-[91px] rounded-[8px] ${!isOn ? 'bg-green-400 text-slate-100' : 'bg-gray-200'}`}>Public</button>
          </div>

          {/* <Tabs defaultValue="draft" className="bg-slate-200 my-[13px] ml-[650px] rounded-[8px] w-[206px] h-[40px] text-slate-400">
            <TabsList className="gap-x-2 w-full">
              <TabsTrigger onClick={() => handleTabClick('draft')} value="draft" className={`bg-yellow-500 text-slate-100 rounded-[8px] w-[91px] h-[31px] ${activeTab === 'draft' ? 'bg-yellow-500 text-slate-100' : ''}`}>Draft</TabsTrigger>
              <TabsTrigger onClick={() => handleTabClick('public')} value="public"  className={`bg-green-800 text-slate-100 rounded-[8px] w-[91px] h-[31px] ${activeTab === 'public' ? 'bg-green-800 text-slate-100' : ''}`}>Public</TabsTrigger>
            </TabsList>
          </Tabs> */}
          </div>

          <div className="flex">
            <div className="border-slate-300 ml-[12px] border-r w-[667px] h-[982px]">
                <div className="h-[581px]">
                    <div className="items-center gap-1.5 grid mx-[32px] pt-[30px] w-[603px] h-[74px]">
                        <Label htmlFor="title" className="font-semibold text-[16px]">Title</Label>
                        <div className="relative">
                            {/* <Input  type="text" id="title" placeholder={fetchABookAuthor.title}  className="border-slate-300 border text-black"/> */}
                            <h1 id="title" className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[45px] font-semibold text-black">{fetchABookAuthor?.title}</h1>
                            <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" />
                        </div>
                    </div>

                    <div className="items-center gap-1.5 grid mx-[32px] pt-[60px] w-[603px] h-[74px]">
                        <Label htmlFor="category" className="font-semibold text-[16px]">Category</Label>
                        <div className="relative">
                        <h1 id="category" className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[45px] font-semibold text-black">{fetchABookAuthor?.category.title}</h1>

                       
                        </div>
                    </div>

                    <div className="items-center gap-1.5 grid mx-[32px] pt-[90px] w-[603px] h-[74px]">
                        <Label htmlFor="keywords" className="font-semibold text-[16px]">Keywords</Label>
                        <h1 id="keywords" className="border-slate-300 py-[8.5px] pl-[16px] border rounded-[5px] h-[52px] font-semibold text-black">
                        <ul className="flex space-x-2">
                        {keywords.map((keyword, index) => (
                          <li key={index} className="flex border-primary p-[3px] pl-2 border border-opacity-55 rounded-md text-slate-600">
                            {keyword}
                            <BsX onClick={() => handleDeleteKeyword(index)} className="mt-[5px] cursor-pointer" />
                          </li>
                        ))}
                        </ul>
                        </h1>
                    </div>

                    <div className="items-center gap-1.5 grid mx-[32px] pt-[120px] w-[603px] h-[176px]">
                        <Label htmlFor="description" className="font-semibold text-[16px]">Description</Label>
                          <p className="border-slate-300 pt-[15px] pl-[25px] border rounded-[5px] h-[290px]">{fetchABookAuthor?.description}</p>
                    </div>
                </div>

                  <div className="flex mt-[130px] ml-[390px] rounded-[8px] h-[43px]">
                    
                     <div className="">
                      {isEditing ? (
                        <>
                          <Button onClick={handleCancelClick} className="bg-white hover:bg-white text-slate-900 hover:text-slate-500">
                            Cancel
                          </Button>
                          <Button onClick={handleSaveClick} className="bg-primary hover:bg-blue-400 rounded-[8px] text-slate-100 hover:text-slate-200">
                            Save
                          </Button>
                        </>
                      ) : (
                        <>

                          <AlertDialog>
                            <AlertDialogTrigger asChild>
                              <Button className="border-none w-[111px] text-red-600 hover:text-red-400" variant="outline">Delete</Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="bg-slate-50 rounded-none">
                              <AlertDialogHeader>
                                <AlertDialogTitle className="font-extrabold text-red-600 text-xl">Are you sure want to delete?</AlertDialogTitle>
                                <AlertDialogDescription>
                                The book will be deleted permanently and will not be recovered.
                                </AlertDialogDescription>
                              </AlertDialogHeader>
                              <AlertDialogFooter>
                                <AlertDialogCancel className="border-none">Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDeleteConfirm} className="hover:bg-blue-400 rounded-[8px] text-slate-100 hover:text-slate-200">Yes!  Delete</AlertDialogAction>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialog>

                          <Button onClick={handleEditClick} className="bg-primary hover:bg-blue-400 rounded-[8px] text-slate-100 hover:text-slate-200">
                            Edit
                          </Button>
                        </>
                        
                      )}
                    </div>
                  </div>
                </div>
              
                <div className="flex flex-col ml-[35px]">
                  <div className="mx-8 mt-[32px] w-[232px] h-[289px]">
                      <h1 className="flex justify-center mb-[18.5px] font-bold text-xl">Cover Image</h1>

                      <div className="border-slate-500 border border-dotted rounded-[8px] h-[252px]">
                          <input type="file" className="hidden" id="fileInput"/>
                          <img src={fetchABookAuthor?.coverImage} alt="" className="mx-[52.5px] my-[30px] w-[127px] h-[191px]"/>
                      </div>
                  </div>

                  <div className="mx-8 mt-[84px] w-[232px] h-[314px]">
                    <h1 className="flex justify-center mb-[11px] font-bold text-xl">Preview Card Design</h1>

                    <div className="bg-slate-100 shadow-xl border rounded-[8px] w-[232px] h-[280px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={fetchABookAuthor?.coverImage} alt="" className="w-[86px] h-[129px]"/>
                     </div>
                     
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">{fetchABookAuthor?.title}</h1>
                        <p className="font-normal text-gray-500 text-sm">{fetchABookAuthor?.category.title}</p>
                        <h2 className="mt-3 font-medium text-md">{fetchABookAuthor?.user.name}</h2>
                     </div>

                   </div>
                  </div>
                </div>
            </div>
          
            
        </div>

        </div>
        
      </div>
   
  )
}

export default BookDetails;

