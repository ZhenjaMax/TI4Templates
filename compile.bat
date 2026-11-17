@echo off

set "APP_PATH=C:\CardMaker\CardMaker.exe"
set "PROJECT_PATH=C:\TI4Templates"

set "PROJECT_NAME=All"
set "LAYOUTS_FRONT="Special, Order (Axis) Front" "Special, Trap Card (Li-Zho) Front" "Special, Policy (Olradin) Front" "Special, Omni-Forgeworld (Roh' Dhna) Front" "Legendary Planet Front" "Exploration Front" "Breakthrough Front" "Promissory Note Front" "Leader Alliance Front" "Action Front" "Agenda Front" "Technology Front" "Planet Front" "Leader Front""
set "LAYOUTS_BACK="Special, Order (Axis) Back" "Special, Trap Card (Li-Zho) Back" "Special, Policy (Olradin) Back" "Special, Omni-Forgeworld (Roh' Dhna) Back" "Legendary Planet Back" "Exploration Back" "Breakthrough Back" "Promissory Note Back" "Leader Alliance Back" "Action Back" "Agenda Back" "Technology Back" "Planet Back" "Leader Back""
set "TOKENS_FRONT="Token L Front" "Token M Front" "Token S Front" "Token Commodities Front""
set "TOKENS_BACK="Token L Back" "Token M Back" "Token S Back" "Token Commodities Back""
set "TILES="Tile Front" "Tile Back""

:: "%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Front.pdf" -layoutNames %LAYOUTS_FRONT% -pageOrientation landscape -googleAuth

:: "%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Back.pdf" -layoutNames %LAYOUTS_BACK% -pageOrientation landscape -googleAuth

:: "%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Token.pdf" -layoutNames %TOKENS% -pageOrientation landscape -googleAuth

:: "%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Tiles.pdf" -layoutNames %TILES% -pageOrientation landscape -googleAuth

"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Tokens Front.pdf" -layoutNames %TOKENS_FRONT% -pageOrientation landscape -googleAuth

:: "%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\%PROJECT_NAME% Tokens Back.pdf" -layoutNames %TOKENS_BACK% -pageOrientation landscape -googleAuth

echo READY!
pause
