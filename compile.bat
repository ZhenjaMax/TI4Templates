@echo off

set "APP_PATH=C:\CardMaker\CardMaker.exe"
set "PROJECT_PATH=C:\TI4Templates"

set "PROJECT_NAME=All Cards"
set "TOKENS="Token Commodities" "Token L" "Token M" "Token S""
set "LAYOUTS_FRONT="Special, Order (Axis) Front" "Special, Trap Card (Li-Zho) Front" "Special, Policy (Olradin) Front" "Special, Omni-Forgeworld (Roh' Dhna) Front" "Legendary Planet Front" "Exploration Front" "Breakthrough Front" "Promissory Note Front" "Leader Alliance Front" "Action Front" "Agenda Front" "Technology Front" "Planet Front" "Leader Front""
set "LAYOUTS_BACK="Special, Order (Axis) Back" "Special, Trap Card (Li-Zho) Back" "Special, Policy (Olradin) Back" "Special, Omni-Forgeworld (Roh' Dhna) Back" "Legendary Planet Back" "Exploration Back" "Breakthrough Back" "Promissory Note Back" "Leader Alliance Back" "Action Back" "Agenda Back" "Technology Back" "Planet Back" "Leader Back""

"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Front.pdf" -layoutNames %LAYOUTS_FRONT% -pageOrientation landscape -googleAuth

echo READY!
pause
