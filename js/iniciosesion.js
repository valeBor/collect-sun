document.addEventListener("DOMContentLoaded", function () {
    const btnIngresar = document.getElementById("btnIngresar");

    btnIngresar.addEventListener("click", function () {
        const usuario = document.getElementById("usuario").value.trim();

        if (usuario === "") {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Por favor, ingresá tu nombre de usuario'
            });
            return;
        }

        Swal.fire({
            icon: 'success',
            title: `Bienvenido, ${usuario}!`,
            text: 'Inicio de sesión exitoso.',
            confirmButtonText: 'Ir al inicio'
        }).then((result) => {
            if (result.isConfirmed) {
                window.location.href = "../index.html";
            }
        });
    });
});
