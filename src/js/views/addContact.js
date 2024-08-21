import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link, useNavigate, useParams } from "react-router-dom";

export const AddContact = () => {

    // `useContext` es un hook de React que permite acceder al contexto global de la aplicación.
    // En este caso, estamos accediendo a `actions` y `store` desde el contexto global `Context`.
    // `actions`: Contiene funciones que realizan acciones en el estado global, como añadir o editar contactos.
    // `store`: Contiene el estado global, como la lista de contactos.
    const { actions, store } = useContext(Context);

    // `useNavigate` es un hook de React Router que permite navegar programáticamente entre rutas.
    const navigate = useNavigate();

    // `useParams` es un hook de React Router que devuelve un objeto con los parámetros de la URL actual.
    // Aquí, estamos obteniendo el parámetro `id` de la URL, que se utiliza para determinar si estamos editando un contacto existente.
    const { id } = useParams();

    // `useState` es un hook de React que permite gestionar el estado dentro de un componente funcional.
    // Aquí, `contact` es el estado que contiene los datos del contacto que se está creando o editando.
    // `setContact` es la función utilizada para actualizar el estado de `contact`.
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: ""
    });

    // `useEffect` es un hook de React que se ejecuta después de que el componente se haya renderizado.
    // Se utiliza para realizar efectos secundarios, como cargar datos.
    useEffect(() => {
        // Si existe un `id`, significa que estamos en modo edición, no en modo creación.
        if (id) {
            // Busca en la lista de contactos del store el contacto que coincide con el `id` proporcionado en la URL.
            const existingContact = store.contacts.find(contact => contact.id === parseInt(id));
            // Si se encuentra un contacto con el ID dado, actualiza el estado `contact` con los datos de ese contacto.
            if (existingContact) {
                setContact(existingContact);
            }
        }
    }, [id, store.contacts]); 
    // El segundo argumento del `useEffect` es una lista de dependencias. 
    // `useEffect` se ejecutará cada vez que cambien `id` o `store.contacts`.

    // `handleChange` es una función que se ejecuta cada vez que el usuario cambia el valor de un campo en el formulario.
    const handleChange = (event) => {
        // Actualiza el estado `contact` con el nuevo valor del campo que el usuario ha cambiado.
        // `event.target.name` se refiere al nombre del campo (por ejemplo, "name", "email").
        // `event.target.value` se refiere al valor que el usuario ha introducido en ese campo.
        setContact({
            ...contact, // Copia los valores anteriores del estado `contact`.
            [event.target.name]: event.target.value // Sobrescribe solo el campo que ha cambiado.
        });
    };

    // `handleSubmit` es una función que se ejecuta cuando el usuario envía el formulario.
    const handleSubmit = (event) => {
        // `event.preventDefault()` evita que el formulario se envíe de forma predeterminada, 
        // lo que provocaría que la página se recargue.
        event.preventDefault();

        if (id) {
            // Si existe un `id`, significa que estamos en modo edición y debemos actualizar el contacto existente.
            actions.editContact(id, contact);
        } else {
            // Si no hay `id`, significa que estamos en modo creación y debemos añadir un nuevo contacto.
            actions.addContact(contact);
        }

        // Después de guardar o actualizar el contacto, navega de vuelta a la página principal (lista de contactos).
        navigate("/");
    };

    return (
        <div className='container'>
            <div className= 'd-flex justify-content-between my-3'>
                <Link to='/' className='btn btn-secondary'>Volver a la lista de contactos</Link>

            </div>

        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label>Nombre completo</label>
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
                <label>Correo electrónico</label>
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
                <label>Número de teléfono</label>
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
                <label>Dirección</label>
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
                {id ? "Guardar cambios" : "Añadir contacto"}
            </button>
        </form>
        </div>
    );
};
