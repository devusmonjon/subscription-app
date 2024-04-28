import Head from "next/head";

const Auth = () => {
    return (
        <>
            <Head>
                <title>Auth</title>
                <meta name="description" content="For using our application you sould sign in to app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                <link rel="icon" href="/logo.svg"/>
            </Head>
            <h1>Auth!</h1>
        </>
    )
}

export default Auth;