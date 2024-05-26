import { BookCraftImg } from "@/assets";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AiOutlineUser } from "react-icons/ai";
import { useState } from "react";

const CreateBook = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    
    // This categories must use From API
    const categories = ["Fiction", "Non-fiction", "Science Fiction", "Mystery", "Thriller"];

    const handleCategoryChange = (event:any) => {
        setSelectedCategory(event.target.value);
    };

  return (
    <div className="mx-0 px-0 container">
        <div className="flex mt-[42px] ml-[110px] w-[660px] h-[53px] text-md">
            <div className="flex my-[12.5px] w-[83px] h-[28px] text-blue-700 text-opacity-60 cursor-pointer" onClick={() => navigate(-1)}>
                <FaArrowLeft className="mx-2 mt-1"/>
                <h2>Back</h2>
            </div>

            <div className="ml-[24px] w-[374px] h-[53px]">
                <h1 className="my-[8px] font-bold text-3xl">Creating A New Book</h1>
            </div>
        </div>

        <div className="flex">
            <div className="mt-[50px] ml-[110px] w-[199px] h-[327px]">
                <div className="border-slate-500 pt-[55px] border border-dotted rounded-[8px] h-[284px]">
                    <input type="file" className="hidden" id="fileInput"/>
                    <label htmlFor="fileInput" className="flex flex-col justify-center items-center cursor-pointer">
                        <img src={BookCraftImg} alt="" className="w-[48px] h-[48px]"/>
                        <h3 className="ml-[23px] py-[10px] font-extrabold text-slate-500 text-sm">Drop your images here or browse JPG, JPEG or PNG</h3>
                        <p className="mx-[33px] font-semibold text-[12px] text-slate-500">The size must be <br /> (123 x 123 ) px</p>
                    </label>
                </div>
                <div className="flex justify-center mx-[13px] mt-[16px] w-[173px] h-[27px]">
                    <input type="file" className="hidden" id="fileInput"/>
                    <label htmlFor="fileInput">
                        <h1 className="font-extrabold text-primary text-xl">Select Book Cover</h1>
                    </label>

                </div>
            </div>

            <div className="ml-[95px] w-[667px] h-[640px]">
                <div className="h-[581px]">
                    <div className="items-center gap-1.5 grid mx-[32px] pt-[30px] w-[603px] h-[74px]">
                        <Label htmlFor="title" className="font-semibold text-[16px]">Title</Label>
                        <div className="relative">
                            <Input type="text" id="title" placeholder="Title" className="border-slate-300 border"/>
                            <AiOutlineUser className="top-[12.7px] right-2 absolute w-[21px] h-[21px] text-gray-400" />
                        </div>
                    </div>

                    <div className="items-center gap-1.5 grid mx-[32px] pt-[60px] w-[603px] h-[74px]">
                        <Label htmlFor="category" className="font-semibold text-[16px]">Category</Label>
                        <div className="relative">
                            <select id="category" className={`${selectedCategory ? "" : "text-slate-500 text-sm text-opacity-95"} border-slate-300 pl-[16px] border rounded w-[603px] h-[45px] font-extrabold`} onChange={handleCategoryChange}>
                                <option value="" disabled selected>Select a category</option>
                                {/* Mapping over categories array to dynamically generate options */}
                                {categories.map((category, index) => (
                                    <option key={index} value={category} className="font-extrabold">{category}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <div className="items-center gap-1.5 grid mx-[32px] pt-[90px] w-[603px] h-[74px]">
                        <Label htmlFor="keywords" className="font-semibold text-[16px]">Keywords</Label>
                        <Input type="text" id="keywords" className="border-slate-300 border"/>
                    </div>
                </div>
            </div>
        </div>
        
    </div>
  )
}

export default CreateBook