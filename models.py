from sqlalchemy import create_engine, Column, Integer, String, Date, Numeric, ForeignKey
from sqlalchemy.orm import sessionmaker
from sqlalchemy.orm import declarative_base, relationship

url = "postgresql+psycopg2://postgres:Shreya03@localhost:5432/dancers_db"
engine = create_engine(url)

Session = sessionmaker(bind=engine)
session = Session()

Base = declarative_base()

class Dancer(Base):
    __tablename__ = 'dancers'

    id = Column(Integer, primary_key=True, autoincrement=False)
    name = Column(String)
    email = Column(String)
    joining_date = Column(Date)
    salary = Column(Numeric(10, 2))
    style_id = Column(Integer, ForeignKey('dance_styles.style_id'))
    style = relationship("DanceStyle", back_populates="dancers")


class DanceStyle(Base):
    __tablename__ = 'dance_styles'

    style_id = Column(Integer, primary_key=True, autoincrement=False)
    style_name = Column(String)
    dancers = relationship("Dancer", back_populates="style")

class User(Base):
    __tablename__ = 'users'

    user_id = Column(Integer, primary_key=True, autoincrement=False)
    email = Column(String, unique=True)
    user_name = Column(String)
    role = Column(String)
    
# Base.metadata.drop_all(engine)
# Base.metadata.create_all(engine)