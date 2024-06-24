import { FaTrashCan } from "react-icons/fa6";
import useFetchBooksAuthor from "@/hooks/useFetchBooksAuthor";
import { useRestoreBook } from "@/hooks/useRestore";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { useHardDeleteBook } from "@/hooks/useDeleteBook";
import { useNavigate } from "react-router-dom";

const Restore = () => {
  const navigate = useNavigate();
  const { data: fetchBooksAuthor, refetch} = useFetchBooksAuthor();
  const { mutate: restoreBookMutation } = useRestoreBook();
  const { mutate: hardDelete} = useHardDeleteBook();

  const handleRestore = (bookId: string) => {
   restoreBookMutation(bookId, {
    onSuccess: () => {
      console.log('Book Restore!');
      refetch();
      navigate("/me/books")
    },
    onError: (error) => {
      console.error("Error retoring", error)
    }
   })
};

 

  const handleDelete = (bookId: string) => {
    hardDelete(bookId, {
      onSuccess: () => {
        console.log('Book hard deleted successfully');
        refetch();
      },
      onError: (error) => {
        console.error('Error hard deleting book:', error);
      },
    });
    
  }
  
  
  return (
    <div className="mt-5 w-full">
        <ul className="flex gap-x-4 mx-4">
            
        {fetchBooksAuthor?.items &&
            fetchBooksAuthor.items.map((book: any) => (
                <div className="bg-slate-100 shadow-xl border rounded-[8px] w-[232px] h-[300px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                    <img src={book.coverImage} alt="" className="w-[86px] h-[129px]" />
                </div>
                <li key={book.id} className="mb-4">
                    <h2 className="px-3 font-semibold text-xl">{book.title}</h2>
        
                    <div className="flex justify-center items-center">
                      <div onClick={() => handleRestore(book.slug)} className="flex my-2 mr-5 text-blue-600">
                          <PiArrowClockwiseBold  className="mt-[4.5px] w-[20px] h-[20px] font-extrabold" /> 
                          {/* <button className="p-1 font-medium text-sm">Restore</button> */}
                      </div>
                      <div onClick={() => handleDelete(book.slug)} className="flex my-2 ml-2 text-red-600">
                          <FaTrashCan className="mt-[4.5px] w-[18px] h-[18px] font-extrabold" /> 
                          {/* <button  className="p-1 text-sm">Delete</button> */}
                      </div>
                    </div>
                </li>
                </div>
            ))}

        </ul>
        
    </div>
  )
}

export default Restore;

