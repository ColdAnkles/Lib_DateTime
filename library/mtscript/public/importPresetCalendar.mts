[h: calendarName = "public/data/"+json.get(macro.args, 0)+".json"]
[h: importData = data.getStaticData('datetime', calendarName)]
[h: setLibProperty("calendarData", importData, "Lib:DateTime")]