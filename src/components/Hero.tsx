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
import {
  BsEyeFill,
  BsHeart,
  BsHeartFill,
  BsDash,
  BsPlus,
} from "react-icons/bs";
import { FiHelpCircle } from "react-icons/fi";
import { useState } from "react";
import '../App.css'
import { NavLink } from "react-router-dom";

const Hero = () => {
   const [active, setActive] = useState(false);
   const [faqItems, setFaqItems] = useState([
      { question: "What is Dream Book?", answer: "ToeTet.com is an online learning platform that offers courses in business, marketing, psychology and more taught by local trainers and experts in Myanmar language. Toetet.com also provides insider's notes which an summaries of popular books which practical tips and examples.", isOpen: false },
      { question: "What do in Dream Book?", answer: "ToeTet.com is an online learning platform that offers courses in business, marketing, psychology and more taught by local trainers and experts in Myanmar language. Toetet.com also provides insider's notes which an summaries of popular books which practical tips and examples.", isOpen: false },
      { question: "What is Toe Tet?", answer: "ToeTet.com is an online learning platform that offers courses in business, marketing, psychology and more taught by local trainers and experts in Myanmar language. Toetet.com also provides insider's notes which an summaries of popular books which practical tips and examples.", isOpen: false }
    ]);
  
    const toggleItem = (index:any) => {
      setFaqItems((prevItems) =>
        prevItems.map((item, i) => ({
          ...item,
          isOpen: i === index ? !item.isOpen : item.isOpen
        }))
      );
    };
    
  return (
    <div className="mx-0 px-0 container">
      
        <div className="relative flex bg-slate-100 w-screen h-[600px]"  style={{backgroundImage: `url(${HeroBg})`}}>
            <div className="mt-[130px] ml-[125px] w-[700px] h-[300px]">
                <h1 className="font-bold text-4xl">Discover <br /> Magic Of Books</h1>
                <p className="pt-7 font-normal text-lg leading-[23px]">"Unlock worlds, one page at a time: Dive into the stories that <br /> shape us. Welcome to a sanctuary for book lovers, where <br /> words ignite passions and journeys never end."</p>

                <NavLink to="/library">
                  <button className="bg-blue-700 mt-12 p-[10px] rounded-[6px] w-60 text-white">Explore Now</button>
                </NavLink>
                
                <p className="my-4 font-normal font-sans text-blue-300 text-sm">TRY ON MOBILE</p>
                
                <div className="flex gap-x-6">
                   <img src={AppStore} alt="" />
                   <img src={GooglePLay} alt="" />
                </div>
            </div>

        <div className="mt-[90px] ml-[10px] w-[600px] h-[460px]">
          <img src={Animation} alt="" className="" />

          <p className="flex justify-center items-center mt-4 font-medium text-2xl">
            Most Popular Books This Week
          </p>
          <div className="top-[452px] right-0 bottom-0 z-10 absolute">
            <img src={Daisy} alt="" className="w-[170px] h-[170px]" />
          </div>
        </div>

        {/* <div className="flex justify-center items-center ml-[10px] w-[600px]">
              <img src={Animation} alt="" className="mt-[90px] ml-[50px]"/> 
              <p className="mt-4 font-medium text-2xl">Most Popular Books  This Week</p>
            </div>

          */}
      </div>

      <div className="flex justify-center gap-x-4 mt-[60px] w-screen h-[230px]">
        <div
          className="grid-col-1 bg-opacity-88 bg-no-repeat p-9 w-[400px] text-white"
          style={{ backgroundImage: `url(${About})` }}
        >
          <h1 className="font-semibold text-xl">About Us</h1>
          <p className="pt-2 font-light text-sm">Our Story</p>
          <p className="pt-2 font-medium text-md">
            Dedicated to Spreding the love of Literature
          </p>
        </div>
        <div
          className="grid-col-1 bg-opacity-88 bg-no-repeat p-9 w-[400px] text-white"
          style={{ backgroundImage: `url(${FeatureBg})` }}
        >
          <h1 className="font-semibold text-xl">Feactured</h1>
          <p className="pt-2 font-thin text-sm">Explore</p>
          <p className="pt-2 font-medium text-md">
            Discover Your Favorite Books from Everywhere and at anytime
          </p>
        </div>
        <div
          className="grid-col-1 bg-opacity-88 bg-no-repeat p-9 w-[400px] text-white"
          style={{ backgroundImage: `url(${Visit})` }}
        >
          <h1 className="font-semibold text-xl">Visit Now</h1>
          <p className="pt-2 font-thin text-sm">Browse</p>
          <p className="pt-2 font-medium text-md">
            Experience the Magic of Books
          </p>
        </div>
      </div>

      <div className="w-screen h-[400px]">
        <h1 className="flex justify-center items-center font-semibold text-2xl">
          Popular Books
        </h1>

            <div className="relative transition overflow-hidden group">
               <div className="gap-x-3 grid grid-cols-5 mx-8 mt-6 h-[280px]">
                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                           
                      {/* This will change of code we get API */}
                        <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                           <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                           {active ? (
                              <BsHeartFill className="text-red-500" onClick={() => setActive(!active)} />
                           ) : (
                              <BsHeart className="text-slate-500" onClick={() => setActive(!active)} />
                           )}
                           </div>
                           
                        {/* Change div to link to= {"Book/id"}*/}
                           <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                              <BsEyeFill className="text-slate-500"/>
                           </div>
                        </div>
                     </div>
                     
                    

                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>

                  </div>
                  
                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                        
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>
                  
               </div>
            </div>
            
         </div>

      <div className="w-screen h-[250px]">
        <div className="flex justify-between mx-8">
          <h1 className="font-bold text-xl">Trending Category</h1>
          {/* this must be link when we finish router */}
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>
        <div>
          <div className="flex justify-center mx-8 mt-11 h-[50px]">
            <div className="gap-x-6 grid grid-cols-3 w-full">
              <h1 className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] pl-[70px] border rounded-[10px] font-semibold text-md">
                Digital Marketing
              </h1>
              <h1 className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] pl-[70px] border rounded-[10px] font-semibold text-md">
                Digital Marketing
              </h1>
              <h1 className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] pl-[70px] border rounded-[10px] font-semibold text-md">
                Digital Marketing
              </h1>
            </div>
          </div>
          <div className="flex justify-center mx-8 mt-11 h-[50px]">
            <div className="gap-x-6 grid grid-cols-3 w-full">
              <h1 className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] pl-[70px] border rounded-[10px] font-semibold text-md">
                Digital Marketing
              </h1>
              <h1 className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] pl-[70px] border rounded-[10px] font-semibold text-md">
                Digital Marketing
              </h1>
              <h1 className="flex border-slate-300 bg-slate-50 shadow-md pt-[10px] pl-[70px] border rounded-[10px] font-semibold text-md">
                Digital Marketing
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[50px] w-screen h-[400px]">
        <div className="flex justify-between mx-8">
          <h1 className="font-bold text-xl">Latest Books</h1>
          {/* this must be link when we finish router */}
          <a href="" className="font-medium text-md">
            View More &gt;
          </a>
        </div>

            <div className="relative transition overflow-hidden group">
               <div className="gap-x-3 grid grid-cols-5 mx-8 mt-6 h-[280px]">
                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                           
                      {/* This will change of code we get API */}
                        <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                           <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                           {active ? (
                              <BsHeartFill className="text-red-500" onClick={() => setActive(!active)} />
                           ) : (
                              <BsHeart className="text-slate-500" onClick={() => setActive(!active)} />
                           )}
                           </div>
                           
                        {/* Change div to link to= {"Book/id"}*/}
                           <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                              <BsEyeFill className="text-slate-500"/>
                           </div>
                        </div>
                     </div>
                     
                    

                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>

                  </div>
                  
                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                        
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-xl border rounded-[8px]">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>
                  
               </div>
            </div>
            
         </div>
         
         <div className="bg-slate-950 bg-cover bg-no-repeat bg-center opacity-60 w-screen h-[450px]" style={{backgroundImage: `url(${LatestBg})`, opacity: `95%`}}>
            <div className="flex">
               <div className="pt-[100px] pl-[125px] w-[700px] h-[300px] text-slate-100">
                  <p className="my-4 font-medium text-lg">latest collections</p> 
                  <h2 className="mt-5 font-bold text-4xl">The New Publishing Books</h2>
                  <NavLink to="/library">
                     <button className="bg-blue-700 mt-12 p-[10px] rounded-[6px] w-60 text-white">Explore Now</button>
                  </NavLink>
                  
               </div>

          <div className="pt-[35px]">
            <img src={LatestBooks} alt="" />
          </div>
        </div>
      </div>

      <div className="mt-4 w-screen h-[300px]">
        <h1 className="flex justify-center items-center font-extrabold text-xl">
          FAQs
        </h1>

        <div className="mx-[50px] mt-[50px]">
          {faqItems.map((item, index) => (
            <div key={index}>
              {!item.isOpen && (
                <div className="border-slate-300 bg-slate-50 shadow-lg mt-4 border rounded-[6px] h-[60px] font-semibold text-lg">
                  <div className="flex justify-between">
                    <div className="flex font-semibold text-lg">
                      <FiHelpCircle className="mt-5 ml-5" />
                      <h1 className="mt-4 pl-3">{item.question}</h1>
                    </div>
                    <BsPlus
                      className="mt-3 text-4xl"
                      onClick={() => toggleItem(index)}
                    />
                  </div>
                </div>
              )}
              {item.isOpen && (
                <div className="border-slate-300 bg-slate-50 shadow-lg mt-[10px] border rounded-[6px] h-[165px] duration-700 delay-300">
                  <div className="flex justify-between">
                    <div className="flex font-semibold text-lg">
                      <FiHelpCircle className="mt-5 ml-5" />
                      <h1 className="mt-4 pl-3"> What is Toe Tet?</h1>
                    </div>
                    <div>
                      <BsDash
                        className="mt-3 text-4xl"
                        onClick={() => toggleItem(index)}
                      />
                    </div>
                  </div>
                  <p className="mx-5 mt-4 font-medium text-md">{item.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
