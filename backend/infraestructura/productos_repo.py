from dominio.producto import Producto
from datos import db


class ProductosRepo():
    def get_all(self):
        return Producto.query.all()

    def agregar(self, data):
        p = Producto(**data)
        db.session.add(p)
        db.session.commit()
        return p
    
    def get_by_id(self, id):
        return Producto.query.get(id)

    def borrar(self,id):
        p = Producto.query.get(id)
        if p:
            db.session.delete(p)
            db.session.commit()
            return True
        return False

    def modificar(self, id, data):
        p = Producto.query.get(id)
        if p:
            p.codigo = data['codigo']
            p.nombre = data['nombre']
            p.descripcion = data.get('descripcion', None)
            p.precio_unitario = data['precio_unitario']
            p.stock = data['stock']
            db.session.commit()
            return True
        return False