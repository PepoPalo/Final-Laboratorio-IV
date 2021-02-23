from dominio.cliente import Cliente
from datos import db

class ClientesRepo():
    def get_all(self):
        return Cliente.query.all()

    def agregar(self, data):
        cliente = Cliente(**data)
        db.session.add(cliente)
        db.session.commit()
        return cliente

    def get_by_id(self,id):
        return Cliente.query.get(id)

    def borrar(self,id):
        cl = Cliente.query.get(id)
        if cl:
            db.session.delete(cl)
            db.session.commit()
            return True
        return False

    def modificar(self, id, data):
        cl = Cliente.query.get(id)
        if cl:
            cl.id = data['id']
            cl.nombre = data['nombre']
            cl.direccion = data.get('direccion',None)
            cl.telefono = data.get('telefono',None)
            cl.cuit = data['cuit']
            db.session.commit()
            return True
        return False
