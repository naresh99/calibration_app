import json
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from mch_sch_lambda import lambda_handler


if __name__ == "__main__":
    get_event = {
        "httpMethod": "GET",
        "path": '/machine_schedules/301',
        "pathParameters": {
            "scheduleRoutineId": "301"
        }
    }
    get_all_event = {
        "httpMethod": "GET",
        "path": "/machine_schedules"
    }
    post_event = {
        "httpMethod": "POST",
        "path": "/machine_schedules",
        "body": json.dumps({
            "schedule_id": 202,
            "machine_id": 106
        })
    }

    put_event = {
        "httpMethod": "PUT",
        "path": "/machine_schedules/301",
        "pathParameters": {
            "scheduleRoutineId": "301"
        },
        "body": json.dumps({
            "machine_id": 102
        })
    }

    delete_event = {
        "httpMethod": "DELETE",
        "path": '/machine_schedules/302',
        "pathParameters": {
            "scheduleRoutineId": "302"
        }
    }

    context = {}
    #print(lambda_handler(get_event, context))
    #print(lambda_handler(get_all_event, context))
    #print(lambda_handler(post_event, context))
    #print(lambda_handler(put_event, context))
    print(lambda_handler(delete_event, context))
