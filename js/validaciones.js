export function valida(input){
    const tipoDeinput = input.dataset.tipo;
    if(validadores[tipoDeinput]){
        validadores[tipoDeinput](input);
    }

    if(input.validity.valid){
        input.parentElement.classList.remove("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = "";
    }else{
        input.parentElement.classList.add("input-container--invalid");
        input.parentElement.querySelector(".input-message-error").innerHTML = 
        mostrarMensajeDeError(tipoDeinput, input);
    }
}

const tipoDeErrores = [
    "valueMissing",
    "typeMismatch",
    "patternMismatch",
    "customError",
];

const mensajesDeError = {
    nombre: {
        valueMissing: "Este campo de nombre no puede estar Vacio"
    },
    email: {
        valueMissing: "Este campo de Email no puede estar Vacio",
        typeMismatch: "El correo no es valido"
    },
    password: {
        valueMissing: "Este campo de contraseña no puede estar Vacio",
        patternMismatch: "Al menos 6 caracteres, Maximo 12 y debe contener una letra minuscula, una letra mayusculam un numero y no puede contener caracteres especiales."
    },
    nacimiento: {
        valueMissing: "Este campo de Fecha de nacimiento no puede estar Vacio",
        customError: "Debes tener al menos 18 años para inscribirte"
    },
    telefono: {
        valueMissing: "Este campo de Telefono nombre no puede estar Vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX de 10 numeros"
    },
    direccion: {
        valueMissing: "Este campo de Telefono nombre no puede estar Vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX de 10 numeros"
    },
    ciudad: {
        valueMissing: "Este campo de Telefono nombre no puede estar Vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX de 10 numeros"
    },
    departamento: {
        valueMissing: "Este campo de Telefono nombre no puede estar Vacio",
        patternMismatch: "El formato requerido es XXXXXXXXXX de 10 numeros"
    },
}
const validadores = {
    nacimiento: input => validarNacimiento(input),
}



function mostrarMensajeDeError(tipoDeInput, input){
    let mensaje = "";
    tipoDeErrores.forEach((error) => {
        if(input.validity[error]){
            console.log(tipoDeInput, error);
            console.log(input.validity[error]);
            console.log(mensajesDeError[tipoDeInput][error]);
            mensaje = mensajesDeError[tipoDeInput][error];
        }
    });
    return mensaje;
}


function validarNacimiento(input){
    const fechaCliente = new Date(input.value);
    let mensaje = ""
    if(!mayorDeEdad(fechaCliente)){
        mensaje = "Debes tener al menos 18 años para inscribirte"
    };

    input.setCustomValidity(mensaje);
}

function mayorDeEdad(fecha) {
    const fechaActual = new Date();
    const diferenciaFechas = new Date(
      fecha.getUTCFullYear() + 18,
      fecha.getUTCMonth(),
      fecha.getUTCDate()
    );
    return diferenciaFechas <= fechaActual;
}