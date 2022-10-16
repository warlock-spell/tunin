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
import NextImage from 'next/image'


const AuthForm: FC<{mode: 'signin' | 'signup'}> = ({mode}) => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const handleSubmit = async(e) => {
        e.preventDefault()
        setIsLoading(true)

        await auth(mode, {email, password})
        setIsLoading(false)
        router.push('/')
    }

    return (
        <Box height="100vh" width="100vw" bg="black" color="white">
            <Flex justify='center' align="center" height="200px" borderBottom="white 1px solid">
                {/* HELLO */}
                <NextImage src="/Logo.svg" height={160} width={160}/>
            </Flex>
            <Flex justify='center' align="center" height="calc(100vh - 200px)">
                <Box padding="50px" bg="gray.900" borderRadius="6px">
                    <form onSubmit={handleSubmit}>
                        <Input
                         placeholder="email"
                         type="email"
                         onChange={(e) => setEmail(e.target.value)}
                        />
                        <Input
                        placeholder="password"
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        />
                        <Button 
                        type="submit" 
                        bg="green.500" 
                        isLoading={isLoading} 
                        sx={{
                            '&:hover': {
                                bg: 'green.400',
                            },
                        }}
                        >
                            {mode}
                        </Button>
                    </form>
                </Box>
            </Flex>
        </Box>
    )

}

export default AuthForm