$(document).ready(function() {

    // INIT VARS
    var lista = $('#hospedajes-list .list-group');
    var items = $('#hospedajes-list .list-group a');

    function clearList() {
        lista.html('');
    }

    function consultarHospedajes() {
        $.ajax({
            url: 'https://sgtur.catamarca.gob.ar/api/v1/hospedaje/',
            success: function(result) {
                clearList();
                $.each(result, function(i, item){
                    console.log(i);
                    console.log(item);
                    lista.append("<a class='list-group-item'><strong>" + item.nombre + ", <span class='span-domicilio'>" + item.domicilio + "</span></strong></a>");
                })
            }
        });
    }

    $('.btn-consulta-hospedaje').click(function(){
        consultarHospedajes();
    });
    $('.btn-limpiar').click(function(){
        clearList();
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