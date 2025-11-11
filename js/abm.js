document.addEventListener("DOMContentLoaded", () => {
  const api_token = 'patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f';
  const base_id = 'app6LcwG36qMbO4U9';
  const tableName = 'productos';
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  const tablaBody = document.querySelector("#tabla-productos tbody");
  const form = document.getElementById("form-producto");
  const formTitulo = document.getElementById("form-titulo");

  const idInput = document.getElementById("producto-id");
  const nombreInput = document.getElementById("nombre");
  const descripcionInput = document.getElementById("descripcion");
  const precioInput = document.getElementById("precio");

  // me traigo los productos desde airtable
  async function cargarProductos() {
    try {
      const response = await fetch(airtableURL, {
        headers: { Authorization: `Bearer ${api_token}` }
      });
      const data = await response.json();
      renderTabla(data.records);
    } catch (error) {
      console.error("Error al cargar productos:", error);
    }
  }

  // renderizo la tabla
  function renderTabla(records) {
    tablaBody.innerHTML = "";
    records.forEach(record => {
      const p = record.fields;
      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre || "-"}</td>
        <td>${p.descripcion || "-"}</td>
        <td>$${p.precio || "-"}</td>
        <td>
          <button class="btn-editar" data-id="${record.id}">Editar</button>
          <button class="btn-eliminar" data-id="${record.id}">Eliminar</button>
        </td>
      `;
      tablaBody.appendChild(fila);
    });
  }

  // creo o actualizo productos
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const id = idInput.value;
    const producto = {
      fields: {
        nombre: nombreInput.value,
        descripcion: descripcionInput.value,
        precio: parseFloat(precioInput.value)
      }
    };

    try {
      if (id) {
        //  Actualizar 
        await fetch(`${airtableURL}/${id}`, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${api_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });
      } else {
        //  Crear 
        await fetch(airtableURL, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${api_token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(producto),
        });
      }
      form.reset();
      idInput.value = "";
      formTitulo.textContent = "Agregar nuevo producto";
      cargarProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  });

  // para editar un producto
  tablaBody.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-editar")) {
      const id = e.target.dataset.id;
      editarProducto(id);
    }
  });

  async function editarProducto(id) {
    try {
      const response = await fetch(`${airtableURL}/${id}`, {
        headers: { Authorization: `Bearer ${api_token}` },
      });
      const data = await response.json();
      const p = data.fields;
      idInput.value = id;
      nombreInput.value = p.nombre || "";
      descripcionInput.value = p.descripcion || "";
      precioInput.value = p.precio || "";
      formTitulo.textContent = "Editar producto";
    } catch (error) {
      console.error("Error al editar producto:", error);
    }
  }

  // para eliminar un producto
  tablaBody.addEventListener("click", async (e) => {
    if (e.target.classList.contains("btn-eliminar")) {
      const id = e.target.dataset.id;
      if (confirm("¿Seguro que deseas eliminar este producto?")) {
        try {
          await fetch(`${airtableURL}/${id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${api_token}` },
          });
          cargarProductos();
        } catch (error) {
          console.error("Error al eliminar producto:", error);
        }
      }
    }
  });

  // inicializo
  cargarProductos();
});