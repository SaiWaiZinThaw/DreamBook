// import { useFetchPopularBooks } from "@/hooks/useFetchBook";
// import { motion } from "framer-motion";
// import { useState, useRef, useEffect } from "react";
// import "./heroAnimation.css";

// const HeroAnimation = () => {
//  const { data: booksData } = useFetchPopularBooks();
//  const [clickedBookId, setClickedBookId] = useState<string | null>(null);
//  const containerRef = useRef<HTMLDivElement>(null);

//  const handleImageClick = (bookId: string) => {
//     setClickedBookId(bookId === clickedBookId ? null : bookId);
//   };

//   useEffect(() => {
//     if (containerRef.current && clickedBookId) {
//       const container = containerRef.current;
//       const index = booksData?.items.findIndex(book => book.bookId === clickedBookId) ?? 0;
//       const itemWidth = container.children[index].clientWidth;
//       const offset = itemWidth * index - container.clientWidth / 2 + itemWidth / 2;
//       container.scrollTo({ left: offset, behavior: 'smooth' });
//     }
//   }, [clickedBookId, booksData]);

//   return (
//     <div  
//         ref={containerRef}
//         className="relative flex scrollbar-hidden overflow-x-auto">
//         {
//             booksData?.items.map((book) => (
//                 <motion.div
//                 key={book.bookId}
//                 className="relative flex-shrink-0 px-2 w-1/3"
//                 initial={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
//                 animate={{
//                   opacity: clickedBookId === book.bookId ? 1 : 0.6,
//                   scale: clickedBookId === book.bookId ? 1.1 : 0.9,
//                   filter: clickedBookId === book.bookId ? "blur(0px)" : "blur(2px)",
//                   zIndex: clickedBookId === book.bookId ? 10 : 1,
//                 }}
//                 transition={{ duration: 0.3 }}
//                 onClick={() => handleImageClick(book.bookId)}
//               >
//                 <img
//                   src={book.coverImage}
//                   alt={book.title}
//                   className="w-full h-auto cursor-pointer"
//                 />
//               </motion.div>
//             //  <motion.div
//             //   key={book.bookId}
//             //   className="flex-shrink-0 px-2 w-1/3"
//             //   initial={{ opacity: 0, x: -100 }}
//             //   animate={{ opacity: 1, x: 0 }}
//             //   exit={{ opacity: 0, x: 100 }}
//             //   transition={{ duration: 0.5 }}
//             // >
//             //     <motion.img
//             //     src={book.coverImage}
//             //     alt={book.title}
//             //     className="w-full h-auto cursor-pointer"
//             //     onClick={() => handleImageClick(book.bookId)}
//             //     animate={{
//             //       y: clickedBookId === book.bookId ? -20 : 0,
//             //       transition: { duration: 0.3 },
//             //     }}
//             //   />
//             // </motion.div>
//             ))
//         }
//     </div>
//   )
// }

// export default HeroAnimation

import { useFetchPopularBooks } from "@/hooks/useFetchBook";
import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import "./heroAnimation.css";

const HeroAnimation = () => {
  const { data: booksData } = useFetchPopularBooks();
  const [clickedBookId, setClickedBookId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleImageClick = (bookId: string) => {
    setClickedBookId(bookId === clickedBookId ? null : bookId);
  };

  useEffect(() => {
    if (containerRef.current && clickedBookId) {
      const container = containerRef.current;
      const index = booksData?.items.findIndex(book => book.bookId === clickedBookId) ?? 0;
      const itemWidth = container.children[index].clientWidth;
      const offset = itemWidth * index - container.clientWidth / 2 + itemWidth / 2;
      container.scrollTo({ left: offset, behavior: 'smooth' });
    }
  }, [clickedBookId, booksData]);

  return (
    <div
      ref={containerRef}
      className="relative flex overflow-x-auto"
    >
      {
        booksData?.items.map((book) => (
          <motion.div
            key={book.bookId}
            className="relative flex-shrink-0 px-2 w-1/3"
            initial={{ opacity: 0.6, scale: 0.9, filter: "blur(5px)", zIndex: 1 }}
            animate={{
              opacity: clickedBookId === book.bookId ? 1 : 0.6,
              scale: clickedBookId === book.bookId ? 1.2 : 0.9,
              filter: clickedBookId === book.bookId ? "blur(0px)" : "blur(5px)",
              zIndex: clickedBookId === book.bookId ? 10 : 1,
              transform: clickedBookId === book.bookId ? "translateZ(50px)" : "translateZ(0px)",
            }}
            transition={{ duration: 0.5 }}
            onClick={() => handleImageClick(book.bookId)}
          >
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-full h-auto cursor-pointer"
            />
          </motion.div>
        ))
      }
    </div>
  );
}

export default HeroAnimation;

