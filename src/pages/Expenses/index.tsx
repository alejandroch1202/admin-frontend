import React, { useEffect, useContext, useState } from 'react'
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
import { AppContext } from '../../context'
import axiosConfig from '../../config/axios'
import Layout from '../../layout'
import CreateExpense from '../../components/Expenses/Create'
import EditExpense from '../../components/Expenses/Edit'
import DeleteExpense from '../../components/Expenses/Delete'

const header = [
  'nombre',
  'categoría',
  'costo ($)',
  'cantidad',
  'fecha',
  'acciones'
]

const Expenses = () => {
  const { expenses, setExpenses } = useContext(AppContext)
  const [expenseId, setExpenseId] = useState('')
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
    setExpenseId(id)
    onOpenDelete()
  }

  useEffect(() => {
    try {
      getExpenses()
    } catch (error) {
      console.log(error)
    }
  }, [refresh])

  if (expenses.length === 0) {
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
        <Text
          as={'h1'}
          mt={10}
          fontSize={'x-large'}
          fontWeight={'bold'}
          color={'green.700'}
        >
          Gastos
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
            <CreateExpense
              isOpen={isOpenCreate}
              onClose={onCloseCreate}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}

          {isOpenEdit && (
            <EditExpense
              isOpen={isOpenEdit}
              onClose={onCloseEdit}
              refresh={refresh}
              setRefresh={setRefresh}
            />
          )}

          {isOpenDelete && (
            <DeleteExpense
              entityId={expenseId}
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
                {header.map((x) => (
                  <Th
                    key={x}
                    textAlign={'center'}
                  >
                    {x}
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
              {expenses.map((expense, tid) => {
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
                    {Object.keys(expense)
                      .filter(
                        (property) =>
                          property !== '_id' &&
                          property !== '__v' &&
                          property !== 'updatedAt'
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
                              {property === 'createdAt'
                                ? new Date(
                                    expense[property as keyof IExpense]
                                  ).toLocaleDateString()
                                : expense[property as keyof IExpense]}
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
                          to={`/expenses/edit/${expense._id}`}
                          colorScheme='blue'
                          icon={<EditIcon />}
                          aria-label='Editar'
                        />
                        <IconButton
                          onClick={() => {
                            handleDelete(expense._id)
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

export default Expenses
