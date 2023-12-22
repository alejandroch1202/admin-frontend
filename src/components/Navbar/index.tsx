import { NavLink } from 'react-router-dom'
import {
  Box,
  Flex,
  Avatar,
  HStack,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  Stack,
  Image,
  Center
} from '@chakra-ui/react'
import {
  HamburgerIcon,
  CloseIcon,
  LockIcon,
  SettingsIcon
} from '@chakra-ui/icons'
import logo from './../../assets/logo-white.png'

const Links = [
  { title: 'Resumen', path: '/' },
  { title: 'Inventario', path: '/cows' },
  { title: 'Gastos', path: '/expenses' }
]

interface Props {
  title: string
  path: string
}

const NavBarLink = ({ title, path }: Props) => {
  return (
    <Box
      as={NavLink}
      to={path}
      px={2}
      py={1}
      rounded={'md'}
      color={'white'}
      _hover={{ bg: 'green.600' }}
    >
      {title}
    </Box>
  )
}

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleLogout = () => {}

  return (
    <Box
      bg={'green.700'}
      px={4}
    >
      <Flex
        maxW={'8xl'}
        mx={'auto'}
        h={16}
        alignItems={'center'}
        justifyContent={'space-between'}
      >
        <IconButton
          size={'md'}
          colorScheme='green'
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label={'Open Menu'}
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
        <HStack
          spacing={8}
          alignItems={'center'}
        >
          <Image
            display={{ base: 'none', md: 'inherit' }}
            boxSize={'60px'}
            objectFit='cover'
            src={logo}
            alt='Logo'
          />
          <HStack
            as={'nav'}
            spacing={4}
            display={{ base: 'none', md: 'flex' }}
          >
            {Links.map((link) => (
              <NavBarLink
                key={link.title}
                title={link.title}
                path={link.path}
              />
            ))}
          </HStack>
        </HStack>
        <Flex alignItems={'center'}>
          <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}
            >
              <Avatar
                size={'sm'}
                src={''}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={''}
                />
              </Center>
              <br />
              <Center>
                <p>Username</p>
              </Center>
              <br />
              <MenuDivider />
              <MenuItem>
                <SettingsIcon
                  mr={2}
                  color={'green.700'}
                />
                Configuración
              </MenuItem>
              <MenuItem onClick={handleLogout}>
                <LockIcon
                  mr={2}
                  color={'green.700'}
                />
                Cerrar sesión
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>

      {isOpen ? (
        <Box
          pb={4}
          display={{ md: 'none' }}
        >
          <Stack
            as={'nav'}
            spacing={4}
          >
            {Links.map((link) => (
              <NavBarLink
                key={link.title}
                title={link.title}
                path={link.path}
              />
            ))}
          </Stack>
        </Box>
      ) : null}
    </Box>
  )
}

export default Navbar
