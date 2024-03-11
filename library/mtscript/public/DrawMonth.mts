[h: calendar = getLibProperty("calendarData", "Lib:DateTime")]
[h: dayNames = json.get(calendar,"dayNames")]
[h: startDay = json.get(macro.args,"StartDay")]
[h: mostWeekInMonth = json.get(calendar,"mostWeekInMonth")]
[h: dayInMonth = json.get(macro.args,"dayInMonth") + json.get(macro.args, "addDays")]
[h: currentCount = round(ceil(divide(dayInMonth+startDay, json.get(macro.args,"dayInWeek"))))]
[h: lastNum=0]
[h, if(currentCount>mostWeekInMonth), code:{
	[h: mostWeekInMonth=currentCount]
	[h: calendar = json.set(calendar,"mostWeekInMonth",mostWeekInMonth)]
	[h: setLibProperty("calendarData",calendar)]
};{}]

[h: monthRows = multiply(json.get(macro.args,"dayInWeek"), mostWeekInMonth)]

<div height="100%">
<table width="100%" height="100%">
<!-- New Table Containing The Month. Start with Month Name, and Highlighting Current Month-->
	<td colspan=[r: json.get(macro.args,"dayInWeek")] valign="bottom" class=[r: if(json.get(macro.args,"monthName")==json.get(macro.args,"currentMonth"),"headingB","headingA")]>
	[r: json.get(macro.args,"monthName")]
	</td>
	<tr class="dayRow">
	<!-- Print first two letters of each day-->
		[FOREACH(aDay,dayNames,""), CODE:{
			<td>[r: substring(aDay,0,2)]</td>
		}]
	</tr>
	<tr>
		<!-- Print Days, offset by last day of last month, to ensure days line up-->
		[r, count(monthRows,""), code:{
			[h: loop = roll.count]
			[h: dayArgs = "{}"]
			[h: dayArgs = json.set(dayArgs,"year",json.get(calendar,"calendarYear"),"month",json.get(macro.args,"monthNum"),"day",loop-startDay,"startDay",startDay)]
			[h, if(isGM()), code:{ 
				[h: datetime.hasEvents(dayArgs)]
				[h: eventCheck = macro.return]
			};{
				[h: eventCheck=json.set("{}","day",false)]
			}]
			[h, if(json.get(macro.args,"dayOfMonth")+startDay==loop && json.get(macro.args,"monthName")==json.get(macro.args,"currentMonth")), code:{
				
				[h: dayClass="currentDay"]
				[h, token("Lib:DateTime"): time=getLibProperty("timeData","Lib:DateTime")]
				[h: time=json.set(time,"dayOfWeek",math.mod(loop,json.get(macro.args,"dayInWeek")))]
				[h, token("Lib:DateTime"): timeData=time]
			};{
				[h: dayClass="otherDay"]
			}]
			[r, if(loop>=startDay && (loop-startDay)<dayInMonth), code:{
				<td class=[r: if(json.get(eventCheck,"day") && dayClass!="currentDay","eventDay",dayClass)]>[r: macroLink(number(loop+1-startDay),"viewDayEvents@Lib:DateTime", "none", dayArgs)]</td>
				[h: lastNum=loop]
				[h: 'broadcast(json.get(macro.args,"monthName") + number(loop+1-startDay))']
			};{
			<td>&nbsp</td>
			}]
			[r: if(math.mod(loop+1,json.get(macro.args,"dayInWeek"))==0,"</tr><tr>","")]
		}]
	</tr>
</table>
</div>
[h: macro.return=math.mod(lastNum+1,json.get(macro.args,"dayInWeek"))]