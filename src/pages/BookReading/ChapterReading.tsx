import { ChapterRead, NavBar } from "@/components"

const ChapterReading = () => {
  return (
    <div className="w-full overflow-x-hidden">
      <div className="md:block hidden">
        <NavBar />
      </div>
      <ChapterRead/>
    </div>
  )
}

export default ChapterReading