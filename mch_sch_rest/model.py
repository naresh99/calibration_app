# machine_model.py
from sqlalchemy import create_engine, Column, Integer, String, Date, Sequence, ForeignKey
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class Machine(Base):
    __tablename__ = 'machines'

    machine_id = Column(Integer, Sequence('setup_s'), primary_key=True)
    machine_name = Column(String, nullable=False)
    manufacturer = Column(String)
    model = Column(String)
    serial = Column(String)
    type = Column(String)
    location = Column(String)
    installation_date = Column(Date)
    status = Column(String)
    usage = Column(String)
    department = Column(String)
    owner = Column(String)

class Schedule(Base):
    __tablename__ = 'schedules'

    schedule_id = Column(Integer, Sequence('setup_s'), primary_key=True)
    schedule_name = Column(String, nullable=False)
    schedule_number = Column(String, nullable=False)
    instrument_type = Column(String)
    calibration_frequency = Column(String, nullable=False)
    effective_date = Column(Date)
    year = Column(Integer, nullable=False)
    reference_sop = Column(String)
    prepared_by = Column(String)
    prepared_date = Column(String)   

class MachineSchedule(Base):
    __tablename__ = 'machine_schedules'

    schedule_routine_id = Column(Integer, Sequence('setup_s'), primary_key=True)
    schedule_id = Column(Integer, ForeignKey('schedules.schedule_id'))
    machine_id = Column(Integer, ForeignKey('machines.machine_id'))     
