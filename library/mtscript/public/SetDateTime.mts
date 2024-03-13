[h: dayWords = json.append("[]","Morning","Daytime","Evening","Nighttime")]
[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: oldTime = time]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: oldYear = json.get(calendar,"calendarYear")]
[h: oldTime = datetime.now()]
[h: dayArray="[]"]
[h: hourArray="[]"]
[h: minuteArray="[]"]
[h: secondArray="[]"]
[h: mostDays = math.arrayMax(json.get(calendar,"dayInMonth"))]
[h, count(json.get(calendar,"hourPerDay")), code:{
	[h: hourArray=json.append(hourArray,roll.count)]
}]
[h, count(json.get(calendar,"minutePerHour")), code:{
	[h: minuteArray=json.append(minuteArray,roll.count)]
}]
[h, count(json.get(calendar,"secondPerMinute")), code:{
	[h: secondArray=json.append(secondArray,roll.count)]
}]
[h, count(mostDays), code:{
	[h: val = roll.count+1]
	[h: dayArray=json.append(dayArray,val)]
}]
[h: status=input("uHour| "+hourArray+" | Hour | LIST | SELECT="+json.get(time,"currentHour")+" DELIMITER=JSON",
"uMinute | "+minuteArray+" | Minute | LIST | SELECT="+json.get(time,"currentMinute")+" DELIMITER=JSON",
"uSecond | "+secondArray+" | Second | LIST | SELECT="+json.get(time,"currentSecond")+" DELIMITER=JSON",
"uYear | "+json.get(calendar,"calendarYear")+" | Year",
"uMonth | "+json.toList(json.get(calendar,"months"),",")+" | Month | LIST | SELECT="+json.get(time,"monthOfYear"),
"uDay | "+json.toList(dayArray)+" | Day of Month | LIST | SELECT="+json.get(time,"dayOfMonth")+"",
"uSeason | "+json.toList(json.get(calendar,"seasons"),",")+" | Season | LIST | SELECT="+json.get(time,"currentSeason"),
"uYearStart | "+json.toList(json.get(calendar,"dayNames"),",")+" | Year Starts On | LIST | SELECT="+json.get(calendar,"yearStartDay")
)]

[h: return(status)]

[h: time=json.set(time,"currentHour",uHour)]
[h: time=json.set(time,"currentMinute",uMinute)]
[h: time=json.set(time,"currentSecond",uSecond)]
[h: calendar=json.set(calendar,"calendarYear",uYear)]
[h: time=json.set(time,"monthOfYear",uMonth)]
[h: time=json.set(time,"dayOfMonth",uDay)]
[h: time=json.set(time,"currentSeason",uSeason)]
[h: calendar=json.set(calendar,"yearStartDay",uYearStart)]
[h: lastYearStartDay = uYearStart-1]
[h, if(lastYearStartDay==-1), code:{
	[h: lastYearStartDay=6]
};{}]
[h: calendar=json.set(calendar,"lastYearStartDay",lastYearStartDay)]

[h: setLibProperty("timeData",time,"Lib:DateTime")]
[h: setLibProperty("calendarData",calendar,"Lib:DateTime")]

[h: htmlCaches = getLibProperty("htmlCaches", "Lib:DateTime")]
[h: htmlCaches = json.set(htmlCaches, "yearValid", false, "allValid", false)]
[h: setLibProperty("htmlCaches", htmlCaches, "Lib:DateTime")]

[h: vis =  isFrameVisible("Calendar")]
[h, if(vis), code:{
	[MACRO("DrawCalendar@Lib:DateTime") : "{ParentToken:'Lib:DateTime'}"]
}]
[h: datetime.updateUI()]
[h: datetime.checkExpiry(oldTime, datetime.now())]