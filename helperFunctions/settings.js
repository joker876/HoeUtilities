import { Setting, SettingsObject } from 'SettingsManager/SettingsManager';
import { colors, prefix, units } from '../helperFunctions/constants';
let settings
export default function initiateSettings() {
    settings = new SettingsObject('HoeUtilities', [{
        name: "Info",
        settings: [
            new Setting.Button(`                                           ${prefix}`, "", () => {}),
            new Setting.Button("                                        Made by &c&ljoker876", "", () => {}),
            new Setting.Button(`                                                &8v${global.hoeutils.metadata.version}`, "", () => {}),
            new Setting.Button("", "", () => {}),
            new Setting.Button("       &dCredits", "", () => {}),
            new Setting.Button("&e&lSquagward", "Help with drag-and-drop GUI", () => {}),
            new Setting.Button("&eDawJaw", "Help with crop rate formula", () => {}),
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
            new Setting.Toggle('Collection', true),
            new Setting.Toggle('Farming Info', true),
            new Setting.Toggle('Hoe Lock', true),
            new Setting.Toggle('Event Reminder', true),
            new Setting.Toggle('Event Timer', true),
            new Setting.Toggle('Sessions (WIP)', false),
            new Setting.Button("", "", () => {}),
            new Setting.Button("Don't know what a certain feature is?", "&e&lCLICK!", () => { ChatLib.command('hoeutils help features', true) }),
            new Setting.Button("A feature isn't working?", "&c&lCLICK!", () => { ChatLib.command('hoeutils help problems', true) }),
            new Setting.Button("Click on the button to the right.", "", () => { ChatLib.command('hoeutils help', true) }),
        ],
    },
    {
        name: 'Farming Info',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Toggle('Farming Level', true),
            new Setting.Toggle('Progress to next level', true),
            new Setting.Toggle('Exp per hour', true),
            new Setting.Toggle('Total Exp', true),
            new Setting.Toggle('Exp left to next level', true),
            new Setting.Toggle('Estimated time to next level', true),
            new Setting.Toggle('Level Cap', true),
            new Setting.Toggle('Progress to level cap', true),
            new Setting.Toggle('Exp left to level cap', true),
            new Setting.Toggle('Estimated time to level cap', true),
            new Setting.Slider('Scale &8in %', 100, 1, 300),
        ],
    },
    {
        name: 'Tool Info',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Slider('Scale &8in %', 100, 1, 300),
            new Setting.Toggle('Enable images', true),
            new Setting.StringSelector('Yield Unit', 0, Object.keys(units)),
        ],
    },
    {
        name: 'Timer',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Slider('Scale &8in %', 100, 1, 300),
            new Setting.Toggle('Enable image', true),
            new Setting.Slider('Remind how long before the event starts? &8in seconds', 50, 1, 240),
            new Setting.Toggle('Enable everywhere', false),
        ],
    },
    {
        name: 'Sessions',
        settings: [
            new Setting.Button("Click here to move the GUI >>>", "&e&lCLICK!", () => { ChatLib.command('hoeutils gui', true) }),
            new Setting.Slider('Scale &8in %', 100, 1, 300),
            new Setting.Toggle('Auto-start and auto-end session', false),
            new Setting.Slider('Auto-end after &8in seconds', 120, 10, 1800),
            new Setting.Toggle('Store session history', true),
        ],
    },
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
        ],
    },
    {
        name: 'Colors #2',
        settings: [
            new Setting.StringSelector('Nether Wart', 12, Object.keys(colors)),
            new Setting.StringSelector('Pumpkin', 6, Object.keys(colors)),
            new Setting.StringSelector('Melon', 2, Object.keys(colors)),
            new Setting.StringSelector('Cocoa', 6, Object.keys(colors)),
            new Setting.StringSelector('Mushrooms', 12, Object.keys(colors)),
            new Setting.StringSelector('Cactus', 2, Object.keys(colors)),
        ]
    }
    ]).setCommand('hoeutilities').setSize(450, 210);
    Setting.register(settings);

    global.hoeutils.settings = settings
}