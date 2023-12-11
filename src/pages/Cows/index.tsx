import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure
} from '@chakra-ui/react'
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons'
import axiosConfig from '../../config/axios'
import Layout from '../../layout'
import CreateCow from '../../components/cows/Create'
import EditCow from '../../components/cows/Edit'
import DeleteCow from '../../components/cows/Delete'

const header = [
  'id',
  'tipo',
  'peso de compra (kg)',
  'precio de compra ($)',
  'acciones'
]

const Cows = () => {
  const {
    isOpen: isOpenCreate,
    onOpen: onOpenCreate,
    onClose: onCloseCreate
  } = useDisclosure()
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit
  } = useDisclosure()
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete
  } = useDisclosure()
  const [cows, setCows] = useState<ICow[]>([])
  const [cowId, setCowId] = useState('')
  const [refresh, setRefresh] = useState(false)

  const getCows = async () => {
    const cows = await axiosConfig.get('/cows')
    setCows(cows.data.data)
  }

  const handleCreate = () => {
    onOpenCreate()
  }

  const handleEdit = () => {
    onOpenEdit()
  }

  const handleDelete = (id: string) => {
    setCowId(id)
    onOpenDelete()
  }

  useEffect(() => {
    try {
      getCows()
    } catch (error) {
      console.log(error)
    }
  }, [refresh])

  if (cows.length === 0) {
    return (
      <Layout>
        <Box mt={'40'}>
          <Spinner
            thickness='4px'
            emptyColor='gray.200'
            color='green.700'
            size='xl'
          />
        </Box>
      </Layout>
    )
  }

  return (
    <Layout>
      <Flex
        mx={'auto'}
        w='full'
        direction={'column'}
        maxW='8xl'
        p={50}
        textAlign={'center'}
        justifyContent='center'
      >
        {isOpenCreate === true && (
          <CreateCow
            isOpen={isOpenCreate}
            onClose={onCloseCreate}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}

        {isOpenEdit === true && (
          <EditCow
            isOpen={isOpenEdit}
            onClose={onCloseEdit}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}

        {isOpenDelete === true && (
          <DeleteCow
            cowId={cowId}
            isOpen={isOpenDelete}
            onClose={onCloseDelete}
            refresh={refresh}
            setRefresh={setRefresh}
          />
        )}

        <Button
          onClick={handleCreate}
          w={'200px'}
          colorScheme='green'
          mb={'6'}
          variant={'outline'}
          leftIcon={<AddIcon />}
        >
          <Text mt={1}>Agregar nuevo</Text>
        </Button>

        <Table
          w='full'
          borderRadius={'md'}
          bg='white'
          shadow={'md'}
          display={{
            base: 'block',
            md: 'table'
          }}
        >
          <Thead
            display={{
              base: 'none',
              md: 'table-header-group'
            }}
          >
            <Tr>
              {header.map((index) => (
                <Th
                  key={index}
                  textAlign={'center'}
                >
                  {index}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody
            display={{
              base: 'block',
              md: 'table-row-group'
            }}
          >
            {cows.map((cow, tid) => {
              return (
                <Tr
                  key={tid}
                  display={{
                    base: 'grid',
                    md: 'table-row'
                  }}
                  sx={{
                    gridTemplateColumns: 'minmax(0px, 35%) minmax(0px, 65%)',
                    gridGap: '10px'
                  }}
                >
                  {Object.keys(cow)
                    .filter(
                      (property) => property !== '_id' && property !== '__v'
                    )
                    .map((property, index) => {
                      return (
                        <React.Fragment key={`${tid}${property}`}>
                          <Td
                            textAlign={'center'}
                            display={{
                              base: 'table-cell',
                              md: 'none'
                            }}
                            sx={{
                              textTransform: 'uppercase',
                              color: 'gray.500',
                              fontSize: 'xs',
                              fontWeight: 'bold',
                              letterSpacing: 'wider',
                              fontFamily: 'heading'
                            }}
                          >
                            {header[index]}
                          </Td>
                          <Td
                            textAlign={'center'}
                            color={'gray.500'}
                            fontSize='md'
                            fontWeight='hairline'
                          >
                            {cow[property as keyof ICow]}
                          </Td>
                        </React.Fragment>
                      )
                    })}
                  <Td
                    display={{
                      base: 'table-cell',
                      md: 'none'
                    }}
                    sx={{
                      textTransform: 'uppercase',
                      color: 'gray.500',
                      fontSize: 'xs',
                      fontWeight: 'bold',
                      letterSpacing: 'wider',
                      fontFamily: 'heading'
                    }}
                  >
                    Acciones
                  </Td>
                  <Td textAlign={'center'}>
                    <ButtonGroup
                      variant='ghost'
                      size='sm'
                      spacing={3}
                    >
                      {/* <IconButton
                        colorScheme='green'
                        icon={<ExternalLinkIcon />}
                        aria-label='Ver mas'
                      /> */}
                      <IconButton
                        as={NavLink}
                        onClick={handleEdit}
                        to={`/cows/edit/${cow._id}`}
                        colorScheme='blue'
                        icon={<EditIcon />}
                        aria-label='Editar'
                      />
                      <IconButton
                        onClick={() => {
                          handleDelete(cow._id)
                        }}
                        colorScheme='red'
                        icon={<DeleteIcon />}
                        aria-label='Eliminar'
                      />
                    </ButtonGroup>
                  </Td>
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </Flex>
    </Layout>
  )
}

export default Cows
