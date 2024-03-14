# Features
* Tracking Time in HH:MM:SS
* Varying Fantasy Calendars
  * Variable Numbers of Months Per Year
  * Variable Days per Week
  * Variable Hours per Day
  * Variable Minutes per Hour
  * Variable Seconds per Minute
* Event Tracking
  * GM Only Events
  * Expiring Events with Automated Warnings on Expiry

# Download
Visit [the releases page](https://github.com/ColdAnkles/Lib_DateTime/releases) and download the version of the `.mtlib` file as desired.

# Install
Drag and Drop the `.mtlib` onto an open MapTool campaign. Alternatively, use the Addon Dialog at `File > Add On Libraries`

# Uninstall
Remove the Addon under the Addon Dialog at `File > Add On Libraries`

# First Time Usage
You will be presented with a number of dialogs to guide you through the calendar setup.

## 1. Calendar Import
There are some prebuilt calendars setup. Pick the calendar of your choice, or choose the custom option.
If you chose a preloaded calendar jump to *7. Set Current Time*

## 2. Basic Calendar Settings
Fill out the dialog with the number of Months in every year, days in the week and so on as requested.

## 3. Month Settings
Name each month, and set the number of days in each month.

## 4. Day Names
Name the days of the week. Note the `Day 1` is the first day of the week.

## 5. Leap Year Configuration
If your calendar has a leap year, enter a Javascript expression to determine whether any given year is a leap year. If `AND` or `OR` are entered, they will be replaced with the valid JS `&&` or `||`.
Examples include:
* `year % 4 == 0` (every 4 years)
* `year % 4 == 0 AND (year % 100 != 0 OR year % 400 == 0)` (every 4 years and the year is NOY divisible by 100 unless divisible by 400)
* `false` (never)
Enter the Month that leap days are added to, and the number of days to add.

## 6. Season Setup
Each month can have one or two seasons assigned to be randomly selected from. Choose from "Early Summer", "Late Summer", "Early Autumn", "Late Autumn", "Early Winter", "Late Winter", "Early Spring", or "Late Spring".

## 7. Set Current Time
Set the current time, year, month, and what day of the week the year starts on. 

## 8. GM and Campaign Macros
The Addon now creates two tokens containing macros intended for the GM and Campaign Macro Panels. Drag and Drop the macros as desired.
