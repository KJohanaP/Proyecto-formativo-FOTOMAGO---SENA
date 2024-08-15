$(document).ready(function () {
    console.log("El archivo scripts.js se ha cargado correctamente");

    feather.replace();

    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="popover"]').popover();

    $('a.page-scroll').on('click', function (event) {
        event.preventDefault();
        const target = $(this.getAttribute('href'));
        if (target.length) {
            $('html, body').stop().animate({
                scrollTop: target.offset().top - 50
            }, 800);
        }
    });

    $(window).on('scroll', function () {
        const scroll = $(this).scrollTop();
        $('.sticky-navigation').toggleClass('navbar-shadow', scroll >= 100);
        $('.scroll-top').toggleClass('active', scroll >= 600);
    });

 
    $('.scroll-top').on('click', function () {
        $('html, body').stop().animate({ scrollTop: 0 }, 800);
    });

    
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

    const savedColor = localStorage.getItem('themeColor');
    if (savedColor) {
        $('#theme-color').attr("href", "css/" + savedColor + ".css");
        $('.color-switcher ul li[data-color="' + savedColor + '"]').addClass('active');
    }

    $('#contactform').on('submit', function (e) {
        e.preventDefault(); 
    
        const formData = $(this).serialize(); 

        $.ajax({
            type: 'POST',
            url: 'ruta_a_tu_script.php', 
            success: function (response) {
                
                alert('Formulario enviado con éxito!');
                $('#contactform')[0].reset();
            },
            error: function (error) {
        
                alert('Hubo un error al enviar tus datos. Por favor, inténtalo de nuevo.');
            }
        });
    });
});
