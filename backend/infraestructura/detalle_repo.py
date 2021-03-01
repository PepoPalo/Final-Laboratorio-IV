from dominio.detalle import Detalle
from dominio.producto import Producto
from datos import db

class DetallesRepo():
    def get_all(self):
        return Detalle.query.all()

    def agregar(self, data):
        detalle = Detalle(**data)
        db.session.add(detalle)
        db.session.commit()
        return detalle
    
    def get_by_id(self, id):
        return Detalle.query.get(id)

    def borrar(self, id):
        detalle = Detalle.query.get(id)
        if detalle:
            db.session.delete(detalle)
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        detalle = Detalle.query.get(id)
        if detalle:
            detalle.id = data['id']
            detalle.adicion_numero = data['adicion_numero']
            detalle.producto_codigo = data['producto_codigo']
            detalle.cantidad = data['cantidad']
            db.session.commit()
            return True
        return False