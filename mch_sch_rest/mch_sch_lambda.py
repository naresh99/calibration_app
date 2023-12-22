import json
from datetime import date
from model import MachineSchedule
from database import create_session
from utils import CustomJSONEncoder

def lambda_handler(event, context):
    try:
        method = event['httpMethod']
        path = event['path']

        if path == '/machine_schedules' and method == 'GET':
            return get_all_machine_schedules()

        elif path.startswith('/machine_schedules/') and method == 'GET':
            return get_single_machine_schedule(event)

        elif method == 'POST':
            return create_machine_schedule(json.loads(event['body']))

        elif path.startswith('/machine_schedules/') and method == 'PUT':
            return update_machine_schedule(event)

        elif path.startswith('/machine_schedules/') and method == 'DELETE':
            return delete_machine_schedule(event)

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

# function to delete a machine schedule by schedule_routine_id
def delete_machine_schedule(event):
    session = create_session()

    try:
        schedule_routine_id = event['pathParameters']['scheduleRoutineId']
        machine_schedule = session.query(MachineSchedule).filter_by(schedule_routine_id=schedule_routine_id).first()

        if machine_schedule:
            session.delete(machine_schedule)
            session.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Machine schedule deleted successfully'}),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Machine schedule not found'}),
            }

    finally:
        session.close()

# function to update a machine schedule by schedule_routine_id
def update_machine_schedule(event):
    session = create_session()

    try:
        schedule_routine_id = event['pathParameters']['scheduleRoutineId']
        machine_schedule = session.query(MachineSchedule).filter_by(schedule_routine_id=schedule_routine_id).first()

        if machine_schedule:
            update_data = json.loads(event['body'])
            for key, value in update_data.items():
                setattr(machine_schedule, key, value)

            session.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Machine schedule updated successfully'}),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Machine schedule not found'}),
            }

    finally:
        session.close()

# function to get a single machine schedule by schedule_routine_id
def get_single_machine_schedule(event):
    session = create_session()

    try:
        schedule_routine_id = event['pathParameters']['scheduleRoutineId']
        machine_schedule = session.query(MachineSchedule).filter_by(schedule_routine_id=schedule_routine_id).first()

        if machine_schedule:
            machine_schedule_data = {key: value for key, value in machine_schedule.__dict__.items() if not key.startswith('_')}
            return {
                'statusCode': 200,
                'body': json.dumps(machine_schedule_data, cls=CustomJSONEncoder),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Machine schedule not found'}),
            }

    finally:
        session.close()

def get_all_machine_schedules():
    session = create_session()

    try:
        machine_schedules = session.query(MachineSchedule).all()
        machine_schedule_list = [
            {key: value for key, value in ms.__dict__.items() if not key.startswith('_')}
            for ms in machine_schedules
        ]

        return {
            'statusCode': 200,
            'body': json.dumps(machine_schedule_list, cls=CustomJSONEncoder),
        }

    finally:
        session.close()

def create_machine_schedule(data):
    session = create_session()

    try:
        new_machine_schedule = MachineSchedule(**data)
        session.add(new_machine_schedule)
        session.commit()

        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Machine schedule created successfully'}),
        }

    finally:
        session.close()
