import{useState,useEffect} from "react";
import React from 'react';
import DataTable from 'react-data-table-component';

function List() {
let [lists,setList]=useState([]);

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
  

useEffect(()=>{
    var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch("http://localhost:8100/employee-leave-form-app/api/get-all-list-of-leave", requestOptions)
        .then(response => response.text())
        .then(result => {console.log(result);console.log(JSON.parse(result));setList(JSON.parse(result))})
        .catch(error => console.log('error', error));
},[])
   

    return(
        <>
     <h1>Employee Leave Data</h1>
      <DataTable
        columns={columns}
        data={lists}
        pagination
        highlightOnHover
        striped
      />
        </>
    )
}
export default List;