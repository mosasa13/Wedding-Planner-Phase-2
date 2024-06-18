export default (text, color) => {
  Toastify({
    text,
    duration: 3000,
    gravity: "top",
    position: "right",
    stopOnFocus: true,
    backgroundColor: color,
  }).showToast();
};
