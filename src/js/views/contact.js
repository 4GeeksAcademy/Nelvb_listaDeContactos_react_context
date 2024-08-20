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
                        contact={contact}
                        onDelete={actions.eliminarContacto}
                        onEdit={actions.editarContacto}
                    />
                ))
            ) : (
                <p>No hay contactos disponibles.</p>
            )}
        </div>
    );
};
