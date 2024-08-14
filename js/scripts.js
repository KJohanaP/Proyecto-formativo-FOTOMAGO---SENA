$(document).ready(function () {
    console.log("El archivo scripts.js se ha cargado correctamente");

    // Reemplaza los iconos Feather
    feather.replace();

    // Inicializa tooltips y popovers de Bootstrap
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    // Smooth scroll para enlaces de navegación
    $('a.page-scroll').on('click', function (event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 50
            }, 800);
        }
    });

    // Maneja la barra de navegación sticky y el botón de scroll-up
    $(window).on('scroll', function () {
        const scroll = $(this).scrollTop();
        $('.sticky-navigation').toggleClass('navbar-shadow', scroll >= 100);
        $('.scroll-top').toggleClass('active', scroll >= 600);
    });

    // Scroll-up al hacer clic en el botón
    $('.scroll-top').on('click', function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 800);
    });

    // Maneja el cambio de tema de color
    $('.switcher-trigger').on('click', function () {
        $('.switcher-wrap').toggleClass('active');
    });

    $('.color-switcher ul li').on('click', function () {
        const color = $(this).attr('data-color');
        $('#theme-color').attr("href", "css/" + color + ".css");
        $('.color-switcher ul li').removeClass('active');
        $(this).addClass('active');
        localStorage.setItem('themeColor', color);
    });

    // Cargar color de tema guardado en localStorage
    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        $('#theme-color').attr("href", "css/" + savedColor + ".css");
        $('.color-switcher ul li[data-color="' + savedColor + '"]').addClass('active');
    }

    // Manejo del envío del formulario de contacto
    $('#contactform').on('submit', function (e) {
        e.preventDefault(); // Evita que la página se recargue
    
        const formData = $(this).serialize(); // Serializa los datos del formulario

        // Envía los datos usando AJAX
        $.ajax({
            type: 'POST',
            url: 'ruta_a_tu_script.php', // Cambia esta URL a la ruta de tu servidor que maneja el envío del formulario
            data: formData,
            success: function (response) {
                // Muestra un mensaje de éxito sin recargar la página
                alert('Formulario enviado con éxito!');
                // Limpia el formulario
                $('#contactform')[0].reset();
            },
            error: function (error) {
                // Muestra un mensaje de error
                alert('Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo.');
            }
        });
    });
});
