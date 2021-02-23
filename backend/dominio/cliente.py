from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datos import db

class Cliente(db.Model):
    __tablename__ = 'clientes'
    id = Column(Integer, primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    direccion = Column(String(120))
    telefono = Column(String(50))
    cuit = Column(Integer, nullable=False, unique=True)
