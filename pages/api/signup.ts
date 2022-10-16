/*
Strategy for signup: You send some credentials, (email & hashed password)
Attempt to create a new user with that email and a hashed password
emails will be uniques, it will either create or throw an error that this mail already exists
If Signup is successful, we will generate jsonwebtoken and we will save it as a cookie, so it'll be set in your browser
And then, that cookie will be sent on every other requests that we can use to verify user
In Jsonwebtoken an object that gets turned into some generic string, but it's deterministic, i.e. we can undo the string and get back the same object
Cookie is used to check, if this server is issuer of this token, and wether this is a right token or an expired one, and finally even if it's not expired, is this a valid user id
*/


import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookie from 'cookie'
import prisma from '../../lib/prisma'
import { NextApiRequest, NextApiResponse } from 'next'



// Every serverless function takes two arguments -> request object, response object
/* Serverless function are like call backs, they actually doesn't do anything until an event comes in
There can be different type of events, depending on what platform you are on
The most common one is a route
Once the event happens, the function is executed
Therefore there is no server, it's leiterally like a callback waiting for some incoming event
In this case the events are routes, so it feels and looks like an API

Serverless function can respond to things being added to AWSS3, they can respond to logs, 
they can respond to someone updating the users on the database

In nextjs they generally respond to a route and a verb

Its basically like a VM, thats get spinned up, you code is zipped up in a file somewhere (e.g. S3), 
it gets unzipped and then it gets executed, it waits around a little bit, 
and then eventually, that VM shuts down and then it spins back up and someone hits it again
*/
export default async (req: NextApiRequest, res: NextApiResponse) => {
    /* Prisma cannot generate and validate CRSF tokens
    We will create a refresh token (another JWT)
    Suppose jwt expires in 24 hours, then after 24 hours you will have a refresh token
    And somewhere in your react app, you would have a use effect hook that has a set interval that checks every ten minutes to see if your JWT expired, 
    and if it did, in the background it'll automatically exchange that JWT with refresh token and get a new JWT, so that the user doesn't have to */

    const salt = bcrypt.genSaltSync()
    const { email, password } = req.body

    let user

    try {
        // to avoid app crashing if user signup with an already existing email
        user = await prisma.user.create({
            data: {
                email,
                password: bcrypt.hashSync(password, salt),
            }
        })
    }

    catch (e) {
        res.status(401)
        // on frontend just use .error and get error message
        res.json({error: 'User already exists'})
        return
    }

    // Creating a token if a user is created
    // it only needs two things, the payload (object that you want to hash) that you wanna sign in, and a secret(to know that this particular server created this thing) 
    // and the third argument are some options
    // token will be a really long unique string
    const token = jwt.sign({
        // payload
        email: user.email,
        id: user.id,
        time: Date.now(),
    },
    // secret 
    'hello',
    // options
    {expiresIn: '8h'}
    )

    // If you set a cookie while you're on a request, before you send it back, it's gonna get added to the browser
    // If we set the cookie here and we send a response back, then this cookie that we are setting will get sent into the person's browser that requested us
    // Other option is to just send back the JWT and JSON and it'll save it in local storage or something like that, local storage is fine, but it can be accessed by javascript
    // We set it as a cookie and do HTTP only, then it cannot be accessed by javascript, it can only be accessed by HTTP
    // Therefore, cookies give us a lot more security against CSRF

    res.setHeader(
        'Set-Cookie',
        cookie.serialize('TUNIN_ACCESS_TOKEN', token, {
            // Enable http only to prevent access using javascript
            httpOnly: true, 
            // 8 hours duration
            maxAge: 8*60*60,
            path: '/',
            /* Lax: Cookies are not sent on normal cross-site subrequests (for example to load images or frames into a third party site), but are sent when a user is navigating to the origin site (i.e., when following a link). */
            sameSite: 'lax',
            secure: process.env.NODE_ENV === 'production',
        })
    )
    res.json(user)
}


// Run: http POST :3000/api/signup email=d@g.com password=abcabc
// Run npx prisma studio to verify created user
// Try to signup with same email and you should get an error
// Run again: http POST :3000/api/signup email=d@g.com password=abcabc