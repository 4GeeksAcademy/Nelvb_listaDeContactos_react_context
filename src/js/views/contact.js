import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Contact = () => {
    const { store, actions } = useContext(Context); // Extrae el estado (store) y las acciones (actions) del contexto.

    return (
        <div className="container">
            <div className="d-flex justify-content-end my-3">
                <Link to="/add-contact" className="btn btn-primary">Añadir nuevo contacto</Link>
            </div>
            <div className="contact-list">
                {Array.isArray(store.contacts) && store.contacts.length > 0 ? ( // Verifica si hay contactos disponibles en el estado.
                    store.contacts.map((contact, index) => ( // Mapea cada contacto para crear una ContactCard.
                        <ContactCard
                            key={index} // Asigna una clave única a cada contacto.
                            contact={contact} // Pasa los datos del contacto al componente ContactCard.
                            onDelete={actions.deleteContact} // Pasa la función de eliminar contacto como prop a ContactCard.
                        />
                    ))
                ) : (
                    <p>No hay contactos disponibles.</p>
                )}
            </div>
        </div>
    );
};