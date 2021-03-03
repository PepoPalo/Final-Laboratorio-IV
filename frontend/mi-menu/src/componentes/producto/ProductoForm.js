import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export function ProductoForm() {

    const { id } = useParams()
    const history = useHistory()

    const [producto, setProducto] = useState({
        codigo: '',
        tipo: '',
        descripcion: '',
        costo: '',
        porcentaje_venta: '',
        porcentaje_ganancia: ''
    })

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:5000/productos/${id}`)
                .then(response => setProducto(response.data))
                .catch(error => alert(error))
        }
    }, [])

function handleOnChange(event, campo) {
        setProducto({
            ...producto,
            [campo]: event.target.value
        })
    }

    function guardar(event) {

        event.preventDefault()
        event.stopPropagation()
        if (id) {
            axios.put(`http://localhost:5000/productos/${id}`, producto)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push("/productos/")
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/productos/", producto)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push("/productos/")
                }).catch(error => alert(error))
        }
    }
    return (
        <>
            {id && <h1>Editando producto</h1>}
            {!id && <h1>Nuevo producto</h1>}
            <form onSubmit={(event) => guardar(event)}>
                <div className="form-group">
                    <label>Tipo</label>
                    <input type="text" className="form-control" value={producto.tipo} onChange={(event) => handleOnChange(event, 'tipo')} />
                </div>
                <div className="form-group">
                    <label>Descripcion</label>
                    <input type="text" className="form-control" value={producto.descripcion} onChange={(event) => handleOnChange(event, 'descripcion')} />

                </div>
                <div className="form-group">
                    <label>Costo</label>
                    <input type="text" className="form-control" value={producto.costo} onChange={(event) => handleOnChange(event, 'costo')} />
                </div>

                <div className="form-group">
                    <label>Porcentaje de ganancia</label>
                    <input type="text" className="form-control" value={producto.porcentaje_ganancia} onChange={(event) => handleOnChange(event, 'porcentaje_ganancia')} />
                </div>
                <div className="form-group">
                    <label>Porcentaje de venta</label>
                    <input type="text" className="form-control" value={producto.porcentaje_venta} onChange={(event) => handleOnChange(event, 'porcentaje_venta')} />
                </div>

                <div className="float-right">
                    <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                    <button onClick={() => history.push("/productos/")} className="btn btn-primary">cancelar</button>
                </div>


            </form>
            

        </>
    );
}