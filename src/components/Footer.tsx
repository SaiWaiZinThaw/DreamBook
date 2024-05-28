import { FooterImg, GooglePLay, AppStore } from "@/assets";

const Footer = () => {
  return (
    <div className="mx-0 px-0 w-full container">
      <div className="bg-blue-600 bg-opacity-75 mt-10 w-screen h-[400px]">
        <div className="flex justify-center items-center">
          <img
            src={FooterImg}
            alt=""
            className="mt-[60px] w-[290px] h-[65px]"
          />
        </div>
        <div className="flex justify-center items-center mt-[20px] w-screen h-[102px]">
          <div className="flex gap-x-[64px] mt-11 w-[600px] text-slate-50">
            <a href="">Home</a>
            <a href="">Recommended Books</a>
            <a href="">Latest Books</a>
            <a href="">FAQs</a>
          </div>
          <div className="flex flex-col w-[410px]">
            <p className="flex justify-center my-3 font-normal font-sans text-sm text-white text-opacity-70">
              TRY ON MOBILE
            </p>

            <div className="flex gap-x-2 w-[200px] h-[62px]">
              <img src={AppStore} alt="" className="" />
              <img src={GooglePLay} alt="" />
            </div>
          </div>
        </div>
        <hr className="border-gray-300 mx-[100px] my-4 mt-[80px] border-t-2"></hr>

        <p className="flex justify-center items-center mt-6 text-white text-opacity-75">
          Copyright 2024 dream book .All Rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
