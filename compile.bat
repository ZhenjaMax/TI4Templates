@echo off

set "APP_PATH=C:\CardMaker\CardMaker.exe"
set "PROJECT_PATH=C:\TI4Templates"

"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Action Front.pdf" -layoutNames "Action Front" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Action Back.pdf" -layoutNames "Action Back" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Agenda Front.pdf" -layoutNames "Agenda Front" -cardIndices "1-60" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Agenda Back.pdf" -layoutNames "Agenda Back" -cardIndices "1-60" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Exploration Front.pdf" -layoutNames "Exploration Front" -cardIndices "1-23" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Exploration Back.pdf" -layoutNames "Exploration Back" -cardIndices "1-23" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Legendary Planet Front.pdf" -layoutNames "Legendary Planet Front" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Legendary Planet Back.pdf" -layoutNames "Legendary Planet Back" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Planet Front.pdf" -layoutNames "Planet Front" -cardIndices "64-90" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Planet Back.pdf" -layoutNames "Planet Back" -cardIndices "64-90" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Tile Front.pdf" -layoutNames "Tile Front" -cardIndices "38-61" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Tile Back.pdf" -layoutNames "Tile Back" -cardIndices "38-61" -pageOrientation landscape -googleAuth
"%APP_PATH%" -projectPath "%PROJECT_PATH%\Templates.cmp" -exportFormat pdf -exportPath "%PROJECT_PATH%\Output\Token S.pdf" -layoutNames "Token S" -cardIndices "13-18" -pageOrientation landscape -googleAuth

pause
