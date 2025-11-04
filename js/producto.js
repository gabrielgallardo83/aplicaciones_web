/*document.addEventListener("DOMContentLoaded", async () => {
  const api_token = "patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f";
  const base_id = "app6LcwG36qMbO4U9";
  const tableName = "productos";
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  // Obtener el ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const productoId = params.get("id");

  if (!productoId) {
    document.querySelector(".producto-main").innerHTML = "<p>No se encontró el producto.</p>";
    return;
  }

  try {
    // Llamada a Airtable para ese producto específico
    const response = await fetch(`${airtableURL}/${productoId}`, {
      headers: {
        Authorization: `Bearer ${api_token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) throw new Error("No se pudo obtener el producto");

    const data = await response.json();
    const p = data.fields;

    // Seleccionar los elementos del DOM
    const imgContainer = document.querySelector(".producto-imagen img");
    const titulo = document.querySelector(".producto-info h2");
    const descripcion = document.querySelector(".producto-info p");

    // Cargar los datos del producto
    imgContainer.src = p.imagen?.[0]?.url || "img/placeholder.png";
    imgContainer.alt = p.nombre || "Producto sin nombre";
    titulo.textContent = p.nombre || "Sin nombre";
    descripcion.textContent = p.descripcion_detallada || "Sin descripción disponible.";

 
    if (p.precio) {
      const precioEl = document.createElement("span");
      precioEl.classList.add("precio-prod");
      precioEl.textContent = `$${p.precio}`;
      document.querySelector(".producto-info").appendChild(precioEl);
    }

  } catch (error) {
    console.error("Error al cargar producto:", error);
    document.querySelector(".producto-main").innerHTML =
      "<p>Error al cargar la información del producto.</p>";
  }
});*/

document.addEventListener("DOMContentLoaded", async () => {
  const api_token = "patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f";
  const base_id = "app6LcwG36qMbO4U9";
  const tableName = "productos";
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  // Obtener el ID del producto desde la URL
  const params = new URLSearchParams(window.location.search);
  const productoId = params.get("id");

  if (!productoId) {
    document.querySelector(".producto-main").innerHTML = "<p>No se encontró el producto.</p>";
    return;
  }

  let productoActual = null; // 👉 guardamos aquí el producto cargado

  try {
    // Llamada a Airtable para ese producto específico
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

    // Seleccionar los elementos del DOM
    const imgContainer = document.querySelector(".producto-imagen img");
    const titulo = document.querySelector(".producto-info h2");
    const descripcion = document.querySelector(".producto-info p");
    const infoContainer = document.querySelector(".producto-info");

    // Cargar los datos del producto
    imgContainer.src = productoActual.imagen;
    imgContainer.alt = productoActual.nombre;
    titulo.textContent = productoActual.nombre;
    descripcion.textContent = productoActual.descripcion;

    // Mostrar precio
    if (productoActual.precio) {
      const precioEl = document.createElement("span");
      precioEl.classList.add("precio-prod");
      precioEl.textContent = `$${productoActual.precio}`;
      infoContainer.appendChild(precioEl);
    }

    // ✳️ Agregar botón "Agregar al carrito" si no existe
    let btnAgregar = document.getElementById("agregar-carrito");
    if (!btnAgregar) {
      btnAgregar = document.createElement("button");
      btnAgregar.id = "agregar-carrito";
      btnAgregar.textContent = "Agregar al carrito 🛒";
      infoContainer.appendChild(btnAgregar);
    }

    // ✳️ Evento para agregar al carrito
    btnAgregar.addEventListener("click", () => {
      let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
      const existente = carrito.find(item => item.id === productoActual.id);

      if (existente) {
        existente.cantidad += 1;
      } else {
        carrito.push({ ...productoActual, cantidad: 1 });
      }

      localStorage.setItem("carrito", JSON.stringify(carrito));
      if (window.actualizarContadorCarrito) window.actualizarContadorCarrito();

      // ✳️ Animación o feedback visual
      btnAgregar.classList.add("agregado");
      btnAgregar.textContent = "✅ Agregado!";
      setTimeout(() => {
        btnAgregar.classList.remove("agregado");
        btnAgregar.textContent = "Agregar al carrito 🛒";
      }, 1500);
    });

    // ✳️ Animación suave al cargar la info
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