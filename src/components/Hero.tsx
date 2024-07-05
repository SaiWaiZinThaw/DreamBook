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
import { BsQuestionCircle } from "react-icons/bs";

import "../App.css";
import { NavLink } from "react-router-dom";
import { useFetchTrendingCategories } from "@/hooks/useFetchCategories";
import { faqItems } from "@/variables";
import PopularBooks from "./PopularBooks";
import LatestBooks from "./LatestBooks";

const Hero = () => {
  const { data: fetchTrendingCategories } = useFetchTrendingCategories();

  return (
    <div className="lg:flex-none mx-0 px-0 container">
      <div
        className="flex md:flex-row lg:flex-row flex-col items-center lg:items-start gap-6 md:gap-0 lg:gap-0 bg-slate-100 bg-cover p-6 md:p-10 lg:pt-20 w-screen lg:h-[700px]"
        style={{ backgroundImage: `url(${HeroBg})` }}
      >
        <div className="flex flex-col lg:flex-none gap-3 lg:ml-[125px] md:w-6/12 lg:w-6/12">
          <h1 className="font-bold text-4xl">
            Discover <br /> Magic Of Books
          </h1>
          <p className="lg:pt-7 w-full lg:w-auto font-normal text-md lg:text-lg leading-[23px]">
            "Unlock worlds, one page at a time: Dive into the stories that{" "}
            <br /> shape us. Welcome to a sanctuary for book lovers, where{" "}
            <br /> words ignite passions and journeys never end."
          </p>

          <NavLink to="/library/1">
            <button className="bg-blue-700 mt-12 p-[10px] rounded-[6px] w-60 text-white">
              Explore Now
            </button>
          </NavLink>

          <p className="lg:my-4 mt-4 mb-2 font-light font-sans text-blue-400 text-sm tracking-widest">
            TRY ON MOBILE
          </p>

          <div className="flex gap-x-6">
            <img src={AppStore} alt="" className="w-[120px] lg:w-auto" />
            <img src={GooglePLay} alt="" className="w-[120px] lg:w-auto" />
          </div>
        </div>

        <div className="mr-[10px] p-5 lg:p-0 w-full md:w-5/12 lg:w-5/12">
          <img src={Animation} alt="" className="w-full lg:w-auto" />

          <p className="flex justify-center items-center mt-4 font-medium lg:text-2xl">
            Most Popular Books This Week
          </p>
        </div>
      </div>


      <div className="flex lg:flex-row flex-col lg:justify-center items-center gap-4 lg:gap-0 lg:gap-x-4 lg:mt-[60px] px-5 p-2 w-screen lg:h-[220px]">
        <div
          className="flex flex-col gap-1 lg:gap-3 bg-opacity-88 bg-cover bg-no-repeat p-5 lg:p-9 rounded-[10px] w-full lg:w-[400px] h-full min-h-[150px] text-white"

          style={{ backgroundImage: `url(${About})` }}
        >
          <h1 className="font-semibold text-xl">About Us</h1>
          <p className="pt-2 font-light text-sm">Our Story</p>
          <p className="pt-2 font-medium text-md">
            Dedicated to Spreding the love of Literature
          </p>
        </div>
        <div

          className="flex flex-col gap-1 lg:gap-3 bg-opacity-88 bg-cover bg-no-repeat p-5 lg:p-9 rounded-[10px] w-full lg:w-[400px] h-full min-h-[120px] text-white"

          style={{ backgroundImage: `url(${FeatureBg})` }}
        >
          <h1 className="font-semibold text-xl">Feactured</h1>
          <p className="pt-2 font-thin text-sm">Explore</p>
          <p className="pt-2 font-medium text-md">
            Discover Your Favorite Books from Everywhere and at anytime
          </p>
        </div>
        <div

          className="flex flex-col gap-1 lg:gap-3 bg-opacity-88 bg-cover bg-no-repeat p-5 lg:p-9 rounded-[10px] w-full lg:w-[400px] h-full min-h-[120px] text-white"

          style={{ backgroundImage: `url(${Visit})` }}
        >
          <h1 className="font-semibold text-xl">Visit Now</h1>
          <p className="pt-2 font-thin text-sm">Browse</p>
          <p className="pt-2 font-medium text-md">
            Experience the Magic of Books
          </p>
        </div>
      </div>

      <div className="p-6 lg:p-10 w-screen h-[400px]">
        <h1 className="flex justify-center items-center font-semibold text-2xl">
          Popular Books
        </h1>

        <PopularBooks />
      </div>

      <div className="p-6 lg:p-10 w-screen lg:h-[250px]">
        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Trending Category</h1>
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>
        <div className="flex justify-center mt-11">
          <div className="gap-6 grid grid-cols-1 lg:grid-cols-3 w-full">
            {fetchTrendingCategories?.map((category: any) => (
              <div
                key={category.categoryId}
                className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] border rounded-[10px] h-[64px] font-semibold text-md cursor-pointer"
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


      <div className="mt-[50px] p-6 lg:p-10 w-screen lg:h-[400px]">

        <div className="flex justify-between">
          <h1 className="font-bold text-xl">Latest Books</h1>
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>

        <LatestBooks />
      </div>

      <div
        className="bg-slate-950 bg-cover bg-no-repeat bg-center opacity-60 p-10 w-screen lg:h-[450px]"
        style={{ backgroundImage: `url(${LatestBg})`, opacity: `95%` }}
      >
        <div className="flex flex-col lg:flex-none justify-center items-start gap-5 w-full lg:w-[700px] h-[300px] text-slate-100">
          <p className="font-medium text-lg">latest collections</p>
          <h2 className="font-bold text-4xl">The New Publishing Books</h2>
          <NavLink to="/library">
            <button className="bg-blue-700 p-[10px] rounded-[6px] w-60 text-white">
              Explore Now
            </button>
          </NavLink>
        </div>
      </div>

      <div className="flex flex-col justify-center gap-4 mt-4 w-screen">
        <h1 className="flex justify-center items-center font-extrabold text-xl">
          FAQs
        </h1>
        {faqItems.map((item, index) => (
          <Accordion

            className="w-full lg:max-w-[1400px] lg:self-center"

            key={index}
            type="single"
            collapsible
          >
            <AccordionItem value={item.question}>
              <AccordionTrigger className="flex gap-0">
                <div className="flex items-center gap-2">
                  <BsQuestionCircle />
                  {item.question}
                </div>
              </AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </div>
  );
};

export default Hero;
