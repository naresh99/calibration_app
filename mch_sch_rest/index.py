import json
import psycopg2
from sqlalchemy import create_engine, Column, Integer, String, Date, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from datetime import datetime
from json import JSONEncoder
from datetime import date
import os


Base = declarative_base()

# Define your model
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

def create_session():
    # Connect to the PostgreSQL database using the SQLAlchemy engine
    db_url = os.environ.get('DB_URL') 
    engine = create_engine(db_url, echo=True)

    # Create tables if they don't exist
    #Base.metadata.create_all(bind=engine)

    # Create a session factory
    Session = sessionmaker(bind=engine)
    return Session()

def lambda_handler(event, context):
    try:
        method = event['httpMethod']
        path = event['path']

        if path == '/machines' and method == 'GET':
            return get_all_machines()
        
        elif path.startswith('/machines/') and method == 'GET':
            return get_single_machine(event)    
        
        elif method == 'POST':
            return create_machine(json.loads(event['body']))        

        elif path.startswith('/machines/') and method == 'PUT':
            return update_machine(event)            
        
        elif path.startswith('/machines/') and method == 'DELETE':
            return delete_machine(event)

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
    
# function to delete a machine by machine_id
def delete_machine(event):
    session = create_session()

    try:
        machine_id = event['pathParameters']['machineId']
        machine = session.query(Machine).filter_by(machine_id=machine_id).first()

        if machine:
            session.delete(machine)
            session.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Machine deleted successfully'}),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Machine not found'}),
            }

    finally:
        session.close()    
    
# function to update a machine by machine_id
def update_machine(event):
    session = create_session()

    try:
        machine_id = event['pathParameters']['machineId']
        machine = session.query(Machine).filter_by(machine_id=machine_id).first()

        if machine:
            update_data = json.loads(event['body'])
            for key, value in update_data.items():
                setattr(machine, key, value)

            session.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Machine updated successfully'}),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Machine not found'}),
            }

    finally:
        session.close()    

# function to get a single machine by machine_id
def get_single_machine(event):
    session = create_session()

    try:
        machine_id = event['pathParameters']['machineId']
        machine = session.query(Machine).filter_by(machine_id=machine_id).first()

        if machine:
            machine_data = {key: value for key, value in machine.__dict__.items() if not key.startswith('_')}
            return {
                'statusCode': 200,
                'body': json.dumps(machine_data, cls=CustomJSONEncoder),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Machine not found'}),
            }

    finally:
        session.close()

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
    "path" : '/machines/101',
    "pathParameters": {
      "machineId": "101"      
    } }
    get_all_event ={
    "httpMethod": "GET",
    "path" : "/machines"
    }    
    post_event = {
    "httpMethod": "POST",
    "path": "/machines",
    "body": json.dumps({
        "machine_name": "Sample Machine",
        "manufacturer": "Sample Manufacturer",
        "model": "Sample Model",
        "serial": "123456",
        "type": "Sample Type",
        "location": "Sample Location",
        "installation_date": "2023-01-01",
        "status": "Active",
        "usage": "Sample Usage",
        "department": "Sample Department",
        "owner": "Sample Owner"
    })
}
    
    put_event = {
    "httpMethod": "PUT",
    "path": "/machines/101",
    "pathParameters": {
        "machineId": "101"
    },
    "body": json.dumps({
        "manufacturer": "Updated Manufacturer",
        "status": "Inactive",
        "usage": "Updated Usage",
        "owner": "Updated Owner"
    })
}

    delete_event ={
    "httpMethod": "DELETE",
    "path" : '/machines/101',
    "pathParameters": {
      "machineId": "101"
    }}  

    context = {}
    # response =lambda_handler(get_event, context) 
    # print(response)
    response = lambda_handler(get_all_event, context) 
    print(response)    
    # response = lambda_handler(post_event, context) 
    # print(response)
    # response = lambda_handler(put_event, context) 
    # print(response)
    # response = lambda_handler(delete_event, context) 
    # print(response)
