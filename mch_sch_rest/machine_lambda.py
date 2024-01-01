import json
from utils import CustomJSONEncoder
from model import Machine
from database import create_session

def lambda_handler(event, context):
    try:
        print(event)
        method = event['httpMethod']
        path = event['path']

        if path.startswith('/machines') and method == 'GET':
            return get_machines(event)  
        
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
    
# function to get machines based on various parametersdef get_machines(event):
def get_machines(event):    
    session = create_session()
    
    try:
        #check for path parameters
        path_parameters = event.get('pathParameters', {})
        machine_Id = path_parameters.get('machineId') if path_parameters else None

        # Check for query parameters
        query_parameters = event.get('queryStringParameters', {})
        
        machine_name = query_parameters.get('machineName') if query_parameters else None
        manufacturer = query_parameters.get('manufacturer') if query_parameters else None
        model = query_parameters.get('model') if query_parameters else None
        
        # Build the filter conditions
        filter_conditions = []
        if machine_Id:
            filter_conditions.append(Machine.machine_id == machine_Id)
        if machine_name:
            filter_conditions.append(Machine.machine_name.ilike(f"%{machine_name}%"))
        if manufacturer:
            filter_conditions.append(Machine.manufacturer.ilike(f"%{manufacturer}%"))
        if model:
            filter_conditions.append(Machine.model.ilike(f"%{model}%"))
        
        # Apply the filters
        if filter_conditions:
            machines = session.query(Machine).filter(*filter_conditions).all()
        else:
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
    
# function to delete a machine by machine_id
def delete_machine(event):
    session = create_session()

    try:
        path_parameters = event.get('pathParameters', {})
        machine_Id = path_parameters.get('machineId') if path_parameters else None
        machine = session.query(Machine).filter_by(machine_id=machine_Id).first()

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
        path_parameters = event.get('pathParameters', {})
        machine_Id = path_parameters.get('machineId') if path_parameters else None
        machine = session.query(Machine).filter_by(machine_id=machine_Id).first()

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
