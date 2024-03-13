"use strict";

function createGMMacros(tokenID) {
    let GMMacros = [{ "label": "<b>Calendar</b>", "playerEditable": 0, "command": "[macro(\"DrawCalendar@lib:datetime\"): \"\"]", "tooltip": "Open the Calendar", "color": "black", "fontColor": "white", "fontSize": "1.25em" },
    { "label": "+10 Min", "playerEditable": 0, "command": "[h: arguments = json.set(\"{}\",\"Advance\",\"Advance\",\"selectedNumber\",10,\"numberType\",\"Minutes\")][h, MACRO(\"AdvanceTime@Lib:DateTime\"):arguments]", "tooltip": "Add 10 minutes" },
    { "label": "Round Time", "playerEditable": 0, "command": "[h: arguments = json.set(\"{}\",\"Advance\",\"Advance\",\"selectedNumber\",6,\"numberType\",\"Seconds\")][h, MACRO(\"AdvanceTime@Lib:DateTime\"):arguments]", "tooltip": "Add six seconds" },
    { "label": "Add Event", "playerEditable": 0, "command": "[h: datetime.AddEvent()]", "tooltip": "Add Event to Calendar" },
    { "label": "Advance Time", "playerEditable": 0, "command": "[h: datetime.AdvanceTime()]", "tooltip": "Advance Time" },
    { "label": "Advance to Tomorrow", "playerEditable": 0, "command": "[h: datetime.advanceToTomorrow()]", "tooltip": "Advance Time until Next Morning" },
    { "label": "Quick Event", "playerEditable": 0, "command": "[h: datetime.QuickEvent()]", "tooltip": "Add Event Quickly" },
    { "label": "Set Date/Time", "playerEditable": 0, "command": "[h: datetime.SetDateTime()]", "tooltip": "Set Date and Time as Desired" },
    { "label": "Travel", "playerEditable": 0, "command": "[h: datetime.travelTime()]", "tooltip": "Add time based on travel distance and speed" }];
    for (var m in GMMacros) {
        createMacro(GMMacros[m], tokenID);
    }
}

MTScript.registerMacro("datetime.createGMMacros", createGMMacros);

function createCampaignMacros(tokenID) {
    let campaignMacros = [{ "label": "<b>Calendar</b>", "playerEditable": 0, "command": "[macro(\"DrawCalendar@lib:datetime\"): \"\"]", "tooltip": "Open the Calendar", "color": "black", "fontColor": "white", "fontSize": "1.25em" }];
    for (var m in campaignMacros) {
        createMacro(campaignMacros[m], tokenID);
    }
}

MTScript.registerMacro("datetime.createCampaignMacros", createCampaignMacros);

