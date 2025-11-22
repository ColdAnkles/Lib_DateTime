"use strict";

function eventCheck(calendar, checkInput, events, year, month, day, hour, minute, second, output) {
	for (var e in events[year][month][day][hour][minute][second]) {
		let theEvent = events[year][month][day][hour][minute][second][e];
		if (theEvent.expire && theEvent.expire != "false") {
			if (!output) {
				MapTool.chat.broadcast("<b>The following events have passed:</b>");
				output = true;
			}
			if (theEvent.gmOnly == "true") {
				MapTool.chat.broadcastToGM(String(theEvent.name));
			} else {
				MapTool.chat.broadcast(String(theEvent.name));
			}
			if(theEvent.callBack != null){
				MTScript.evalMacro(theEvent.callBack);
			}
			if(theEvent.autoDelete != null && theEvent.autoDelete){
				let delEvents = read_data("deleteEvents");
				if (delEvents == null || delEvents.length==0 || delEvents == "\"\""){
					delEvents = [theEvent.uid];
				}else{
					delEvents = JSON.parse(delEvents);
					delEvents.push(theEvent.uid);
				}
				write_data("deleteEvents", JSON.stringify(delEvents));
			}
		}
	}
	return output;
}

function secondCheck(startSecond, endSecond, frontEdge, backEdge, calendar, checkInput, events, year, month, day, hour, minute, output) {
	for (var second in events[year][month][day][hour][minute]) {
		//MapTool.chat.broadcast(startSecond+","+endSecond+","+frontEdge+","+backEdge+","+calendar+","+checkInput+","+events+","+year+","+month+","+day+","+hour+","+minute);
		if (second < startSecond || second > endSecond) {

		} else {
			if (second != endSecond) {
				output = eventCheck(calendar, checkInput, events, year, month, day, hour, minute, second, output);
			}
		}
	}
	return output;
}

function minuteCheck(startMinute, endMinute, frontEdge, backEdge, calendar, checkInput, events, year, month, day, hour, output) {
	for (var minute in events[year][month][day][hour]) {
		//MapTool.chat.broadcast(startMinute+","+endMinute+","+frontEdge+","+backEdge+","+calendar+","+checkInput+","+events+","+year+","+month+","+day+","+hour+","+minute);
		if (minute < startMinute || minute > endMinute) {

		} else {
			let checkStartSecond = 0;
			let checkEndSecond = calendar.secondPerMinute;
			let checkFrontEdge = false;
			let checkBackEdge = false;
			if (minute == startMinute && frontEdge) {
				checkStartSecond = checkInput.oldSecond;
				checkFrontEdge = true;
			}
			if (minute == endMinute && backEdge) {
				checkEndSecond = checkInput.newSecond;
				checkBackEdge = true;
			}
			output = secondCheck(checkStartSecond, checkEndSecond, checkFrontEdge, checkBackEdge, calendar, checkInput, events, year, month, day, hour, minute, output);
		}
	}
	return output;
}

function hourCheck(startHour, endHour, frontEdge, backEdge, calendar, checkInput, events, year, month, day, output) {
	for (var hour in events[year][month][day]) {
		//MapTool.chat.broadcast(startHour+","+endHour+","+frontEdge+","+backEdge+","+calendar+","+checkInput+","+events+","+year+","+month+","+day+","+hour);
		if (hour < startHour || hour > endHour) {

		} else {
			let checkStartMinute = 0;
			let checkEndMinute = calendar.minutePerHour;
			let checkFrontEdge = false;
			let checkBackEdge = false;
			if (hour == startHour && frontEdge) {
				checkStartMinute = checkInput.oldMinute;
				checkFrontEdge = true;
			}
			if (hour == endHour && backEdge) {
				checkEndMinute = checkInput.newMinute;
				checkBackEdge = true;
			}
			output = minuteCheck(checkStartMinute, checkEndMinute, checkFrontEdge, checkBackEdge, calendar, checkInput, events, year, month, day, hour, output);
		}
	}
	return output;
}

function dayCheck(startDay, endDay, frontEdge, backEdge, calendar, checkInput, events, year, month, output) {
	for (var day in events[year][month]) {
		//MapTool.chat.broadcast(startDay+","+endDay+","+frontEdge+","+backEdge+","+calendar+","+checkInput+","+events+","+year+","+month+","+day);
		if (day < startDay || day > endDay) {

		} else {
			let checkStartHour = 0;
			let checkEndHour = calendar.hourPerDay;
			let checkFrontEdge = false;
			let checkBackEdge = false;
			if (day == startDay && frontEdge) {
				checkStartHour = checkInput.oldHour;
				checkFrontEdge = true;
			}
			if (day == endDay && backEdge) {
				checkEndHour = checkInput.newHour;
				checkBackEdge = true;
			}
			output = hourCheck(checkStartHour, checkEndHour, checkFrontEdge, checkBackEdge, calendar, checkInput, events, year, month, day, output);
		}
	}
	return output;
}

function monthCheck(startMonth, endMonth, frontEdge, backEdge, calendar, checkInput, events, year, output) {
	// loop through event dict on month level, for given year and discard months outside check range
	for (var month in events[year]) {
		//MapTool.chat.broadcast(startMonth+","+endMonth+","+frontEdge+","+backEdge+","+calendar+","+checkInput+","+events+","+year+","+month);
		if (month < startMonth || month > endMonth) {

		} else {
			//check every day in the month, except the first and last months in the old-new range, where we begin/end at the old/new days
			let checkStartDay = 0;
			let checkEndDay = Math.max.apply(null, calendar.dayInMonth);
			let checkFrontEdge = false;
			let checkBackEdge = false;
			if (month == startMonth && frontEdge) {
				checkStartDay = checkInput.oldDay;
				checkFrontEdge = true;
			}
			if (month == endMonth && backEdge) {
				checkEndDay = checkInput.newDay;
				checkBackEdge = true;
			}
			output = dayCheck(checkStartDay, checkEndDay, checkFrontEdge, checkBackEdge, calendar, checkInput, events, year, month, output);
		}
	}
	return output;
}

function checkExpiry(checkInput) {
	try {
		// get arguments
		//MapTool.chat.broadcastToGM(String(MTScript.getMTScriptCallingArgs()));
		//let checkInput = MTScript.getMTScriptCallingArgs()[0];
		//let libToken = MapTool.tokens.getTokenByID("");
		//let calendar = JSON.parse(libToken.getProperty("calendarData"));
		//let events = JSON.parse(libToken.getProperty("eventData"));
		let calendar = checkInput.calendar;
		let events = checkInput.events;
		let output = false;
		// loop through event dict on year level, discarding years outside the old-new range
		for (var year in events) {
			if (year < checkInput.oldYear || year > checkInput.newYear) {

			} else {
				//check every month of the year, except the first and last years in the old-new range
				let checkStartMonth = 0;
				let checkEndMonth = calendar.months.length;
				let checkFrontEdge = false;
				let checkBackEdge = false;
				if (year == checkInput.oldYear) {
					checkStartMonth = checkInput.oldMonth;
					checkFrontEdge = true;
				}
				if (year == checkInput.newYear) {
					checkEndMonth = checkInput.newMonth;
					checkBackEdge = true;
				}
				output = monthCheck(checkStartMonth, checkEndMonth, checkFrontEdge, checkBackEdge, calendar, checkInput, events, year, output);
			}
		}
	} catch (e) {
		MapTool.chat.broadcast("" + e + "\n" + e.stack);
	}
}

MTScript.registerMacro("datetime.checkExpiry", checkExpiry);