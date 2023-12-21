// App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'https://eqfawna18d.execute-api.ap-south-1.amazonaws.com/staging'; // Replace with your API URL

function App() {
  const [records, setRecords] = useState([]);
  const [record, setRecord] = useState({
    id: '',
    approved_by: '',
    prepared_by: '',
    effective_Date: '',
    approved_date: '',
    schedule_number: '',
    schedule_name: '',
    prepared_date: '',
    reference_sop: '',
    calibration_frequency: '',
    checked_date: '',
    year: '',
    instrument_type: '',
    checked_by: '',
    createdAt: '',
    updatedAt: '',
  });
  const [editingRecordId, setEditingRecordId] = useState(null);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      const response = await axios.get(`${API_URL}/schedules`);
      setRecords(response.data);
    } catch (error) {
      console.error('Error fetching records:', error);
    }
  };

  const createRecord = async () => {
    try {
      const response = await axios.post(`${API_URL}/schedules`, record);
      setRecord({
        id: '',
        approved_by: '',
        prepared_by: '',
        effective_Date: '',
        approved_date: '',
        schedule_number: '',
        schedule_name: '',
        prepared_date: '',
        reference_sop: '',
        calibration_frequency: '',
        checked_date: '',
        year: '',
        instrument_type: '',
        checked_by: '',
        createdAt: '',
        updatedAt: '',
      });
      fetchRecords();
    } catch (error) {
      console.error('Error creating record:', error);
    }
  };

  const updateRecord = async (recordId) => {
    try {
      await axios.put(`${API_URL}/schedules/${recordId}`, record);
      setRecord({
        id: '',
        approved_by: '',
        prepared_by: '',
        effective_Date: '',
        approved_date: '',
        schedule_number: '',
        schedule_name: '',
        prepared_date: '',
        reference_sop: '',
        calibration_frequency: '',
        checked_date: '',
        year: '',
        instrument_type: '',
        checked_by: '',
        createdAt: '',
        updatedAt: '',
      });
      setEditingRecordId(null);
      fetchRecords();
    } catch (error) {
      console.error('Error updating record:', error);
    }
  };

  const deleteRecord = async (recordId) => {
    try {
      await axios.delete(`${API_URL}/schedules/${recordId}`);
      fetchRecords();
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleEditClick = (record) => {
    setRecord(record);
    setEditingRecordId(record.id);
  };

  return (
    <div>
      <h1>Records</h1>
      {/* Add input fields for the new attributes */}
      <input
        type="text"
        placeholder="ID"
        value={record.id}
        onChange={(e) => setRecord({ ...record, id: e.target.value })}
      />
     <input
       type="text"
       placeholder="Approved By"
       value={record.approved_by}
       onChange={(e) => setRecord({ ...record, approved_by: e.target.value })}
     />	
	<input
       type="text"
       placeholder="prepared_by"
       value={record.prepared_by}
       onChange={(e) => setRecord({ ...record, prepared_by: e.target.value })}
     />	
	<input
       type="text"
       placeholder="effective_Date"
       value={record.effective_Date}
       onChange={(e) => setRecord({ ...record, effective_Date: e.target.value })}
     />	
	 	<input
       type="text"
       placeholder="approved_date"
       value={record.approved_date}
       onChange={(e) => setRecord({ ...record, approved_date: e.target.value })}
     />	
	<input
       type="text"
       placeholder="schedule_number"
       value={record.schedule_number}
       onChange={(e) => setRecord({ ...record, schedule_number: e.target.value })}
     />	
	<input
       type="text"
       placeholder="schedule_name"
       value={record.schedule_name}
       onChange={(e) => setRecord({ ...record, schedule_name: e.target.value })}
     />	
	<input
       type="text"
       placeholder="prepared_date"
       value={record.prepared_date}
       onChange={(e) => setRecord({ ...record, prepared_date: e.target.value })}
     />	
	<input
       type="text"
       placeholder="reference_sop"
       value={record.reference_sop}
       onChange={(e) => setRecord({ ...record, reference_sop: e.target.value })}
     />	
	<input
       type="text"
       placeholder="calibration_frequency"
       value={record.calibration_frequency}
       onChange={(e) => setRecord({ ...record, calibration_frequency: e.target.value })}
     />	
	<input
       type="text"
       placeholder="checked_date"
       value={record.checked_date}
       onChange={(e) => setRecord({ ...record, checked_date: e.target.value })}
     />	
	<input
       type="text"
       placeholder="year"
       value={record.year}
       onChange={(e) => setRecord({ ...record, year: e.target.value })}
     />	
	<input
       type="text"
       placeholder="instrument_type"
       value={record.instrument_type}
       onChange={(e) => setRecord({ ...record, instrument_type: e.target.value })}
     />	
	<input
       type="text"
       placeholder="checked_by"
       value={record.checked_by}
       onChange={(e) => setRecord({ ...record, checked_by: e.target.value })}
     />	
	<input
       type="text"
       placeholder="createdAt"
       value={record.createdAt}
       onChange={(e) => setRecord({ ...record, createdAt: e.target.value })}
     />	
	<input
       type="text"
       placeholder="Approved By"
       value={record.updatedAt}
       onChange={(e) => setRecord({ ...record, updatedAt: e.target.value })}
     />	

	 
	 
	 
      {/* Add input fields for other attributes similarly */}
      {editingRecordId ? (
        <button onClick={() => updateRecord(editingRecordId)}>Update</button>
      ) : (
        <button onClick={createRecord}>Create</button>
      )}
      <ul>
        {records.map((r) => (
          <li key={r.id}>
            {r.id} - {r.approved_by} - {r.prepared_by} {/* Display other attributes */}
            <button onClick={() => handleEditClick(r)}>Edit</button>
            <button onClick={() => deleteRecord(r.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
