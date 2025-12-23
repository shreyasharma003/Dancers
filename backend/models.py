from sqlalchemy import create_engine, Column, Integer, String, Date, Numeric, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Get database URL from environment variable
DATABASE_URL = os.getenv("DATABASE_URL")

if not DATABASE_URL:
    raise ValueError("DATABASE_URL environment variable is not set. Please check your .env file.")

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
