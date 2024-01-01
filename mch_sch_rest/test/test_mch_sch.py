import json
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from mch_sch_lambda import lambda_handler


if __name__ == "__main__":
    get_event = {
        "httpMethod": "GET",
        "path": '/machineSchedules/301',
        "pathParameters": {
            "scheduleRoutineId": "301"
        }
    }
    get_all_event = {
        "httpMethod": "GET",
        "path": "/machineSchedules"
    }

    get_by_machine_id_event = {
        "httpMethod": "GET",
        "path": "/machineSchedules/",
        "queryParameters": {
            "machineId": "102"
        }
    }

    get_by_schedule_id_event = {
        "httpMethod": "GET",
        "path": "/machineSchedules/",
        "queryParameters": {
            "scheduleId": "202"
        }
    }    

    get_by_mch_id_sch_id_event = {
        "httpMethod": "GET",
        "path": "/machineSchedules/",
        "queryParameters": {
            "scheduleId": "202",
            "machineId": "102"
        }
    }       

    post_event = {
        "httpMethod": "POST",
        "path": "/machineSchedules",
        "body": json.dumps({
            "schedule_id": 202,
            "machine_id": 106
        })
    }

    put_event = {
        "httpMethod": "PUT",
        "path": "/machineSchedules/301",
        "pathParameters": {
            "scheduleRoutineId": "301"
        },
        "body": json.dumps({
            "machine_id": 102
        })
    }

    delete_event = {
        "httpMethod": "DELETE",
        "path": '/machineSchedules/302',
        "pathParameters": {
            "scheduleRoutineId": "301"
        }
    }

    context = {}
    #print(lambda_handler(get_event, context))
    #print(lambda_handler(get_all_event, context))
    #print(lambda_handler(get_by_machine_id_event, context))
    #print(lambda_handler(get_by_schedule_id_event, context))
    #print(lambda_handler(get_by_mch_id_sch_id_event, context))
    #print(lambda_handler(post_event, context))
    #print(lambda_handler(put_event, context))
    print(lambda_handler(delete_event, context))
