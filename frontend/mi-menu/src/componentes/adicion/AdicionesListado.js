import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';


export function AdicionesListado() {
  const [ mozo,setMozo ] = useState(
{
  mozo:''
}
   
  )
 const [fechas,setFechas] =  useState(
   {
     desde:'',
     hasta:''
   }
 )
  const [lista, setLista] = useState([])
 
  useEffect(() => {
    getAdiciones()
  }, [])

  function getAdiciones() {
    axios.get("http://localhost:5000/adiciones/")
      .then((response) => setLista(response.data.filter(factura => factura.numero != null)))
      .catch((error) => alert(error))
  }
  // function getAdicion(nro) {
  //   axios.get(`http://localhost:5000/adiciones/${nro}`)
  //     .then((response) => {
  //       alert("Registro borrado correctamente")
  //       getAdiciones()
  //     })
  //     .catch(error => alert(error))
  // }
  function getFiltradas() {
    axios.post(`http://localhost:5000/buscar/${mozo.mozo}`,fechas)
      .then((response) => 
        setLista(response.data)
      )
      .catch(error => alert(error))
  }
  function getPorMozo(nro)
  {

    axios.put(`http://localhost:5000/buscar/${nro}`)
      .then((response) => setLista(response.data.filter(factura => factura.numero != null))
      )
      .catch(error => alert(error))

  }

  function handleOnChange(event,campo){
    setFechas({
      ...fechas,
      [campo]: event.target.value
  })

  }

  function handleMozo(event,campo){
    setMozo({
      ...mozo,
      [campo]: event.target.value
  })

  }
 
  return (
    <div>
      <h1>Adiciones</h1>
      <div className="row">
        <label htmlFor="start">Desde:</label>
        <input type="date" id="desde" name="trip-start"
          min="2018-01-01" max="2023-12-31" onChange={(event) => handleOnChange(event, 'desde')}></input>

        <label htmlFor="start">Hasta:</label>
        <input type="date" id="hasta" name="trip-start"
          min="2018-01-01" max="2023-12-31" onChange={(event) => handleOnChange(event, 'hasta')}></input>
      
        <input type="text" className="input" onChange={(event) => handleMozo(event, 'mozo')}></input>
        
        <button onClick={()=>getFiltradas()}> BUSCAR</button>
      </div>
      
      <Link className="btn btn-success" to="/adiciones/nueva/">Crear</Link>
      <table className="table">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Mesa</th>
            <th>Nro Mozo</th>
            <th>Fecha</th>

            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {lista.length > 0 && (
            lista.map(item => (
              <tr key={item.numero}>
                <td>{item.numero}</td>
                <td>{item.mesa}</td>
                <td>{item.nro_mozo}</td>
                <td>{item.fecha}</td>
                <td>
                <Link className="btn btn-primary" to={"/adiciones/" + item.numero}>Ver</Link> &nbsp;

                </td>
               {!item.cerrada &&(
                <td>
                   <Link className="btn btn-warning" to={"/adiciones/" + item.numero}>Editar</Link> &nbsp;
                </td>

               )}
                {item.cerrada &&(
                <td >
                   <button className="btn btn-warning"   to={"/adiciones/" + item.numero} disabled>Editar</button> &nbsp;
                </td>

               )}
                
              </tr>))
          )}
          {lista.length === 0 && (
            <tr>
              <td colSpan="3">
                <h2>No hay datos</h2>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      
    </div>
  )
}