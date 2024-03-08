[h: time=json.get(macro.args,0)]

[h: events = getLibProperty("eventData","Lib:DateTime")]

[h: returnVar="{}"]

[h, if(events==""), code:{
	[h: events = "{}"]
	[h: returnVar=json.set(returnVar,"year",false)]
	[h: returnVar=json.set(returnVar,"month",false)]
	[h: returnVar=json.set(returnVar,"day",false)]
	[h: returnVar=json.set(returnVar,"hour",false)]
	[h: returnVar=json.set(returnVar,"minute",false)]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{}]
[h: yearEvents = json.get(events,json.get(time,"year"))]
[h, if(yearEvents==""), code:{
	[h: yearEvents = "{}"]
	[h: returnVar=json.set(returnVar,"year",false)]
	[h: returnVar=json.set(returnVar,"month",false)]
	[h: returnVar=json.set(returnVar,"day",false)]
	[h: returnVar=json.set(returnVar,"hour",false)]
	[h: returnVar=json.set(returnVar,"minute",false)]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{
	[h: returnVar=json.set(returnVar,"year",true)]
}]
[h: monthEvents = json.get(yearEvents,json.get(time,"month"))]
[h, if(monthEvents==""), code:{
	[h: monthEvents = "{}"]
	[h: returnVar=json.set(returnVar,"month",false)]
	[h: returnVar=json.set(returnVar,"day",false)]
	[h: returnVar=json.set(returnVar,"hour",false)]
	[h: returnVar=json.set(returnVar,"minute",false)]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{
	[h: returnVar=json.set(returnVar,"month",true)]
}]
[h: dayEvents = json.get(monthEvents,json.get(time,"day"))]
[h, if(dayEvents==""), code:{
	[h: dayEvents = "{}"]
	[h: returnVar=json.set(returnVar,"day",false)]
	[h: returnVar=json.set(returnVar,"hour",false)]
	[h: returnVar=json.set(returnVar,"minute",false)]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{
	[h: returnVar=json.set(returnVar,"day",true)]
}]
[h: hourEvents = json.get(dayEvents,json.get(time,"hour"))]
[h, if(hourEvents==""), code:{
	[h: hourEvents = "{}"]
	[h: returnVar=json.set(returnVar,"hour",false)]
	[h: returnVar=json.set(returnVar,"minute",false)]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{
	[h: returnVar=json.set(returnVar,"hour",true)]
}]
[h: minuteEvents = json.get(hourEvents,json.get(time,"minute"))]
[h, if(minuteEvents==""), code:{
	[h: minuteEvents = "{}"]
	[h: returnVar=json.set(returnVar,"minute",false)]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{
	[h: returnVar=json.set(returnVar,"minute",true)]
}]
[h: secondEvents = json.get(minuteEvents,json.get(time,"second"))]
[h, if(secondEvents==""), code:{
	[h: secondEvents = "[]"]
	[h: returnVar=json.set(returnVar,"second",false)]
	[h: return(0,returnVar)]
};{
	[h: returnVar=json.set(returnVar,"second",true)]
}]

[h: return(0,returnVar)]