$(document).ready(function() {

    // INIT VARS
    var apiURL = 'http://localhost:8000/api/v1/asistente/';
    var $list = $('#list');
    var $loadingList = $('.loadingList');
    var $loadingForm = $('.loadingForm');
    var $inputName = $('#name');
    var $inputLastname = $('#lastname');
    var $inputDNI = $('#dni');
    var resourceID = null;
    
    // Muestro la URL de la API en el index.html
    $('#api-rest strong').text('API REST:' + apiURL);


    // FUNCTIONS TO MODIFY HTML DOM

    function modifyList(text) {
        if (!text){
            $list.html("");
        }else{
            $list.html("<a class='list-group-item sin-datos'><strong>" +    wxt + "</strong></a>");
        }
    }

    function addItem(item) {
        $list.prepend(
            "<a class='list-group-item item' data-id='" + item.pk + "'>" +
                "<strong>"+ 
                    "<span class='span-name'>" + item.nombre + "</span>, "+
                    "<span class='span-lastname'>" + item.apellido + "</span>, "+
                    "<span class='span-dni'>" + item.dni + "</span>"+
                "</strong>"+
                "&nbsp;"+
                "<button class='btn-editar'>editar</button>"+
                "<button class='btn-eliminar'>eliminar</button>"+
            "</a>"
        );
    }

    function removeItem() {
        $('#list .item[data-id="'+ resourceID +'"]').remove();
    }

    function updateItem(item) {
        removeItem();
        addItem(item);
    }


    // FUNCTIONS WITH AJAX REQUESTS

    function getResource() {
        // AJAX GET METHOD
        console.log('Inserte su metodo metodo AJAX GET aquí');
        $.ajax({
            method: 'GET',
            url: 'http://localhost:8000/api/v1/asistente/',
            beforeSend: function(){
                $loadingList.show();
            },
            success: function(data, status, xho){
                $.each(data, function(i, element){
                    addItem(element);
                })
                console.log(xho);
                console.log(data);
            },
            error: function(data){
                console.log(data)
            }
        }).always(function(){
            $loadingList.hide()
        })
    }

    function postResource() {
        // DATA AND LOG
        var datos = {apellido: $inputLastname.val(), dni: $inputDNI.val()};
        console.log(datos);

        // AJAX POST METHOD
        $.ajax({
            method: 'POST',
            url: 'http://localhost:8000/api/v1/asistente/',
            data: datos,
            beforeSend: function(){
                $loadingList.show();
            },
            success: function(data, status, xho){
                addItem(data);
                console.log(xho);
                console.log(data);
            },
            error: function(data){
                console.log(data)
            }
        }).always(function(){
            $loadingList.hide()
        })

    }

    function putResource() {
        // DATA AND LOG
        var datos = {nombre: $inputName.val(), apellido: $inputLastname.val(), dni: $inputDNI.val()};
        console.log('Se modificara el recurso con ID: ' + resourceID);
        console.log(datos);

        // AJAX PUT METHOD
        $.ajax({
            method: 'PUT',
            url: 'http://localhost:8000/api/v1/asistente/' + resourceID + '/',
            data: datos,
            beforeSend: function(){
                $loadingList.show();
            },
            success: function(data, status, xho){
                updateItem(data);
                console.log(xho);
                console.log(data);
            },
            error: function(data){
                console.log(data)
            }
        }).always(function(){
            $loadingList.hide()
        })
    }

    function deleteResource() {
        // LOG
        console.log('Se eliminara el recurso con ID: ' + resourceID);

        // AJAX DELETE METHOD
        $.ajax({
            method: 'DELETE',
            url: 'http://localhost:8000/api/v1/asistente/' + resourceID + '/',
            beforeSend: function(){
                $loadingList.show();
            },
            success: function(data, status, xho){
                removeItem(data);
                console.log(xho);
                console.log(data);
            },
            error: function(data){
                console.log(data)
            }
        }).always(function(){
            $loadingList.hide()
        })
    }


    // EVENTS
    $('.btn-consulta').click(function(){
        getResource();
    });
    $('.btn-limpiar').click(function(){
        modifyList('No hay datos');
    });
    
    $('.btn-crear').click(function(event){
        // Abro el modal.
        $("#myModal").modal();

        // Cambio el título del modal.
        $('.modal-title').text('Agregar Recurso');

        // Muestro el boton para crear y escondo el boton para editar
        $('.btn-crear-confirmar').show();
        $('.btn-editar-confirmar').hide();

        // Limpio los input que se encuentran en el modal.
        $inputName.val('');
        $inputLastname.val('');
        $inputDNI.val('');
    });
    
    $list.on('click', '.btn-editar', function(event){
        // Abro el modal
        $("#myModal").modal();

        // Cambio el título del modal.
        $('.modal-title').text('Modificar Recurso');

        // Muestro el boton para editar y escondo el boton para crear
        $('.btn-editar-confirmar').show();
        $('.btn-crear-confirmar').hide();

        // Defino las variables con la información que necesito del registro seleccionado.
        var name = $(this).siblings('strong').find('.span-name').text();
        var lastname = $(this).siblings('strong').find('.span-lastname').text();
        var dni = $(this).siblings('strong').find('.span-dni').text();

        // Guardo el id del registro seleccionado para su posterior uso.
        resourceID = $(this).parent().data('id');

        // Asigno las variables definidas ateriormente a los input del modal.
        $inputName.val(name);
        $inputLastname.val(lastname);
        $inputDNI.val(dni);
    });
    
    $list.on('click', '.btn-eliminar', function(event){
        // Guardo el id del registro seleccionado para su posterior uso.
        resourceID = $(this).parent().data('id');
        deleteResource();
    });

    $('.btn-crear-confirmar').click(function(event){
        postResource();
    });

    $('.btn-editar-confirmar').click(function(event){
        putResource();
    });

});