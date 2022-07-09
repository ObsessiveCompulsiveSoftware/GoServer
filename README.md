# GoServer
 A GoLang server for handling WebSocket connections.

## Download GoLang for Windows.
https://go.dev/dl/

## Setup GOPATH for Windows.
1. Go to `Control Panel`->`System and Security`->`System`->`Advanced system settings`.
2. Go to the `Advanced` tab.
3. Click `Environment Variables...`->Go to `System variables`->Click `New`.
    - Set `Variable name:` = `GOPATH`.
    - Set `Variable value:` = `C:\ObsessiveCompulsiveSoftware\Go`
    - Click `OK`.

## Create 3 folders inside the GOPATH directory.
```
cd C:\ObsessiveCompulsiveSoftware\Go
mkdir bin
mkdir pkg
mkdir src
```

## Download VS Code for Windows.
https://code.visualstudio.com/Download

## Turn on Auto Save for VS Code.
1. Open VS Code.
2. Go to `File`->`Auto Save`. Make sure this is ticked.
3. Go to `File`->`Preferences`->`Settings`.
4. Search for "auto save" and change the dropdown value from "afterDelay" to "onFocusChange". This should automatically save files when you tab to a different screen.

## Clone this repository to your local machine.
1. Clone the GoServer repository. https://github.com/ObsessiveCompulsiveSoftware/
2. Save it into a new folder. `C:\ObsessiveCompulsiveSoftware\Go\src\GoServer`
3. Alternatively, this can be done via the terminal.
```
gh repo clone ObsessiveCompulsiveSoftware/GoServer
```

## Open the project in VS Code.
1. Open the `C:\ObsessiveCompulsiveSoftware\Go\src\GoServer` project in VS Code.

## Open the terminal in VS Code.
```
Ctrl + `
```

## Initialise the Go project.
1. Open the terminal in VS Code.
2. Navigate to the "C:\ObsessiveCompulsiveSoftware\Go\src\GoServer" directory.
```
cd C:\ObsessiveCompulsiveSoftware\Go\src\GoServer
```
3. Then run the "go mod init" command to initialise the Go project.
```
go mod init GoServer
```

## Tidy the go files.
Try to run the command below.
```
go mod tidy
```
And if you receive "$GOPATH/go.mod exists but should not", try changing directory to
```
cd C:\ObsessiveCompulsiveSoftware\Go\src\GoServer
```
and then run the commands again.
```
cd C:\ObsessiveCompulsiveSoftware\Go\src
mkdir GoServer
cd GoServer
go mod init GoServer
go mod tidy
```

## Start the server.
```
go run main.go
```

## Generate a self-signed certificate.
```
openssl genrsa -out server.key 2048
openssl ecparam -genkey -name secp384r1 -out server.key
openssl req -new -x509 -sha256 -key server.key -out server.crt -days 3650
```
