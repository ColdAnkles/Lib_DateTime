<!-- Return a date variable containing difference between dates submitted -->

[h: timeOne = json.get(macro.args,0)]
[h: timeTwo = json.get(macro.args,1)]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]

[h: diffedDT = json.set("{}","year",json.get(timeOne,"year")-json.get(timeTwo,"year"),"month",json.get(timeOne,"month")-json.get(timeTwo,"month"),"day",json.get(timeOne,"day")-json.get(timeTwo,"day"),"hour",json.get(timeOne,"hour")-json.get(timeTwo,"hour"),"minute",json.get(timeOne,"minute")-json.get(timeTwo,"minute"),"second",json.get(timeOne,"second")-json.get(timeTwo,"second"))]

[h, if(json.get(diffedDT,"second")<0), code:{
	[h: diffedDT = json.set(diffedDT,"minute",json.get(diffedDT,"minute")-1)]
	[h: diffedDT = json.set(diffedDT,"second",json.get(diffedDT,"second")+json.get(calendar,"secondPerMinute"))]
};{}]

[h, if(json.get(diffedDT,"minute")<0), code:{
	[h: diffedDT = json.set(diffedDT,"hour",json.get(diffedDT,"hour")-1)]
	[h: diffedDT = json.set(diffedDT,"minute",json.get(diffedDT,"minute")+json.get(calendar,"minutePerHour"))]	
};{}]

[h, if(json.get(diffedDT,"hour")<0), code:{
	[h: diffedDT = json.set(diffedDT,"day",json.get(diffedDT,"day")-1)]
	[h: diffedDT = json.set(diffedDT,"hour",json.get(diffedDT,"hour")+json.get(calendar,"hourPerDay"))]	
};{}]

[h: macro.return = diffedDT]