import Animation from "../../public/img/Books Animation.png";
import AppStore from "../../public/img/appstore.png";
import GooglePLay from "../../public/img/googleplay.png";
import BestSelf from "../../public/img/Best_Self.png";
import { useState } from "react";
import { BsEyeFill, BsHeart, BsHeartFill } from "react-icons/bs";

const Hero = () => {
   const [active, setActive] = useState(false);

  return (
    <div className="container">
    <div className="flex w-screen h-[600px]">
        <div className="mt-[130px] ml-[135px] w-[500px] h-[300px]">
            <h1 className="font-bold text-4xl">Discover <br /> Magic Of Books</h1>
            <p className="pt-7 font-normal text-lg leading-[23px]">"Unlock worlds, one page at a time: Dive into the stories that <br /> shape us. Welcome to a sanctuary for book lovers, where <br /> words ignite passions and journeys never end."</p>
            <button className="bg-blue-700 mt-12 p-[10px] rounded-lg w-60 text-white">Explore Now</button>
            <p className="my-4 font-normal font-sans text-blue-300 text-sm">TRY ON MOBILE</p>
            
            <div className="flex gap-x-6">
               <img src={AppStore} alt="" />
               <img src={GooglePLay} alt="" />
            </div>
        </div>

        <div className="mt-[90px] ml-[10px] w-[600px] h-[460px]">
          <img src={Animation} alt="" /> 

          <p className="flex justify-center items-center mt-4 font-medium text-2xl">Most Popular Books  This Week</p>
          {/* <img src={Daisy} alt="" /> */}
        </div>

    </div>

    <div className="flex justify-center mt-[60px] w-screen h-[230px]">
     <div className="grid-col-1 bg-blue-600 bg-opacity-88 mx-4 p-9 rounded-2xl w-[400px] h-[200px] text-white">
        <h1 className="font-semibold text-xl">About Us</h1>
        <p className="pt-5 font-light text-sm">Our Story</p>
        <p className="pt-2 font-medium text-md">Dedicated to Spreding the love of Literature</p>
     </div>
     <div className="grid-col-1 bg-blue-600 bg-opacity-88 mx-4 p-9 rounded-2xl w-[400px] h-[200px] text-white">
        <h1 className="font-semibold text-xl">Feactured</h1>
        <p className="pt-5 font-thin text-sm">Explore</p>
        <p className="pt-2 font-medium text-md">Discover Your Favorite Books from Everywhere and at anytime</p>
     </div>
     <div className="grid-col-1 bg-blue-600 bg-opacity-88 mx-4 p-9 rounded-2xl w-[400px] h-[200px] text-white">
        <h1 className="font-semibold text-xl">Visit Now</h1>
        <p className="pt-5 font-thin text-sm">Browse</p>
        <p className="pt-2 font-medium text-md">Experience the Magic of Books</p>
     </div>
      
    </div>

    <div className="w-screen h-[400px]">
            <h1 className="flex justify-center items-center font-semibold text-2xl">Popular Books</h1>

            <div className="relative transition overflow-hidden group">
               <div className="gap-x-3 grid grid-cols-5 mx-8 mt-6 h-[280px]">
                  <div className="bg-slate-100 shadow-2xl border rounded-lg">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-md h-[160px]">
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
                  
                  <div className="bg-slate-100 shadow-2xl border rounded-lg">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-md h-[160px]">
                        <img src={BestSelf} alt="" />
                        
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-2xl border rounded-lg">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-md h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-2xl border rounded-lg">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-md h-[160px]">
                        <img src={BestSelf} alt="" />
                     </div>
                     <div className="ml-2">
                        <h1 className="font-bold text-xl">Title</h1>
                        <p className="font-normal text-gray-500 text-sm">Category</p>
                        <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                     </div>
                  </div>

                  <div className="bg-slate-100 shadow-2xl border rounded-lg">
                     <div className="flex justify-center items-center bg-slate-300 m-2 rounded-md h-[160px]">
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
</div>
  )
}

export default Hero