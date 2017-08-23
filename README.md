# workshop-apirest
Ejemplo básico para consumir un API REST usando la API de Turismo Catamarca.


$.get('https://sgtur.catamarca.gob.ar/api/v1/hospedaje/',function(data,status,xhr){
	console.log(data);
	console.log(status);
	console.log(xhr);
})
