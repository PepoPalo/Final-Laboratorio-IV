import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export function MozoForm() {

    const { id } = useParams()
    const history = useHistory()

    const [mozo, setMozo] = useState({
        numero: '',
        nombre: ''
    })

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/mozos/${id}`)
                .then(response => setMozo(response.data))
                .catch(error => alert(error))
        }
    }, [])

function handleOnChange(event, campo) {
        setMozo({
            ...mozo,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/mozos/${id}`, mozo)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/mozos/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/mozos/", mozo)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/mozos/")
                }).catch(error => alert(error))
        }
    }
    return (
        <>
            {id && <h1>Editando mozo</h1>}
            {!id && <h1>Nuevo mozo</h1>}
            <form onSubmit={(event) => guardar(event)}>
                <div className="form-group">
                    <label>Nombre</label>
                    <input type="text" className="form-control" value={mozo.nombre} onChange={(event) => handleOnChange(event, 'nombre')} />
                </div>

                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                    <button onClick={() => history.push("/mozos/")} className="btn btn-primary">cancelar</button>
                </div>

            </form>
            

        </>
    );
}