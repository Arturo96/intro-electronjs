const {app, BrowserWindow, Menu } = require('electron');
const url = require('url');
const path = require('path');

let mainWindow, newProductWindow;

if(process.env.NODE_ENV !== 'production') {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    })
}

const templateMenu = [
    {
        label: 'File',
        submenu: [
            {
                label: 'New Product',
                accelerator: 'Ctrl+N',
                click() {
                    createNewProductWindow();
                }
            },
            {
                label: 'Remove All Products',
                
            },
            {
               label: 'Exit',
               accelerator: process.platform == 'darwin' ? 'command+Q' : 'Ctrl+Q',
               click() {
                   app.quit();
               } 
            }
        ]
    },
    
]

const createNewProductWindow = () => {
    newProductWindow = new BrowserWindow({
        width: 400,
        height: 330
    });

    newProductWindow.setMenu(null);

    newProductWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/new-product.html'),
        protocol: 'file',
        slashes: true
    }))

    newProductWindow.on('closed', () => {
        newProductWindow = null;
    })
}


app.on('ready', () => {
    mainWindow = new BrowserWindow({});
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'views/index.html'),
        protocol: 'file',
        slashes: true
    }))

    const mainMenu = Menu.buildFromTemplate(templateMenu);
    Menu.setApplicationMenu(mainMenu);

    mainWindow.on('closed', () => {
        app.quit();
    })
})

if(process.env.NODE_ENV !== 'production') {
    templateMenu.push({
        label: 'DevTools',
        submenu: [
            {
                label: 'Show/Hide Dev Tools',
                accelerator: 'F12',
                click(item, focusedWindow) {
                    focusedWindow.toggleDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    })
}