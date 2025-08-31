function createEmployeeRecord(employeeArray) {
    let employeeRecord = {}
        employeeRecord.firstName = employeeArray[0];
        employeeRecord.familyName = employeeArray[1];
        employeeRecord.title = employeeArray[2];
        employeeRecord.payPerHour = employeeArray[3];
        employeeRecord.timeInEvents = [];
        employeeRecord.timeOutEvents = [];       

    return employeeRecord
}

function createEmployeeRecords(employeeArray){
  let populatedEmployeeArray = employeeArray.map(employee => createEmployeeRecord(employee));
  return populatedEmployeeArray;
}

function createTimeInEvent(employeeRecord, dateStamp){
    let dateString = dateStamp.split(" ")
    let timeInEvent = {
    type : `TimeIn`,
    date : dateString[0],
    hour : parseInt(dateString[1], 10)
    }

    employeeRecord.timeInEvents.push(timeInEvent);
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateStamp){
    let dateString = dateStamp.split(" ")
    let timeOutEvent = {
    type : `TimeOut`,
    date : dateString[0],
    hour : parseInt(dateString[1], 10)
    }

    employeeRecord.timeOutEvents.push(timeOutEvent);
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {

    const timeInEvents = employeeRecord.timeInEvents.filter(event => event.date === date);
    const workDayStart = timeInEvents[0].hour;

    const timeOutEvents = employeeRecord.timeOutEvents.filter(event => event.date === date);
    const workDayEnd = timeOutEvents[0].hour;
    
    return (workDayEnd - workDayStart) / 100;
}

function wagesEarnedOnDate(employeeRecord, date) {
    
    return hoursWorkedOnDate(employeeRecord, date) * employeeRecord.payPerHour;
}

