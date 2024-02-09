// necesitamos un a funcion que nos permita acomodar el strin quiery para un update dependiento de los datos que solo quiera actualizar

export const updateQuery = (data: any) => {
  const query = Object.keys(data)
    .map((key) => `${key} = '${data[key]}'`)
    .join(", ");
  console.log(query);
  return query;
};

//* Tests
const data1 = { username: "admin", password: "123456" };
const query = Object.values(data1);
const query1 = Object.keys(data1);
console.log(query1);
updateQuery(data1);
console.log(query);

// en dado caso de segur usand esta funcion para completar el string
// tendremos que agregar un if en dado caso de que pasemos password para que le haga el hashed con bcrypt

// aun que la contrase;a se encriptaria en cunato entresmoa a la funcion de la consulta
