import { HeroProps } from "@/components/hero/hero.props";
import { useEffect, useState } from "react";
import { IMovie } from "@/interfaces/app.interface";
import Image from "next/image";
import { image_base_url } from "@/helpers/constants";
import { TbPlayerPlay } from "react-icons/tb";
import ReactStars from "react-stars";

const Hero = ({ trending }: HeroProps): JSX.Element => {
    const [movie, setMovie] = useState<IMovie>({} as IMovie);

    useEffect(() => {
        const randomMovie: IMovie = trending[Math.floor(Math.random() * trending.length)];
        setMovie(randomMovie);
    }, [trending]);

    return <div className="flex flex-col space-y-2 py-20 md:space-y-4 lg:h-[65vh] lg:pb-12 lg:justify-end">
        <div className="absolute top-0 left-0 -z-10 w-full h-[95vh]">
            <Image src={`${image_base_url}${movie?.backdrop_path || movie?.poster_path}`} alt={movie?.title || movie?.name || movie?.original_name} fill className="object-cover brightness-50" />
        </div>

        <div className="py-1 px-2 text-center text-[#0FEFFD] bg-[#E5E5E5]/50 w-[111px] rounded-[0_8px] capitalize">
            {movie?.media_type}
        </div>

        <div className="flex items-center space-x-2">
            <ReactStars edit={false} count={10} value={movie?.vote_average} color2="#fff" size={20} />
            <p>({movie?.vote_count})</p>
        </div>

        <h1 className='text-2xl font-bold md:text-4xl lg:text-7xl'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <p className='max-w-xs md:max-w-lg lg:max-w-2xl text-xs text-shadow-md md:text-lg lg:text-2xl'>{movie?.overview?.slice(0, 100)}...</p>

        <div>
            <button
                className='flex justify-center items-center space-x-2 bg-white/40 font-bold text-black w-[200px] h-[56px] rounded-full'>
                <TbPlayerPlay className='h-5 w-5 md:h8 md:w-8'/> Watch now
            </button>
        </div>
    </div>

}
export default Hero;