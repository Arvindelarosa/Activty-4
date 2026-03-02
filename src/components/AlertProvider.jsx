import { Alert, Modal, Button } from 'react-bootstrap'
import { useState } from 'react'

export function useAlert() {
  const [alerts, setAlerts] = useState([])
  const [modal, setModal] = useState({ show: false, title: '', message: '', type: 'info' })

  const showAlert = (message, type = 'info', duration = 4000) => {
    const id = Date.now()
    setAlerts(prev => [...prev, { id, message, type }])
    
    if (duration) {
      setTimeout(() => {
        setAlerts(prev => prev.filter(alert => alert.id !== id))
      }, duration)
    }
  }

  const showModal = (title, message, type = 'info') => {
    setModal({ show: true, title, message, type })
  }

  const closeModal = () => {
    setModal({ ...modal, show: false })
  }

  const AlertComponent = () => (
    <div className="alert-container">
      {alerts.map(alert => (
        <Alert
          key={alert.id}
          variant={alert.type === 'error' ? 'danger' : alert.type}
          dismissible
          onClose={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
          className="animated-alert"
        >
          {alert.message}
        </Alert>
      ))}
    </div>
  )

  const ModalComponent = () => (
    <Modal show={modal.show} onHide={closeModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{modal.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant={modal.type === 'error' ? 'danger' : modal.type} className="mb-0">
          {modal.message}
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  )

  return {
    showAlert,
    showModal,
    closeModal,
    AlertComponent,
    ModalComponent
  }
}
