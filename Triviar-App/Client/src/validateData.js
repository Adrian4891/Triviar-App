export const validateLog = (userData) => {
    const error = {};
    if(!/^[a-zA-Z0-9._-]{1,35}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
        error.email = "Debe ser un formato de email";    
    }
    else if(!/^(?!.*\s)/.test(userData.password) ) {
        error.password = "no se permiten espacios en blanco";    
    }
    else if(userData.password.length < 6 || userData.password.length > 15 ) {
        error.password = "Debe ser mayor a 8 caracteres y menor a 15";    
    }

   
    return error;
}


export const validateSignUp = (userData) => {
    const error = {};
    if(!/^[a-zA-Z0-9._-]{1,35}@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(userData.email)) {
        error.email = "Debe ser un formato de email";    
    }
    else if(!/^(?!.*\s)/.test(userData.password) ) {
        error.password = "No se permiten espacios en blanco";    
    }
    else if(!/^(?=.*[a-zA-Z])/.test(userData.password)) {
        error.password = "Debe contener al menos una mayúscula y minuscúla";    
    }
    else if(!/(?=.*\d)/.test(userData.password)) {
        error.password = "Debe contener al menos un número";    
    }
    else if(userData.password.length < 6 || userData.password.length > 15 ) {
        error.password = "Debe ser mayor a 8 caracteres y menor a 15";    
    }
   
    return error;
}

const calcularEdad = (fechaNac) => {
    const fechaActual = new Date();
    const nacimiento = new Date(fechaNac);
    let edad = fechaActual.getFullYear() - nacimiento.getFullYear();
    const mesAct = fechaActual.getMonth();
    const mesNac = nacimiento.getMonth();
    if (mesNac > mesAct || (mesNac === mesAct && nacimiento.getDate() > fechaActual.getDate())){
      edad--;
    }
    return edad;
  }

export const validateDataProfile = (userData) => {

    const error = {};
    
    if(userData.userName.length > 20 ){
        error.userName = "El userName tiene un limite de 15 caracteres";
    }
    else if(userData.userName === "" ){
        error.userName = "No puede estar vacio";
    }
    else if(userData.country === ""){
        error.country = "El campo no puede estar vacio";
    }
    else if(calcularEdad(userData.birthday) < 0){
        error.birthday =  "No puede ser una fecha futura"
    }
  
    else if(userData.birthday === ""){
        error.birthday =  "No puede estar vacio"
    }
    return error;
}