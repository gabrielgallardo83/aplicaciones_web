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
});