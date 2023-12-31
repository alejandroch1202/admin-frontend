import React, { useEffect, useState, useContext } from 'react'
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
import { AppContext } from './../../context'
import { formatDate } from '../../utils/dates'
import Layout from '../../layout'
import CreateCow from '../../components/Cows/Create'
import EditCow from '../../components/Cows/Edit'
import DeleteCow from '../../components/Cows/Delete'

const header = [
  'fecha',
  'código',
  'peso inicial (kg)',
  'costo ($)',
  'costo total ($)',
  'peso actual (kg)',
  'ganancia de peso (kg)',
  'inversión ($)',
  'acciones'
]

const filterProperties = (property: string) => {
  return (
    property === 'date' ||
    property === 'code' ||
    property === 'initialWeight' ||
    property === 'purchasePrice'
  )
}

const Cows = () => {
  const { cows, setCows, expenses, setExpenses } = useContext(AppContext)
  const [investmentByAnimal, setInvestmentByAnimal] = useState(0)
  const [cowId, setCowId] = useState('')
  const [refresh, setRefresh] = useState(false)
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

  const getCows = async () => {
    const cows = await axiosConfig.get('/cows')
    setCows(cows.data.data)
  }

  const getExpenses = async () => {
    const expenses = await axiosConfig.get('/expenses')
    setExpenses(expenses.data.data)
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
      getExpenses()
    } catch (error) {
      console.log(error)
    }
  }, [refresh])

  // TODO: Move to Context
  useEffect(() => {
    try {
      const totalExpenses = expenses.reduce((acc, expense) => {
        return acc + expense.cost * expense.quantity
      }, 0)
      setInvestmentByAnimal(totalExpenses / (cows.length + 1))
    } catch (error) {
      console.log(error)
    }
  }, [cows, expenses])

  if (cows.length === 0 || investmentByAnimal === 0) {
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
      <>
        {/* Charts  */}
        {/* <CowCharts cows={cows} /> */}
        <Text
          as={'h1'}
          mt={10}
          mb={'8'}
          fontSize={'x-large'}
          fontWeight={'bold'}
          color={'green.700'}
        >
          Inventario
        </Text>
        <Flex
          mx={'auto'}
          w='full'
          direction={'column'}
          maxW='8xl'
          p={50}
          pt={0}
          textAlign={'center'}
          justifyContent='center'
        >
          {isOpenCreate && (
            <CreateCow
              isOpen={isOpenCreate}
              onClose={onCloseCreate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}

          {isOpenEdit && (
            <EditCow
              isOpen={isOpenEdit}
              onClose={onCloseEdit}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}

          {isOpenDelete && (
            <DeleteCow
              entityId={cowId}
              isOpen={isOpenDelete}
              onClose={onCloseDelete}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}

          <Button
            onClick={handleCreate}
            w={{ base: 'full', md: '200px' }}
            colorScheme='green'
            mb={'6'}
            variant={'outline'}
            leftIcon={<AddIcon />}
          >
            <Text>Agregar nuevo</Text>
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
                    {/* Filtering data */}
                    {Object.keys(cow)
                      .filter(filterProperties)
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
                              {property === 'date'
                                ? formatDate(
                                    new Date(cow[property as keyof ICow])
                                      .toISOString()
                                      .split('T')[0]
                                  )
                                : String(cow[property as keyof ICow])}
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
                      <Text textAlign={'center'}>
                        precio total de compra ($)
                      </Text>
                    </Td>

                    <Td
                      textAlign={'center'}
                      color={'gray.500'}
                      fontSize='md'
                      fontWeight='hairline'
                    >
                      {(cow.purchasePrice * cow.initialWeight).toFixed(2)}
                    </Td>
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
                      <Text textAlign={'center'}>peso actual (kg)</Text>
                    </Td>
                    <Td
                      textAlign={'center'}
                      color={'gray.500'}
                      fontSize='md'
                      fontWeight='hairline'
                    >
                      {cow.currentWeight}
                    </Td>
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
                      <Text textAlign={'center'}>ganancia de peso (kg)</Text>
                    </Td>
                    <Td
                      textAlign={'center'}
                      color={'gray.500'}
                      fontSize='md'
                      fontWeight='hairline'
                    >
                      {cow.currentWeight - cow.initialWeight}
                    </Td>

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
                      <Text textAlign={'center'}>inversión ($)</Text>
                    </Td>
                    <Td
                      textAlign={'center'}
                      color={'gray.500'}
                      fontSize='md'
                      fontWeight='hairline'
                    >
                      {investmentByAnimal.toFixed(2)}
                    </Td>

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
                      <Text textAlign={'center'}>acciones</Text>
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
      </>
    </Layout>
  )
}

export default Cows
