[h: time = getLibProperty("timeData","Lib:DateTime")]
[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: now=json.set("{}","year",json.get(calendar,"calendarYear"),"month",json.get(time,"monthOfYear"),"day",json.get(time,"dayOfMonth"),"hour",json.get(time,"currentHour"),"minute",json.get(time,"currentMinute"),"second",json.get(time,"currentSecond"))]
[h: macro.return = now]