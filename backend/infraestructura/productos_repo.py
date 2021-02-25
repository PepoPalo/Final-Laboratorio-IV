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
            p.codigo = data['id']
            p.tipo = data['tipo']
            p.descripcion = data.get('descripcion', None)
            p.costo = data['costo']
            p.porcentaje_ganancia = data['porcentaje_ganancia']
            db.session.commit()
            return True
        return False