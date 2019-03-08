@echo Installing Menneu shell extension...


xcopy /Y .\menneu-shell-ext "%HomeDrive%%HomePath%\menneu-shell-ext\"


@set PWS=powershell.exe -ExecutionPolicy Bypass -NoLogo -NonInteractive -NoProfile

@set TARGET='"""%HomePath%\menneu-shell-ext\menneu-html.cmd"""'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\Markdown to HTML (+scripting).lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.WindowStyle = 7; $S.Save()"

@set TARGET='"""%HomePath%\menneu-shell-ext\menneu-raw-html.cmd"""'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\Markdown to HTML.lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.WindowStyle = 7; $S.Save()"

@set TARGET='"""%HomePath%\menneu-shell-ext\menneu-png.cmd"""'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\Markdown to PNG (+scripting).lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.WindowStyle = 7; $S.Save()"

@set TARGET='"""%HomePath%\menneu-shell-ext\menneu-raw-png.cmd"""'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\Markdown to PNG.lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.WindowStyle = 7; $S.Save()"

@set TARGET='"""%HomePath%\menneu-shell-ext\menneu-pdf.cmd"""'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\Markdown to PDF (+scripting).lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.WindowStyle = 7; $S.Save()"

@set TARGET='"""%HomePath%\menneu-shell-ext\menneu-raw-pdf.cmd"""'
@set SHORTCUT='%AppData%\Microsoft\Windows\SendTo\Markdown to PDF.lnk'
%PWS% -Command "$ws = New-Object -ComObject WScript.Shell; $s = $ws.CreateShortcut(%SHORTCUT%); $S.TargetPath = %TARGET%; $S.WindowStyle = 7; $S.Save()"


@pause