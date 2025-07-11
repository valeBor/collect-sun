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