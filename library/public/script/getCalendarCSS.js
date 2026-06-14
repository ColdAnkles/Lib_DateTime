"use strict";

function getCalendarCSS() {
    let activeTheme = read_data("activeTheme");
    let themeData = JSON.parse(read_data("themeData"));
    themeData = themeData[activeTheme];

    let calendarCSS = "\
    p{\
		text-align:left;\
	}\
	\
	body{\
		font-size:12pt;\
		background-color: " + themeData.bodyBackground + ";\
		color: " + themeData.bodyTextColour + ";\
	}\
	\
	table, th, td {\
		border: 0px solid black;\
	}\
	\
	table.fullheight {\
		height:100%;\
	}\
	\
	.currentDay {\
		background-color: " + themeData.currentDayBG + ";\
		text-align:center;\
	}\
	\
	.otherDay {\
		text-align:center;\
		background-color: "+ themeData.otherDayBG + ";\
	}\
	\
	.eventDay{\
		background-color:"+ themeData.eventDayBG + ";\
		text-align:center;\
		color:"+ themeData.eventDayText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	\
	.headingA {\
		background-color:"+ themeData.headingABG + ";\
		text-align:center;\
		color:"+ themeData.headingAText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	\
	.headingB {\
		background-color:"+ themeData.headingBBG + ";\
		text-align:center;\
		color:"+ themeData.headingBText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	\
	.dayRow {\
		background-color:"+ themeData.dayRowBG + ";\
		text-align:center;\
		color:"+ themeData.dayRowText + ";\
		font-weight:bold;\
		font-size:14pt;\
	}\
	";

    return calendarCSS;
}

MTScript.registerMacro("datetime.getCalendarCSS", getCalendarCSS);