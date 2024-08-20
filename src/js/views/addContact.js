import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams(); // Obtén el ID del contacto desde la URL

    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    useEffect(() => {
        if (id) {
            // Si estamos en modo edición, carga el contacto existente
            const existingContact = store.contacts.find(contact => contact.id === parseInt(id));
            if (existingContact) {
                setContact(existingContact);
            }
        }
    }, [id, store.contacts]);

    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (id) {
            // Si existe un ID, estamos en modo edición
            actions.editContact(id, contact);
        } else {
            // Si no hay ID, estamos en modo creación
            actions.addContact(contact);
        }
        navigate("/"); // Redirige a la lista de contactos después de guardar
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="name"
                    value={contact.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Email</label>
                <input
                    type="email"
                    className="form-control"
                    name="email"
                    value={contact.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Phone</label>
                <input
                    type="text"
                    className="form-control"
                    name="phone"
                    value={contact.phone}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="form-group">
                <label>Address</label>
                <input
                    type="text"
                    className="form-control"
                    name="address"
                    value={contact.address}
                    onChange={handleChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary">
                {id ? "Save Changes" : "Add Contact"}
            </button>
        </form>
    );
};
