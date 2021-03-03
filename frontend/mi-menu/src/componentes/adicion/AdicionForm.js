import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export function AdicionForm() {

    const { numero } = useParams()
    const [adicion, setadicion] = useState({
        numero: numero,
        mesa: '',
        nro_mozo: '',
        fecha: '',
        cerrada: '',
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
            alert(adicion.nro_mozo)
            axios.get(`http://localhost:5000/mozos/${adicion.nro_mozo}`)
            .then(response => setMozo(response.data))
            .catch(error => alert(error))
            alert("entró")
          
        }
        
    }, [])
function traeMozo(number){
   //number = adicion.nro_mozo
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
                //history.go(`/adicions/${id}`)
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
               
                {/* <div className="form-group">
                    <label>Mozo</label>
                    <input type="text" className="form-control" value={mozo.nombre} onChange={(event) => handleOnChange(event, 'mesa')} />

                </div> */}
               <label>Mozo</label>
               <div>

               <select className="form-group" aria-label=".form-select-lg example" onChange={(event) => {handleOnChange(event, 'nro_mozo') }}>
                
                <option   selected> {mozo.nombre}</option>
                    {listac.length > 0 && (
                        listac.map(item => (
                        <option key={item.numero} value={item.numero}>{item.nombre}</option>
                        ))
                    )}
            </select>

               </div>
               

                    <div className="form-group">
                    <label>Porcentaje venta</label>
                    <input type="number"  min="1" max="100" placeholder="1.0" step="0.1" className="form-control" value={adicion.porcentaje_venta} onChange={(event) => handleOnChange(event, 'porcentaje_venta')} />
                </div>

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
                    </select> 

               <table className="table">
                    <thead>
                        <tr>
                        <th>Codigo</th>
            <th>Tipo</th>
            <th>Descripcion</th>
            <th>Costo</th>
            <th>Porcentaje de ganancia</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {listap.length > 0 && (
                            listap.map(item => (
                                <tr key={item.codigo}>
                                    <td>{item.codigo}</td>
                                    <td>{item.tipo}</td>
                                    <td>{item.descripcion}</td>
                                    <td>{item.costo}</td>
                                    <td>{item.porcentaje_ganancia}</td>
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
                </table> 
                 </>} */}
         </>
    );
}