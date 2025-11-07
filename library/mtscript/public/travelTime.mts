[h: miles = 6]

[h: calendar = getLibProperty("calendarData","Lib:DateTime")]

[h: oldTime = datetime.now()]

[h: speedArray = "[5,10,15,20,25,30,35,40,45,50,55,60]"]

[h: status = input("uSpeed | "+speedArray+"| Speed (Feet) | LIST | SELECT=4 DELIMITER=JSON","miles|6|Miles to Travel")]

[h: abort(status)]

[h: hexcount = 2]

[h: hourPerMile = json.get(speedArray,uSpeed)/10]

[h: travelHours = (miles/hourPerMile) * (hexCount/2)]

[h: travelMinutes = (((travelHours)-floor(travelHours)) * json.get(calendar,"minutePerHour")) ]
[h: travelHours = floor(travelHours)]

[h: travelSeconds = floor((travelMinutes-floor(travelMinutes)) * json.get(calendar,"secondPerMinute"))]
[h: travelMinutes = floor(travelMinutes)]

[h: broadcast("At a speed of "+json.get(speedArray,uSpeed)+" feet, Travelling One Hex takes: "+ travelHours +" hours, "+travelMinutes+" minutes, "+travelSeconds +" seconds.")]

[h: arguments = json.set("{}","Advance","Advance","selectedNumber",travelHours,"numberType","Hours")]
[h, MACRO("AdvanceTime@Lib:DateTime"):arguments]
[h: arguments = json.set("{}","Advance","Advance","selectedNumber",travelMinutes,"numberType","Minutes")]
[h, MACRO("AdvanceTime@Lib:DateTime"):arguments]
[h: arguments = json.set("{}","Advance","Advance","selectedNumber",travelSeconds,"numberType","Seconds")]
[h, MACRO("AdvanceTime@Lib:DateTime"):arguments]
[h: newTime = datetime.now()]
[h: datetime.checkExpiry(oldTime, newTime)]