import React from "react";
import PropTypes from 'prop-types';

export const ConfirmDeleteModal = ({ show, onConfirm, onCancel }) => {
     // Es una función de componente de React que recibe tres props:
    // `show`, `onConfirm`, y `onCancel`.

    // `show`: Esta prop controla si el modal debe mostrarse o no. Es un valor booleano (`true` o `false`).
    // `onConfirm`: Esta prop es una función que se ejecuta cuando el usuario confirma la acción (en este caso, la eliminación).
    // `onCancel`: Esta prop es una función que se ejecuta cuando el usuario decide cancelar la acción.
    if (!show) {
         // Esta condición verifica si `show` es `false`. 
        // Si `show` es `false`, el modal no se muestra y la función retorna `null`, es decir, no renderiza nada en la interfaz.
        return null; //No mostrar nada si show es falso.
    }

    return (


        <div className='modal' style={{ display: 'block', backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className='modal-dialog'>
                <div className='modal-content'>
                    <div className='modal-header'>
                        <h5 className='modal-title'>Confirmar eliminar
                        </h5>
                    </div>
                    <div className='modal-body'>
                        <p>¿Estas seguro que quieres eliminar el contacto?</p>
                    </div>
                    <div className='modal-footer'>
                        <button type='button' className='btn btn-secondary' onClick={onCancel}>
                            Cancelar
                        </button>
                        <button type='button' className='btn btn-danger' onClick={onConfirm}>
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

ConfirmDeleteModal.propTypes = {
    show: PropTypes.bool.isRequired,
    contactName: PropTypes.string.isRequired,
    onConfirm: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
};