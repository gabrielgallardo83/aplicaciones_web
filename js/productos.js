document.addEventListener("DOMContentLoaded", () => {
const productos = [
{
    nombre:"alimento_adulto_mayor_medianos_grandes",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mayor_medianos_grandes.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
  
    
},

{
    nombre:"alimento_adulto_todostamaños",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "950",
    imagen: "img/alimento_adulto_todostamaños.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_cachorro_mediano_grande",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1500",
    imagen: "img/alimento_cachorro_mediano_grande.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_cachorro_pequeño",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1500",
    imagen: "img/alimento_cachorro_pequeño.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_cachorro_todostamaños",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1500",
    imagen: "img/alimento_cachorro_todostamaños.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_adulto_mayor_pequeño",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mayor_pequeño.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_cachorro_grande",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_cachorro_grande.jpg",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_adulto_mayor_mediano",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mayor_mediano.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
},
{
    nombre:"alimento_adulto_mediano",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precio: "1200",
    imagen: "img/alimento_adulto_mediano.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro"
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



})