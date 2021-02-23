from dominio.detalle_factura import DetalleFactura
from datos import db

class DFacturasRepo():
    def get_all(self):
        return DetalleFactura.query.all()

    def agregar(self, data):
        df = DetalleFactura(**data)
        db.session.add(df)
        db.session.commit()
        return df
    
    def get_by_id(self, id):
        return DetalleFactura.query.get(id)

    def borrar(self, id):
        df = DetalleFactura.query.get(id)
        if df:
            db.session.delete(df)
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        df = DetalleFactura.query.get(id)
        if df:
            df.id = data['id']
            df.factura_numero = data['factura_numero']
            df.producto_codigo = data['producto_codigo']
            df.cantidad = data['cantidad']
            db.session.commit()
            return True
        return False