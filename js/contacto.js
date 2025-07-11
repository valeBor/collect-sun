
    const form = document.getElementById('form-contacto');

    form.addEventListener('submit', function(e) {
        e.preventDefault(); 
        
        setTimeout(() => {
            
            Swal.fire({
                icon: 'success',
                title: 'Mensaje enviado',
                text: 'Su mensaje ha sido enviado con éxito.',
                confirmButtonText: 'Aceptar'
            });

            form.reset(); 
        }, 300);
    });