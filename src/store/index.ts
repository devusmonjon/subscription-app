import { create } from "zustand";
import {IMovie} from "@/interfaces/app.interface";

interface InfoState {
    modal: boolean;
    movie: IMovie;
    setModal: (modal: boolean) => void;
    setMovies: (movie: IMovie) => void;
}

export const useInfoStore = create<InfoState>()((set) => ({
    modal: false,
    movie: {} as IMovie,
    setModal: (bool: boolean) => set((state) =>  ({ ...state, modal: bool })),
    setMovies: (movie: IMovie) => set((state) => ({ ...state, movie: movie }))
}))