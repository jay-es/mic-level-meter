const { app, BrowserWindow } = require("electron/main");
const windowStateKeeper = require("electron-window-state");

function createWindow() {
  const mainWindowState = windowStateKeeper();

  const win = new BrowserWindow({
    title: "Mic Level Meter",
    width: 32,
    height: 142,
    x: mainWindowState.x,
    y: mainWindowState.y,
    alwaysOnTop: true,
    resizable: false,
    maximizable: false,
    frame: false,
    transparent: true,
  });

  win.loadFile("./client/index.html");

  // ウィンドウを動かしたら位置を記録（manage メソッドだと記録されなかった）
  win.on("moved", () => {
    mainWindowState.saveState(win);
  });

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
