import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import axios from 'axios';
import {DetalleListado} from '../detalle/DetalleListado'

export function AdicionForm() {

    const { numero } = useParams()
    const [adicion, setadicion] = useState({
        numero: numero,
        mesa: '',
        nro_mozo: '',
        fecha: '',
        cerrada: false,
        porcentaje_venta:''
    })
    const [mozo, setMozo] = useState({
        numero: adicion.nro_mozo,
        nombre: ''
    })

    const history = useHistory()

    const [listac, setListaC] = useState([])
     const [listap, setListaP] = useState([])
    const [listadf, setListaDF] = useState([])

  
    const [dadicion, setDadicion] = useState({
        id: '',
        adicion_numero: numero,
        producto_codigo: '',
        porcentaje_venta: '',
        cantidad: ''

        
    })
   


    useEffect(() => {
        

        axios.get("http://localhost:5000/productos/")
            .then((response) => setListaP(response.data.filter(producto => producto.codigo != null)))
            .catch((error) => alert(error))

        axios.get("http://localhost:5000/mozos/")
            .then((response) => setListaC(response.data.filter(m => m.numero != null)))
           
            .catch((error) => alert(error))

        if (numero) {
            axios.get(`http://localhost:5000/adiciones/${numero}`)
                .then(response => setadicion(response.data))
             
                .catch(error => alert(error))

               
           
           
                 
        }
        if(adicion.nro_mozo != ''){
            axios.get(`http://localhost:5000/mozos/${adicion.nro_mozo}`)
            .then(response => setMozo(response.data))
            .catch(error => alert(error))
          
        }
        
    }, [])
function traeMozo(number){
    axios.get(`http://localhost:5000/mozos/${number}`)
                .then(response => setMozo(response.data))
                .catch(error => alert(error))
                alert(number)
    
} 
        function handleOnChange(event, campo) {
    setadicion({
        ...adicion,
        [campo]: event.target.value
    })
        }
   
    function handleOnChanges(event, campo) {
        setMozo({
            ...mozo,
            [campo]: event.target.value
        })
    }

   

    function guardarDadicion(event) {

        event.preventDefault()
        event.stopPropagation()
        axios.post("http://localhost:5000/detalle/", dadicion)
            .then(response => {
                alert("se ha agregado el registro")
                history.push(`/adiciones/${numero}`)
            }).catch(error => alert(error))
    }

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
                    history.push(`/adiciones/${response.data.numero}`)
                }).catch(error => alert(error))
        }
    }

    return (
        <>  
            {numero && <h1>Editando adicion</h1>}
            {!numero && <h1>Nueva adicion</h1>}
            <form onSubmit={(event) => guardar(event)}>
                
                <div className="row">
                    <div className="form-group col-2">
                        <label>Mesa</label>
                        <input type="text" className="form-control" placeholder="0" value={adicion.mesa} onChange={(event) => handleOnChange(event, 'mesa')} />

                    </div>
                    {/* <div className="form-group col-3">
                        <label>Fecha</label>
                        <input type="text" className="form-control" placeholder="YYYY-MM-DD" value={adicion.fecha} onChange={(event) => handleOnChange(event, 'fecha')} />
                    </div> */}
                    <div className="form-group col-3">
                        <label>Fecha</label>
                        <input type="date" min="2018-01-01" max="2023-12-31" className="form-control" placeholder="YYYY-MM-DD" value={adicion.fecha} onChange={(event) => handleOnChange(event, 'fecha')} />
                    </div>
                    <div className="form-group col-2">
                        <label>Porcentaje venta</label>
                        <input type="number"  min="1" max="100" placeholder="1.0" step="0.1" className="form-control" value={adicion.porcentaje_venta} onChange={(event) => handleOnChange(event, 'porcentaje_venta')} />
                    </div>
                    <div className="form-group col-2">
                        <label>Mozo</label>
                        <select key={0} value={adicion.nro_mozo} className="form-control" aria-label=".form-select-lg example" onChange={(event) => {handleOnChange(event, 'nro_mozo') }}>
                            {listac.length > 0 && (
                                listac.map(item => (
                                <option key={item.numero} value={item.numero}>{item.nombre}</option>
                                ))
                            )}
                        </select>
                    </div>
                </div>

                <div className="float-right">
                    <button type="submit" className="btn btn-success mr-2">Aceptar</button>
                    <button onClick={() => history.push("/adiciones")} className="btn btn-danger">Cancelar</button>
                </div>
            </form>
        {!adicion.cerrada && <Link className="btn btn-primary col-1 w-auto pl-5" to={`/producto/${numero}`}>+</Link>}
        {numero && <DetalleListado numero={ numero } />}
        </>
    );
}