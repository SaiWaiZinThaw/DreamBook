import { BookCraftImg } from "@/assets";
import { FaArrowLeft } from "react-icons/fa";
import { NavLink, useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AiOutlineUser } from "react-icons/ai";
import { FaBold, FaListUl, FaListOl, FaAlignLeft, FaAlignCenter, FaAlignRight  } from "react-icons/fa";
import { FaUnderline } from "react-icons/fa";
import { FaItalic } from "react-icons/fa6";
import { useState } from "react";
import { useEffect, useRef } from 'react';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';

const CreateBook = () => {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("");
    const [description, setDescription] = useState<string>("");
    const quillRef = useRef<HTMLDivElement>(null);
    const quillInstance = useRef<Quill | null>(null);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    // This categories must use From API
    const categories = ["Fiction", "Non-fiction", "Science Fiction", "Mystery", "Thriller"];

    const handleCategoryChange = (event:any) => {
        setSelectedCategory(event.target.value);
    };

    useEffect(() => {
        if (quillRef.current) {
            quillInstance.current = new Quill(quillRef.current, {
                theme: 'snow',
                modules: {
                    toolbar: false
                }
            });

            quillInstance.current.on('text-change', () => {
                setDescription(quillInstance.current?.root.innerHTML || '');
            });
        }
    }, []);

    
    const applyFormat = (format: string) => {
        if (quillInstance.current) {
            const cursorPosition = quillInstance.current.getSelection()?.index;
            if (cursorPosition !== null && cursorPosition !== undefined) {
                // Check if the format is already applied
                const isApplied = quillInstance.current.getFormat(cursorPosition)?.[format];
                const isBulletApplied = quillInstance.current.getFormat(cursorPosition)?.list === 'bullet';
                const isOrderedApplied = quillInstance.current.getFormat(cursorPosition)?.list === 'ordered';
                if (isApplied) {
                    quillInstance.current.format(format, false);
                }
                else if (isBulletApplied && format === 'bullet') {
                    // If bullet format is already applied, remove it
                    quillInstance.current.format('list', false);
                } else if (isOrderedApplied && format === 'ordered') {
                    // If ordered format is already applied, remove it
                    quillInstance.current.format('list', false);
                } else {
                    // If format is not applied, apply it
                    switch(format) {
                        case 'bold':
                            quillInstance.current.format('bold', true);
                            break;
                        case 'italic':
                            quillInstance.current.format('italic', true);
                            break;
                        case 'underline':
                            quillInstance.current.format('underline', true);
                            break;
                        case 'bullet':
                            quillInstance.current.format('list', 'bullet');
                            break;
                        case 'ordered':
                            quillInstance.current.format('list', 'ordered');
                            break;
                        default:
                            break;
                    }
                }
            }
        }
    };
    
    
    
    
    const alignLeft = () => {
        if (quillInstance.current) {
            quillInstance.current.format('align', false); // Remove existing alignment
            quillInstance.current.format('align', 'left'); // Apply left alignment
        }
    };
    
    const alignCenter = () => {
        if (quillInstance.current) {
            quillInstance.current.format('align', false); // Remove existing alignment
            quillInstance.current.format('align', 'center'); // Apply center alignment
        }
    };
    
    const alignRight = () => {
        if (quillInstance.current) {
            quillInstance.current.format('align', false); // Remove existing alignment
            quillInstance.current.format('align', 'right'); // Apply right alignment
        }
    };
    



  return (
    <div>
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

            <div className="ml-[95px] w-[667px]">
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
                        <select
                            id="category"
                            value={selectedCategory} // Use value prop instead of selected attribute
                            className={`${selectedCategory ? "" : "text-slate-500 text-sm text-opacity-95"} border-slate-300 pl-[16px] border rounded w-[603px] h-[45px] font-extrabold`}
                            onChange={handleCategoryChange}
                        >
                            <option value="" disabled>Select a category</option>
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

                    <div className="items-center gap-1.5 grid mx-[32px] pt-[120px] w-[603px] h-[176px]">
                        <Label htmlFor="description" className="font-semibold text-[16px]">Description</Label>
                        <div ref={quillRef} className="border-slate-300 border rounded w-full h-[200px]" />
                        <div className="relative">
                            <div className="bottom-0 absolute mb-[8px] ml-[25px]">
                                <button onClick={() => applyFormat('bold')} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaBold className="w-[17px] h-[17px]"/></button>
                                <button onClick={() => applyFormat('italic')} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaItalic className="w-[17px] h-[17px]"/></button>
                                <button onClick={() => applyFormat('underline')} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaUnderline className="w-[17px] h-[17px]"/></button>
                                <button onClick={alignLeft} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaAlignLeft className="w-[17px] h-[17px]"/></button>
                                <button onClick={alignCenter} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaAlignCenter className="w-[17px] h-[17px]"/></button>
                                <button onClick={alignRight} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaAlignRight className="w-[17px] h-[17px]"/></button>
                                <button onClick={() => applyFormat('bullet')} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaListUl className="w-[17px] h-[17px]"/></button>
                                <button onClick={() => applyFormat('ordered')} className="border-slate-300 bg-slate-300 mx-1 p-1 border rounded-[4px]"><FaListOl className="w-[17px] h-[17px]"/></button>
                            </div>
                            <textarea
                                ref={textareaRef}
                                id="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                className="hidden"
                            />
                        </div>
                       
                             
                    </div>
                </div>

               <NavLink to={'/book-dashboard'}>
                    <div className="flex bg-primary mx-[32px] my-10 rounded-[8px] w-[603px] h-[43px] text-center">
                        <button className="justify-center mx-[256px] text-white">Create Now</button>
                    </div>
               </NavLink>
            </div>
        </div>
        
    </div>
  )
}

export default CreateBook