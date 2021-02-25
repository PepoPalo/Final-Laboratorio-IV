from dominio.mozo import Mozo
from datos import db

class ClientesRepo():
    def get_all(self):
        return Mozo.query.all()

    def agregar(self, data):
        mozo = Mozo(**data)
        db.session.add(mozo)
        db.session.commit()
        return mozo

    def get_by_id(self,id):
        return Mozo.query.get(id)

    def borrar(self,id):
        m = Mozo.query.get(id)
        if m:
            db.session.delete(m)
            db.session.commit()
            return True
        return False

    def modificar(self, id, data):
        m = Mozo.query.get(id)
        if m:
            m.numero = data['id']
            m.nombre = data['nombre']
            db.session.commit()
            return True
        return False
