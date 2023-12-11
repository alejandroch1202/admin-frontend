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

interface ICreateCow {
  isOpen: boolean
  refresh: boolean
  onClose: () => void
  setRefresh: (refresh: boolean) => void
}

const CreateCow = ({ isOpen, refresh, onClose, setRefresh }: ICreateCow) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [cow, setCow] = useState({
    identifier: '',
    type: '',
    purchaseWeight: '',
    purchasePrice: ''
  })

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setCow({ ...cow, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validateForm = () => {
    const { identifier, type, purchaseWeight, purchasePrice } = cow
    if (
      identifier === '' ||
      type === '' ||
      purchaseWeight === '' ||
      purchasePrice === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axiosConfig.post('/cows', cow)
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
            <FormLabel>Identificador</FormLabel>
            <Input
              name='identifier'
              onChange={handleChange}
              placeholder='Identificador'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Tipo</FormLabel>
            <Select
              name='type'
              onChange={handleChange}
              placeholder='Seleccionar'
            >
              <option value='Negro'>Negro</option>
              <option value='Rojo'>Rojo</option>
            </Select>
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Peso de compra</FormLabel>
            <Input
              name='purchaseWeight'
              onChange={handleChange}
              type='number'
              placeholder='Peso de compra'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Precio de compra</FormLabel>
            <Input
              name='purchasePrice'
              onChange={handleChange}
              type='number'
              placeholder='Precio de compra'
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

export default CreateCow
