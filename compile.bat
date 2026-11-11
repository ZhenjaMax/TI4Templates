@echo off

set "APP_PATH=C:\CardMaker\CardMaker.exe"
set "PROJECT_PATH=C:\TI4Templates"

"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Uncharted Space Front.pdf" -layoutNames "Tile Front" "Action Front" "Action Front" "Exploration Front" "Legendary Planet Front" "Planet Front" "Token S" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Uncharted Space Back.pdf" -layoutNames "Tile Back" "Action Back" "Action Back" "Exploration Back" "Legendary Planet Back" "Planet Back" -pageOrientation landscape -googleAuth

pause
