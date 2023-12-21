import json
import psycopg2
from sqlalchemy import create_engine, Column, Integer, String, Date, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from json import JSONEncoder
from datetime import date


Base = declarative_base()

# Define your model
class Machine(Base):
    __tablename__ = 'machines'

    machine_id = Column(Integer, Sequence('machine_id_seq'), primary_key=True)
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

def create_session():
    # Connect to the PostgreSQL database using the SQLAlchemy engine
    #db_url = os.environ.get('DB_URL')  # Replace with your PostgreSQL connection string
    db_url = 'postgresql://postgres:OVzMHuedySKPHnYxO5vz@aurora-pg-cl.cluster-cvfhxsaezgfz.ap-south-1.rds.amazonaws.com:5432/aurora_pg_db1'
    engine = create_engine(db_url, echo=True)

    # Create tables if they don't exist
    Base.metadata.create_all(bind=engine)

    # Create a session factory
    Session = sessionmaker(bind=engine)
    return Session()

def lambda_handler(event, context):
    try:
        method = event['httpMethod']
        path = event['path']

        if path == '/machines' and method == 'GET':
            return get_all_machines()

        elif method == 'POST':
            return create_machine(json.loads(event['body']))

        else:
            return {
                'statusCode': 400,
                'body': json.dumps({'message': 'Unsupported HTTP method'}),
            }

    except Exception as e:
        return {
            'statusCode': 500,
            'body': json.dumps({'message': 'Internal Server Error', 'error': str(e)}),
        }



class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, date):
            return obj.isoformat()
        return super().default(obj)

def get_all_machines():
    session = create_session()

    try:
        machines = session.query(Machine).all()
        machine_list = [
            {key: value for key, value in m.__dict__.items() if not key.startswith('_')}
            for m in machines
        ]

        return {
            'statusCode': 200,
            'body': json.dumps(machine_list, cls=CustomJSONEncoder),
        }

    finally:
        session.close()




def create_machine(data):
    session = create_session()

    try:
        new_machine = Machine(**data)
        session.add(new_machine)
        session.commit()

        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Machine created successfully'}),
        }

    finally:
        session.close()

if __name__ == "__main__":
    get_event ={
    "httpMethod": "GET",
    "path" : '/schedules/123',
    "pathParameters": {
      "id": "cd37060e-8e2f-4fe3-a245-e0b6de72f04d"      
    } }
    get_all_event ={
    "httpMethod": "GET",
    "path" : "/machines"
    }    
    post_event = {
    "httpMethod": "POST",
    "path" : '/schedules',
    "body": json.dumps({
        "id": "999999999",
        "approved_by": "Sunil1",
        "prepared_by": "Vinay1",
        "effective_Date": "2023-01-01",
        "approved_date": "2023-01-07T08:11:00.000Z",
        "schedule_number": "SCH-DDPG-2399",
        "schedule_name": "Digital Differential Pressure Gauge Schedule Test",
        "prepared_date": "2023-01-05T08:10:00.000Z",
        "reference_sop": "40-019",
        "calibration_frequency": "Critical",
        "checked_date": "2023-01-06T08:10:00.000Z",
        "year": "2023",
        "instrument_type": "Digital Differential Pressure Gauge",
        "checked_by": "Varma1",
        "createdAt": "2023-09-19T08:11:21.781Z",
        "updatedAt": "2023-09-19T08:12:54.632Z"
    })
}
 
    put_event ={
    "httpMethod": "PUT",
    "path" : '/schedules',
    "pathParameters": {
      "id": "999999999"
    },
    "body": json.dumps({
    "year": "9999",
    "reference_sop": "zzzzz"
  })}
    delete_event ={
    "httpMethod": "DELETE",
    "path" : '/schedules',
    "pathParameters": {
      "id": "999999999"
    }}  

    context = {}
    #response =lambda_handler(get_event, context) 
    #print(response)
    response = lambda_handler(get_all_event, context) 
    print(response)    
    # response = lambda_handler(post_event, context) 
    # print(response)
    # response = lambda_handler(put_event, context) 
    # print(response)
    # response = lambda_handler(delete_event, context) 
    # print(response)
