/* Your Code Here */
function createEmployeeRecord(arr){
    let employeeRecord = {   
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [] ,
        timeOutEvents: []
    }
    return employeeRecord;
}

let createEmployeeRecords =  function(record){
    return record.map(createEmployeeRecord)
}
// function createEmployeeRecords(arr){
//     return  arr.map(createEmployeeRecord);
// }

let createTimeInEvent = function(dateStamp){
        const newTimeIn = {
            type: "TimeIn",
            hour: parseInt(dateStamp.slice(-4)),
            date: dateStamp.slice(0, 10)
        }
        this.timeInEvents.push(newTimeIn)
        return this
    }
// function createTimeInEvent(rec, dateStamp){
//     const newTimeIn = {
//         type: "TimeIn",
//         hour: parseInt(dateStamp.slice(-4)),
//         date: dateStamp.slice(0, 10)
//     }

//     rec.timeInEvents.push(newTimeIn)
//     return rec
// }


let createTimeOutEvent = function(dateStamp){
    const newTimeOut = {
        type: "TimeOut",
        hour: parseInt(dateStamp.slice(-4)),
        date: dateStamp.slice(0, 10)
    }
    this.timeOutEvents.push(newTimeOut)
    return this
}
// function createTimeOutEvent(rec, dateStamp){
//     const newTimeOut = {
//         type: "TimeOut",
//         hour: parseInt(dateStamp.slice(-4)),
//         date: dateStamp.slice(0,10)
//     }
//     rec.timeOutEvents.push(newTimeOut)
//     return rec
// }


let hoursWorkedOnDate = function(date){
    const timeIn = this.timeInEvents.find(e => e.date === date).hour
    const timeOut  = this.timeOutEvents.find( e => e.date === date).hour
    return (timeOut - timeIn)/100;
}
// function hoursWorkedOnDate(rec, date){
//     const timeIn = rec.timeInEvents.find(e => e.date === date).hour
//     const timeOut  = rec.timeOutEvents.find( e => e.date === date).hour
//     return (timeOut - timeIn)/100;
// }

let wagesEarnedOnDate = function(date){
    const pay = this.payPerHour
    return pay * hoursWorkedOnDate.call(this, date)
}
// function wagesEarnedOnDate(rec, date){
//  const pay =  rec.payPerHour
//  return pay * hoursWorkedOnDate(rec, date)
// }



function findEmployeeByFirstName(empNames, firstName){
    return empNames.find(employee => employee.firstName == firstName)
}


let calculatePayroll = function(rec){
   return rec.reduce(function(total, wages){
        return total + allWagesFor.call(wages)}, 0)
}

// function calculatePayroll(rec){
//     const employeeTotals = rec.map(employees => allWagesFor(employees))
//     return employeeTotals.reduce((total, wages) => total + wages)
// }




/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}