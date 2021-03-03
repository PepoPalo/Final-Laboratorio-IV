import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export function AdicionForm() {

    const { numero } = useParams()
    const history = useHistory()

    const [listac, setListaC] = useState([])
    // const [listap, setListaP] = useState([])
    const [, setListaDF] = useState([])

    const [adicion, setadicion] = useState({
        numero: '',
        mesa: '',
        nro_mozo: '',
        fecha: '',
        cerrada: ''
    })
    // const [dadicion, setDadicion] = useState({
    //     id: '',
    //     adicion_numero: numero,
    //     producto_codigo: '',
    //     porcentaje_venta: '',
    //     cantidad: ''

        
    // })


    useEffect(() => {
        

        // axios.get("http://localhost:5000/productos/")
        //     .then((response) => setListaP(response.data.filter(producto => producto.codigo != null)))
        //     .catch((error) => alert(error))

        axios.get("http://localhost:5000/mozos/")
            .then((response) => setListaC(response.data.filter(mozo => mozo.numero != null)))
            .catch((error) => alert(error))

        if (numero) {
            axios.get(`http://localhost:5000/adiciones/${numero}`)
                .then(response => setadicion(response.data))
                .catch(error => alert(error))
            
            axios.get("http://localhost:5000/detalle/")
                .then((response) => setListaDF(response.data.filter(df => df.adicion_numero != null && df.adicion_numero == numero)))
                .catch((error) => alert(error))
        }
    }, [])

    // function handleOnChangeDF(event, campo) {
    //     setDadicion({
    //         ...dadicion,
    //         [campo]: event.target.value
    //     })

    // }

    function handleOnChange(event, campo) {
        setadicion({
            ...adicion,
            [campo]: event.target.value
        })
    }

    // function guardarDadicion(event) {

    //     event.preventDefault()
    //     event.stopPropagation()
    //     axios.post("http://localhost:5000/detalle/", dadicion)
    //         .then(response => {
    //             alert("se ha agregado el registro")
    //             history.push(`/adiciones/${numero}`)
    //             //history.go(`/adicions/${id}`)
    //         }).catch(error => alert(error))
    // }

    function guardar(event) {
        event.preventDefault()
        event.stopPropagation()
        if (numero) {
            axios.put(`http://localhost:5000/adiciones/${numero}`, adicion)
                .then(response => {
                    alert("se ha modificado el registro")
                    history.push(`/adiciones`)
                })
                .catch(error => alert(error))
        }
        else {
            axios.post("http://localhost:5000/adiciones/", adicion)
                .then(response => {
                    alert("se ha agregado el registro")
                    history.push(`/adiciones`)
                }).catch(error => alert(error))
        }
    }





    return (
        <>
            {numero && <h1>Editando adicion</h1>}
            {!numero && <h1>Nueva adicion</h1>}
            <form onSubmit={(event) => guardar(event)}>
                <div className="form-group">
                    <label>Mesa</label>
                    <input type="text" className="form-control" value={adicion.mesa} onChange={(event) => handleOnChange(event, 'mesa')} />

                </div>
              
                <div className="form-group">
                    <label>Fecha</label>
                    <input type="text" className="form-control" value={adicion.fecha} onChange={(event) => handleOnChange(event, 'fecha')} />
                </div>

                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(event) => handleOnChange(event, 'numero')}>
                        <option selected>Seleccione mozo</option>
                            {listac.length > 0 && (
                                listac.map(item => (
                                <option key={item.numero} value={item.numero}>{item.nombre}</option>
                                ))
                            )}
                    </select>

                <div className="float-right">
                    <button type="submit" className="btn btn-success mr-2">Aceptar</button>
                    <button onClick={() => history.push("/adiciones")} className="btn btn-danger">Cancelar</button>
                </div>
            </form>

            {/* {numero &&<>
                <form onSubmit={(event) => guardarDadicion(event)}>

                    <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example" onChange={(event) => handleOnChangeDF(event, 'producto_codigo')}>
                        <option selected>Seleccione Producto</option>
                            {listap.length > 0 && (
                                listap.map(item => (
                                <option key={item.codigo} value={item.codigo}>{item.nombre}</option>
                                ))
                            )}
                    </select>

                    <div className="form-group">
                        <label>Cantidad</label>
                        <input type="text" className="form-control" value={dadicion.cantidad} onChange={(event) => handleOnChangeDF(event, 'cantidad')} />
                    </div>

                    <div className="float-right">
                        <button type="submit" className="btn btn-primary mr-2">Aceptar</button>
                        <button onClick={() => history.push("/adiciones")} className="btn btn-warning">Finalizar</button>
                    </div>
                </form>
{/* 
                <select className="form-select form-select-lg mb-3" aria-label=".form-select-lg example">
                        <option selected>Ver Carrito</option>
                            {listadf.length > 0 && (
                                listadf.map(item => (
                                <option key={item.producto_codigo} value={item.producto_codigo}>
                                    {   
                                        listap.find(cod => cod.codigo == item.producto_codigo).nombre + " - " +item.cantidad
                                    }
                                    </option>
                                ))
                            )}
                    </select> */}

                {/* <table className="table">
                    <thead>
                        <tr>
                            <th>Codigo</th>
                            <th>Nombre</th>
                            <th>Descripcion</th>
                            <th>Precio u</th>
                            <th>Stock</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listap.length > 0 && (
                            listap.map(item => (
                                <tr key={item.codigo}>
                                    <td>{item.codigo}</td>
                                    <td>{item.nombre}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.precio_unitario}</td>
                                    <td>{item.stock}</td>
                                </tr>))
                        )}
                        {listap.length === 0 && (
                            <tr>
                                <td colSpan="3">
                                    <h2>No hay datos</h2>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table> */}
                {/* </>} */} 
         </>
    );
}