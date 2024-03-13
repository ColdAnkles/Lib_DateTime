[h: timeData = getLibProperty("timeData","Lib:DateTime")]
[h: calendarData = getLibProperty("calendarData","Lib:DateTime")]

[h: currentMonth = json.get(timeData, "monthOfYear")]

[h: possibleSeasons = json.get(json.get(calendarData, "seasonDistribution"), currentMonth)]

[h: chosenSeason = json.get(json.shuffle(possibleSeasons), 0)]

[h: seasonIndex = json.indexOf(json.get(calendarData, "seasons"), chosenSeason)]

[h: timeData = json.set(timeData, "currentSeason", seasonIndex)]
[h: setLibProperty("timeData",timeData,"Lib:DateTime")]

[h, if(datetime.libraryLoaded("Lib:RLWeather")), code:{
    [h: ca.rlw.SetSeason(chosenSeason)]
}]