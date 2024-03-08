<!-- cleanMinuteEvents(year,month,day,hour,minute)-->
[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: year = json.get(macro.args,0)]
[h: month = json.get(macro.args,1)]
[h: day = json.get(macro.args,2)]
[h: hour = json.get(macro.args,3)]
[h: minute = json.get(macro.args,4)]

[h, if(events==""), code:{
	[h: events = "{}"]
};{}]
[h: yearEvents = json.get(events,year)]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
};{}]
[h: monthEvents = json.get(yearEvents,month)]
[h, if(monthEvents==""), code:{
	[h: monthEvents = "{}"]
};{}]
[h: dayEvents = json.get(monthEvents,day)]
[h, if(dayEvents==""), code:{
	[h: dayEvents = "{}"]
};{}]
[h: hourEvents = json.get(dayEvents,strformat("%02d",hour))]
[h, if(hourEvents==""), code:{
	[h: hourEvents = "{}"]
};{}]
[h: minuteEvents = json.get(hourEvents,strformat("%02d",minute))]
[h, if(minuteEvents==""), code:{
	[h: minuteEvents = "{}"]
};{}]

[h, FOREACH(second, minuteEvents, ""), code:{
	[h: datetime.cleanSecondEvents(year,month,day,strformat("%02d",hour),strformat("%02d",minute),second)]
}]

[h: events = getLibProperty("eventData","Lib:DateTime")]
[h, if(events==""), code:{
	[h: events = "{}"]
};{}]
[h: yearEvents = json.get(events,year)]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
};{}]
[h: monthEvents = json.get(yearEvents,month)]
[h, if(monthEvents==""), code:{
	[h: monthEvents = "{}"]
};{}]
[h: dayEvents = json.get(monthEvents,day)]
[h, if(dayEvents==""), code:{
	[h: dayEvents = "{}"]
};{}]
[h: hourEvents = json.get(dayEvents,strformat("%02d",hour))]
[h, if(hourEvents==""), code:{
	[h: hourEvents = "{}"]
};{}]
[h: minuteEvents = json.get(hourEvents,strformat("%02d",minute))]
[h, if(minuteEvents==""), code:{
	[h: minuteEvents = "{}"]
};{}]

[h, if(minuteEvents=="{}"), code:{
	[h: hourEvents = json.remove(hourEvents, strformat("%02d",minute))]
	[h: dayEvents = json.set(dayEvents, strformat("%02d",hour), hourEvents)]
	[h: monthEvents = json.set(monthEvents, day, dayEvents)]
	[h: yearEvents = json.set(yearEvents, month, monthEvents)]
	[h: events = json.set(events, year, yearEvents)]
	[h: setLibProperty("eventData",events,"Lib:DateTime")]
};{}]