const getState = ({ getActions, setStore }) => {
    // Se define una función llamada `getState` que recibe un objeto con dos propiedades: `getActions` y `setStore`.
    // Estas propiedades se pasan a la función `getState` cuando se llama. Se usan para obtener acciones (funciones) 
    // y actualizar el estado (`store`) de la aplicación.

    return {
        // La función `getState` devuelve un objeto que tiene dos propiedades principales: `store` y `actions`.

        store: {
            contacts: []
            // `store` es un objeto que representa el estado de la aplicación.
            // Aquí, `contacts` es un arreglo vacío que almacenará los contactos.
        },

        actions: {
            // `actions` es un objeto que contiene varias funciones (acciones) que manipulan el estado (`store`).

            checkOrCreateAgenda: async () => {
                // Esta es una función asíncrona que verifica si una agenda ya existe o la crea si no existe.
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb");
                    // Hace una solicitud HTTP GET para verificar si la agenda con el slug "Nelvb" ya existe.

                    if (response.ok) {
                        console.log("Agenda ya existe.");
                        // Si la solicitud tiene éxito (código de estado 200), se imprime un mensaje en la consola.
                    } else if (response.status === 404) {
                        console.log("Agenda no encontrada. Creando agenda...");
                        await getActions().createAgenda();
                        // Si la agenda no se encuentra (código de estado 404), se llama a la función `createAgenda` para crearla.
                    } else {
                        throw new Error("Error al verificar la agenda: " + response.status);
                        // Si hay un error diferente, lanza un error con el código de estado.
                    }
                } catch (error) {
                    console.error("Error en la verificación o creación de la agenda:", error);
                    // Si ocurre un error durante la solicitud, se captura y se imprime en la consola.
                }
            },

            createAgenda: async () => {
                // Esta es una función asíncrona que crea una nueva agenda.
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb", {
                        method: "POST",
                        // Se hace una solicitud HTTP POST para crear la agenda con el slug "Nelvb".
                        headers: {
                            "Content-Type": "application/json"
                            // Se establece el tipo de contenido de la solicitud como JSON.
                        },
                        body: JSON.stringify({ "agenda_slug": "Nelvb" })
                        // El cuerpo de la solicitud incluye el slug de la agenda en formato JSON.
                    });
                    if (response.ok) {
                        console.log("Agenda creada exitosamente.");
                        // Si la creación es exitosa, se imprime un mensaje en la consola.
                    } else {
                        throw new Error("No se pudo crear la agenda.");
                        // Si la creación falla, se lanza un error.
                    }
                } catch (error) {
                    console.error("Error al crear la agenda:", error);
                    // Si ocurre un error durante la solicitud, se captura y se imprime en la consola.
                }
            },

            loadContacts: async () => {
                // Esta es una función asíncrona que carga los contactos desde la API.
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb/contacts");
                    // Hace una solicitud HTTP GET para obtener los contactos de la agenda "Nelvb".

                    if (response.ok) {
                        const data = await response.json();
                        // Si la solicitud tiene éxito, los datos se convierten en un objeto JavaScript.
                        console.log("Datos recibidos: ", data);
                        if (Array.isArray(data.contacts)) {
                            setStore({ contacts: data.contacts });
                            // Si los datos recibidos son un array de contactos, se actualiza el `store` con estos contactos.
                        } else {
                            console.error("La respuesta no es un array:", data);
                            // Si la respuesta no es un array, se imprime un mensaje de error.
                        }
                    } else {
                        console.error("Error al cargar los contactos:", response.status);
                        // Si la solicitud falla, se imprime un mensaje de error con el código de estado.
                    }
                } catch (error) {
                    console.error("Error en la carga de contactos:", error);
                    // Si ocurre un error durante la solicitud, se captura y se imprime en la consola.
                }
            },

            addContact: async (contact) => {
                // Esta es una función asíncrona que añade un nuevo contacto a la agenda.
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                            // Se establece el tipo de contenido de la solicitud como JSON.
                        },
                        body: JSON.stringify(contact)
                        // El cuerpo de la solicitud incluye el contacto que se va a añadir, convertido a JSON.
                    });
                    if (response.ok) {
                        await getActions().loadContacts(); // Recargar los contactos después de añadir
                        console.log("Contacto añadido exitosamente");
                        // Si la adición es exitosa, se recargan los contactos y se imprime un mensaje en la consola.
                    } else {
                        console.error("Error al añadir el contacto:", response.status);
                        // Si la adición falla, se imprime un mensaje de error con el código de estado.
                    }
                } catch (error) {
                    console.error("Error al añadir el contacto:", error);
                    // Si ocurre un error durante la solicitud, se captura y se imprime en la consola.
                }
            },

            deleteContact: async (id) => {
                // Esta es una función asíncrona que elimina un contacto por su ID.
                try {
                    console.log(`Eliminando contacto con ID: ${id}`);
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Nelvb/contacts/${id}`, {
                        method: "DELETE"
                        // Hace una solicitud HTTP DELETE para eliminar el contacto con el ID especificado.
                    });
                    if (response.ok) {
                        await getActions().loadContacts(); // Recargar los contactos después de eliminar
                        console.log(`Contacto con ID: ${id} eliminado exitosamente`);
                        // Si la eliminación es exitosa, se recargan los contactos y se imprime un mensaje en la consola.
                    } else {
                        console.error("Error al eliminar el contacto:", response.status);
                        // Si la eliminación falla, se imprime un mensaje de error con el código de estado.
                    }
                } catch (error) {
                    console.error("Error en la eliminación del contacto:", error);
                    // Si ocurre un error durante la solicitud, se captura y se imprime en la consola.
                }
            },

            editContact: async (id, contact) => {
                // Esta es una función asíncrona que edita un contacto existente por su ID.
                if (!contact) {
                    console.error("El contacto está indefinido. No se puede editar.");
                    return;
                    // Si el contacto no está definido, se imprime un mensaje de error y se retorna para evitar fallos.
                }

                try {
                    console.log(`Editando contacto con ID: ${id} y datos:`, contact);
                    
                    const response = await fetch(`https://playground.4geeks.com/contact/agendas/Nelvb/contacts/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                            // Se establece el tipo de contenido de la solicitud como JSON.
                        },
                        body: JSON.stringify({
                            name: contact.name,
                            phone: contact.phone,
                            email: contact.email,
                            address: contact.address
                            // El cuerpo de la solicitud incluye los datos del contacto que se van a actualizar, convertido a JSON.
                        })
                    });
                    
                    if (response.ok) {
                        await getActions().loadContacts(); // Recargar los contactos después de editar
                        console.log(`Contacto con ID: ${id} editado exitosamente`);
                        // Si la edición es exitosa, se recargan los contactos y se imprime un mensaje en la consola.
                    } else {
                        console.error("Error al editar el contacto:", response.status);
                        // Si la edición falla, se imprime un mensaje de error con el código de estado.
                    }
                } catch (error) {
                    console.error("Error al editar el contacto:", error);
                    // Si ocurre un error durante la solicitud, se captura y se imprime en la consola.
                }
            }
        }
    };
};

export default getState;

