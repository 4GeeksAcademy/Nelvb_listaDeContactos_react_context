const getState = ({ getStore, getActions, setStore }) => {
    return {
        store: {
            contacts: []
        },
        actions: {
            checkOrCreateAgenda: async () => { // Asegúrate de que el nombre coincida con lo que se usa en appContext.js
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb");
                    if (response.ok) {
                        console.log("Agenda ya existe.");
                    } else if (response.status === 404) {
                        console.log("Agenda no encontrada. Creando agenda...");
                        await getActions().createAgenda();
                    } else {
                        throw new Error("Error al verificar la agenda: " + response.status);
                    }
                } catch (error) {
                    console.error("Error en la verificación o creación de la agenda:", error);
                }
            },

            createAgenda: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ "agenda_slug": "Nelvb" })
                    });
                    if (response.ok) {
                        console.log("Agenda creada exitosamente.");
                    } else {
                        throw new Error("No se pudo crear la agenda.");
                    }
                } catch (error) {
                    console.error("Error al crear la agenda:", error);
                }
            },

            loadContacts: async () => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb/contacts");
                    if (response.ok) {
                        const data = await response.json();
                        console.log("Datos recibidos: ", data);
                        if (Array.isArray(data.contacts)) {
                            setStore({ contacts: data.contacts });
                        } else {
                            console.error("La respuesta no es un array:", data);
                        }
                    } else {
                        console.error("Error al cargar los contactos:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la carga de contactos:", error);
                }
            },

            addContact: async (contact) => {
                try {
                    const response = await fetch("https://playground.4geeks.com/contact/agendas/Nelvb/contacts", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        await getActions().loadContacts(); // Recargar los contactos después de añadir
                        console.log("Contacto añadido exitosamente");
                    } else {
                        console.error("Error al añadir el contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error al añadir el contacto:", error);
                }
            },

            deleteContact: async (id) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/${id}`, {
                        method: "DELETE"
                    });
                    if (response.ok) {
                        await getActions().loadContacts(); // Recargar los contactos después de eliminar
                    } else {
                        console.error("Error al eliminar el contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error en la eliminación del contacto:", error);
                }
            },

            editContact: async (id, contact) => {
                try {
                    const response = await fetch(`https://playground.4geeks.com/contact/${id}`, {
                        method: "PUT",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(contact)
                    });
                    if (response.ok) {
                        await getActions().loadContacts(); // Recargar los contactos después de editar
                    } else {
                        console.error("Error al editar el contacto:", response.status);
                    }
                } catch (error) {
                    console.error("Error al editar el contacto:", error);
                }
            }
        }
    };
};

export default getState;
