import Swal from 'sweetalert2'

export const DeleteModal = () =>{
    Swal.fire({
        title: "Board deleted",
        text: "Your Board is deleted successfully",
        icon: "success",
        showClass: {
          popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
          `
        },
        hideClass: {
            popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
            `
        }
    })
}