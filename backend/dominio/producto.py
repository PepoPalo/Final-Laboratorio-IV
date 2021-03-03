from sqlalchemy import Column, Integer, String, Numeric
from sqlalchemy.orm import relationship
from datos import db

class Producto(db.Model):
    __tablename__ = 'productos'
    codigo = Column(Integer, primary_key=True, autoincrement=True)
    tipo = Column(String(10), nullable=False)
    descripcion = Column(String(120), nullable=False)
    costo = Column(Numeric())
    porcentaje_ganancia = Column(Numeric())
    detalle = relationship("Detalle")
