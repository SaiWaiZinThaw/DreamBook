import {
  Animation,
  AppStore,
  GooglePLay,
  BestSelf,
  About,
  LatestBg,
  LatestBooks,
  FeatureBg,
  Visit,
  Daisy,
  HeroBg,
} from "@/assets";
import { BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { useState } from "react";
import "../App.css";
import { NavLink } from "react-router-dom";
import { useFetchCategories } from "@/hooks/useFetchCategories";
import { faqItems } from "@/variables";

const Hero = () => {
  const [active, setActive] = useState(false);
  const { data: fetchCategories } = useFetchCategories();

  return (
    <div className="container px-0 mx-0">
      <div
        className="relative flex bg-slate-100 bg-cover w-screen h-[600px]"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="mt-[130px] ml-[125px] w-[700px] h-[300px]">
          <h1 className="text-4xl font-bold">
            Discover <br /> Magic Of Books
          </h1>
          <p className="pt-7 font-normal text-lg leading-[23px]">
            "Unlock worlds, one page at a time: Dive into the stories that{" "}
            <br /> shape us. Welcome to a sanctuary for book lovers, where{" "}
            <br /> words ignite passions and journeys never end."
          </p>

          <NavLink to="/library/1">
            <button className="bg-blue-700 mt-12 p-[10px] rounded-[6px] w-60 text-white">
              Explore Now
            </button>
          </NavLink>

          <p className="my-4 font-sans text-sm font-normal text-blue-300">
            TRY ON MOBILE
          </p>

          <div className="flex gap-x-6">
            <img src={AppStore} alt="" />
            <img src={GooglePLay} alt="" />
          </div>
        </div>

        <div className="mt-[90px] ml-[10px] w-[600px] h-[460px]">
          <img src={Animation} alt="" className="" />

          <p className="flex items-center justify-center mt-4 text-2xl font-medium">
            Most Popular Books This Week
          </p>
          <div className="top-[452px] right-0 bottom-0 z-10 absolute">
            <img src={Daisy} alt="" className="w-[170px] h-[170px]" />
          </div>
        </div>

        {/* <div className="flex justify-center items-center ml-[10px] w-[600px]">
              <img src={Animation} alt="" className="mt-[90px] ml-[50px]"/> 
              <p className="mt-4 text-2xl font-medium">Most Popular Books  This Week</p>
            </div>

          */}
      </div>

      <div className="flex justify-center gap-x-4 mt-[60px] w-screen h-[230px]">
        <div
          className="grid-col-1 bg-opacity-88 bg-no-repeat p-9 w-[400px] text-white"
          style={{ backgroundImage: `url(${About})` }}
        >
          <h1 className="text-xl font-semibold">About Us</h1>
          <p className="pt-2 text-sm font-light">Our Story</p>
          <p className="pt-2 font-medium text-md">
            Dedicated to Spreding the love of Literature
          </p>
        </div>
        <div
          className="grid-col-1 bg-opacity-88 bg-no-repeat p-9 w-[400px] text-white"
          style={{ backgroundImage: `url(${FeatureBg})` }}
        >
          <h1 className="text-xl font-semibold">Feactured</h1>
          <p className="pt-2 text-sm font-thin">Explore</p>
          <p className="pt-2 font-medium text-md">
            Discover Your Favorite Books from Everywhere and at anytime
          </p>
        </div>
        <div
          className="grid-col-1 bg-opacity-88 bg-no-repeat p-9 w-[400px] text-white"
          style={{ backgroundImage: `url(${Visit})` }}
        >
          <h1 className="text-xl font-semibold">Visit Now</h1>
          <p className="pt-2 text-sm font-thin">Browse</p>
          <p className="pt-2 font-medium text-md">
            Experience the Magic of Books
          </p>
        </div>
      </div>

      <div className="w-screen h-[400px]">
        <h1 className="flex items-center justify-center text-2xl font-semibold">
          Popular Books
        </h1>

        <div className="relative transition group">
          <div className="gap-x-3 grid grid-cols-5 mx-8 mt-6 h-[280px]">
            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />

                {/* This will change of code we get API */}
                <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    {active ? (
                      <BsHeartFill
                        className="text-red-500"
                        onClick={() => setActive(!active)}
                      />
                    ) : (
                      <BsHeart
                        className="text-slate-500"
                        onClick={() => setActive(!active)}
                      />
                    )}
                  </div>

                  {/* Change div to link to= {"Book/id"}*/}
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <BsEyeFill className="text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-screen h-[250px]">
        <div className="flex justify-between mx-8">
          <h1 className="text-xl font-bold">Trending Category</h1>
          {/* this must be link when we finish router */}
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>
        <div>
          <div className="flex justify-center mx-8 mt-11">
            <div className="grid w-full grid-cols-3 gap-6">
              {fetchCategories &&
                fetchCategories?.map(
                  (category: any) =>
                    category.priority === 1 && (
                      <div
                        key={category.categoryId}
                        className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] border rounded-[10px] h-[64px] font-semibold text-md"
                      >
                        <img
                          src={category.icon}
                          className="mr-[38px] ml-[12px] w-[35px] h-[35px]"
                          alt=""
                        />
                        <h1 className="pt-[5px]">{category.title}</h1>
                      </div>
                    )
                )}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[50px] w-screen h-[400px]">
        <div className="flex justify-between mx-8">
          <h1 className="text-xl font-bold">Latest Books</h1>
          {/* this must be link when we finish router */}
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>

        <div className="relative transition group">
          <div className="gap-x-3 grid grid-cols-5 mx-8 mt-6 h-[280px]">
            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />

                {/* This will change of code we get API */}
                <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    {active ? (
                      <BsHeartFill
                        className="text-red-500"
                        onClick={() => setActive(!active)}
                      />
                    ) : (
                      <BsHeart
                        className="text-slate-500"
                        onClick={() => setActive(!active)}
                      />
                    )}
                  </div>

                  {/* Change div to link to= {"Book/id"}*/}
                  <div className="flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 drop-shadow-xl">
                    <BsEyeFill className="text-slate-500" />
                  </div>
                </div>
              </div>

              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>

            <div className="bg-slate-100 shadow-xl border rounded-[8px]">
              <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                <img src={BestSelf} alt="" />
              </div>
              <div className="ml-2">
                <h1 className="text-xl font-bold">Title</h1>
                <p className="text-sm font-normal text-gray-500">Category</p>
                <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className="bg-slate-950 bg-cover bg-no-repeat bg-center opacity-60 w-screen h-[450px]"
        style={{ backgroundImage: `url(${LatestBg})`, opacity: `95%` }}
      >
        <div className="flex">
          <div className="pt-[100px] pl-[125px] w-[700px] h-[300px] text-slate-100">
            <p className="my-4 text-lg font-medium">latest collections</p>
            <h2 className="mt-5 text-4xl font-bold">
              The New Publishing Books
            </h2>
            <NavLink to="/library">
              <button className="bg-blue-700 mt-12 p-[10px] rounded-[6px] w-60 text-white">
                Explore Now
              </button>
            </NavLink>
          </div>

          <div className="pt-[35px]">
            <img src={LatestBooks} alt="" />
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center w-screen gap-4 mt-4">
        <h1 className="flex items-center justify-center text-xl font-extrabold">
          FAQs
        </h1>
        {faqItems.map((item, index) => (
          <Accordion key={index} type="single" collapsible>
            <AccordionItem value={item.question}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Hero;
