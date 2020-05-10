const path = require("path"), url = require("url"), {app, BrowserWindow} = require("electron");
var win;

function createWindow() {
    win = new BrowserWindow({
        width: 900,
        height: 900,
        icon: __dirname + "/snake.png"
    }); win.loadURL(url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true
    })); 
    
    win.webContents.openDevTools();
    win.on("closed", () => win = null);
}

app.on("ready", () => createWindow());
app.on("window-all-closed", () => app.quit());