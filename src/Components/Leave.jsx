import{useState,useEffect} from "react";
import React from 'react';
import DataTable from 'react-data-table-component';
import { CSVLink } from "react-csv";

function Leave() {

    let [lists,setList]=useState([]);
    const [formData, setFormData] = useState({
        empId: '',
        empName: '',
        startDate: '',
        endDate: '',
        leaveType: 'LWP',
        reason: ''
      });
    
      const leaveTypes = ['LWP', 'SL', 'CL', 'ML', 'WL', 'HDL'];

      const columns = [
        {
            name: 'Id',
            selector: 'id',
            sortable: true,
          },
        {
          name: 'empId',
          selector: 'empId',
          sortable: true,
        },
        {
          name: 'empName',
          selector: 'empName',
          sortable: true,
        },
        {
          name: 'startDate',
          selector: 'startDate',
          sortable: true,
        },
        {
          name: 'endDate',
          selector: 'endDate',
          sortable: true,
        },
        {
          name: 'leaveType',
          selector: 'leaveType',
          sortable: true,
        },
        {
          name: 'reason',
          selector: 'reason',
          sortable: true,
        },
      ];
      const csvHeaders = [
        { label: 'Id', key: 'id' },
        { label: 'empId', key: 'empId' },
        { label: 'empName', key: 'empName' },
        { label: 'startDate', key: 'startDate' },
        { label: 'endDate', key: 'endDate' },
        { label: 'leaveType', key: 'leaveType' },
        { label: 'reason', key: 'reason' },
      ];
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      const handleChangeId = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
        LeavePerEmp(value);
      };
      const LeavePerEmp=(empId) =>{
        
        
        
            var requestOptions = {
                method: 'GET',
                redirect: 'follow'
              };
              
              fetch(`http://localhost:8100/employee-leave-form-app/api/get-list-of-leave/${empId}`, requestOptions)
                .then(response => response.text())
                .then(result => {console.log(result);console.log(JSON.parse(result));const parsedResult = JSON.parse(result);
                    if (parsedResult.length === 0) {
                      // Clear the list if no data found for the empId
                      setList([]);
                    } else {
                      console.log(parsedResult);
                      setList(parsedResult);
                    }})
                .catch(error =>{ console.log('error', error);setList([]);});
        
           
    } 
    
      const handleSubmit = (e) => {
        e.preventDefault();
       let dateStart = new Date(formData.startDate);
        var month = dateStart.getMonth() + 1;
        var day = dateStart.getDate();

        if (day < 10) {
          day = '0' + day;
        }
        if (month < 10) {
          month = '0' + month;
        }
       let  startDateString =
       day + "/" + (month) + "/" + dateStart.getFullYear();

       let dateEnd = new Date(formData.endDate);
        var endmonth = dateEnd.getMonth() + 1;
        var endday = dateEnd.getDate();

        if (endday < 10) {
          endday = '0' + endday;
        }
        if (endmonth < 10) {
          endmonth = '0' + endmonth;
        }
       let  endDateString =
       endday + "/" + (endmonth) + "/" + dateEnd.getFullYear();

        console.log('Form data:', formData);
        console.log('Start Date:', startDateString);
        console.log('End Date:', endDateString);

        const requestBody = {
            empId: formData.empId,
        empName: formData.empName,
        startDate: startDateString,
        endDate: endDateString,
        leaveType: formData.leaveType,
        reason: formData.reason
          };
        var raw = JSON.stringify(requestBody);
          
          var requestOptions = {
            method: 'POST',
            body: raw,
            headers: {
                'Content-Type': 'application/json',
              },
            redirect: 'follow'
          };
          
          fetch("http://localhost:8100/employee-leave-form-app/api/apply-for-leave", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
      
            
                    alert("Leave Applied");
                    window.location.reload();      


      };


    return(
        <>
        <h1>This is leave page</h1>
        <div>
        <form onSubmit={handleSubmit}>
      <label>
        Employee ID:
        <input type="number" name="empId" 
        value={formData.empId} onChange={handleChangeId} required/>
      </label>
     
      <label>
        Employee Name:
        <input type="text" name="empName" 
        value={formData.empName} onChange={handleChange} />
      </label>
      <br />
      <br />
      <label>
        Start Date:
        <input type="date" name="startDate" 
        value={formData.startDate} onChange={handleChange} required/>
      </label>
      
      <label>
        End Date:
        <input type="date" name="endDate" 
        value={formData.endDate} onChange={handleChange} required/>
      </label>
      <br />
      <br />
      <label>
        Leave Type:
        <select name="leaveType" value={formData.leaveType} onChange={handleChange}>
          {leaveTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </label>
      
      <label>
        Reason:
        <textarea name="reason" value={formData.reason} onChange={handleChange} />
      </label>
      <br />
      <br />
      <button type="submit">Save</button>
    </form>
        </div>
        <div>
        <h1>Employee Leave Data</h1>
        <button><CSVLink
          data={lists}
          headers={csvHeaders}
          filename={"employee_leave_data.csv"}
          className="btn btn-primary"
        >
          Download
        </CSVLink></button>
     <div style={{height:"250px",overflowY:"scroll" }}> <DataTable
        columns={columns}
        data={lists}
        pagination
        highlightOnHover
        striped
      /></div>
        </div>
        </>
    )
}

export default Leave;