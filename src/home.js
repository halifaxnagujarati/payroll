import React, { useState, useEffect } from 'react';
import './home.css';

const Home = ({ firstName }) => {
  const [selectedWeek, setSelectedWeek] = useState(null);
  const [tableData, setTableData] = useState([]);

  const formatDateRange = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    const startFormatted = start.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const endFormatted = end.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    
    return `${startFormatted} - ${endFormatted}`;
  }

  var RH = 0;
  var TL = 0;
  var TLNS = 0;
  var NA = 0;
  var NS = 0;
  var SH = 0;
  var SNS = 0;
  var VHRH = 0;
  var VHNS = 0;

  const totalHourByHourType = (tableData, hourType) => {
    tableData.forEach((row) => {
      row.entries.forEach((entry) => {
        if (entry.hourType === 'Regular Hours' || entry.hourType === 'Training Hours' || entry.hourType === 'On Call Regular') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            RH += hour;
          }
        }
        if (entry.hourType === 'Team Lead Regular' || entry.hourType === 'Team Lead Night Awake') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            TL += hour;
          }
        }
        if (entry.hourType === 'Team Lead Sleep') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            TLNS += hour;
          }
        }
        if (entry.hourType === 'Night Awake Hours') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            NA += hour;
          }
        }
        if (entry.hourType === 'Night Sleep Hours') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            NS += hour;
          }
        }
        if (entry.hourType === 'Sick Hours (Regular)' || entry.hourType === 'Sick Hours (Night Awake)') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            SH += hour;
          }
        }
        if (entry.hourType === 'Sick Hours (Night Sleep)') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            SNS += hour;
          }
        }
        if (entry.hourType === 'Vacation Hours (Regular)') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            VHRH += hour;
          }
        }
        if (entry.hourType === 'Vacation Hours (Night Sleep)') {
          const hour = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hour)){
            VHNS += hour;
          }
        }
      })
    })
  }

  const calculateTotalHours = (hourType, tableData) => {
    let totalHours = 0;
    tableData.forEach((row) => {
      row.entries.forEach((entry) => {
        if (entry.hourType === hourType) {
          const hours = calculateHours(entry.startTime, entry.endTime);
          if (!isNaN(hours)){
            totalHours += hours;
          }
        }
      });
    });
    return totalHours.toFixed(2);
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
  

  const calculateHours = (startTime, endTime) => {
    if (!startTime || !endTime) return '';
    const start = new Date(`1970-01-01T${startTime}Z`);
    const end = new Date(`1970-01-01T${endTime}Z`);
    const totalHour = (end - start) / 3600000; // in hours
    const roundedTotalHour = Math.round(totalHour * 10) / 10; // Round to one decimal place
    return roundedTotalHour;
  };
  

  const calculateRH = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Regular Hours" || hourType === "Training Hours" || hourType === "On Call Hours"){
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };
  
  const calculateTL = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Team Lead Regular"){
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateTLNS = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Team Lead Sleep"){  
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateNA = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Night Awake Hours"){
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateNS = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Night Sleep Hours" || hourType === "On Call Night Sleep") {
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateSH = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Sick Hours (Regular)" || hourType === "Sick Hours (Night Awake)") {
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateSNS = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Sick Hours (Night Sleep)"){
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateVacationRegular = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Vacation Hours (Regular)" || hourType === "Vacation Hours (Night Awake)"){
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  const calculateVacationNightSleep = (startTime, endTime, hourType) => {
    if (!startTime || !endTime) return '';
    if (hourType === "Vacation Hours (Night Sleep)"){
      const start = new Date(`1970-01-01T${startTime}Z`);
      const end = new Date(`1970-01-01T${endTime}Z`);
      return (end - start) / 3600000; // in hours
    }
  };

  

  return (
    <div className="home-container">
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
                        <button onClick={() => {
                          const updatedTableData = [...tableData];
                          updatedTableData[rowIndex].entries.splice(entryIndex, 1);
                          setTableData(updatedTableData);
                        }}>
                          Remove Line
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="7">
                      <button onClick={() => {
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
                      </button>
                      
                    </td>
                  </tr>
                  
                </>
              ))}
              <h2>Total Hours by Hour Type</h2>
        {/* <ul>
        <li>Regular Hours: {calculateRH(startTime, endTime, hourType)} hours</li>
        <li>Team Lead Regular: {calculateTL(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Team Lead Sleep: {calculateTLNS(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Night Awake Hours: {calculateNA(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Night Sleep Hours: {calculateNS(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Sick Hours: {calculateSH(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Sick Night Sleep Hours: {calculateSNS(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Vacation Hours: {calculateVacationRegular(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        <li>Vacation Night Sleep Hours: {calculateVacationNightSleep(entry.startTime, entry.endTime, entry.hourType)} hours</li>
        </ul> */}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
};

export default Home;
