import { FooterImg, GooglePLay, AppStore } from "@/assets";

const Footer = () => {
  return (
    <div className="container w-full px-0 mx-0">
      <div className="flex flex-col lg:items-center bg-blue-600 bg-opacity-75 mt-10 lg:h-[400px] p-12 lg:px-20">
        <img
          src={FooterImg}
          alt=""
          className=" lg:w-[290px] w-[240px] lg:h-[65px]"
        />
        <div className="flex flex-col w-full lg:gap-3 lg:flex-row lg:items-center">
          <div className="flex lg:flex-row gap-3 lg:justify-center lg:w-full flex-col lg:gap-x-[64px] mt-11 text-slate-50">
            <a href="">Home</a>
            <a href="">Recommended Books</a>
            <a href="">Latest Books</a>
            <a href="">FAQs</a>
          </div>
          <div className="flex flex-col">
            <p className="my-3 font-sans text-sm font-normal text-[10px] text-white lg:flex lg:justify-center text-opacity-70">
              TRY ON MOBILE
            </p>

            <div className="flex w-full gap-2">
              <img
                src={AppStore}
                alt=""
                className="w-6/12 md:w-3/12 lg:w-6/12"
              />
              <img
                src={GooglePLay}
                alt=""
                className="w-6/12 md:w-3/12 lg:w-6/12"
              />
            </div>
          </div>
        </div>
        <p className="py-4 mt-6 text-white border-t border-t-border lg:text-[16px] text-[12px] w-full text-center">
          Copyright 2024 dream book .All Rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
