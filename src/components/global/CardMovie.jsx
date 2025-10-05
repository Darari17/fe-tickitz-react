// import { Link } from "react-router";

// export const CardMovie = ({ movie }) => {
//   const posterUrl = movie.poster_path
//     ? `${import.meta.env.VITE_TMDB_API_IMAGE_URL}${movie.poster_path}`
//     : "/images/placeholder-poster.svg";

//   return (
//     <div
//       key={movie.id}
//       className="relative rounded-[6px] w-min h-[25rem] mb-10"
//     >
//       {/* Poster */}
//       <div className="w-60 h-[20rem] cursor-pointer group relative">
//         <img
//           src={posterUrl}
//           alt={movie.title}
//           className="w-full h-full object-cover rounded-md"
//         />

//         {/* Hover Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
//         <div
//           className="absolute inset-0 flex flex-col items-center justify-center gap-5
//            opacity-0 group-hover:opacity-100 transition-opacity duration-300
//            bg-gradient-to-b from-black/60 to-black/60"
//         >
//           <Link
//             to={`${movie.id}`}
//             className="w-2/3 h-10 border rounded-md text-white cursor-pointer flex justify-center items-center"
//           >
//             Details
//           </Link>
//           <Link className="w-2/3 h-10 bg-blue-600 rounded-md text-white flex justify-center items-center">
//             Buy Ticket
//           </Link>
//         </div>
//       </div>

//       {/* Info */}
//       <div className="flex flex-col justify-center items-start gap-3 mt-2">
//         <div className="text-lg font-semibold">{movie.title}</div>

//         {/* Genres */}
//         <div className="flex flex-row flex-wrap gap-1">
//           {(movie.genres || []).map((g) => (
//             <span
//               key={g.id}
//               className="bg-[#A0A3BD1A] text-[#A0A3BD] text-sm px-2 py-0.5 rounded-full gap-1"
//             >
//               {g.name}
//             </span>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

import { Link } from "react-router";
import { useState } from "react";
import { getPosterUrl } from "../../utils/imageHelper";

export const CardMovie = ({ movie }) => {
  const [errored, setErrored] = useState(false);

  // default coba ambil dari helper
  let posterUrl = getPosterUrl(movie.poster_path);

  // kalau error load → fallback TMDB (jika ada) → kalau tetap gagal → placeholder
  if (errored) {
    posterUrl = movie.poster_path
      ? `${import.meta.env.VITE_TMDB_API_IMAGE_URL}${movie.poster_path}`
      : "/images/placeholder-poster.svg";
  }

  return (
    <div
      key={movie.id}
      className="relative rounded-[6px] w-min h-[25rem] mb-10"
    >
      {/* Poster */}
      <div className="w-60 h-[20rem] cursor-pointer group relative">
        <img
          src={posterUrl}
          alt={movie.title}
          className="w-full h-full object-cover rounded-md"
          onError={() => setErrored(true)} // fallback sekali
        />

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-transparent" />
        <div
          className="absolute inset-0 flex flex-col items-center justify-center gap-5 
           opacity-0 group-hover:opacity-100 transition-opacity duration-300 
           bg-gradient-to-b from-black/60 to-black/60"
        >
          <Link
            to={`${movie.id}`}
            className="w-2/3 h-10 border rounded-md text-white cursor-pointer flex justify-center items-center"
          >
            Details
          </Link>
          <Link className="w-2/3 h-10 bg-blue-600 rounded-md text-white flex justify-center items-center">
            Buy Ticket
          </Link>
        </div>
      </div>

      {/* Info */}
      <div className="flex flex-col justify-center items-start gap-3 mt-2">
        <div className="text-lg font-semibold">{movie.title}</div>

        {/* Genres */}
        <div className="flex flex-row flex-wrap gap-1">
          {(movie.genres || []).map((g) => (
            <span
              key={g.id}
              className="bg-[#A0A3BD1A] text-[#A0A3BD] text-sm px-2 py-0.5 rounded-full gap-1"
            >
              {g.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
