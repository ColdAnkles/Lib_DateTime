<!-- cleanSecondEvents(year,month,day,hour)-->
[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: year = json.get(macro.args,0)]
[h: month = json.get(macro.args,1)]
[h: day = json.get(macro.args,2)]
[h: hour = json.get(macro.args,3)]


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

[h, FOREACH(minute, hourEvents, ""), code:{
	[h: datetime.cleanMinuteEvents(year,month,day,strformat("%02d",hour),strformat("%02d",minute))]
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

[h, if(hourEvents=="{}"), code:{
	[h: dayEvents = json.remove(dayEvents, strformat("%02d",hour))]
	[h: monthEvents = json.set(monthEvents, day, dayEvents)]
	[h: yearEvents = json.set(yearEvents, month, monthEvents)]
	[h: events = json.set(events, year, yearEvents)]
	[h: setLibProperty("eventData",events,"Lib:DateTime")]
};{}]
