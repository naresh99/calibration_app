import json
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from schedule_lambda import lambda_handler

if __name__ == "__main__":
    get_event = {
        "httpMethod": "GET",
        "path": '/schedules/201',
        "pathParameters": {
            "scheduleId": "201"
        }
    }
    get_by_sch_name_event = {
        "httpMethod": "GET",
        "path": '/schedules/201',
        "queryParameters": {
            "scheduleName": "dule1"
        }
    }
    get_by_sch_no_event = {
        "httpMethod": "GET",
        "path": '/schedules/201',
        "queryParameters": {
            "scheduleNumber": "789"
        }
    }        
    get_all_event = {
        "httpMethod": "GET",
        "path": "/schedules"
    }
    post_event = {
        "httpMethod": "POST",
        "path": "/schedules",
        "body": json.dumps({
            "schedule_name": "Sample Schedule",
            "schedule_number": "S001",
            "instrument_type": "Sample Instrument",
            "calibration_frequency": "Annual",
            "effective_date": "2023-01-01",
            "year": 2023,
            "reference_sop": "Sample SOP",
            "prepared_by": "Sample Person",
            "prepared_date": "2023-01-01"
        })
    }

    put_event = {
        "httpMethod": "PUT",
        "path": "/schedules/201",
        "pathParameters": {
            "scheduleId": "201"
        },
        "body": json.dumps({
            "instrument_type": "Updated Instrument",
            "calibration_frequency": "Semi-Annual",
            "prepared_by": "Updated Person"
        })
    }

    delete_event = {
        "httpMethod": "DELETE",
        "path": '/schedules/202',
        "pathParameters": {
            "scheduleId": "202"
        }
    }

    context = {}
    #print(lambda_handler(get_event, context))
    print(lambda_handler(get_by_sch_name_event, context))
    #print(lambda_handler(get_by_sch_no_event, context))
    #print(lambda_handler(get_all_event, context))
    #print(lambda_handler(post_event, context))
    #print(lambda_handler(put_event, context))
    #print(lambda_handler(delete_event, context))
