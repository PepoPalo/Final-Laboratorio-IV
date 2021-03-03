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
                    <label>Descripcion</label>
                    <input type="text" className="form-control" value={producto.descripcion} onChange={(event) => handleOnChange(event, 'descripcion')} />
                </div>
                <div className="row text-center align-items-center">
                    <div className="form-group col-2">
                        <label>Tipo</label>
                        <select className="form-control" onChange={(event) => handleOnChange(event, 'tipo')}>
                            <option selected value={producto.tipo}>{producto.tipo}</option>
                            <option value="Plato">Plato</option>
                            <option value="Bebida">Bebida</option>
                        </select>
                    </div>
                    
                    
                    <div className="form-group col-2">
                        <label >Costo</label>
                        <input type="text" className="form-control" placeholder="00.00" value={producto.costo} onChange={(event) => handleOnChange(event, 'costo')} />
                    </div>

                    <div className="form-group col-3">
                        <label >Porcentaje de ganancia</label>
                        <input type="text" className="form-control" placeholder="0" value={producto.porcentaje_ganancia} onChange={(event) => handleOnChange(event, 'porcentaje_ganancia')} />
                    </div>

                    <div className="col-3">
                        <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                        <button onClick={() => history.push("/productos/")} className="btn btn-danger">Cancelar</button>
                    </div>
                </div>

            </form>
            

        </>
    );
}