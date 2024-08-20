import React from "react";
import PropTypes from "prop-types";

export const ContactCard = ({ contact, onDelete, onEdit }) => {
    return (
        <div className="card">
            <div className="card-body">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">Email: {contact.email}</p>
                <p className="card-text">Phone: {contact.phone}</p>
                <p className="card-text">Address: {contact.address}</p>
                <button className="btn btn-primary" onClick={() => onEdit(contact.id)}>Edit</button>
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
