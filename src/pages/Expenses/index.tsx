import React, { useEffect, useState } from 'react'
import {
  Box,
  ButtonGroup,
  Flex,
  IconButton,
  Spinner,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from '@chakra-ui/react'
import { DeleteIcon, EditIcon, ExternalLinkIcon } from '@chakra-ui/icons'
import axiosConfig from '../../config/axios'
import Layout from '../../layout'

const header = ['nombre', 'tipo', 'cantidad ($)', 'acciones']

const Expenses = () => {
  const [expenses, setExpenses] = useState([])

  const getExpenses = async () => {
    const expenses = await axiosConfig.get('/expenses')
    setExpenses(expenses.data.data)
  }

  useEffect(() => {
    try {
      getExpenses()
    } catch (error) {
      console.log(error)
    }
  }, [])

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
      <Flex
        mx={'auto'}
        w='full'
        maxW='8xl'
        p={50}
        textAlign={'center'}
        justifyContent='center'
      >
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
            {expenses.map((animal, tid) => {
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
                  {Object.keys(animal).map((property, index) => {
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
                          {animal[property]}
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
                      variant='solid'
                      size='sm'
                      spacing={3}
                    >
                      <IconButton
                        colorScheme='blue'
                        icon={<ExternalLinkIcon />}
                        aria-label='Ver mas'
                      />
                      <IconButton
                        colorScheme='green'
                        icon={<EditIcon />}
                        aria-label='Editar'
                      />
                      <IconButton
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

export default Expenses
