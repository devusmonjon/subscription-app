import {createContext, ReactNode, useEffect, useMemo, useState} from "react";
import {onAuthStateChanged, User} from "@firebase/auth";
import {useAuth} from "@/hooks/useAuth";
import {auth} from "@/firebase";
import {useRouter} from "next/router";

interface AuthContextState {
    user: User | null;
    error: string;
    isLoading: boolean;
    signUp: (email: string, password: string) => Promise<void>;
    signIn: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextState>({
    user: null,
    error: "",
    isLoading: false,
    signUp: async (email: string, password: string) => {},
    signIn: async (email: string, password: string) => {},
    logout: async () => {}
})

const AuthContextProvider = ({ children }: { children: ReactNode }) => {
    const [initialLoader, setInitialLoader] = useState<boolean>(true);
    const { error, isLoading, logout, signIn, signUp, user, setUser, setIsLoading } = useAuth();
    const router = useRouter();

    const value = useMemo(
        () => ({
            error, isLoading, logout, signIn, signUp, user
        }),
        // eslint-disable-next-line
        [signIn, signUp, user]
    );

    useEffect(() => onAuthStateChanged(auth, (user) => {
        if (user) {
            setIsLoading(false)
            setUser(user);
        } else {
            setUser(null);
            setIsLoading(true);
            router.push("/auth");
        }

        setIsLoading(false);
        setInitialLoader(false);
        // eslint-disable-next-line
    }), [])

    return <AuthContext.Provider value={value}>{!initialLoader ? children : "Loading..."}</AuthContext.Provider>;
}

export default AuthContextProvider;