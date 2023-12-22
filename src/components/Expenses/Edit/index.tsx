import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Spinner,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import axiosConfig from './../../../config/axios'
import Layout from './../../../layout'

const EditExpense = ({
  categories,
  isOpen,
  refresh,
  onClose,
  setRefresh
}: ICreateEntityModal) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [expense, setExpense] = useState<IExpense>()
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm
  } = useDisclosure()

  const getExpense = async () => {
    const expense = await axiosConfig.get(`/expenses/${id}`)
    setExpense(expense.data.data)
  }

  useEffect(() => {
    getExpense()
  }, [])

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    if (expense === undefined) {
      return
    }

    setExpense({ ...expense, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validateForm = () => {
    if (expense === undefined) {
      return
    }

    const { date, category, name, cost, quantity } = expense
    if (
      String(date) === '' ||
      category === '' ||
      name === '' ||
      cost === 0 ||
      String(cost) === '' ||
      quantity === 0 ||
      String(quantity) === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axiosConfig.put(`/expenses/${id}`, expense)
      toast({
        title: 'Éxito',
        description: 'Se ha editado correctamente',
        status: 'success',
        position: 'top',
        duration: 10000,
        isClosable: true
      })
      setLoading(false)
      onClose()
      setRefresh(!refresh)
      navigate('/expenses')
    } catch (error) {
      console.log(error)

      toast({
        title: 'Error',
        description: 'Ha habido un problema. Por favor, intente nuevamente',
        status: 'error',
        position: 'top',
        duration: 10000,
        isClosable: true
      })
      setLoading(false)
      onClose()
      navigate('/expenses')
    }
  }

  const handleClose = () => {
    onClose()
    navigate('/expenses')
  }

  if (expense === undefined) {
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
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Actualizar información</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Fecha</FormLabel>
            <Input
              value={
                String(expense.date) !== ''
                  ? new Date(expense.date).toISOString().split('T')[0]
                  : ''
              }
              name='date'
              size='md'
              type='date'
              max={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
              placeholder='Fecha'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Categoría</FormLabel>
            <Select
              defaultValue={expense.category}
              name='category'
              onChange={handleChange}
              placeholder='Seleccionar'
            >
              {categories !== undefined
                ? categories.map((category: any) => (
                    <option
                      key={category._id}
                      value={category.name}
                    >
                      {category.name}
                    </option>
                  ))
                : ''}
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Descripción</FormLabel>
            <Input
              defaultValue={expense.name}
              name='name'
              onChange={handleChange}
              placeholder='Descripción'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Costo</FormLabel>
            <Input
              defaultValue={expense.cost}
              name='cost'
              onChange={handleChange}
              type='number'
              placeholder='Costo'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Cantidad</FormLabel>
            <Input
              defaultValue={expense.quantity}
              name='quantity'
              onChange={handleChange}
              type='number'
              placeholder='Cantidad'
            />
          </FormControl>

          <Modal
            isOpen={isOpenConfirm}
            onClose={onCloseConfirm}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Guardar cambios</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <Text>¿Seguro que quires guardar los cambios?</Text>
              </ModalBody>

              <ModalFooter>
                <Button
                  type='submit'
                  isLoading={loading}
                  onClick={handleSubmit}
                  colorScheme='green'
                  mr={3}
                >
                  Guardar
                </Button>
                <Button onClick={onCloseConfirm}>Cancelar</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            isDisabled={validateForm()}
            isLoading={loading}
            onClick={onOpenConfirm}
            colorScheme='green'
            mr={3}
          >
            Guardar cambios
          </Button>
          <Button onClick={handleClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditExpense
