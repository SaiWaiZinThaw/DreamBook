import { LibraryLayout } from "@/Layouts"
import { Footer, NavBar } from "@/components"


const Library = () => {
  return (
    <div className="overflow-hidden">
        <NavBar/>
        <LibraryLayout/>
        <Footer/>
    </div>
  )
}

export default Library