[h: monthCount = 12]
[h: dayCount = 7]
[h: hourPerDay = 24]
[h: minutePerHour = 60]
[h: secondPerMinute = 60]
[h: ans=input("monthCount|12|Number of Months",
"dayCount|7|Number of Days in the Week",
"hourPerDay|24|Hours Per Day",
"minutePerHour|60|Minutes Per Hour",
"secondPerMinute|60|Seconds Per Minute")]

[h: monthNames = "[]"]
[h: monthDays = "[]"]
[h: monthInputString = "[h: input("]
[h, count(monthCount), code:{
    [h: monthNames = json.append(monthNames, '"monthName_'+roll.count+'|Month '+(roll.count+1)+'|Month '+(roll.count+1)+'"')]
    [h: monthNames = json.append(monthNames, '"monthDays_'+roll.count+'|31|Days in Month '+(roll.count+1)+'"')]

}]
[h: monthInputString = monthInputString + json.toList(monthNames,",") + ")]"]

[h: evalMacro(monthInputString)]
[h: monthNames = "[]"]

[h, count(monthCount), code:{
    [h: monthNames = json.append(monthNames, evalMacro("[r: monthName_"+roll.count+"]"))]
    [h: monthDays = json.append(monthDays, evalMacro("[r: monthDays_"+roll.count+"]"))]
}]

[h: dayNames = "[]"]
[h: dayInputString = "[h: input("]
[h, count(dayCount), code:{
    [h: dayNames = json.append(dayNames, '"dayName_'+roll.count+'|Day '+(roll.count+1)+'|Day '+(roll.count+1)+'"')]

}]
[h: dayInputString = dayInputString + json.toList(dayNames,",") + ")]"]

[h: evalMacro(dayInputString)]
[h: dayNames = "[]"]

[h, count(dayCount), code:{
    [h: dayNames = json.append(dayNames, evalMacro("[r: dayName_"+roll.count+"]"))]
}]

[h: calendarData = "{}"]
[h: calendarData = json.set(calendarData, "calendarYear", 1)]
[h: calendarData = json.set(calendarData, "dayInMonth", monthDays)]
[h: calendarData = json.set(calendarData, "dayInWeek", dayCount)]
[h: calendarData = json.set(calendarData, "dayNames", dayNames)]
[h: calendarData = json.set(calendarData, "hourPerDay", hourPerDay)]
[h: calendarData = json.set(calendarData, "lastYearStartDay", 1)]
[h: calendarData = json.set(calendarData, "minutePerHour", minutePerHour)]
[h: calendarData = json.set(calendarData, "months", monthNames)]
[h: calendarData = json.set(calendarData, "nextYearStartDay", 1)]
[h: calendarData = json.set(calendarData, "seasons", json.append("[]","Summer","Autumn","Winter","Spring"))]
[h: calendarData = json.set(calendarData, "secondPerMinute", secondPerMinute)]
[h: calendarData = json.set(calendarData, "yearStartDay", 0)]
[h: calendarData = json.set(calendarData, "mostWeekInMonth", ceil(math.arrayMax(monthDays)/dayCount)+2)]

[h: timeData = "{}"]
[h: timeData = json.set(timeData, "dayOfWeek", 0)]
[h: timeData = json.set(timeData, "dayOfMonth", 0)]
[h: timeData = json.set(timeData, "monthOfYear", 0)]
[h: timeData = json.set(timeData, "timeOfDay", 0)]
[h: timeData = json.set(timeData, "currentSeason", 0)]
[h: timeData = json.set(timeData, "currentHour", 0)]
[h: timeData = json.set(timeData, "currentMinute", 0)]
[h: timeData = json.set(timeData, "currentSecond", 0)]

[h: setLibProperty("calendarData", calendarData, "Lib:DateTime")]
[h: setLibProperty("timeData", timeData, "Lib:DateTime")]
[h: setLibProperty("eventData", "{}", "Lib:DateTime")]
[h: setLibProperty("overlayControls", true, "Lib:DateTime")]

[h: datetime.SetDateTime()]