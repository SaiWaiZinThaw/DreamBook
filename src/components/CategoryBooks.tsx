import { BestSelf, Sorting } from "@/assets";
// import useFetchCategories from "@/hooks/useFetchCategories";
import { useState } from "react";
import { BsHeartFill, BsHeart, BsEyeFill } from "react-icons/bs";
import { IoIosSearch } from "react-icons/io";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CategoryBooks = () => {
  const [active, setActive] = useState(false);
  //   const {data} = useFetchCategories();

  return (
    <div className="mx-0 px-0 w-screen container">
      <div className="flex gap-3 mx-[45px] mt-4 w-[970px] h-[42px]">
        <img src={Sorting} alt="sorting" />

        <Select>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by default" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Sort by default</SelectItem>
            <SelectItem value="random">Sort by random</SelectItem>
            <SelectItem value="latest">Sort by Latest</SelectItem>
            <SelectItem value="A-Z">Sort by A-Z</SelectItem>
          </SelectContent>
        </Select>

        <div className="flex border-slate-400 ml-[262px] border rounded-[8px] w-[480px] h-[42px]">
          <IoIosSearch className="my-[7px] ml-[12px] w-[28px] h-[28px] text-slate-400" />
          <h4 className="my-[7px] ml-[4px] w-[46px] h-[23px] text-lg text-slate-400">
            Search
          </h4>
        </div>
      </div>

      <div className="mt-[30px] ml-[35px] overflow-hidden">
        <div className="flex mb-[30px] w-[990px]">
          <div className="relative transition group">
            <div className="grid grid-cols-4">
              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />

                  {/* This will change of code we get API */}
                  <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                    <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                      {active ? (
                        <BsHeartFill
                          className="text-red-500"
                          onClick={() => setActive(!active)}
                        />
                      ) : (
                        <BsHeart
                          className="text-slate-500"
                          onClick={() => setActive(!active)}
                        />
                      )}
                    </div>

                    {/* Change div to link to= {"Book/id"}*/}
                    <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                      <BsEyeFill className="text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
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

        <div className="flex mb-[30px] w-[990px]">
          <div className="relative transition group">
            <div className="grid grid-cols-4">
              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />

                  {/* This will change of code we get API */}
                  <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                    <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                      {active ? (
                        <BsHeartFill
                          className="text-red-500"
                          onClick={() => setActive(!active)}
                        />
                      ) : (
                        <BsHeart
                          className="text-slate-500"
                          onClick={() => setActive(!active)}
                        />
                      )}
                    </div>

                    {/* Change div to link to= {"Book/id"}*/}
                    <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                      <BsEyeFill className="text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
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

        <div className="flex mb-[30px] w-[990px]">
          <div className="relative transition group">
            <div className="grid grid-cols-4">
              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />

                  {/* This will change of code we get API */}
                  <div className="group-hover:right-[35px] top-[64px] -right-11 absolute flex flex-col justify-center items-center gap-y-2 opacity-0 group-hover:opacity-100 p-2 transition-all duration-300">
                    <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                      {active ? (
                        <BsHeartFill
                          className="text-red-500"
                          onClick={() => setActive(!active)}
                        />
                      ) : (
                        <BsHeart
                          className="text-slate-500"
                          onClick={() => setActive(!active)}
                        />
                      )}
                    </div>

                    {/* Change div to link to= {"Book/id"}*/}
                    <div className="flex justify-center items-center bg-slate-50 drop-shadow-xl border rounded-full w-8 h-8">
                      <BsEyeFill className="text-slate-500" />
                    </div>
                  </div>
                </div>

                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
                <div className="flex justify-center items-center bg-slate-300 m-2 rounded-[8px] h-[160px]">
                  <img src={BestSelf} alt="" />
                </div>
                <div className="ml-2">
                  <h1 className="font-bold text-xl">Title</h1>
                  <p className="font-normal text-gray-500 text-sm">Category</p>
                  <h2 className="mt-3 font-medium text-md">Author's Acc</h2>
                </div>
              </div>

              <div className="bg-slate-100 shadow-xl mr-[21px] border rounded-[8px] w-[232px] h-[280px]">
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
      </div>
    </div>
  );
};

export default CategoryBooks;

// import { useState } from "react";
// import BookItem from "./BookItem";

// const CategoryBooks = ({ books }) => {
//   const [rotation, setRotation] = useState(0);
//   const [activeBooks, setActiveBooks] = useState({});
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 8; // Adjust as needed

//   const handleRotateChange = () => {
//     setRotation(rotation + 180);
//   };

//   const toggleActive = (bookId) => {
//     setActiveBooks((prevActiveBooks) => ({
//       ...prevActiveBooks,
//       [bookId]: !prevActiveBooks[bookId],
//     }));
//   };

//   // Calculate index range for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentBooks = books.slice(indexOfFirstItem, indexOfLastItem);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   return (
//     <div>
//       {/* Sorting and search UI */}
//       <div>
//         {/* Sorting and search UI */}
//       </div>

//       {/* Books section */}
//       <div>
//         {currentBooks.map((book) => (
//           <BookItem
//             key={book.id}
//             book={book}
//             active={activeBooks[book.id]}
//             toggleActive={() => toggleActive(book.id)}
//           />
//         ))}
//       </div>

//       {/* Pagination */}
//       <ul className="pagination">
//         {Array.from({ length: Math.ceil(books.length / itemsPerPage) }).map(
//           (_, index) => (
//             <li key={index} className="page-item">
//               <button onClick={() => paginate(index + 1)} className="page-link">
//                 {index + 1}
//               </button>
//             </li>
//           )
//         )}
//       </ul>
//     </div>
//   );
// };

// export default CategoryBooks;
