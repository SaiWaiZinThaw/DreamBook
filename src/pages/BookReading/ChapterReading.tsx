import { ChapterRead } from "@/components"
import { Outlet } from "react-router-dom"

const ChapterReading = () => {
  return (
    <div>
      <ChapterRead/>
      <Outlet/>
    </div>
  )
}

export default ChapterReading