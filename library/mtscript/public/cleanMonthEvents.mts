<!-- cleanMonthEvents(year,month)-->
[h: events = getLibProperty("eventData","Lib:DateTime")]
[h: year = json.get(macro.args,0)]
[h: month = json.get(macro.args,1)]


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

[h, FOREACH(day, monthEvents, ""), code:{
	[h: datetime.cleanDayEvents(year,month,day)]
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

[h, if(monthEvents=="{}"), code:{
	[h: yearEvents = json.remove(yearEvents, month)]
	[h: events = json.set(events, year, yearEvents)]
	[h: setLibProperty("eventData",events,"Lib:DateTime")]
};{}]
