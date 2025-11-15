document.addEventListener("DOMContentLoaded", () => {
  const contador = document.querySelector(".carrito-contador");

  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    if (contador) contador.textContent = totalItems;
  }

  // actualiza al cargar la página
  actualizarContador();

  // escucha cambios en localStorage desde otras páginas
  window.addEventListener("storage", actualizarContador);

  // exponer función global (para usar en producto.js)
  window.actualizarContadorCarrito = actualizarContador;
});