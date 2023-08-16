import{useState,useEffect} from "react";
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function AddEmp() {


    const [formData, setFormData] = useState({
        empId: '',
        empName: '',
        mailId: '',
        age: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form data:', formData);
        const requestBody = {
            empId: formData.empId,
            empName: formData.empName,
            mailId: formData.mailId,
            age: formData.age,
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
          
          fetch("http://localhost:8100/employee-leave-form-app/api/save-employee-detail", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));

            alert("Employee Added");
                    window.location.reload();  
      };


    
    return(
        < div className="container">
        <h1>This is Add Data Page</h1>
        <div>
      <form onSubmit={handleSubmit} className="form-group">
        <label>
          Employee ID:
          <input type="number" name="empId" value={formData.empId} onChange={handleChange} />
        </label>
        
        <label>
          Employee Name:
          <input type="text" name="empName" value={formData.empName} onChange={handleChange} />
        </label>
       <br />
       <br />
        <label>
          Email ID:
          <input type="email" name="mailId" value={formData.mailId} onChange={handleChange} />
        </label>
        
        <label>
          Age:
          <input type="number" name="age" value={formData.age} onChange={handleChange} />
        </label>
        <br />
        <br />
        <button type="submit">Save Data</button>
      </form>
    </div>
        </div>
    )
}

export default AddEmp;