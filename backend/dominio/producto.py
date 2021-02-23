from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Float
from datos import db

class Producto(db.Model):
    __tablename__: 'productos'
    codigo = Column(Integer(), primary_key=True, autoincrement=True)
    nombre = Column(String(80), nullable=False)
    descripcion = Column(String(120))
    precio_unitario = Column(Float(), nullable=False)
    stock = Column(Integer(), nullable=False)
