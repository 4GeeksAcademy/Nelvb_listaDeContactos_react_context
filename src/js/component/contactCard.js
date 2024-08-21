import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { ConfirmDeleteModal } from "./confirmDeleteModal";
import contactImage from "../../img/pngtree-contact-icon-image_1335045.jpg";

// Este componente recibe dos propiedades: `contact` (que representa un contacto) y `onDelete` (una función para eliminar el contacto).
export const ContactCard = ({ contact, onDelete }) => {

    // `useNavigate` es un hook de React Router que permite programáticamente navegar entre rutas.
    const navigate = useNavigate();

    // Se utiliza el hook `useState` para manejar el estado del modal de confirmación de eliminación.
    // `showModal` es una variable de estado que determina si el modal está visible o no.
    // `setShowModal` es la función que se usa para actualizar el valor de `showModal`.
    const [showModal, setShowModal] = useState(false);

    // `handleDeleteClick` es una función que se ejecuta cuando el usuario hace clic en el botón de eliminar.
    // Esta función muestra el modal de confirmación al establecer `showModal` en `true`.
    const handleDeleteClick = () => {
        setShowModal(true);
    };

    // `handleConfirmDelete` es una función que se ejecuta cuando el usuario confirma la eliminación en el modal.
    // Esta función llama a la función `onDelete` pasando el ID del contacto a eliminar.
    // Luego, oculta el modal al establecer `showModal` en `false`.
    const handleConfirmDelete = () => {
        onDelete(contact.id);
        setShowModal(false);
    };

    // `handleCancelDelete` es una función que se ejecuta cuando el usuario cancela la eliminación en el modal.
    // Simplemente oculta el modal al establecer `showModal` en `false`.
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
                    <i className='fa fa-envelope'></i>{contact.email}</p>
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
                show={showModal} // Controla si el modal se muestra o no (true o false).
                contactName={contact.name} // Pasa el nombre del contacto al modal.
                onConfirm={handleConfirmDelete} // Función que se ejecuta al confirmar la eliminación.
                onCancel={handleCancelDelete} // Función que se ejecuta al cancelar la eliminación.
            />
        </div>
    );
};

ContactCard.propTypes = {
    contact: PropTypes.object.isRequired,
    onDelete: PropTypes.func.isRequired,
};
