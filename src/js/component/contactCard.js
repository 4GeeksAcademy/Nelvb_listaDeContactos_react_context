import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteModal } from "./confirmDeleteModal";
import contactImage from "../../img/pngtree-contact-icon-image_1335045.jpg"; // Asegúrate de usar la ruta correcta

export const ContactCard = ({ contact, onDelete }) => {
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);

    const handleDeleteClick = () => {
        setShowModal(true);
    };

    const handleConfirmDelete = () => {
        onDelete(contact.id);
        setShowModal(false);
    };

    const handleCancelDelete = () => {
        setShowModal(false);
    };

    return (
        <div className="contact-card">
            <div className="contact-card-image">
                <img src={contactImage} alt="contact" />
            </div>
            <div className="contact-card-details">
                <h5 className="card-title">{contact.name}</h5>
                <p className="card-text">
                    <i className= 'fa fa-envelope'></i>{contact.email}</p>
                <p className="card-text">
                    <i className="fas fa-phone"></i>{contact.phone}</p>
                <p className="card-text">
                    <i className="fas fa-map-marker-alt"></i>{contact.address}</p>
            </div>
            <div className="button-group">
                <button 
                    className="editarContacto" 
                    onClick={() => navigate(`/add-contact/${contact.id}`)}
                >
                    <i className="fas fa-edit"></i>
                </button>
                <button className="papeleraEliminar" onClick={handleDeleteClick}>
                    <i className="fas fa-trash"></i>
                </button>
            </div>

            <ConfirmDeleteModal
                show={showModal}
                contactName={contact.name}
                onConfirm={handleConfirmDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
