import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';


export function DetalleForm() {

    const { id } = useParams()
    const history = useHistory()

    const [listap, setListaP] = useState([])

    const [producto, setProducto] = useState({
        id: '',
        adicion_numero: id,
        producto_codigo: '',
        cantidad: ''
    })

    useEffect(() => {
        axios.get("http://localhost:5000/productos/")
            .then((response) => {
                setListaP(response.data.filter(producto => producto.codigo != null))
            })
            .catch((error) => alert(error))
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
            axios.post("http://localhost:5000/detalle/", producto)
                .then(response => {
                    history.push(`/facturas/${id}`)
                }).catch(error => alert(error))
    }
    return (
        <>
            <h1>Nuevo producto de factura</h1>
            <form onSubmit={(event) => guardar(event)}>
                
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(event) => handleOnChange(event, 'producto_codigo')}>
                    <option selected>Seleccione Producto</option>
                        {listap.length > 0 && (
                            listap.map(item => (
                            <option key={item.codigo} value={item.codigo}>{item.descripcion}</option>
                            ))
                        )}
                </select>
                <div className="form-group">
                    <label>Cantidad</label>
                    <input type="text" className="form-control" value={producto.cantidad} onChange={(event) => handleOnChange(event, 'cantidad')} />
                </div>
                <div className="float-right">
                    <button type="submit" className="btn btn-primary m-2">Aceptar</button>
                    <button className="btn btn-danger">Cancelar</button>
                </div>
            </form>


        </>
    );
}