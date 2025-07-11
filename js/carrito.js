let carrito = [];

document.addEventListener("DOMContentLoaded", function () {
  const aside = document.getElementById('carrito-aside');
  const contador = document.getElementById('contador-carrito');
  const botones = document.querySelectorAll('.agregar-carrito');
  const finalizar = document.getElementById('finalizar-compra');

  // Cargar carrito del localStorage
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    actualizarCarrito();
  }

  // Verificar si hay productos para agregar
  if (botones.length > 0) {
    botones.forEach(boton => {
      boton.addEventListener('click', () => {
        const card = boton.closest('.card');
        const nombre = card.querySelector('.card-title').textContent;
        const precioTexto = card.querySelector('.precio').textContent.replace('$', '').replace('.', '').replace(',', '.');
        const precio = parseFloat(precioTexto);
        const imagen = card.querySelector('img').src;

        const existente = carrito.find(item => item.nombre === nombre);
        if (existente) {
          existente.cantidad += 1;
        } else {
          carrito.push({ nombre, precio, imagen, cantidad: 1 });
        }

        actualizarCarrito();
      });
    });
  }

  // Botones toggle y cerrar (solo si existen)
  const toggleBtn = document.getElementById('toggle-carrito');
  const cerrarBtn = document.getElementById('cerrar-carrito');

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      aside.classList.toggle('abierto');
    });
  }

  if (cerrarBtn) {
    cerrarBtn.addEventListener('click', () => {
      aside.classList.remove('abierto');
    });
  }

  if (finalizar) {
    finalizar.addEventListener('click', () => {
      if (carrito.length === 0) {
        Swal.fire('Carrito vacío', 'Agregá productos antes de finalizar la compra.', 'warning');
        return;
      }

      const numeroOrden = Math.floor(Math.random() * 90000 + 10000);
      Swal.fire({
        icon: 'success',
        title: '¡Gracias por tu compra!',
        html: `Tu número de orden es <strong>#${numeroOrden}</strong>`,
        confirmButtonText: 'Aceptar'
      });

      carrito = [];
      localStorage.removeItem('carrito');
      actualizarCarrito();
    });
  }

  // Función común para todas las páginas
  function actualizarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    const total = document.getElementById('total-carrito');

    let suma = 0;
    let cantidadTotal = 0;

    if (contenedor) contenedor.innerHTML = '';

    carrito.forEach((item, index) => {
      suma += item.precio * item.cantidad;
      cantidadTotal += item.cantidad;

      if (contenedor) {
        contenedor.innerHTML += `
          <div class="mb-3 border-bottom pb-2 d-flex">
            <img src="${item.imagen}" width="60" height="60" class="me-2 rounded" />
            <div class="flex-grow-1">
              <strong>${item.nombre}</strong><br>
              <span>$${item.precio.toFixed(2)}</span><br>
              <select class="form-select form-select-sm mt-1 cantidad-select" data-index="${index}">
                ${[...Array(10)].map((_, i) => `<option value="${i+1}" ${item.cantidad === (i+1) ? 'selected' : ''}>${i+1}</option>`).join('')}
              </select>
            </div>
            <button class="btn-eliminar eliminar-item" data-index="${index}">✕</button>

          </div>
        `;
      }
    });

    if (total) total.textContent = suma.toLocaleString('es-AR', { minimumFractionDigits: 2 });
    if (contador) contador.textContent = cantidadTotal;

    localStorage.setItem('carrito', JSON.stringify(carrito));

    // Solo si hay productos en la página
    if (document.querySelectorAll('.cantidad-select').length > 0) {
      document.querySelectorAll('.cantidad-select').forEach(select => {
        select.addEventListener('change', e => {
          const index = e.target.dataset.index;
          carrito[index].cantidad = parseInt(e.target.value);
          actualizarCarrito();
        });
      });

      document.querySelectorAll('.eliminar-item').forEach(btn => {
        btn.addEventListener('click', e => {
          const index = e.target.dataset.index;
          carrito.splice(index, 1);
          actualizarCarrito();
        });
      });
    }
  }
});

