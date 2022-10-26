// /* Edge function is like a service function that sits in between the service functions of api route and our client
// It sits on the edge of the CDN and act as a middleware
// with the help of this you can do computations on CDN without having to go to your origin server
// You can do things like A/B testing, preview mode for content, transfer images
// Nextjs 12 introduced their middleware edge functions which again sit in between the Actual API service functions and your client
// So that way, it can intercept any API call and do something

// Here we will make an edge function that checks the cookie to see if you have an access token, 
// if you don't then we're not even going to the server to render the page, we're just going to say no
// so we don't even waste resources going to our server

// Other functionalities: https://nextjs.org/docs/advanced-features/middleware

// This middleware file gets executed before any other requests get activated or targeted

// Edge functions do not run in node environment or frontend evironment, they work in web worker environment

// nested middleware is deprecated, use middleware.ts file name in root directory
// */
import {NextResponse} from 'next/server'

// pages to protect
const signedinPages = ['/', '/playlist', '/library']

export default function middleware(req) {
    if (signedinPages.find((p) => p === req.nextUrl.pathname)){
        const token = req.cookies.TUNIN_ACCESS_TOKEN
        
        // To check a user, we will use a token
        // we can not import prisma here, as edge functions do not run in a node environmnet
        if (!token) {
            // relative URL does not work
            // middleware can also be used to redirect error 404 urls
            return NextResponse.rewrite(new URL('/signin', req.url))
        }

    }
}

// /* Angular interceptor intercepts in the browser, while middleware is actually happening on the network layer (on CDN or something)

// In middleware, the request has already left the browser, the request is headed to the server, 
// before it reaches to the server, it stops on the edge of CDN which is whatever is closest to you, and token is checked 

// Since everything happens on the CDN, it is SEO friendly
// */


