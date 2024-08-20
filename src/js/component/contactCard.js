import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const ContactCard = ({ contact, onDelete, onEdit }) => {
    const navigate = useNavigate();

    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">Email: {contact.email}</p>
                <p className="card-text">Phone: {contact.phone}</p>
                <p className="card-text">Address: {contact.address}</p>
                <button 
                    className="btn btn-primary" 
                    onClick={() => navigate(`/add-contact/${contact.id}`)} // Navega a la ruta de edición con el ID del contacto
                >
                    Edit
                </button>
                <button className="btn btn-danger" onClick={() => onDelete(contact.id)}>Delete</button>
            </div>
        </div>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired
};
