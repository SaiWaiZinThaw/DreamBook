import { FaTrashCan } from "react-icons/fa6";
import useFetchBooksAuthor from "@/hooks/useFetchBooksAuthor";
import { useRestoreBook } from "@/hooks/useRestore";
import { PiArrowClockwiseBold } from "react-icons/pi";
import { useHardDeleteBook } from "@/hooks/useDeleteBook";

const Restore = () => {
  const { data: fetchBooksAuthor, refetch} = useFetchBooksAuthor();
  const { mutate: restoreBookMutation } = useRestoreBook();
  const {mutate: deleteBook} = useHardDeleteBook();

  const handleRestore = async (bookId: number) => {
    console.log("Restoring book with ID:", bookId);
    if (!bookId) {
        console.error("Invalid bookId:", bookId);
        return;
    }

    try {
        await restoreBookMutation(bookId);
        console.log(`Book with ID ${bookId} restored successfully`);
        refetch(); // Refetch the data after successful restore
    } catch (error) {
        console.error(`Failed to restore book with ID ${bookId}`, error);
    }
};

  

  const handleDelete = async (bookId: number) => {
    try{
      await deleteBook(bookId);
      console.log("Item Deleted");
    }catch(error){
      console.log("error deleting")
    }
      // deleteBook(bookId, {
      //   onSuccess: () => {
      //     console.log("Item deleted");
      //     refetch();
      //   },
      //   onError: () => {
      //     console.log("Error deleting item");
      //   }
      // });
    
  };
  
  
  return (
    <div className="w-full">
        <ul className="flex gap-x-4 mx-4">
            
        {fetchBooksAuthor &&
            fetchBooksAuthor.map((book: any) => (
                <div className="bg-slate-100 shadow-xl border rounded-[8px] w-[232px] h-[300px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                    <img src={book.coverImage} alt="" className="w-[86px] h-[129px]" />
                </div>
                <li key={book.id} className="mb-4">
                    <h2 className="font-semibold text-xl">{book.title}</h2>
                    <p>{book.description}</p>
                    <div onClick={() => handleRestore(book.id)} className="flex my-2 ml-2">
                        <PiArrowClockwiseBold  className="mt-[4.5px]" /> 
                        <button className="p-1 text-sm">Restore</button>
                    </div>
                    <div className="flex my-2 ml-2">
                        <FaTrashCan className="mt-[4.5px]" /> 
                        <button onClick={() => handleDelete(book.id)} className="p-1 text-sm">Delete</button>
                    </div>
                </li>
                </div>
            ))}

        </ul>
        
    </div>
  )
}

export default Restore;

