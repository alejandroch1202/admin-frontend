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
  useToast
} from '@chakra-ui/react'
import axiosConfig from './../../../../config/axios'

const CreateCategory = ({
  isOpen,
  refresh,
  onClose,
  setRefresh
}: ICreateEntityModal) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [category, setCategory] = useState({
    name: ''
  })

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setCategory({ ...category, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validateForm = () => {
    const { name } = category
    if (name === '') {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axiosConfig.post('/expenses/categories', category)
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
        <ModalHeader>Agregar nueva categoría</ModalHeader>
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
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            isDisabled={validateForm()}
            isLoading={loading}
            onClick={handleSubmit}
            colorScheme='blue'
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

export default CreateCategory
