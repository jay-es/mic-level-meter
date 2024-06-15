const { app, BrowserWindow } = require("electron/main");

function createWindow() {
  const win = new BrowserWindow({
    title: "Mic Level Meter",
    width: 32,
    height: 142,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    frame: false,
    transparent: true,
  });

  win.loadFile("./client/index.html");

  if (process.argv.includes("--devtools")) {
    win.webContents.openDevTools({ mode: "detach" });
  }
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
