# Moment 5 - Webbtjänt

Funktionalitet för GET, POST, PUT(UPDATDE) & DELETE finns.
Tyvärr fick det bli lite av en fullösning efter var insert/delete/update i DB. I varje GET skickar jag med 
ett ID (detta ID tas med för att kunna göra en update och delete) så för att få ut dessa gjorde jag en livereload() efter var event (hade jag inte använt dessa ID's hade jag kunnat använda användaren inputs i min append istället). 