document.addEventListener("DOMContentLoaded", () => {
  const api_token = 'patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f';
  const base_id = 'app6LcwG36qMbO4U9';
  const tableName = 'ofertas';
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  const contenedor = document.getElementById("ofertas-container");

  // Traer y mostrar datos desde Airtable
  async function fetchAirtableData() {
    try {
      const response = await fetch(airtableURL, {
        headers: {
          "Authorization": `Bearer ${api_token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log("Productos desde Airtable:", data);

      contenedor.innerHTML = "";

      data.records.forEach((record) => {
        const producto = record.fields;

        // 🔹 Usa el ID del registro, no del campo
        const card = document.createElement("a");
        card.href = `producto.html?id=${record.id}`;
        card.classList.add("producto-card");

        card.innerHTML = `
          <article class="producto fade-in">
            <img src="${producto.imagen?.[0]?.url || 'img/placeholder.png'}" alt="${producto.nombre || ''}">
            <div class="producto-info">
              <h3>${producto.nombre || 'Sin nombre'}</h3>
              <p>${producto.descripcion || ''}</p>
              <span class="precio-tachado">$${producto.precio || ''}</span><br>
              <span class="precio">$${producto.precio_oferta || ''}</span>
            </div>
          </article>
        `;

        contenedor.appendChild(card);
      });
    } catch (error) {
      console.error("Error al obtener datos de Airtable:", error);
      contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
    }
  }

  fetchAirtableData();
});