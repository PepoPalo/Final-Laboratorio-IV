from sqlalchemy.orm import relationship
from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datos import db
from dominio.cliente import Cliente

class Adicion(db.Model):
    __tablename__ = 'adiciones'
    numero = Column(Integer(), primary_key=True, autoincrement=True)
    mesa = Column(Integer()), nullable=False)
    nro_mozo = Column(Integer(), ForeignKey('mozos.numero'), nullable=False)
    fecha = Column(String(20), nullable=False)
    detalle = relationship("Detalle")
    