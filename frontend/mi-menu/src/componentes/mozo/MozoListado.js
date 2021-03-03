import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export function MozoListado() {
  const [lista, setLista] = useState([])
  useEffect(() => {
    getMozos()
  }, [])

  function getMozos() {
    axios.get("http://localhost:5000/mozos/")
      .then((response) => setLista(response.data.filter(mozo => mozo.numero != null)))
      .catch((error) => alert(error))
      
  }


  function borrar(id) {
    axios.delete(`http://localhost:5000/mozos/${id}`)
      .then((response) => {
        alert("Registro borrado correctamente")
        getMozos()
      })
      .catch(error => alert(error))
  }



  return (
    <div>
      <h1>Mozos</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Numero</th>
            <th>Nombre</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {lista.length > 0 && (
            lista.map(item => (
              <tr key={item.numero}>
                <td>{item.numero}</td>
                <td>{item.nombre}</td>
                <td>
                  <Link className="btn btn-primary" to={"/mozos/" + item.numero}>Editar</Link> &nbsp;
                    <button className="btn btn-primary" onClick={() => borrar(item.numero)}>Borrar</button>
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
      <Link className="btn btn-success" to="/mozos/nuevo/">Nuevo</Link>
    </div>
  )
}
