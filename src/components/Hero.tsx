import {
  Animation,
  AppStore,
  GooglePLay,
  About,
  LatestBg,
  FeatureBg,
  Visit,
  HeroBg,
} from "@/assets";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import "../App.css";
import { NavLink } from "react-router-dom";
import { useFetchTrendingCategories } from "@/hooks/useFetchCategories";
import { faqItems } from "@/variables";
import PopularBooks from "./PopularBooks";
import LatestBooks from "./LatestBooks";

const Hero = () => {
  const { data: fetchTrendingCategories } = useFetchTrendingCategories();

  return (
    <div className="container px-0 mx-0 lg:flex-none">
      <div
        className=" flex gap-6 lg:gap-0 md:gap-0 lg:flex-row flex-col md:flex-row lg:items-start items-center bg-slate-100 bg-cover w-screen lg:h-[700px] p-6 md:p-10 lg:pt-20"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className=" flex flex-col lg:flex-none gap-3 lg:ml-[125px] md:w-6/12 lg:w-6/12 ">
          <h1 className="text-4xl font-bold">
            Discover <br /> Magic Of Books
          </h1>
          <p className="lg:pt-7 font-normal text-md lg:text-lg leading-[23px] w-full  lg:w-auto ">
            "Unlock worlds, one page at a time: Dive into the stories that{" "}
            <br /> shape us. Welcome to a sanctuary for book lovers, where{" "}
            <br /> words ignite passions and journeys never end."
          </p>

          <NavLink to="/library/1">
            <button className="bg-blue-700 mt-12 p-[10px] rounded-[6px] w-60 text-white">
              Explore Now
            </button>
          </NavLink>

          <p className="mt-4 mb-2 font-sans text-sm font-light tracking-widest text-blue-400 lg:my-4">
            TRY ON MOBILE
          </p>

          <div className="flex gap-x-6">
            <img src={AppStore} alt="" className="w-[120px] lg:w-auto" />
            <img src={GooglePLay} alt="" className="w-[120px] lg:w-auto" />
          </div>
        </div>

        <div className=" mr-[10px] lg:w-5/12 md:w-5/12 w-full p-5 lg:p-0">
          <img src={Animation} alt="" className="w-full lg:w-auto" />

          <p className="flex items-center justify-center mt-4 font-medium lg:text-2xl">
            Most Popular Books This Week
          </p>
        </div>
      </div>

      <div className="flex flex-col p-2 items-center mx-2 px-5 gap-4 lg:gap-0 lg:flex-row lg:justify-center lg:gap-x-4 lg:mt-[60px] w-full lg:h-[230px]">
        <div
          className="lg:flex-none lg:grid-cols-1 flex flex-col lg:gap-0 gap-3 bg-opacity-88 bg-no-repeat bg-cover p-3 lg:p-9 w-full rounded-[2px] h-[200px] lg:w-[400px] text-white"
          style={{ backgroundImage: `url(${About})` }}
        >
          <h1 className="text-xl font-semibold">About Us</h1>
          <p className="pt-2 text-sm font-light">Our Story</p>
          <p className="pt-2 font-medium text-md">
            Dedicated to Spreding the love of Literature
          </p>
        </div>
        <div
          className="lg:flex-none lg:grid-cols-1 flex flex-col lg:gap-0 gap-3 bg-opacity-88 bg-no-repeat bg-cover p-3 lg:p-9 w-full rounded-[2px] h-[200px] lg:w-[400px] text-white"
          style={{ backgroundImage: `url(${FeatureBg})` }}
        >
          <h1 className="text-xl font-semibold">Feactured</h1>
          <p className="pt-2 text-sm font-thin">Explore</p>
          <p className="pt-2 font-medium text-md">
            Discover Your Favorite Books from Everywhere and at anytime
          </p>
        </div>
        <div
          className="lg:flex-none lg:grid-cols-1 flex flex-col lg:gap-0 gap-3 bg-opacity-88 bg-no-repeat bg-cover p-3 lg:p-9 w-full rounded-[2px] h-[200px] lg:w-[400px] text-white"
          style={{ backgroundImage: `url(${Visit})` }}
        >
          <h1 className="text-xl font-semibold">Visit Now</h1>
          <p className="pt-2 text-sm font-thin">Browse</p>
          <p className="pt-2 font-medium text-md">
            Experience the Magic of Books
          </p>
        </div>
      </div>

      <div className="w-screen h-[400px] p-6 lg:p-10">
        <h1 className="flex items-center justify-center text-2xl font-semibold">
          Popular Books
        </h1>

        <PopularBooks />
      </div>

      <div className="w-screen lg:h-[250px] p-6 lg:p-10">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Trending Category</h1>
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>
        <div className="flex justify-center mx-8 mt-11">
          <div className="grid w-full grid-cols-1 gap-6 lg:grid-cols-3">
            {fetchTrendingCategories?.map((category: any) => (
              <div
                key={category.categoryId}
                className="flex border-slate-300 cursor-pointer bg-slate-50 shadow-md pt-[10px] border rounded-[10px] h-[64px] font-semibold text-md"
              >
                <img
                  src={category.icon}
                  className="mr-[38px] ml-[12px] w-[35px] h-[35px]"
                  alt=""
                />
                <h1 className="pt-[5px]">{category.title}</h1>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-[50px] w-screen lg:h-[400px] p-6 lg:p-8">
        <div className="flex justify-between">
          <h1 className="text-xl font-bold">Latest Books</h1>
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>

        <LatestBooks />
      </div>

      <div
        className="bg-slate-950 bg-cover bg-no-repeat bg-center opacity-60 w-screen lg:h-[450px] p-10"
        style={{ backgroundImage: `url(${LatestBg})`, opacity: `95%` }}
      >
        <div className="lg:flex-none flex flex-col items-start justify-center gap-5 w-full lg:w-[700px] h-[300px] text-slate-100">
          <p className="text-lg font-medium ">latest collections</p>
          <h2 className="text-4xl font-bold ">The New Publishing Books</h2>
          <NavLink to="/library">
            <button className="bg-blue-700  p-[10px] rounded-[6px] w-60 text-white">
              Explore Now
            </button>
          </NavLink>
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
