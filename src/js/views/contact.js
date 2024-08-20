import React, { useContext } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Contact = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="contact-list">
            {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                store.contacts.map((contact, index) => (
                    <ContactCard
                        key={index}
                        contact={contact} // Aquí pasamos el objeto `contact` completo
                        onDelete={(id) => actions.deleteContact(id)} // Pasamos la función `deleteContact`
                        onEdit={(id, contact) => actions.editContact(id, contact)} // Pasamos la función `editContact` con los parámetros adecuados
                    />
                ))
            ) : (
                <p>No hay contactos disponibles.</p>
            )}
        </div>
    );
};
