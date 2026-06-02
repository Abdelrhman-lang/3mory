import Swal from "sweetalert2";

export const showToast = (icon, title) => {
  Swal.fire({
    icon: icon,
    title: title,
    position: "top-end",
    timer: 1500,
    showConfirmButton: false,
    toast: true,
  });
};
