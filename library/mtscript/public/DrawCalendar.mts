[h: calendar = getLibProperty("calendarData","Lib:DateTime")]
[h: monthCount = json.length(json.get(calendar,"months"))]
[h: calendarRows = monthCount / round(math.floor(sqrt(monthCount)))]
[h: dayInMonth = json.get(calendar,"dayInMonth")]
[h: dayNames = json.get(calendar,"dayNames")]
[h: time = getLibProperty("timeData","Lib:DateTime")]

[h: mostWeekInMonth = json.get(calendar,"mostWeekInMonth")]
[h: currentCount = multiply(round(ceil(divide(divide(math.arraySum(json.get(calendar,"dayInMonth")),monthCount), json.get(calendar,"dayInWeek")))),2)]
[h, if(mostWeekInMonth>currentCount), code:{
	[h: mostWeekInMonth=0]
	[h: calendar = json.set(calendar,"mostWeekInMonth",mostWeekInMonth)]
	[h: setLibProperty("calendarData",calendar,"Lib:DateTime")]
};{}]

[h: macro.return=number(json.get(calendar,"yearStartDay"))]
[frame5("Calendar", "width=900; height=900"): {
<html>
<head>
<link rel="stylesheet" type="text/css" href="calendarCSS@Lib:DateTime">
<title>Calendar</title>
</head>
<body>
<table width="100%">
	<tr>
		<td colspan=[r: calendarRows] valign="bottom" class="headingA">
			Calendar
		</td>
	</tr>
	<tr>
		<td colspan=[r: calendarRows] valign="bottom" class="headingA">
			[r: json.get(calendar,"calendarYear")]
		</td>
	</tr>
	<tr>
		[r, count(monthCount,""), code:{
			[h: loop = roll.count]
			[h: monthdata=json.set("{}","monthName",json.get(json.get(calendar,"months"),loop),"monthNum",loop,"dayInWeek",json.get(calendar,"dayInWeek"),"dayInMonth",json.get(dayInMonth,loop),"StartDay",number(macro.return),"dayOfMonth",json.get(time,"dayOfMonth"),"currentMonth",json.get(json.get(calendar,"months"),json.get(time,"monthOfYear")))]
			<td>[MACRO("DrawMonth@Lib:DateTime"):monthData]</td>
			[h: lastDay=macro.return]
			[r: if(math.mod(loop+1,calendarRows)==0,"</tr><tr>","")]
		}]
	</tr>
	<tr>
		<td colspan=[r: ceiling(calendarRows/2)] valign="bottom" class="headingA">
			Season
		</td>
		<td colspan=[r: floor(calendarRows/2)] valign="bottom" class="headingA">
			[h: dayNum=number(json.get(time,"dayOfWeek"))]
			[h: 'broadcast(dayNum)']
			Today, [r: json.get(dayNames,dayNum)], [r: json.get(time,"dayOfMonth")+1] of [r: json.get(json.get(calendar,"months"),number(json.get(time,"monthOfYear")))].
		</td>
	</tr>
	<tr>
		<td><b>Current Season: </b>[r: json.get(json.get(calendar,"seasons"),json.get(time,"currentSeason"))]</td><td></td>
		<td><b>Time: </b>[r: strformat("%02d",json.get(time,"currentHour"))]:[r:strformat("%02d",json.get(time,"currentMinute"))]:[r:strformat("%02d",json.get(time,"currentSecond"))]</td>
	</tr>
</table>
</body>
</html>
[h: calendar=getLibProperty("calendarData","Lib:DateTime")]
[h: calendar=json.set(calendar,"nextYearStartDay",lastDay)]
[h: setLibProperty("calendarData", calendar,"Lib:DateTime")]
}]
