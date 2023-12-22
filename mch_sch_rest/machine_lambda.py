import json
from utils import CustomJSONEncoder
from model import Machine
from database import create_session

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
