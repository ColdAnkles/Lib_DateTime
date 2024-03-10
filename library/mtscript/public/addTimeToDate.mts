[h: timeOne = json.get(macro.args,0)]
[h: timeTwo = json.get(macro.args,1)]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]

[h: secondRawAdd = (json.get(timeOne,"second")+json.get(timeTwo,"second"))]
[h: secondMod = math.mod(secondRawAdd,json.get(calendar,"secondPerMinute"))]
[h: secondExtra = floor(secondRawAdd / json.get(calendar,"secondPerMinute"))]
[h: addedSeconds = secondMod]

[h: minuteRawAdd = json.get(timeOne,"minute")+json.get(timeTwo,"minute") + secondExtra]
[h: minuteMod = math.mod(minuteRawAdd,json.get(calendar,"minutePerHour"))]
[h: minuteExtra = floor(minuteRawAdd / json.get(calendar,"minutePerHour"))]
[h: addedMinutes = minuteMod]

[h: hourRawAdd = json.get(timeOne,"hour")+json.get(timeTwo,"hour") + minuteExtra]
[h: hourMod = math.mod(hourRawAdd,json.get(calendar,"hourPerDay"))]
[h: hourExtra = floor(hourRawAdd / json.get(calendar,"hourPerDay"))]
[h: addedHours = hourMod]

[h: dayRawAdd = json.get(timeOne,"day")+json.get(timeTwo,"day") + hourExtra]
[h: unallocatedDays = dayRawAdd]
[h: testMonth = json.get(timeOne,"month")]
[h: extraMonths = 0]
[h: monthsInYear = json.length(json.get(calendar,"months"))]
[h: testDays = json.get(json.get(calendar,"dayInMonth"),testMonth)]
[h, WHILE(unallocatedDays>testDays), code:{
	[h: unallocatedDays = unallocatedDays - json.get(json.get(calendar,"dayInMonth"),testMonth)]
	[h: extraMonths = extraMonths + 1]
	[h: testMonth = testMonth + 1]
	[h, if(testMonth == monthsInYear), code:{
		[h: testMonth=0]
	};{}]
	[h: testDays = json.get(json.get(calendar,"dayInMonth"),testMonth)]
}]
[h: addedDays = floor(unallocatedDays)]

[h: monthRawAdd = json.get(timeOne,"month")+json.get(timeTwo,"month") + extraMonths]
[h: monthMod = math.mod(monthRawAdd,length(json.get(calendar,"months")))]
[h: monthExtra = floor(monthRawAdd / json.length(json.get(calendar,"months")))]
[h: addedMonths = monthMod]

[h: yearRawAdd = json.get(timeOne,"year")+json.get(timeTwo,"year") + monthExtra]

[h: addedTD = json.set("{}","year",yearRawAdd,"month",addedMonths,"day",addedDays,"hour",addedHours,"minute",addedMinutes,"second",addedSeconds)]

[h: macro.return = addedTD]