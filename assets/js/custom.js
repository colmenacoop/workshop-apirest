$(document).ready(function() {

    // INIT VARS
    var $lista = $('#hospedajes-list .list-group');

    // FUNCTIONS
    function limpiarLista(clear) {
        if (clear){
            $lista.html("");
        }else{
            $lista.html("<a class='list-group-item sin-datos'><strong>No hay datos</strong></a>");
        }
    }

    function consultarHospedajes() {
        $.ajax({
            method: "GET",
            url: 'https://sgtur.catamarca.gob.ar/api/v1/hospedaje/',
            timeout: 20000, 
            success: function(result) {
                limpiarLista(true);
                $.each(result, function(i, item){
                    $lista.append("<a class='list-group-item item-hospedaje'><strong>" + item.nombre + ", <span class='span-domicilio'>" + item.domicilio + "</span></strong></a>");
                })
            },
            error: function(result){
                console.log(result);
            }
        });
    }

    // EVENTS
    $('.btn-consulta-hospedaje').click(function(){
        consultarHospedajes();
    });
    $('.btn-limpiar').click(function(){
        limpiarLista(false);
    });


    // LOADING LOGIC
    var $loading = $('.loadingDiv');

    $(document)
    .ajaxStart(function () {
        $loading.show();
    })
    .ajaxStop(function () {
        $loading.hide();
    });

});