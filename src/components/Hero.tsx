import Animation from "../../public/img/Books Animation.png";
import AppStore from "../../public/img/appstore.png";
import GooglePLay from "../../public/img/googleplay.png";

const Hero = () => {
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
</div>
  )
}

export default Hero