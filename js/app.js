//CAMPOS DEL FORMULARIO--FORM FIELDS
const mascotaInput = document.querySelector('#mascota');
const propietarioInput = document.querySelector('#propietario');
const telefonoInput = document.querySelector('#telefono');
const fechaInput = document.querySelector('#fecha');
const horaInput = document.querySelector('#hora');
const sintomasInput = document.querySelector('#sintomas');

// UI--USER INTERFACE 
const formulario = document.querySelector('#nueva-cita');
const contenedorCitas = document.querySelector('#citas');

let editando;

//CLASES 
class Citas{
    constructor() {
        this.citas = [];
    }

    agregarCita(cita){
        this.citas = [...this.citas, cita];

        console.log(this.citas);
    }

    eliminarCita(id){
        this.citas = this.citas.filter( cita => cita.id !== id)
    }

    editarCita(citaActualizada){
        this.citas = this.citas.map(cita => cita.id === citaActualizada.id ? citaActualizada : cita );
    }
}

class UI{
    imprimirAlerta(mensaje, tipo){
        //Crear div -- create div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

        // Agregar clase en base al tipo de error -- Add class based on error type
        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else{
            divMensaje.classList.add('alert-success');
        }

        // Mensaje de error -- Error message
        divMensaje.textContent = mensaje; 

        //Agregar al DOM -- Add to DOM
        document.querySelector('#contenido').insertBefore(divMensaje, document.querySelector('.agregar-cita'));

        //Quitar la alerta despúes de 5 segundos -- Remove alert after 5 seconds
        setTimeout(() => {
            divMensaje.remove();
        }, 5000);
    }

    imprimirCitas({citas}){
        this.limpiarHTML();
        // console.log(citas);
        citas.forEach(cita => {
            const {mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

            const divCita = document.createElement('div');
            divCita.classList.add('cita', 'p-3');
            divCita.dataset.id = id;

            //Scripting de los elementos de la cita -- citation element scripts
            const mascotaParrafo = document.createElement('h2');
            mascotaParrafo.classList.add('card-title', 'font-weight-bolder');
            mascotaParrafo.textContent = mascota;

            const propietarioParrafo = document.createElement('p');
            propietarioParrafo.innerHTML = `
                <span class"font-weight-bolder">Propietario:</span> ${propietario}
            `;

            const telefonoParrafo = document.createElement('p');
            telefonoParrafo.innerHTML = `
                <span class"font-weight-bolder">Telefono:</span> ${telefono}
            `;

            const fechaParrafo = document.createElement('p');
            fechaParrafo.innerHTML = `
                <span class"font-weight-bolder">Fecha:</span> ${fecha}
            `;

            const horaParrafo = document.createElement('p');
            horaParrafo.innerHTML = `
                <span class"font-weight-bolder">Hora:</span> ${hora}
            `;

            const sintomasParrafo = document.createElement('p');
            sintomasParrafo.innerHTML = `
                <span class"font-weight-bolder">Síntomas:</span> ${sintomas}
            `;

            //Boton para eliminar esta cita  -- Button to delete this quote
             const btnEliminar = document.createElement('button');
             btnEliminar.classList.add('btn', 'btn-danger', 'mr-2');
             btnEliminar.innerHTML = 'Eliminar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>  ';
            
             btnEliminar.onclick = () => eliminarCita(id);

            // Añade un botón para editar
            const btnEditar = document.createElement('button');
            btnEditar.classList.add('btn', 'btn-info');
            btnEditar.innerHTML = 'Editar <svg fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"></path></svg>';
            btnEditar.onclick = () => cargarEdicion(cita);

            //Agregar los parrafos al divCita --  Add the paragraphs to the divCita
            divCita.appendChild( mascotaParrafo);
            divCita.appendChild( propietarioParrafo);
            divCita.appendChild( telefonoParrafo);
            divCita.appendChild( fechaParrafo);
            divCita.appendChild( horaParrafo);
            divCita.appendChild( sintomasParrafo);
            divCita.appendChild( btnEliminar);
            divCita.appendChild( btnEditar);

            //Agregar las citas al HTML -- Add the citations to the HTML
            contenedorCitas.appendChild(divCita);

        });
       
    }
        limpiarHTML(){
            while (contenedorCitas.firstChild) {
                contenedorCitas.removeChild(contenedorCitas.firstChild);
            }
        }
}

const ui = new UI();
const administrarCitas = new Citas();

// REGISTRAR EVENTOS--REGISTER EVENTS
eventListeners();
function eventListeners() {
    mascotaInput.addEventListener('input', datosCita); // change lee los datos e igual input -- READ THE DATA
    propietarioInput.addEventListener('input', datosCita); 
    telefonoInput.addEventListener('input', datosCita); 
    fechaInput.addEventListener('input', datosCita); 
    horaInput.addEventListener('input', datosCita); 
    sintomasInput.addEventListener('input', datosCita); 

    formulario.addEventListener('submit', nuevaCita);
}

// OBJETO CON LA INFORMACION DE LA CITA -- OBJECT WITH THE APPOINTMENT INFORMATION
const citaObj = { // para que  funcione el name del html debe tener el mismo nombre de la propiedad -- for it to work, the name of the html must have the same name of the property
    mascota: '',
    propietario: '',
    telefono: '',
    fecha: '',
    hora: '',
    sintomas:''
}

// AGREGA DATOS AL OBJETO DE LA CITA --  ADD DATA TO THE APPOINTMENT OBJECT
function datosCita(e){
    //escribe sobre el objeto -- write about the objec
    citaObj[e.target.name] = e.target.value;
    // console.log(citaObj)
}

// VALIDA Y AGREGA UNA NUEVA CITA A LA CLASE DE CITAS -- valid and adds a new citation to the citation class
function nuevaCita(e){
    e.preventDefault();

    //Extraer la información  del objeto de la cita -- Extract the information from the citation object
    const{mascota, propietario, telefono, fecha, hora, sintomas}=citaObj;

    //Validar -- validate
    if(mascota === '' || propietario === '' || telefono === '' || fecha === '' || hora === '' || sintomas === ''){
     ui.imprimirAlerta( 'Todos los campos son obligatorios', 'error'); // All fields are required
        
        return;
    }

    if (editando) {
        // console.log('Modo Edición');
        ui.imprimirAlerta('Editado Correctamente');

        // Pasar el objeto de la cita a edición --  Pass the citation object to edit
        administrarCitas.editarCita({...citaObj});

        //Regresar el texto del botón a su estado original -- Return the button text to its original state
        formulario.querySelector('button[type="submit"]').textContent = 'Crear Cita';

        //Quitar modo  edición -- remove edit mode
        editando = false;
    }else{
        // console.log('Modo Nueva Cita')

        //Generar un id único -- Generate a unique id
        citaObj.id = Date.now();

        // Creando una nueva cita -- Creating a new appointment
        administrarCitas.agregarCita({...citaObj}); // para que no se sobreescriba el arreglo y se pase una copia y no la referencia completa de todo el objeto -- so that the array is not overwritten and a copy is passed and not the complete reference of the entire object

        //Mensaje de agregado correctamente -- Message added successfully
        ui.imprimirAlerta('Se agregó correctamente')
    }

    
    //Reiniciar el objeto para la validación -- Restart the object for validation
    reiniciarObjeto();

    //Reiniciar formulario -- reset form
    formulario.reset();

    //Mostrar el HTML -- show the html
    ui.imprimirCitas(administrarCitas);
    
}

//REINICIAR OBJETO -- RESET OBJECT
function reiniciarObjeto(){
    citaObj.mascota = '';
    citaObj.propietario = '';
    citaObj.telefono = '';
    citaObj.fecha = '';
    citaObj.hora= '';
    citaObj.sintomas= '';
}

function eliminarCita(id){
    //Eliminar la cita 
    administrarCitas.eliminarCita(id);

    //Muestre un mensaje 
    ui.imprimirAlerta('La cita se eliminó correctamente');

    //Refrescar las citas
    ui.imprimirCitas(administrarCitas);
}

//Cargar los datos y el modo edición -- load data and edit mode

function cargarEdicion(cita){
    // console.log(cita);
    const{mascota, propietario, telefono, fecha, hora, sintomas, id} = cita;

    // Llenar las entradas -- fill in the inputs
    mascotaInput.value = mascota;
    propietarioInput.value =propietario;
    telefonoInput.value = telefono;
    fechaInput.value = fecha;
    horaInput.value = hora;
    sintomasInput.value = sintomas;

    //Llenar el objeto -- fill the object
    citaObj.mascota = mascota;
    citaObj.propietario = propietario;
    citaObj.telefono = telefono;
    citaObj.fecha = fecha;
    citaObj.hora = hora;
    citaObj.sintomas = sintomas;
    citaObj.id = id;
    

    //Cambiar el texto del botón -- Change button text
    formulario.querySelector('button[type="submit"]').textContent = 'Guardar Cambios';

    editando = true;
}