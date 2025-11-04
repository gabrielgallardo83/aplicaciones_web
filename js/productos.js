/*document.addEventListener("DOMContentLoaded", () => {
const api_token = 'patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f';
const base_id ='app6LcwG36qMbO4U9';
const tableName ='productos';


const airtableURL =`https://api.airtable.com/v0/${base_id}/${tableName}`;

const contenedor = document.getElementById("productos-container");

// con esta funcion me traigo y muestro los datos desde airtable
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

      // esto limpia el contenedor antes de agregar nuevos productos
      contenedor.innerHTML = "";

      // Itera sobre los registros de Airtable
      data.records.forEach((record) => {
        const producto = record.fields; // busco los campos reales en record.fields que es como estan en airtable

        const card = document.createElement("a");
        card.href = producto.enlace; 

        card.innerHTML = `
          <article class="producto">
            <img src="${producto.imagen?.[0]?.url}" alt="${producto.nombre}">
            <div class="producto-info">
              <h3>${producto.nombre}</h3>
              <p>${producto.descripcion}</p>
              <span class="precio">$${producto.precio}</span>
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


});*/

document.addEventListener("DOMContentLoaded", () => {
  const api_token = 'patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f';
  const base_id = 'app6LcwG36qMbO4U9';
  const tableName = 'productos';
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  const contenedor = document.getElementById("productos-container");
  const filtroForm = document.querySelector(".filtros form");
  const buscadorForm = document.querySelector(".buscador form");
  const buscadorInput = document.querySelector(".buscador input");

  let productos = [];

  // ---------- Función para normalizar texto ----------
  function normalizarTexto(texto) {
    return String(texto || "")
      .toLowerCase()
      .normalize("NFD") // elimina tildes
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[-_]+/g, " ") // convierte guiones o guiones bajos a espacios
      .replace(/\s+/g, " ")   // colapsa múltiples espacios
      .trim();
  }

  // ---------- Función para normalizar campos tipo array ----------
  function normalizeToArray(value) {
    if (!value) return [];
    if (Array.isArray(value)) {
      return value.filter(v => v != null).map(v => normalizarTexto(v));
    }
    return [normalizarTexto(value)];
  }

  // ---------- Traer productos desde Airtable ----------
  async function fetchAirtableData() {
    try {
      const response = await fetch(airtableURL, {
        headers: {
          "Authorization": `Bearer ${api_token}`,
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      productos = data.records.map(r => ({
  id: r.id,           // guardamos el id del registro
  ...r.fields          // y todos los campos
}));
      renderProductos(productos);
    } catch (error) {
      console.error("Error al obtener datos de Airtable:", error);
      contenedor.innerHTML = "<p>Error al cargar los productos.</p>";
    }
    console.log("Ejemplo de producto:", productos[0]);
  }

  // ---------- Renderizar productos ----------
  function renderProductos(lista) {
    contenedor.innerHTML = "";
    if (!lista || lista.length === 0) {
      contenedor.innerHTML = "<p>No se encontraron productos.</p>";
      return;
    }

    lista.forEach(producto => {
      const card = document.createElement("a");
      card.href = `producto.html?id=${producto.id}`;
       

      const imgUrl = producto.imagen?.[0]?.url;
      const nombre = producto.nombre;
      const descripcion = producto.descripcion;
      const precio = producto.precio;

      card.innerHTML = `
        <article class="producto">
          <img src="${imgUrl}" alt="${nombre}">
          <div class="producto-info">
            <h3>${nombre}</h3>
            <p>${descripcion}</p>
            <span class="precio">$${precio}</span>
          </div>
        </article>
      `;
      contenedor.appendChild(card);

      
    });
  }

  // ---------- Función de filtros y búsqueda ----------
  function aplicarFiltros() {
    const busqueda = normalizarTexto(buscadorInput.value);
    const tipoFiltro = normalizarTexto(filtroForm.tipo.value);
    const animalFiltro = normalizarTexto(filtroForm.animal.value);
    const tamanoFiltro = normalizarTexto(filtroForm.tamano.value);
    const edadFiltro = normalizarTexto(filtroForm.edad.value);

    const filtrados = productos.filter(p => {
      const nombre = normalizarTexto(p.nombre);
      const descripcion = normalizarTexto(p.descripcion);
      const tipos = normalizeToArray(p.tipo);
      const animales = normalizeToArray(p.animal);
      const tamanos = normalizeToArray(p.tamano);
      const edades = normalizeToArray(p.edad);

      const coincideTexto = !busqueda || nombre.includes(busqueda) || descripcion.includes(busqueda);
      const coincideTipo = !tipoFiltro || tipos.includes(tipoFiltro);
      const coincideAnimal = !animalFiltro || animales.includes(animalFiltro);
      const coincideTamano = !tamanoFiltro || tamanos.includes(tamanoFiltro);
      const coincideEdad = !edadFiltro || edades.includes(edadFiltro);

      return coincideTexto && coincideTipo && coincideAnimal && coincideTamano && coincideEdad;
    });

    renderProductos(filtrados);
  }

  // ---------- Eventos ----------
  filtroForm.addEventListener("submit", e => {
    e.preventDefault();
    aplicarFiltros();
  });

  filtroForm.addEventListener("reset", e => {
    e.preventDefault();
    filtroForm.reset();
    buscadorInput.value = "";
    renderProductos(productos);
  });

  buscadorForm.addEventListener("submit", e => {
    e.preventDefault();
    aplicarFiltros();
  });

  buscadorInput.addEventListener("input", () => {
    aplicarFiltros();
  });

  // ---------- Inicializar ----------
  fetchAirtableData();
});