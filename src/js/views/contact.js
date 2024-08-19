import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ContactCard } from "../component/contactCard";
import { Link } from "react-router-dom";

export const Contact = () => {
    const { store, actions } = useContext(Context);

    // Cargar los contactos cuando el componente se monta
    useEffect(() => {
        actions.loadContacts(); // Carga los contactos desde la API
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>MI AGENDA</h1>
                    <Link to="/add-contact" className="btn btn-success mb-3">
                        Add new contact
                    </Link>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    {store.contacts.length > 0 ? (
                        store.contacts.map((contact, index) => (
                            <ContactCard
                                key={index}
                                contact={contact}
                                onDelete={actions.deleteContact}
                                onEdit={actions.editContact}
                            />
                        ))
                    ) : (
                        <p>No contacts found</p>
                    )}
                </div>
            </div>
        </div>
    );
};
