import json
import sys, os
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from machine_lambda import lambda_handler

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
    # print(lambda_handler(get_event, context))
    print(lambda_handler(get_all_event, context))
    #print(lambda_handler(post_event, context)) 
    # print(lambda_handler(put_event, context)) 
    # print(lambda_handler(delete_event, context)) 