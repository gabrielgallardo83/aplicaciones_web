document.addEventListener("DOMContentLoaded", async () => {
  const api_token = "patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f";
  const base_id = "app6LcwG36qMbO4U9";
  const tableName = "productos";
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  // traigo el id del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const productoId = params.get("id");

  if (!productoId) {
    document.querySelector(".producto-main").innerHTML = "<p>No se encontró el producto.</p>";
    return;
  }

  let productoActual = null;

  try {
    // llamada a airtable
    const response = await fetch(`${airtableURL}/${productoId}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("No se pudo obtener el producto");

    const data = await response.json();
    const p = data.fields;
    productoActual = {
      id: productoId,
      nombre: p.nombre || "Sin nombre",
      descripcion: p.descripcion_detallada || "Sin descripción disponible.",
      precio: p.precio || 0,
      imagen: p.imagen?.[0]?.url || "img/placeholder.png",
    };

    // elementos del dom
    const imgContainer = document.querySelector(".producto-imagen img");
    const titulo = document.querySelector(".producto-info h2");
    const descripcion = document.querySelector(".producto-info p");
    const infoContainer = document.querySelector(".producto-info");

    // cargo datos
    imgContainer.src = productoActual.imagen;
    imgContainer.alt = productoActual.nombre;
    titulo.textContent = productoActual.nombre;
    descripcion.textContent = productoActual.descripcion;

    // muestro precio
    if (productoActual.precio) {
      const precioEl = document.createElement("span");
      precioEl.classList.add("precio-prod");
      precioEl.textContent = `$${productoActual.precio}`;
      infoContainer.appendChild(precioEl);
    }

    // botón  para agregar
    let btnAgregar = document.getElementById("agregar-carrito");
    if (!btnAgregar) {
      btnAgregar = document.createElement("button");
      btnAgregar.id = "agregar-carrito";
      btnAgregar.textContent = "Agregar al carrito";
      infoContainer.appendChild(btnAgregar);
    }

    //  input de cantidad
    const inputCantidad = document.getElementById("cantidad");

    //  agregar al carrito
    btnAgregar.addEventListener("click", () => {
      const cantidadSeleccionada = parseInt(inputCantidad.value) || 1;
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

      const existente = carrito.find(item => item.id === productoActual.id);

      if (existente) {
        existente.cantidad += cantidadSeleccionada;
      } else {
        carrito.push({ ...productoActual, cantidad: cantidadSeleccionada });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));

      if (window.actualizarContadorCarrito) window.actualizarContadorCarrito();

      // confirmación visual
      btnAgregar.classList.add("agregado");
      btnAgregar.textContent = "Agregado!";
      setTimeout(() => {
        btnAgregar.classList.remove("agregado");
        btnAgregar.textContent = "Agregar al carrito";
      }, 1500);
    });

    // animación de cargar
    const main = document.querySelector(".producto-main");
    main.style.opacity = 0;
    main.style.transition = "opacity 0.8s ease";
    setTimeout(() => {
      main.style.opacity = 1;
    }, 100);

  } catch (error) {
    console.error("Error al cargar producto:", error);
    document.querySelector(".producto-main").innerHTML =
      "<p>Error al cargar la información del producto.</p>";
  }
});