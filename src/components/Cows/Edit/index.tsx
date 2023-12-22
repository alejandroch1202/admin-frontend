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
  Spinner,
  Text,
  useDisclosure,
  useToast
} from '@chakra-ui/react'
import axiosConfig from '../../../config/axios'
import Layout from '../../../layout'

const EditCow = ({
  isOpen,
  refresh,
  onClose,
  setRefresh
}: ICreateEntityModal) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const toast = useToast()
  const [loading, setLoading] = useState(false)
  const [cow, setCow] = useState<ICow>()
  const {
    isOpen: isOpenConfirm,
    onOpen: onOpenConfirm,
    onClose: onCloseConfirm
  } = useDisclosure()

  const getCow = async () => {
    const cow = await axiosConfig.get(`/cows/${id}`)
    setCow(cow.data.data)
  }

  useEffect(() => {
    getCow()
  }, [])

  const handleChange = (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLSelectElement>
  ) => {
    if (cow === undefined) {
      return
    }

    setCow({ ...cow, [e.currentTarget.name]: e.currentTarget.value })
  }

  const validateForm = () => {
    if (cow === undefined) {
      return
    }

    const {
      identifier,
      purchaseDate,
      purchaseWeight,
      purchasePrice,
      currentWeight
    } = cow
    if (
      identifier === '' ||
      String(purchaseDate) === '' ||
      purchaseWeight === 0 ||
      String(purchaseWeight) === '' ||
      purchasePrice === 0 ||
      String(purchasePrice) === '' ||
      currentWeight === 0 ||
      String(currentWeight) === ''
    ) {
      return true
    } else {
      return false
    }
  }

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axiosConfig.put(`/cows/${id}`, cow)
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
      navigate('/cows')
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
      navigate('/cows')
    }
  }

  const handleClose = () => {
    onClose()
    navigate('/cows')
  }

  if (cow === undefined) {
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
            <FormLabel>Código</FormLabel>
            <Input
              defaultValue={cow.identifier}
              name='identifier'
              onChange={handleChange}
              placeholder='Código'
            />
          </FormControl>

          {/* <FormControl mt={4}>
            <FormLabel>Tipo</FormLabel>
            <Select
              defaultValue={cow.type}
              name='type'
              onChange={handleChange}
              placeholder='Seleccionar'
            >
              <option value='Negro'>Negro</option>
              <option value='Rojo'>Rojo</option>
            </Select>
          </FormControl> */}

          <FormControl mt={4}>
            <FormLabel>Fecha de compra</FormLabel>
            <Input
              value={
                String(cow.purchaseDate) !== ''
                  ? new Date(cow.purchaseDate).toISOString().split('T')[0]
                  : ''
              }
              name='purchaseDate'
              size='md'
              type='date'
              max={new Date().toISOString().split('T')[0]}
              onChange={handleChange}
              placeholder='Fecha de compra'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Peso de compra </FormLabel>
            <Input
              defaultValue={cow.purchaseWeight}
              name='purchaseWeight'
              onChange={handleChange}
              type='number'
              placeholder='Peso de compra'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Precio de compra</FormLabel>
            <Input
              defaultValue={cow.purchasePrice}
              name='purchasePrice'
              onChange={handleChange}
              type='number'
              placeholder='Precio de compra'
            />
          </FormControl>

          <FormControl mt={4}>
            <FormLabel>Peso actual</FormLabel>
            <Input
              defaultValue={cow.currentWeight}
              name='currentWeight'
              onChange={handleChange}
              type='number'
              placeholder='Peso actual'
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

export default EditCow
