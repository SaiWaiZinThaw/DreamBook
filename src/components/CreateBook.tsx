import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const CreateBook = () => {
    const navigate = useNavigate();
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
    </div>
  )
}

export default CreateBook