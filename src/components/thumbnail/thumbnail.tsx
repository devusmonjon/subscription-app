import {ThumbnailProps} from "@/components/thumbnail/thumbnail.props";
import Image from "next/image";
import {image_base_url} from "@/helpers/constants";
import ReactStars from "react-stars";

const Thumbnail = ({ movie, isBig = false }: ThumbnailProps): JSX.Element => {
    return (
        <button className={`relative ${isBig ? "h-[400px] md:h-[550px] min-w-[350px] md:min-w-[450px]" : "h-[330px] md:h-[440px] min-w-[200px] md:min-w-[292px]"}   cursor-pointer transition-all ease-out ${!isBig && "rounded-sm md:rounded md:hover:scale-110"} md:focus:ring-2 md:focus:ring-offset-2 md:focus:ring-offset-transparent outline-none`}>
            <Image src={`${image_base_url}${movie?.poster_path || movie?.backdrop_path}`} alt={movie?.name || movie?.title} fill className={`${!isBig && "rounded-sm md:rounded"} object-cover`} />

            <div className="absolute left-0 right-0 bottom-0 top-0 bg-[#000]/20 w-full h-full"></div>

            <div className="absolute bottom-5 left-4 right-2">
                <div
                    className="py-1 px-2 text-center text-[#0FEFFD] bg-[#E5E5E5]/50 w-[111px] rounded-[0_8px] capitalize">
                    movie
                </div>

                <div className="flex items-center space-x-2 min-h-[50px]">
                    <ReactStars edit={false} count={10} value={movie?.vote_average} color2="#fff" size={20}/>
                    <p>({movie?.vote_count})</p>
                </div>

                <h1 className='text-xl font-bold md:text-2xl text-left'>{movie?.title || movie?.name || movie?.original_name}</h1>
            </div>
        </button>
    );
}

export default Thumbnail;