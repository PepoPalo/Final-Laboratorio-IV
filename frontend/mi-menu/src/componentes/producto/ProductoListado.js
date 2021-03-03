import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


export function ProductoListado() {
  const [lista, setLista] = useState([])
  useEffect(() => {
    getProducto()
  }, [])

  function getProducto() {
    axios.get("http://localhost:5000/productos/")
      .then((response) => setLista(response.data.filter(producto => producto.codigo != null)))
      .catch((error) => alert(error))
      
  }


  function borrar(id) {
    axios.delete(`http://localhost:5000/productos/${id}`)
      .then((response) => {
        alert("Registro borrado correctamente")
        getProducto()
      })
      .catch(error => alert(error))
  }



  return (
    <div>
      <h1>Productos</h1>
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
          {lista.length > 0 && (
            lista.map(item => (
              <tr key={item.codigo}>
                <td>{item.codigo}</td>
                <td>{item.tipo}</td>
                <td>{item.descripcion}</td>
                <td>{item.costo}</td>
                <td>{item.porcentaje_ganancia}</td>
                <td>
                  <Link className="btn btn-primary" to={"/productos/" + item.codigo}>Editar</Link> &nbsp;
                    <button className="btn btn-primary" onClick={() => borrar(item.codigo)}>Borrar</button>
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
      <Link className="btn btn-success" to="/productos/nuevo/">Nuevo</Link>
    </div>
  )
}
