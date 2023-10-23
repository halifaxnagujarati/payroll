import { useState, useEffect } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import logo from './img/logo.jpg';


const Home = ({ firstName }) => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [totals, setTotals] = useState({
    RH: 0, TL: 0, TLNS: 0, NA: 0, NS: 0, SH: 0, SNS: 0, VHRH: 0, VHNH: 0
  });

  useEffect(() => {
    calculateTotalHoursByType();
  }, [tableData]);

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return `${start.toLocaleDateString()} - ${end.toLocaleDateString()}`;
  }

  const calculateTotalHoursByType = () => {
    let totals = {
      RH: 0, TL: 0, TLNS: 0, NA: 0, NS: 0, SH: 0, SNS: 0, VHRH: 0, VHNH: 0
    };

    tableData.forEach((row) => {
      row.entries.forEach((entry) => {
        const hour = calculateHours(entry.startTime, entry.endTime);
        switch (entry.hourType) {
          case 'Regular Hours':
          case 'Training Hours':
          case 'On Call Regular':
            totals.RH += hour;
            break;
          case 'Team Lead Regular':
          case 'Team Lead Night Awake':
            totals.TL += hour;
            break;
        case 'Team Lead Sleep':
          totals.TLNS += hour;
          break;
        case 'Night Awake Hours':
          totals.NA += hour;
          break;
        case 'Night Sleep Hours':
          case 'On Call Night Sleep':
          totals.NS += hour;
          break;
        case 'Sick Hours (Regular)':
          case 'Sick Hours (Night Awake)':
          totals.SH += hour;
          break;
        case 'Sick Hours (Night Sleep)':
          totals.SNS += hour;
          break;
        case 'Vacation Hours (Regular)':
          totals.VHRH += hour;
          break;
        case 'Vacation Hours (Night Sleep)':
          totals.VHNH += hour;
          break;
        default:
          break;
        }
        })
      })
    setTotals(totals);
  }

  const calculateHours = (startTime, endTime) => {
    if (!startTime || !endTime) return 0;
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    return Math.round((end - start) / 3600000 * 10) / 10; // in hours, rounded
  };

  const weeks = [];
  let currentDate = new Date("2022-12-11");
  while (currentDate <= new Date("2023-12-09")) {
    const weekStart = new Date(currentDate);
    const weekEnd = new Date(currentDate);
    weekEnd.setDate(weekEnd.getDate() + 6);
    weeks.push(formatDateRange(weekStart, weekEnd));
    currentDate.setDate(currentDate.getDate() + 7);
  }

  useEffect(() => {
    if (selectedWeek) {
      const startDate = new Date(selectedWeek.split(' - ')[0]); // Parse the start date from the selectedWeek
      const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
      const newTableData = days.map((day, index) => {
        const dateObj = new Date(startDate);
        dateObj.setDate(dateObj.getDate() + index);
        return {
          dayWorked: day,
          date: dateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
          entries: [] // start with an empty array
        };
      });
      setTableData(newTableData);
    }
  }, [selectedWeek]);

  return (
    
    <div className="home-container">
      <img src={logo} alt="Logo" />
      <h1>Hello, {firstName}</h1>

<section>
  <h2>Timesheets</h2>
  <div>
    <label>Week:</label>
    <select onChange={(e) => setSelectedWeek(e.target.value)}>
      <option value="">Select a week</option>
      {weeks.map((week, index) => (
        <option key={index} value={week}>{week}</option>
      ))}
    </select>
  </div>
  </section>

  {selectedWeek && (
    <table>
      <thead>
        <tr>
          <th>Day Worked</th>
          <th>Start Time</th>
          <th>End Time</th>
          <th>Total Hours</th>
          <th>Hour Type</th>
          {/* ... other headers */}
          <th>Member Supported</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((row, rowIndex) => (
          <>
            {row.entries.map((entry, entryIndex) => (
              <tr key={`${row.date}-${entryIndex}`}>
                <td>{entryIndex === 0 ? `${row.dayWorked} (${row.date})` : ''}</td>
                <td>
                  <input 
                    type="time" 
                    value={entry.startTime}
                    onChange={(e) => {
                      const updatedTableData = [...tableData];
                      updatedTableData[rowIndex].entries[entryIndex].startTime = e.target.value;
                      setTableData(updatedTableData);
                    }} 
                  />
                </td>
                <td>
                  <input 
                    type="time"
                    value={entry.endTime}
                    onChange={(e) => {
                      const updatedTableData = [...tableData];
                      updatedTableData[rowIndex].entries[entryIndex].endTime = e.target.value;
                      setTableData(updatedTableData);
                    }} 
                  />
                </td>
                <td>{calculateHours(entry.startTime, entry.endTime)}</td>
                <td>
                  <select value={entry.hourType} onChange={(e) => {
                    const updatedTableData = [...tableData];
                    updatedTableData[rowIndex].entries[entryIndex].hourType = e.target.value;
                    setTableData(updatedTableData);
                  }}>
                    {/* ... hour type options ... */}
                    <option value="NULL">Select hour type</option>
                  <option value="Regular Hours">Regular Hours</option>
                  <option value="Night Awake Hours">Night Awake Hours</option>
                  <option value="Night Sleep Hours">Night Sleep Hours</option>
                  <option value="On Call Regular">On Call Regular</option>
                  <option value="On Call Night Sleep">On Call Night Sleep</option>
                  <option value="Team Lead Regular">Team Lead Regular</option>
                  <option value="Team Lead Night Awake">Team Lead Night Awake</option>
                  <option value="Team Lead Sleep">Team Lead Sleep</option>
                  <option value="Training Hours">Training Hours</option>
                  <option value="Sick Hours (Regular)">Sick Hours (Regular)</option>
                  <option value="Sick Hours (Night Awake)">Sick Hours (Night Awake)</option>
                  <option value="Sick Hours (Night Sleep)">Sick Hours (Night Sleep)</option>
                  <option value="Vacation Hours (Regular)">Vacation Hours (Regular)</option>
                  <option value="Vacation Hours (Night Awake)">Vacation Hours (Night Awake)</option>
                  <option value="Vacation Hours (Night Sleep)">Vacation Hours (Night Sleep)</option>
                  </select>
                </td>
                {/* ... other fields ... */}
                <td>
                  <select value={entry.memberSupported} onChange={(e) => {
                    const updatedTableData = [...tableData];
                    updatedTableData[rowIndex].entries[entryIndex].memberSupported = e.target.value;
                    setTableData(updatedTableData);
                  }}>

                    {/* ... member supported options ... */}
                  <option value="Select">Select Member</option>
                  <option value="Yash">Yash</option>
                  <option value="Somani">Somani</option>
                  <option value="Isa">Isa</option>
                  </select>
                </td>
                <td>
                  <Button variant="outlined"  color="error" onClick={() => {
                    const updatedTableData = [...tableData];
                    updatedTableData[rowIndex].entries.splice(entryIndex, 1);
                    setTableData(updatedTableData);
                  }}>
                    Remove Line
                  </Button>
                </td>
              </tr>
            ))}
            <tr>
              <td colSpan="7">
                <Button variant="contained" onClick={() => {
                  const updatedTableData = [...tableData];
                  updatedTableData[rowIndex].entries.push({
                    startTime: '',
                    endTime: '',
                    hourType: '',
                    memberSupported: 'Select'
                  });
                  setTableData(updatedTableData);
                }}>
                  Add Line
                </Button>

              </td>
            </tr>

          </>
        ))}
      
      <h2>Total Hours by Hour Type</h2>
      <p>Regular Hours: {totals.RH} hours</p>
      <p>Team Lead Regular: {totals.TL} hours</p>
              <p>Team Lead Sleep: {totals.TLNS} hours</p>
              <p>Night Awake Hours: {totals.NA} hours</p>
              <p>Night Sleep Hours: {totals.NS} hours</p>
              <p>Sick Hours: {totals.SH} hours</p>
              <p>Sick Night Sleep Hours: {totals.SNS} hours</p>
              <p>Vacation Hours: {totals.VHRH} hours</p>
              <p>Vacation Night Sleep Hours: {totals.VHNH} hours</p>
              </tbody>
              </table>
  )}
    </div>
  );
}

export default Home;
