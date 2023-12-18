import { useContext } from 'react'
import { AppContext } from './../../context'
import Layout from '../../layout'
import CowsCharts from '../../components/Cows/Charts'
import ExpensesCharts from '../../components/Expenses/Charts'
import { Box, Flex, Spinner, Text } from '@chakra-ui/react'

const Home = () => {
  const { cows, expenses } = useContext(AppContext)

  if (cows.length === 0 || expenses.length === 0) {
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
        direction='column'
        mb={'10'}
      >
        <Text
          as={'h1'}
          textAlign={'center'}
          mt={10}
          mb={'5'}
          fontSize={'x-large'}
          fontWeight={'bold'}
          color={'green.700'}
        >
          Panel
        </Text>
        <CowsCharts cows={cows} />
        <ExpensesCharts expenses={expenses} />
      </Flex>
    </Layout>
  )
}

export default Home
