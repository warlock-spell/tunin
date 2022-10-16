// signin and signup form are mostly same
// create a componenet that just toggles what mode you're in and it knows what to do
import {Box, Flex, Input, Button} from '@chakra-ui/react'
// we haven't had to touch a router up unitl now because nextjs handles the routing for us based off the folder structure, and the file naming
// you can actually access the router to do programmatic routing 
import { useRouter } from 'next/router'
// swr -> still while revalidate
// it handles data fetching very nicely, it handles caching, optimistic updates, refetching, and validating the cache
import {FC, useState} from 'react'
import { useSWRConfig } from 'swr'
import {auth} from '../lib/mutations'


const AuthForm: FC<{mode: string}> = ({mode}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    return (
        <Box height="100vh" width="100vw" bg="black" color="white">
            <Flex justify='center' align="center" height="100px">
                HELLO
            </Flex>
            <Flex justify='center' align="center" height="calc(100vh-100px)">
                FORM
            </Flex>

        </Box>
    )

}

export default AuthForm