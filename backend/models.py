from sqlalchemy import create_engine, Column, Integer, String, Date, Numeric, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import os

# LOCAL_DATABASE_URL = "postgresql+psycopg2://postgres:Shreya03@localhost:5432/dancers_db"
RENDER_DATABASE_URL = "postgresql://ssha:ZateStW6ucyfgA2JXeHrwCWwVP2P7Ezq@dpg-d54fquili9vc73efqtug-a/dancers_db_3tqd"

DATABASE_URL = os.getenv("DATABASE_URL", RENDER_DATABASE_URL)

engine = create_engine(DATABASE_URL)


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
    password = Column(String)

Base.metadata.create_all(engine)
