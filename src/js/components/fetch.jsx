import React from "react";

fetch("https://playground.4geeks.com/todo/alesanchezr", {
  method: "POST",
  body: JSON.stringify(task),
  headers: {
    "Content-Type": "application/json",
  },
})
  .then((resp) => {
    console.log(resp.ok); // Será true si la respuesta es exitosa
    console.log(resp.status); // El código de estado 201, 300, 400, etc.
    return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
  })
  .then((data) => {
    // Aquí es donde debe comenzar tu código después de que finalice la búsqueda
    console.log(data); // Esto imprimirá en la consola el objeto exacto recibido del servidor
  })
  .catch((error) => {
    // Manejo de errores
    console.log(error);
  });
