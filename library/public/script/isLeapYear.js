"use strict";

function isLeapYear(year){
    let calendarData = JSON.parse(read_data("calendarData"));
    let leapYearFormula = calendarData.leapYearFormula;
    let isLeapYear = eval(leapYearFormula);
    return isLeapYear;
}

MTScript.registerMacro("datetime.isLeapYear", isLeapYear);