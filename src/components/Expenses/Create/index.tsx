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
  categories,
  isOpen,
  refresh,
  onClose,
  setRefresh
}: ICreateEntityModal) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [expense, setExpense] = useState({
    date: '',
    description: '',
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
    const { date, category, description, cost, quantity } = expense
    if (
      date === '' ||
      category === '' ||
      description === '' ||
      cost === '' ||
      quantity === ''
    ) {
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
            <FormLabel>Fecha</FormLabel>
            <Input
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
              name='description'
              onChange={handleChange}
              placeholder='Descripción'
            />
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
