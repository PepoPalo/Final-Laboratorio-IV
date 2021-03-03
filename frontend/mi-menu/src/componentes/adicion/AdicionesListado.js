import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export function AdicionesListado() {
  const [lista, setLista] = useState([])
  useEffect(() => {
    getAdiciones()
  }, [])

  function getAdiciones() {
    axios.get("http://localhost:5000/adiciones/")
      .then((response) => setLista(response.data.filter(factura => factura.numero != null)))
      .catch((error) => alert(error))
  }
  function getAdicion(nro) {
    axios.get(`http://localhost:5000/adiciones/${nro}`)
      .then((response) => {
        alert("Registro borrado correctamente")
        getAdiciones()
      })
      .catch(error => alert(error))
  }
  function getFiltradas(nro) {
    axios.put(`http://localhost:5000/buscar`)
      .then((response) => {
        alert("Registro borrado correctamente")
        getAdiciones()
      })
      .catch(error => alert(error))
  }

  return (
    <div>
      <h1>Adiciones</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Mesa</th>
            <th>Nro Mozo</th>
            <th>Fecha</th>
            <th>Estado</th>
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
                {/* <td>{item.cerrada}</td> */}
                <td>
                <Link className="btn btn-primary" to={"/adiciones/" + item.numero}>Ver</Link> &nbsp;

                </td>
                <td>
                  <Link className="btn btn-warning" to={"/adiciones/" + item.numero}>Editar</Link> &nbsp;
                </td>
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
      <Link className="btn btn-success" to="/adiciones/nueva/">Crear</Link>
    </div>
  )
}