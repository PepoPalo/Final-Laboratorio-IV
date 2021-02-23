from dominio.factura import Factura
from datos import db

class FacturasRepo():
    def get_all(self):
        return Factura.query.all()

    def agregar(self, data):
        f = Factura(**data)
        db.session.add(f)
        db.session.commit()
        return f
    
    def get_by_id(self, id):
        return Factura.query.get(id)

    def borrar(self, id):
        f = Factura.query.get(id)
        if f:
            db.session.delete(f)
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        f = Factura.query.get(id)
        if f:
            f.numero = data['numero']
            f.tipo = data['tipo']
            f.punto_venta = data['punto_venta']
            f.fecha = data['fecha']
            f.cliente_id = data['cliente_id']
            db.session.commit()
            return True
        return False