[h: hourEvents = json.get(macro.args,"hourEvents")]
[h, if(hourEvents==""), code:{
	[h: hourEvents="{}"]
};{}]
[h: calendar = getLibProperty("calendarData")]
<table>
[h: minuteVar = json.sort(json.fields(hourEvents,"json"))]
[r, FOREACH(minute, minuteVar,""), code:{
	[h: minuteEvents = json.get(hourEvents, strformat("%02d",minute))]
	[r, if(minuteEvents!=""), code:{
		[h: minuteData = json.set(macro.args, "minuteEvents", minuteEvents,"minute",strformat("%02d",minute))]
		[MACRO("DrawMinuteEvents@Lib:DateTime"):minuteData]
	};{}]
}]

</table>