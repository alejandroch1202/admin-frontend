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
import axiosConfig from './../../../config/axios'

const CreateCow = ({
  isOpen,
  refresh,
  onClose,
  setRefresh
}: ICreateEntityModal) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [cow, setCow] = useState({
    date: '',
    code: '',
    initialWeight: '',
    purchasePrice: '',
    currentWeight: ''
  })

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    setCow({ ...cow, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validateForm = () => {
    const { date, code, initialWeight, purchasePrice } = cow
    if (
      date === '' ||
      code === '' ||
      initialWeight === '' ||
      purchasePrice === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    cow.date = new Date(cow.date).toISOString()
    cow.currentWeight = cow.initialWeight

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
          {/* <FormControl mt={4}>
            <FormLabel>Tipo</FormLabel>
            <Select
              name='type'
              onChange={handleChange}
              placeholder='Seleccionar'
            >
              <option value='Negro'>Negro</option>
              <option value='Rojo'>Rojo</option>
            </Select>
          </FormControl> */}

          <FormControl>
            <FormLabel>Fecha de compra</FormLabel>
            <Input
              name='date'
              size='md'
              type='date'
              max={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
              placeholder='Fecha de compra'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Código</FormLabel>
            <Input
              name='code'
              type='text'
              onChange={handleChange}
              placeholder='Código'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Peso de compra</FormLabel>
            <Input
              name='initialWeight'
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
