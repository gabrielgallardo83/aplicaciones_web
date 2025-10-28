document.addEventListener("DOMContentLoaded", () => {
const api_token = 'patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f';
const base_id ='app6LcwG36qMbO4U9';
const tableName ='productos';


const airtableURL =`https://api.airtable.com/v0/${base_id}/${tableName}`;
/*
const productos = [
{
    nombre:"alimento_adulto_mayor_medianos_grandes",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mayor_medianos_grandes.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"mayor",
    tamano:["mediano","grande"]
  
    
},

{
    nombre:"alimento_adulto_todostamaños",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "950",
    imagen: "img/alimento_adulto_todostamaños.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad: "adulto",
    tamano: ["pequeño", "mediano", "grande"]
},
{
    nombre:"alimento_cachorro_mediano_grande",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1500",
    imagen: "img/alimento_cachorro_mediano_grande.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad: "cachorro",
    tamano:["mediano","grande"]
},
{
    nombre:"alimento_cachorro_pequeño",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1500",
    imagen: "img/alimento_cachorro_pequeño.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"cachorro",
    tamano: ["pequeño"]

},
{
    nombre:"alimento_cachorro_todostamaños",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1500",
    imagen: "img/alimento_cachorro_todostamaños.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"cachorro",
    tamano: ["pequeño", "mediano", "grande"]
},
{
    nombre:"alimento_adulto_mayor_pequeño",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mayor_pequeño.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"mayor",
    tamano: ["pequeño"]
},
{
    nombre:"alimento_cachorro_grande",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_cachorro_grande.jpg",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"cachorro",
    tamano: ["grande"]
},
{
    nombre:"alimento_adulto_mayor_mediano",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mayor_mediano.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"mayor",
    tamano: ["mediano"]
},
{
    nombre:"alimento_adulto_mediano",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mediano.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"adulto",
    tamano: ["mediano"]
},


];

const contenedor = document.getElementById("productos-container")

productos.forEach(producto => {
    const card = document.createElement("a");
    card.href = producto.enlace;

    card.innerHTML= `
      <article class="producto">
          <img src="${producto.imagen}" alt="${producto.nombre}">
          <div class="producto-info">
            <h3>${producto.nombre}</h3>
            <p>${producto.descripcion}</p>
            <span class="precio">$${producto.precio}</span>
          </div>
      </article>
    `;

    contenedor.appendChild(card)
})




async function fetchAirtableData() {
    try {
        const response = await fetch(airtableURL, {
            headers : {
                "Authorization": `Bearer ${api_token}`,
                "Content-Type": "application/json"
               
    }

});
        const data = await response.json();
        console.log('productos de Airtable:', data);
}
    catch (error) {
        console.error('Error al obtener datos de Airtable:', error);
    }

}
fetchAirtableData();
*/
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


});