document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.querySelector(".carrito-tabla tbody");
  const totalEl = document.querySelector(".carrito-total h3");

  // carrito desde el localstorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // boton vaciar
  const btnVaciar = document.createElement("button");
  btnVaciar.textContent = "Vaciar carrito ";
  btnVaciar.classList.add("btn-vaciar");
  document.querySelector(".carrito-main").insertBefore(btnVaciar, document.querySelector(".carrito-total"));



  // armo el modal
  const modalHTML = `
    <div id="modal-confirmacion" class="modal hidden">
      <div class="modal-content">
        <h3>¿Seguro que deseas vaciar el carrito?</h3>
        <p>Se eliminarán todos los productos agregados.</p>
        <div class="modal-buttons">
          <button id="confirmar-vaciar" class="btn btn-confirmar">Sí, vaciar</button>
          <button id="cancelar-vaciar" class="btn btn-cancelar">Cancelar</button>
        </div>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);

  const modal = document.getElementById("modal-confirmacion");
  const btnConfirmar = document.getElementById("confirmar-vaciar");
  const btnCancelar = document.getElementById("cancelar-vaciar");

  // muestro el modal para vaciar
  btnVaciar.addEventListener("click", () => {
    modal.classList.remove("hidden");
  });

  // confirmo vaciar
  btnConfirmar.addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    renderCarrito();
    if (window.actualizarContadorCarrito) window.actualizarContadorCarrito();
    modal.classList.add("hidden");
  });

  //  cancelo vaciar
  btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // renderizo los productos del carrito
  function renderCarrito() {
    tbody.innerHTML = "";

    if (carrito.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">Tu carrito está vacío </td></tr>`;
      totalEl.textContent = "Total: $0";
      if (window.actualizarContadorCarrito) window.actualizarContadorCarrito();
      return;
    }

    carrito.forEach((p, index) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>
          <img src="${p.imagen}" alt="${p.nombre}" class="carrito-img">
          <span>${p.nombre}</span>
        </td>
        <td>
          <input type="number" min="1" value="${p.cantidad}" data-index="${index}" class="cantidad-input">
        </td>
        <td>$${p.precio}</td>
        <td>$${(p.precio * p.cantidad).toFixed(2)}</td>  
        <td>
          <button class="btn-eliminar" data-index="${index}">
            <span class="material-symbols-outlined">delete</span>
          </button>
        </td>
      `;
      tbody.appendChild(fila);
    });

    actualizarTotal();
  }

  // calculo total
  function actualizarTotal() {
    const total = carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
    totalEl.textContent = `Total: $${total.toFixed(2)}`;
  }

  // actualizo cantidad
  tbody.addEventListener("input", (e) => {
    if (e.target.classList.contains("cantidad-input")) {
      const index = e.target.dataset.index;
      carrito[index].cantidad = parseInt(e.target.value) || 1;
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }
  });

  // elimino producto
  tbody.addEventListener("click", (e) => {
    if (e.target.closest(".btn-eliminar")) {
      const index = e.target.closest(".btn-eliminar").dataset.index;
      carrito.splice(index, 1);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      renderCarrito();
    }
  });

  

  // Inicializo 
  renderCarrito();
});