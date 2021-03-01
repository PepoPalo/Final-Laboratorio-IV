from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, ForeignKey, Numeric
from datos import db

class Detalle(db.Model):
    __tablename__ = 'detalles'
    id = Column(Integer(), primary_key=True, autoincrement=True)
    adicion_numero = Column(Integer(), ForeignKey('adiciones.numero'), nullable=False)
    producto_codigo = Column(Integer(), ForeignKey('productos.codigo'), nullable=False)
    cantidad = Column(Integer())
