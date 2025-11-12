document.addEventListener("DOMContentLoaded", () => {
  const api_token = "patOlS7JsY5IwRZbo.4ed56b02ababa76df4bc61f96f8106d42b1245d0652a50e536aa8297af9c223f";
  const base_id = "app6LcwG36qMbO4U9";
  const tableName = "productos";
  const airtableURL = `https://api.airtable.com/v0/${base_id}/${tableName}`;

  const tabla = document.querySelector("#tabla-productos tbody");
  const modal = document.getElementById("modal-producto");
  const form = document.getElementById("form-producto");
  const btnNuevo = document.getElementById("btn-agregar");
  const btnCancelar = document.getElementById("cancelar-modal");
  const modalTitle = document.getElementById("modal-title");

  let productos = [];
  let editarId = null;

//para subir imagenes a airtable
async function uploadToImgBB(file) {
  const apiKey = "7f5c4d43cc2e8e9dd86840250c39ec77"; 
  const formData = new FormData();
  formData.append("image", file);

  const res = await fetch(`https://api.imgbb.com/1/upload?key=${apiKey}`, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!data.success) throw new Error("Error al subir la imagen a ImgBB");
  return data.data.url; // devuelve la URL pública
}






  // me traigo los productos
  async function fetchProductos() {
    try {
      const res = await fetch(airtableURL, {
        headers: { "Authorization": `Bearer ${api_token}` }
      });
      const data = await res.json();
      productos = data.records;
      renderTabla();
    } catch (error) {
      console.error("Error al traer productos:", error);
    }
  }

  // renderizo la tabla
  function renderTabla() {
    tabla.innerHTML = "";
    productos.forEach(p => {
      const fields = p.fields;
      const tr = document.createElement("tr");
      tr.innerHTML = `
  <td>${fields.imagen?.[0]?.url ? `<img src="${fields.imagen[0].url}" width="60" alt="imagen producto">` : ""}</td>
  <td>${fields.nombre || ""}</td>
  <td>${fields.tipo || ""}</td>
  <td>${fields.animal || ""}</td>
  <td>${fields.edad ? fields.edad.join(", ") : ""}</td>
  <td>${fields.tamano ? fields.tamano.join(", ") : ""}</td>
  <td>${fields.precio || ""}</td>
  <td>${fields.precio_oferta || ""}</td>
  <td>${fields.stock || ""}</td>
  <td>
    <button class="btn-editar" data-id="${p.id}">
      <i class="fas fa-edit"></i>
    </button>
    <button class="btn-eliminar" data-id="${p.id}">
      <i class="fas fa-trash-alt"></i>
    </button>
  </td>
`;
      tabla.appendChild(tr);
    });
  }

  // muestro el modal
  btnNuevo.addEventListener("click", () => {
    editarId = null;
    form.reset();
    modalTitle.textContent = "Nuevo Producto";
    modal.classList.remove("hidden");
  });

  btnCancelar.addEventListener("click", () => {
    modal.classList.add("hidden");
  });

  // guardo y edito
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // campos normales
    const data = {
      fields: {
        nombre: formData.get("nombre"),
        tipo: formData.get("tipo"),
        animal: formData.get("animal"),
        edad: formData.get("edad") === "todas" ? ["cachorro","adulto","adulto mayor"] : [formData.get("edad")],
        tamano: formData.get("tamano") === "todas" ? ["pequeno","mediano","grande"] : [formData.get("tamano")],
        precio: parseFloat(formData.get("precio")),
        precio_oferta: parseFloat(formData.get("precio_oferta")) || 0,
        stock: parseInt(formData.get("stock")),
        descripcion: formData.get("descripcion"),
        descripcion_detallada: formData.get("descripcion_detallada"),
        enlace: "producto.html"
      }
    };


  


    // imagen

  const archivo = formData.get("imagen");
if (archivo && archivo.size > 0) {
  try {
    const imageUrl = await uploadToImgBB(archivo);
    data.fields.imagen = [{ url: imageUrl }];
  } catch (error) {
    console.error("Error subiendo imagen:", error);
    alert("No se pudo subir la imagen. Verificá tu conexión o API key.");
    return;
  }
}
    

    try {

      console.log("DATA ENVIADA A AIRTABLE:", JSON.stringify(data, null, 2));  // debugeando el formulario de creacion de productos
      if (editarId) {
        // Editar
        await fetch(`${airtableURL}/${editarId}`, {
          method: "PATCH",
          headers: {
            "Authorization": `Bearer ${api_token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
      } else {
        // Crear
        await fetch(airtableURL, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${api_token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        });
      }
      modal.classList.add("hidden");
      fetchProductos();
    } catch (error) {
      console.error("Error al guardar producto:", error);
    }
  });

  //  Editar 
   tabla.addEventListener("click", (e) => {
    const btnEditar = e.target.closest(".btn-editar");
    const btnEliminar = e.target.closest(".btn-eliminar");

   
    if (btnEditar) {
      const id = btnEditar.dataset.id;
      editarId = id;
      const p = productos.find(p => p.id === id).fields;

      form.nombre.value = p.nombre || "";
      form.tipo.value = p.tipo || "";
      form.animal.value = p.animal || "";
      form.edad.value = p.edad?.[0] || "";
      form.tamano.value = p.tamano?.[0] || "";
      form.precio.value = p.precio || "";
      form.precio_oferta.value = p.precio_oferta || "";
      form.stock.value = p.stock || "";
      form.descripcion.value = p.descripcion || "";
      form.descripcion_detallada.value = p.descripcion_detallada || "";

      modalTitle.textContent = "Editar Producto";
      modal.classList.remove("hidden");
    }

    // Eliminar
    if (btnEliminar) {
      const id = btnEliminar.dataset.id;
      mostrarToastConfirmacion(id);
    }
  });

  // Toast de confirmación de eliminación
  function mostrarToastConfirmacion(id) {
    const toast = document.getElementById("toast-confirmacion");
    const btnConfirmar = document.getElementById("toast-confirmar");
    const btnCancelar = document.getElementById("toast-cancelar");

    toast.classList.remove("hidden");
    setTimeout(() => toast.classList.add("show"), 10);

    const cerrarToast = () => {
      toast.classList.remove("show");
      setTimeout(() => toast.classList.add("hidden"), 400);
    };

    btnCancelar.onclick = cerrarToast;

    btnConfirmar.onclick = async () => {
      try {
        await fetch(`${airtableURL}/${id}`, {
          method: "DELETE",
          headers: { "Authorization": `Bearer ${api_token}` }
        });
        cerrarToast();
        fetchProductos();
        mostrarNotificacion("Producto eliminado correctamente", "exito");
      } catch (error) {
        cerrarToast();
        mostrarNotificacion("Error al eliminar el producto", "error");
      }
    };
  }

  //  Notificación tipo toast
  function mostrarNotificacion(mensaje, tipo = "info") {
    const notificacion = document.getElementById("notificacion");
    const msg = document.getElementById("notificacion-mensaje");

    msg.textContent = mensaje;

    notificacion.className = `notificacion ${tipo}`;
    notificacion.classList.remove("hidden");
    setTimeout(() => notificacion.classList.add("show"), 10);

    setTimeout(() => {
      notificacion.classList.remove("show");
      setTimeout(() => notificacion.classList.add("hidden"), 400);
    }, 3000);
  }

  //  Inicializar
  fetchProductos();
});