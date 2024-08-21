import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";

export const Contact = () => {
    const { store, actions } = useContext(Context);

    return (
        <div className="container">
            <div className="d-flex justify-content-end my-3">
                <Link to="/add-contact" className="btn btn-primary">Añadir nuevo contacto</Link>
            </div>
            <div className="contact-list">
                {Array.isArray(store.contacts) && store.contacts.length > 0 ? (
                    store.contacts.map((contact, index) => (
                        <ContactCard
                            key={index}
                            contact={contact}
                            onDelete={actions.deleteContact}
                        />
                    ))
                ) : (
                    <p>No hay contactos disponibles.</p>
                )}
            </div>
        </div>
    );
};
