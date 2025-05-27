let carrito = [];

// Esperar a que el DOM esté listo
document.addEventListener("DOMContentLoaded", function () {
  const botones = document.querySelectorAll('.agregar-carrito');
  const aside = document.getElementById('carrito-aside');
  const contador = document.getElementById('contador-carrito');

  botones.forEach(boton => {
    boton.addEventListener('click', () => {
      const card = boton.closest('.card');
      const nombre = card.querySelector('.card-title').textContent;
      const precioTexto = card.querySelector('.precio').textContent.replace('$', '');
      const precio = parseFloat(precioTexto);

      carrito.push({ nombre, precio });
      actualizarCarrito();
    });
  });

  document.getElementById('toggle-carrito').addEventListener('click', () => {
    aside.classList.toggle('abierto');
  });

  document.getElementById('cerrar-carrito').addEventListener('click', () => {
    aside.classList.remove('abierto');
  });

  function actualizarCarrito() {
    const contenedor = document.getElementById('items-carrito');
    const total = document.getElementById('total-carrito');
    contenedor.innerHTML = '';
    let suma = 0;

    carrito.forEach(item => {
      suma += item.precio;
      contenedor.innerHTML += `
        <div class="mb-2 border-bottom pb-1 d-flex justify-content-between">
          <span>${item.nombre}</span>
          <span>$${item.precio.toFixed(2)}</span>
        </div>
      `;
    });

    total.textContent = suma.toFixed(2);
    contador.textContent = carrito.length;
  }
});
