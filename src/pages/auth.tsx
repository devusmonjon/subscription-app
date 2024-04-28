import Head from "next/head";
import Image from "next/image";
import {FormEvent, useState} from "react";
import TextField from "../components/text-field/text-field";
import {Formik, Form, FormikFormProps} from "formik";
import * as Yup from "yup";
// https://rb.gy/p2hphi

const Auth = () => {
    const [auth, setAuth] = useState<"signup" | "signin">("signin");

    const toggleAuth = (state: "signup" | "signin"):void => {
        setAuth(state);
    }

    const onSubmit = (formData: { email: string; password: string; }) => {
        console.log(formData);
    }

    const validation = Yup.object({
        email: Yup.string().email("Enter valid email").required("Email is required"),
        password: Yup.string().min(6, "6 minimum character").required("Password is required"),
    })

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
                <Formik initialValues={{ email: '', password: ''}} onSubmit={onSubmit} validationSchema={validation}>
                    <Form>
                        <div className="space-y-4">
                            <TextField name="email" type="text" placeholder="Email" />
                            <TextField name="password" type="password" placeholder="Password" />
                        </div>

                        {auth === "signin" ? (
                            <button type="submit" className="w-full bg-[#E10856] py-3 font-semibold mt-4 rounded">Sign In</button>
                        ) : (
                            <button type="submit" className="w-full bg-[#E10856] py-3 font-semibold mt-4 rounded">Sign Up</button>
                        )}
                    </Form>
                </Formik>

                {auth === "signin" ? (
                    <div className="text-[gray]">
                    Not yet account?{" "}
                        <button className="text-white hover:underline" type="button" onClick={() => toggleAuth("signup")}>Sign Up Now</button>
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