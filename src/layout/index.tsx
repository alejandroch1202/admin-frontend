import { Flex } from '@chakra-ui/react'

interface Props {
  children: JSX.Element
}

const Layout = ({ children }: Props) => {
  return (
    <Flex
      bg={'gray.50'}
      minH={'100vh'}
      w={'full'}
      align={'center'}
      flexDir={'column'}
    >
      {children}
    </Flex>
  )
}

export default Layout
