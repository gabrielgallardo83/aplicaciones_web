document.addEventListener("DOMContentLoaded", () => {
  const contador = document.querySelector(".carrito-contador");

  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const totalItems = carrito.reduce((acc, p) => acc + (p.cantidad || 1), 0);
    if (contador) contador.textContent = totalItems;
  }

  // Actualiza al cargar la página
  actualizarContador();

  // Escucha cambios en localStorage desde otras páginas
  window.addEventListener("storage", actualizarContador);

  // Exponer función global (para usar en producto.js)
  window.actualizarContadorCarrito = actualizarContador;
});