import { useState } from 'react'
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast
} from '@chakra-ui/react'
import axiosConfig from './../../../config/axios'

const DeleteExpense = ({
  isOpen,
  entityId,
  refresh,
  onClose,
  setRefresh
}: IDeleteEntityModal) => {
  const toast = useToast()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    setLoading(true)
    try {
      await axiosConfig.delete(`/expenses/${entityId}`)
      toast({
        title: 'Éxito',
        description: 'Se ha eliminado correctamente',
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
        <ModalHeader>Eliminar</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Text>¿Seguro que lo quires eliminar?</Text>
        </ModalBody>

        <ModalFooter>
          <Button
            type='submit'
            isLoading={loading}
            onClick={handleSubmit}
            colorScheme='red'
            mr={3}
          >
            Eliminar
          </Button>
          <Button onClick={onClose}>Cancelar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default DeleteExpense
