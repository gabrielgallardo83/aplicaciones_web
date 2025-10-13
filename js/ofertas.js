document.addEventListener("DOMContentLoaded", () => {
const ofertas = [
{
    nombre:"alimento_adulto_mayor_mediano",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precioAnterior: "1200",
    precioActual:"600",
    imagen: "img/alimento_adulto_mayor_mediano.png",
    enlace:"producto.html",
    tipo: "alimento",
    animal:"perro",
    edad:"mayor",
    tamano: ["mediano"]
},

{
    nombre:"alimento_adulto_todostamaños",
    descripcion: "Alimento rico en proteína animal de alto valor biológico, contiene minerales como calcio, fósforo, potasio y hierro, vitaminas A, D y E.",
    precioAnterior: "1200",
    precioActual:"600",
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
    precioAnterior: "1200",
    precioActual:"600",
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
    precioAnterior: "1200",
    precioActual:"600",
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
    precioAnterior: "1200",
    precioActual:"600",
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
    precioAnterior: "1200",
    precioActual:"600",
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
   precioAnterior: "1200",
    precioActual:"600",
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
   precioAnterior: "1200",
    precioActual:"600",
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
   precioAnterior: "1200",
    precioActual:"600",
    imagen: "img/alimento_adulto_mediano.png",
    enlace:"producto.html",
   tipo: "alimento",
    animal:"perro",
    edad:"adulto",
    tamano: ["mediano"]
},


];

const contenedor = document.getElementById("ofertas-container")

ofertas.forEach(oferta => {
    const card = document.createElement("a");
    card.href = oferta.enlace;

    card.innerHTML= `
      <article class="producto">
          <img src="${oferta.imagen}" alt="${oferta.nombre}">
          <div class="producto-info">
            <h3>${oferta.nombre}</h3>
            <p>${oferta.descripcion}</p>
            <span class="precio-tachado">$${oferta.precioAnterior}</span><br>
          <span class="precio">$${oferta.precioActual}</span>
          </div>
      </article>
    `;

    contenedor.appendChild(card)
})

})