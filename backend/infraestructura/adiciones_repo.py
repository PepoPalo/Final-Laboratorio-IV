from dominio.adicion import Adicion
from datos import db

class AdicionesRepo():
    def get_all(self):
        return Adicion.query.all()

    def agregar(self, data):
        a = Adicion(**data)
        db.session.add(a)
        db.session.commit()
        return a
    
    def get_by_id(self, id):
        return Adicion.query.get(id)

    def borrar(self, id):
        a = Adicion.query.get(id)
        if a:
            db.session.delete(a)
            db.session.commit()
            return True
        return False

    def modificar(self,id,data):
        a = Adicion.query.get(id)
        if a:
            a.id = data['id']
            a.mesa = data['mesa']
            a.nro_mozo = data['nro_mozo']
            a.fecha = data['fecha']
            db.session.commit()
            return True
        return False