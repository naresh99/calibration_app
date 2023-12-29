import json
from datetime import date
from model import Schedule
from database import create_session
from utils import CustomJSONEncoder

def lambda_handler(event, context):
    try:
        method = event['httpMethod']
        path = event['path']

        if path.startswith('/schedules')  and method == 'GET':
            return get_schedules(event)

        # elif path.startswith('/schedules') and method == 'GET':
        #     return get_single_schedule(event)

        elif method == 'POST':
            return create_schedule(json.loads(event['body']))

        elif path.startswith('/schedules/') and method == 'PUT':
            return update_schedule(event)

        elif path.startswith('/schedules/') and method == 'DELETE':
            return delete_schedule(event)

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

# function to delete a schedule by schedule_id
def delete_schedule(event):
    session = create_session()

    try:
        schedule_id = event['pathParameters']['scheduleId']
        schedule = session.query(Schedule).filter_by(schedule_id=schedule_id).first()

        if schedule:
            session.delete(schedule)
            session.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Schedule deleted successfully'}),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Schedule not found'}),
            }

    finally:
        session.close()

# function to update a schedule by schedule_id
def update_schedule(event):
    session = create_session()

    try:
        schedule_id = event['pathParameters']['scheduleId']
        schedule = session.query(Schedule).filter_by(schedule_id=schedule_id).first()

        if schedule:
            update_data = json.loads(event['body'])
            for key, value in update_data.items():
                setattr(schedule, key, value)

            session.commit()

            return {
                'statusCode': 200,
                'body': json.dumps({'message': 'Schedule updated successfully'}),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Schedule not found'}),
            }

    finally:
        session.close()

# function to get a single schedule by schedule_id
def get_single_schedule(event):
    session = create_session()

    try:

        schedule_id = event['pathParameters']['scheduleId']
        schedule = session.query(Schedule).filter_by(schedule_id=schedule_id).first()

        if schedule:
            schedule_data = {key: value for key, value in schedule.__dict__.items() if not key.startswith('_')}
            return {
                'statusCode': 200,
                'body': json.dumps(schedule_data, cls=CustomJSONEncoder),
            }
        else:
            return {
                'statusCode': 404,
                'body': json.dumps({'message': 'Schedule not found'}),
            }

    finally:
        session.close()

def get_schedules(event):
    session = create_session()

    try:
        # Check for path parameters
        path_parameters = event.get('pathParameters', {})
        schedule_id = path_parameters.get('scheduleId')

        # Check for query parameters
        query_parameters = event.get('queryParameters', {})
        schedule_no = query_parameters.get('scheduleNumber')
        schedule_name = query_parameters.get('scheduleName')

        # Build the filter conditions
        filter_conditions = []
        if schedule_id:
            filter_conditions.append(Schedule.schedule_id == schedule_id)
        if schedule_no:
            filter_conditions.append(Schedule.schedule_number.ilike(f"%{schedule_no}%"))
        if schedule_name:
            filter_conditions.append(Schedule.schedule_name.ilike(f"%{schedule_name}%"))

        # Apply the filters
        if filter_conditions:
            schedules = session.query(Schedule).filter(*filter_conditions).all()
        else:
            schedules = session.query(Schedule).all()

        schedule_list = [
            {key: value for key, value in ms.__dict__.items() if not key.startswith('_')}
            for ms in schedules
        ]

        return {
            'statusCode': 200,
            'body': json.dumps(schedule_list, cls=CustomJSONEncoder),
        }

    finally:
        session.close()

def create_schedule(data):
    session = create_session()

    try:
        new_schedule = Schedule(**data)
        session.add(new_schedule)
        session.commit()

        return {
            'statusCode': 201,
            'body': json.dumps({'message': 'Schedule created successfully'}),
        }

    finally:
        session.close()
