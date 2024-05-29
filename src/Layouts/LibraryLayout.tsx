import { LibraryHero } from "@/assets"
import { CategoryBooks } from "@/components";
import { useState } from "react";
import { MdCheckBoxOutlineBlank, MdCheckBox } from "react-icons/md";

const LibraryLayout = () => {
    const [isCheckedAll, setIsCheckedAll] = useState(false);
    const [isCheckedDigitalMarketing, setIsCheckedDigitalMarketing] = useState(false);
    const [isCheckedPersonalDevelopment, setIsCheckedPersonalDevelopment] = useState(false);
    const [isCheckedTechnology, setIsCheckedTechnology] = useState(false);
    const [isCheckedTimeManagement, setIsCheckedTimeManagement] = useState(false);
    const [isCheckedHealth, setIsCheckedHealth] = useState(false);
    const [isCheckedContentMarketing, setIsCheckedContentMarketing] = useState(false);
    const [isCheckedProductivity, setIsCheckedProductivity] = useState(false);
    const [isCheckedSuccess, setIsCheckedSuccess] = useState(false);
    const [isCheckedEconomy, setIsCheckedEconomy] = useState(false);
    const [isCheckedHistory, setIsCheckedHistory] = useState(false);

    const handleCheckboxChange = (checkboxName:any) => {
        switch (checkboxName) {
            case 'all':
                setIsCheckedAll(!isCheckedAll);
                break;
            case 'digital marketing':
                setIsCheckedDigitalMarketing(!isCheckedDigitalMarketing);
                break;
            case 'personal development':
                setIsCheckedPersonalDevelopment(!isCheckedPersonalDevelopment);
                break;
            case 'technology':
                setIsCheckedTechnology(!isCheckedTechnology);
                break;
            case 'time management':
                setIsCheckedTimeManagement(!isCheckedTimeManagement);
                break;
            case 'health':
                setIsCheckedHealth(!isCheckedHealth);
                break;
            case 'content marketing':
                setIsCheckedContentMarketing(!isCheckedContentMarketing);
                break;
            case 'productivity':
                setIsCheckedProductivity(!isCheckedProductivity);
                break;
            case 'success':
                setIsCheckedSuccess(!isCheckedSuccess);
                break;
            case 'economy':
                setIsCheckedEconomy(!isCheckedEconomy);
                break;
            case 'history':
                setIsCheckedHistory(!isCheckedHistory);
                break;
            // Handle other checkboxes similarly...
            default:
                break;
        }
    };

  return (
    <div className="mx-0 px-0 container">
        <div className="flex flex-col justify-center items-center bg-no-repeat w-screen h-[370px] text-white" style={{backgroundImage: `url(${LibraryHero})`}}>
            <h1 className="mt-6 font-extrabold text-4xl">Library</h1>
            <h2 className="my-3 mt-6 font-medium text-xl">Explore your favorite books</h2>
            <h2 className="font-medium text-xl">Reading is the best for get idea , Keep Reading</h2>
        </div>

        <div className="flex mt-4">
            <div className="border-slate-400 mt-2 border-r w-[1194px]">
                <h1 className="flex justify-center mt-[20px] font-extrabold text-2xl text-black">Categories</h1>

                {/* If We Get Category API We Fix This With Loop */}
                <div className="flex flex-col mx-[45px] mt-[30px] w-[200px] h-[410px]">
                <label className="inline-flex items-center mb-[14px] cursor-pointer">
                <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedAll}
                                onChange={() => handleCheckboxChange('all')}
                            />
                            <div className="mr-2">
                                {isCheckedAll ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>All</span>
                        </label>

                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedDigitalMarketing}
                                onChange={() => handleCheckboxChange('digital marketing')}
                            />
                            <div className="mr-2">
                                {isCheckedDigitalMarketing ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Digital Marketing</span>
                        </label>
                        
                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedPersonalDevelopment}
                                onChange={() => handleCheckboxChange('personal development')}
                            />
                            <div className="mr-2">
                                {isCheckedPersonalDevelopment ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Personal Development</span>
                        </label>

                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedTechnology}
                                onChange={() => handleCheckboxChange('technology')}
                            />
                            <div className="mr-2">
                                {isCheckedTechnology ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Technology</span>
                        </label>

                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedTimeManagement}
                                onChange={() => handleCheckboxChange('time management')}
                            />
                            <div className="mr-2">
                                {isCheckedTimeManagement ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Time Management</span>
                        </label>
                    
                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedHealth}
                                onChange={() => handleCheckboxChange('health')}
                            />
                            <div className="mr-2">
                                {isCheckedHealth ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Health</span>
                        </label>
                    
                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedContentMarketing}
                                onChange={() => handleCheckboxChange('content marketing')}
                            />
                            <div className="mr-2">
                                {isCheckedContentMarketing ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Content Marketing</span>
                        </label>
                    
                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedProductivity}
                                onChange={() => handleCheckboxChange('productivity')}
                            />
                            <div className="mr-2">
                                {isCheckedProductivity ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Productivity</span>
                        </label>

                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedSuccess}
                                onChange={() => handleCheckboxChange('success')}
                            />
                            <div className="mr-2">
                                {isCheckedSuccess ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Success</span>
                        </label>
                    
                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedEconomy}
                                onChange={() => handleCheckboxChange('economy')}
                            />
                            <div className="mr-2">
                                {isCheckedEconomy ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>Economy</span>
                        </label>
                    
                        <label className="inline-flex items-center mb-[14px] cursor-pointer">
                            <input
                                type="checkbox"
                                className="hidden"
                                checked={isCheckedHistory}
                                onChange={() => handleCheckboxChange('history')}
                            />
                            <div className="mr-2">
                                {isCheckedHistory ? (
                                    <MdCheckBox className="w-6 h-6 text-blue-500" />
                                ) : (
                                    <MdCheckBoxOutlineBlank className="w-6 h-6 text-slate-400" />
                                )}
                            </div>
                            <span>History</span>
                        </label>
                </div>
            </div>

            <div>
                <CategoryBooks/>
            </div>
        </div>

      
    </div>
  )
}

export default LibraryLayout