"use strict";


function calendarHTML() {
    function monthHTML(monthNum) {

        if (cachedHTML["month_" + String(monthNum)].valid && cachedHTML.yearValid) {
            startDay = cachedHTML["month_" + String(monthNum)].lastDay;
            calendarData.nextYearStartDay = startDay;
            return cachedHTML["month_" + String(monthNum)].html;
        }
        //MapTool.chat.broadcast("Generating Month "+calendarData.months[monthNum]+" HTML");

        let dayInMonth = calendarData.dayInMonth[monthNum];
        let monthRows = calendarData.mostWeekInMonth * calendarData.dayInWeek;
        if (leapYear && monthNum == leapMonth) {
            dayInMonth += leapDays;
        }
        let eventCheck = null;
        let dayClass = "otherDay";
        let dayArgs = null;
        let lastNum = startDay;
        let monthHTML = "<div height='100%'><table width='100%' height='100%'>";
        monthHTML += "<td colspan=" + String(calendarData.dayInWeek) + " valign='bottom' class=" + ((monthNum == timeData.monthOfYear) ? "headingA" : "headingB") + ">";
        monthHTML += calendarData.months[monthNum] + "</td>";
        monthHTML += "<tr class='dayRow'>";
        for (var j = 0; j < calendarData.dayNames.length; j++) {
            monthHTML += "<td>" + calendarData.dayNames[j].substring(0, 2) + "</td>";
        }
        monthHTML += "</tr><tr>";
        for (var w = 0; w < monthRows; w++) {
            dayArgs = { "year": calendarData.calendarYear, "month": monthNum, "day": w - startDay, "startDay": startDay }
            if (isGM()) {
                MTScript.setVariable("dayArgs", JSON.stringify(dayArgs));
                MTScript.evalMacro("[h: datetime.hasEvents(dayArgs)][h: eventCheck = macro.return]");
                eventCheck = JSON.parse(MTScript.getVariable("eventCheck"));
            } else {
                eventCheck = { "day": 0 };
            }
            if (timeData.dayOfMonth + startDay == w && monthNum == timeData.monthOfYear) {
                dayClass = "currentDay";
                timeData.dayOfWeek = w % calendarData.dayInWeek;
            } else {
                dayClass = "otherDay";
            }
            if ((w >= startDay) && ((w - startDay) < dayInMonth)) {
                monthHTML += "<td class=" + ((eventCheck.day == 1 && dayClass != "currentDay") ? "eventDay" : dayClass) + ">" + create_macroLink(String(w + 1 - startDay), "viewDayEvents@Lib:DateTime", dayArgs) + "</td>";
                lastNum = ((w + 1) % calendarData.dayInWeek);
            } else {
                monthHTML += "<td>&nbsp</td>";
            }
            monthHTML += (((w + 1) % calendarData.dayInWeek == 0) ? "</tr><tr>" : "");
        }
        monthHTML += "</tr></table></div>";

        startDay = lastNum;
        calendarData.nextYearStartDay = lastNum;

        cachedHTML["month_" + String(monthNum)].valid = true;
        cachedHTML["month_" + String(monthNum)].html = monthHTML;
        cachedHTML["month_" + String(monthNum)].lastDay = lastNum;

        return monthHTML;
    }

    let calendarData = JSON.parse(read_data("calendarData"));
    let timeData = JSON.parse(read_data("timeData"));
    let leapDays = 0;
    let leapMonth = -1;
    let leapYear = isLeapYear(calendarData.calendarYear);
    if (leapYear) {
        leapDays = calendarData.leapYearDays;
        leapMonth = calendarData.leapYearMonth;
    }
    let startDay = calendarData.yearStartDay;

    let monthCount = calendarData.months.length;
    let calendarRows = Math.round(monthCount / Math.round(Math.floor(Math.sqrt(monthCount))));
    let dayNames = calendarData.dayNames;

    let cachedHTML = JSON.parse(read_data("htmlCaches"));
    if (cachedHTML.allValid) {
        return cachedHTML.yearData;
    }
    //MapTool.chat.broadcast("Generating Year HTML");

    let outputHTML = "<html><head><link rel='stylesheet' type='text/css' href='calendarCSS@Lib:DateTime'>";
    outputHTML += "<title>Calendar</title></head><body>";
    outputHTML += "<table width='100%'>";
    outputHTML += "<tr><td colspan=" + String(calendarRows) + " valign='bottom' class='headingA'>Calendar</td></tr>";
    outputHTML += "<tr><td colspan=" + String(calendarRows) + " valign='bottom' class='headingA'>" + String(calendarData.calendarYear) + "</td></tr>";
    outputHTML += "<tr>";
    for (var i = 0; i < monthCount; i++) {
        outputHTML += "<td>" + monthHTML(i) + "</td>";
        if (((i + 1) % calendarRows == 0)) {
            outputHTML += "</tr><tr>";
        }
    }
    outputHTML += "</tr><tr><td colspan=" + String(Math.ceil(calendarRows / 2)) + " valign='bottom' class='headingA'>Season</td>";
    outputHTML += "<td colspan=" + String(Math.ceil(calendarRows / 2)) + " valign='bottom' class='headingA'>";
    outputHTML += "Today, " + dayNames[timeData.dayOfWeek] + ", " + String(timeData["dayOfMonth"] + 1) + " of " + calendarData.months[timeData.monthOfYear] + ".</td></tr>";
    outputHTML += "<tr><td><b>Current Season: </b>" + calendarData.seasons[timeData.currentSeason] + "</td><td></td>";
    let currentHour = timeData.currentHour;
    let currentMinute = timeData.currentMinute;
    let currentSecond = timeData.currentSecond;
    outputHTML += "<td><b>Time: </b>" + String(currentHour).padStart(2, '0') + ":" + String(currentMinute).padStart(2, '0') + ":" + String(currentSecond).padStart(2, '0') + "</td></tr>";

    outputHTML += "</table></body></html>";

    write_data("calendarData", JSON.stringify(calendarData));
    write_data("timeData", JSON.stringify(timeData));

    cachedHTML.yearData = outputHTML;
    cachedHTML.yearValid = true;
    cachedHTML.allValid = true;
    write_data("htmlCaches", JSON.stringify(cachedHTML));

    return outputHTML;
}

MTScript.registerMacro("datetime.calendarHTML", calendarHTML);