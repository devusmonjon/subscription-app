import {RowProps} from "@/components/row/row.props";
import {AiFillCaretLeft, AiFillCaretRight} from "react-icons/ai";
import Thumbnail from "@/components/thumbnail/thumbnail";
import {IMovie} from "@/interfaces/app.interface";
import {useRef, useState} from "react";

const Row = ({ title, movies, isBig = false }: RowProps) => {
    const [moved, setMoved] = useState<boolean>(false);
    const carouselRef = useRef<HTMLDivElement>(null);

    const handleClick = (direction: "left" | "right"): void => {
        setMoved(true);

        if (carouselRef.current) {
            const {scrollLeft, clientWidth} = carouselRef.current;

            const scrollTo = direction === "left" ? scrollLeft - clientWidth : scrollLeft + clientWidth;

            carouselRef.current.scrollTo({left: scrollTo, behavior: "smooth"});

            if (scrollTo <= 0) {
                setMoved(false);
            }
        }
    }

    return (
        <div className="space-y-1 md:space-y-2">
            <h2 className="w-56 cursor-pointer text-sm md:text-2xl font-semibold text-[#e5e5e5] hover:text-white transition-all duration-300 leading-[0]">{title}</h2>
            {/* carousel */}
            <div className="group relative md:ml-2">
                <AiFillCaretLeft
                    className={`absolute top-0 bottom-0 left-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 md:opacity-100 transition-all duration-300 group-hover:opacity-100 hover:scale-125${!moved && " hidden"}`}
                    onClick={() => handleClick("left")}
                />
                <div
                    className={`flex items-center ${!isBig && "space-x-1 md:space-x-6"} overflow-x-scroll md:space-y-0 ${!isBig && "h-[501px]"} scrollbar-hide ${isBig && "mt-10"}`}
                    ref={carouselRef}
                >
                    {movies.map((movie: IMovie) => (
                        <Thumbnail key={movie.id} movie={movie} isBig={isBig} />
                    ))}
                </div>
                <AiFillCaretRight
                    className="absolute top-0 bottom-0 right-2 z-40 m-auto h-6 w-6 cursor-pointer opacity-0 md:opacity-100 transition-all duration-300 group-hover:opacity-100 hover:scale-125"
                    onClick={() => handleClick("right")}
                />
            </div>
        </div>
    )
}

export default Row;