import Head from "next/head";
import Image from "next/image";
import {FormEvent, useContext, useState} from "react";
import TextField from "../components/text-field/text-field";
import {Formik, Form, FormikFormProps} from "formik";
import * as Yup from "yup";
import {AuthContext} from "@/context/auth.context";
import {useRouter} from "next/router";
// https://rb.gy/p2hphi

const Auth = () => {
    const [auth, setAuth] = useState<"signup" | "signin">("signin");
    const { isLoading, error, signIn, signUp, user } = useContext(AuthContext);

    const router = useRouter();

    if (user) {
        router.push("/");
    }

    const toggleAuth = (state: "signup" | "signin"):void => {
        setAuth(state);
    }

    const onSubmit = (formData: { email: string; password: string; }) => {
        if (auth === "signup") {
            signUp(formData.email, formData.password);
        } else {
            signIn(formData.email, formData.password);
        }
    }

    const validation = Yup.object({
        email: Yup.string().email("Enter valid email").required("Email is required"),
        password: Yup.string().min(6, "6 minimum character").required("Password is required"),
    });

    if (user && !isLoading)
        return <>{"Loading..."}</>;

    return (
        <div className="relative flex h-screen overflow-hidden w-screen flex-col md:items-center md:justify-center bg-black md:bg-transparent">
            <Head>
                <title>Auth</title>
                <meta name="description" content="For using our application you sould sign in to app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/logo.svg"/>
            </Head>

            <Image src={"https://rb.gy/p2hphi"} alt={"Auth Page Background Image"} fill className="brightness-[0.6] object-cover -z-10 hidden sm:!inline" />

            <Image
                src={"/logo.svg"}
                alt={"Logo"} width={70}
                height={70}
                className="absolute left-4 top-4 cursor-pointer object-contain"
            />

            <div className="relative mt-24 space-y-8 rounded bg-black/75 py-10 px-6 md:mt-0 md:max-w-md md:px-14">
                <h1 className="text-4xl font-semibold text-center">{auth === "signin" ? "Sign In" : "Sign Up"}</h1>
                {error && <p className="text-red-500 font-semibold text-center">{error}</p>}
                <Formik initialValues={{ email: '', password: ''}} onSubmit={onSubmit} validationSchema={validation}>
                    <Form>
                        <div className="space-y-4">
                            <TextField name="email" type="text" placeholder="Email" />
                            <TextField name="password" type="password" placeholder="Password" />
                        </div>

                        {isLoading ? (
                            <button type="button"
                                    className="inline-flex w-full items-center justify-center px-4 py-3 mt-4 font-semibold leading-6 text-sm shadow rounded-md text-white bg-[#ef1c68] hover:bg-[#e93f7c] transition ease-in-out duration-150 cursor-not-allowed"
                                    disabled={isLoading}>
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                            strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor"
                                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Loading...
                            </button>
                        ) : (
                        <button type="submit" disabled={isLoading}
                                className="w-full bg-[#E10856] py-3 font-semibold mt-4 rounded">{auth === "signin" ? "Sign In" : "Sign Up"}</button>
                        )}
                    </Form>
                </Formik>

                {auth === "signin" ? (
                    <div className="text-[gray]">
                        Not yet account?{" "}
                        <button className="text-white hover:underline" type="button"
                                onClick={() => toggleAuth("signup")}>Sign Up Now
                        </button>
                    </div>
                ) : (
                    <div className="text-[gray]">
                        Already have account?{" "}
                        <button className="text-white hover:underline" type="button"
                                onClick={() => toggleAuth("signin")}>Sign In Now
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Auth;