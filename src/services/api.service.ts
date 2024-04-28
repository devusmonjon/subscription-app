const base_url = process.env.NEXT_PUBLIC_API_DOMAIN as string;
const api_key = process.env.NEXT_PUBLIC_API_KEY as string;

interface IApiRequest {
    trending: string;
    top_rated: string;
    tv_top_rated: string;
    popular: string;
    tv_popular: string;
    drama: string;
    documentary: string;
    comedy: string;
    family: string;
    history: string;
}

export const API_REQUEST: IApiRequest = {
    trending: `${base_url}/trending/all/week?api_key=${api_key}&language=en-US`,
    top_rated: `${base_url}/movie/top_rated?api_key=${api_key}&language=en-US`,
    tv_top_rated: `${base_url}/tv/top_rated?api_key=${api_key}&language=en-US`,
    popular: `${base_url}/movie/popular?api_key=${api_key}&language=en-US`,
    tv_popular: `${base_url}/tv/popular?api_key=${api_key}&language=en-US`,
    drama: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genre=18`,
    documentary: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genre=99`,
    comedy: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genre=35`,
    family: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genre=10751`,
    history: `${base_url}/discover/movie?api_key=${api_key}&language=en-US&with_genre=36`,
}