const form = document.getElementById('form-registro');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        setTimeout(() => {
            
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: 'Se ha registrado con éxito.',
                confirmButtonText: 'Aceptar'
            });

            form.reset(); 
        }, 300);
    });

    document.getElementById("form-registro").addEventListener("input", function (e) {
        const soloNumeros = ["registro_dni", "registro_telefono"];
        if (soloNumeros.includes(e.target.name)) {
            e.target.value = e.target.value.replace(/\D/g, ""); 
        }
    });

