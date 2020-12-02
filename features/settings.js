import { Setting, SettingsObject } from 'SettingsManager/SettingsManager';
import { colors } from '../helperFunctions/constants';
let settings
export default function initiateSettings() {
    settings = new SettingsObject('HoeUtilities', [{
        name: "Info",
        settings: [
            new Setting.Button("                                          &a&l[HoeUtilities]", "", () => {}),
            new Setting.Button("                                        Made by &c&ljoker876", "", () => {}),
            new Setting.Button(`                                                &8v${global.hoeutils.metadata.version}`, "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("       &dCredits", "", () => {}),
            new Setting.Button("&e&lSquagward", "Help with drag-and-drop GUI", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("Wanna suggest something? Join my &3Discord &fserver!", '&a&lLINK!', () => { ChatLib.command('hoeutils discord', true) }),
            new Setting.Button("", "", () => {}),
            new Setting.Button("&c&lNote: &rall mods are &9&nuse at own risk.", "", () => {}),
        ]
    },
    {
        name: 'Features',
        settings: [
            new Setting.Toggle('Counter', true),
            new Setting.Toggle('Crop Rate', true),
            new Setting.Toggle('Hourly Drops', true),
            new Setting.Toggle('Hourly max_exp', true),
            new Setting.Toggle('Farming Level', true),
            new Setting.Toggle('Collection', true),
            new Setting.Toggle('Hoe Lock', true),
            new Setting.Toggle('Event Reminder', true),
            new Setting.Toggle('Event Timer', true),
            new Setting.Button("", "", () => {}),
            new Setting.Button("Don't know what a ceratin feature is?", "&e&lCLICK!", () => { ChatLib.command('hoeutils help', true) }),
            new Setting.Button("Click on the button to the right.", "", () => { ChatLib.command('hoeutils help', true) }),
        ],
    },
    {
        name: 'Settings',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Slider('Scale &8in %', 100, 1, 300),
            new Setting.Toggle('Enable images', true),
        ],
    },
    {
        name: 'Timer',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Slider('Scale &8in %', 130, 1, 300),
            new Setting.Toggle('Enable image', true),
            new Setting.Slider('Remind how long before the event starts? &8in seconds', 50, 1, 240),
            new Setting.Toggle('Enable everywhere', false),
        ],
    },/* 
    {
        name: 'Sessions',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Slider('Scale &8in %', 100, 1, 300),
            new Setting.Toggle('Enable images', true),
            new Setting.Toggle('Auto-end and auto-start session', true),
            new Setting.Slider('Auto restart after &8in seconds', 60, 10, 1800),
            new Setting.Toggle('Store session history', true),
        ],
    }, */
    {
        name: 'Colors',
        settings: [
            new Setting.StringSelector('Main', 11, Object.keys(colors)),
            new Setting.StringSelector('Numbers', 15, Object.keys(colors)),
            new Setting.StringSelector('Timer', 6, Object.keys(colors)),
            new Setting.StringSelector('Sugar Cane', 10, Object.keys(colors)),
            new Setting.StringSelector('Potato', 14, Object.keys(colors)),
            new Setting.StringSelector('Carrot', 6, Object.keys(colors)),
            new Setting.StringSelector('Wheat', 14, Object.keys(colors)),
            new Setting.StringSelector('Nether Wart', 12, Object.keys(colors)),
            /* new Setting.StringSelector('Pumpkin', 6, Object.keys(colors)),
            new Setting.StringSelector('Melon', 2, Object.keys(colors)),
            new Setting.StringSelector('Cocoa', 6, Object.keys(colors)), */
        ],
    },
    ]).setCommand('hoeutilities').setSize(450, 200);
    Setting.register(settings);

    global.hoeutils.settings = settings
}