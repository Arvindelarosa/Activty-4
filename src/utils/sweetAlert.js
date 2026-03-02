import Swal from 'sweetalert2'

export function confirmDialog({ title = 'Are you sure?', text = '', icon = 'warning', confirmButtonText = 'Yes', cancelButtonText = 'No' }) {
  return Swal.fire({
    title,
    text,
    icon,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    background: document.body.classList.contains('dark-mode') ? '#343a40' : '#fff',
    color: document.body.classList.contains('dark-mode') ? '#fff' : '#000',
  })
}

export function alertSuccess(message) {
  return Swal.fire({
    icon: 'success',
    title: 'Success',
    text: message,
    background: document.body.classList.contains('dark-mode') ? '#343a40' : '#fff',
    color: document.body.classList.contains('dark-mode') ? '#fff' : '#000',
  })
}

export function alertError(message) {
  return Swal.fire({
    icon: 'error',
    title: 'Error',
    text: message,
    background: document.body.classList.contains('dark-mode') ? '#343a40' : '#fff',
    color: document.body.classList.contains('dark-mode') ? '#fff' : '#000',
  })
}
