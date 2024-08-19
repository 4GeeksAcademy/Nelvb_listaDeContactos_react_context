import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useHistory } from "react-router-dom";

export const AddContact = () => {
    const { actions } = useContext(Context);
    const history = useHistory();

    const [contact, setContact] = useState({
        full_name: "",
        email: "",
        phone: "",
        address: ""
    });

    const handleChange = (event) => {
        setContact({
            ...contact,
            [event.target.name]: event.target.value
        });
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        actions.addContact(contact);
        history.push("/"); // Redirige a la lista de contactos después de añadir
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Full Name</label>
                <input
                    type="text"
                    className="form-control"
                    name="full_name"
                    value={contact.full_name}
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
            <button type="submit" className="btn btn-primary">Save</button>
        </form>
    );
};
