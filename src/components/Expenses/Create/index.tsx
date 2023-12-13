import { useState } from 'react'
import {
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
  useToast
} from '@chakra-ui/react'
import axiosConfig from './../../../config/axios'

const CreateExpense = ({
  isOpen,
  refresh,
  onClose,
  setRefresh
}: ICreateEntityModal) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [expense, setExpense] = useState({
    name: '',
    category: '',
    cost: '',
    quantity: ''
  })

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setExpense({ ...expense, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validateForm = () => {
    const { name, category, cost, quantity } = expense
    if (name === '' || category === '' || cost === '' || quantity === '') {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axiosConfig.post('/expenses', expense)
      toast({
        title: 'Éxito',
        description: 'Se ha añadido correctamente',
        status: 'success',
        position: 'top',
        duration: 10000,
        isClosable: true
      })
      setLoading(false)
      onClose()
      setRefresh(!refresh)
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
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Agregar nuevo</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormControl>
            <FormLabel>Nombre</FormLabel>
            <Input
              name='name'
              onChange={handleChange}
              placeholder='Nombre'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Categoría</FormLabel>
            <Select
              name='category'
              onChange={handleChange}
              placeholder='Seleccionar'
            >
              <option value='Gasolina'>Gasolina</option>
              <option value='Otros'>Otros</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Costo</FormLabel>
            <Input
              name='cost'
              onChange={handleChange}
              type='number'
              placeholder='Costo'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Cantidad</FormLabel>
            <Input
              name='quantity'
              onChange={handleChange}
              type='number'
              placeholder='Cantidad'
            />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            isDisabled={validateForm()}
            isLoading={loading}
            onClick={handleSubmit}
            colorScheme='green'
            mr={3}
          >
            Añadir
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default CreateExpense
