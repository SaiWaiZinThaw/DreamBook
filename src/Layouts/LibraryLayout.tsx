import { LibraryHero } from "@/assets"


const LibraryLayout = () => {
  return (
    <div className="mx-0 px-0 container">
        <div className="flex flex-col justify-center items-center w-screen h-[370px] text-white" style={{backgroundImage: `url(${LibraryHero})`}}>
            <h1 className="mt-6 font-extrabold text-4xl">Library</h1>
            <h2 className="my-3 mt-6 font-medium text-xl">Explore your favorite books</h2>
            <h2 className="font-medium text-xl">Reading is the best for get idea , Keep Reading</h2>
        </div>
    </div>
  )
}

export default LibraryLayout