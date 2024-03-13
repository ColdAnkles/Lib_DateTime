[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: monthCount = json.length(json.get(calendar,"months"))]
[h: calendarRows = round(monthCount / round(math.floor(sqrt(monthCount))))]
[h: dayInMonth = json.get(calendar,"dayInMonth")]
[h: dayNames = json.get(calendar,"dayNames")]
[h: time = getLibProperty("timeData","Lib:DateTime")]

[h: mostWeekInMonth = json.get(calendar,"mostWeekInMonth")]
[h: currentCount = multiply(round(ceil(divide(divide(math.arraySum(json.get(calendar,"dayInMonth")),monthCount), json.get(calendar,"dayInWeek")))),2)]
[h, if(mostWeekInMonth>currentCount), code:{
	[h: mostWeekInMonth=0]
	[h: calendar = json.set(calendar,"mostWeekInMonth",mostWeekInMonth)]
	[h: setLibProperty("calendarData",calendar,"Lib:DateTime")]
};{}]

[h: isLeapYear = js.datetime.isLeapYear(json.get(calendar,"calendarYear"))=="true"]
[h: leapDays = 0]
[h: leapMonth = -1]
[h, if(isLeapYear), code:{
	[h: leapDays = json.get(calendar,"leapYearDays")]
	[h: leapMonth = json.get(calendar,"leapYearMonth")]
};{}]

[h: macro.return=number(json.get(calendar,"yearStartDay"))]
[frame5("Calendar", "width=900; height=950"): {
	[r: js.datetime.calendarHTML()]
}]
