export const printFeatureList = () => {
    new Message(
        new TextComponent('&2============ &a&l[HoeUtilities] &r&2============'),
        new TextComponent('\n&7> &e&lCounter &r- Displays the counter from your Hoe'),
        new TextComponent('\n&7> &e&lCrop Rate &r- Calculates your Farmhand bonus (% of standard amount)'),
        new TextComponent('\n&7> &e&lMaximum Efficiency &r- Calculates the maximum amount of items possible to obtain in 1h in perfect conditions '),
        new TextComponent('&e&lMore Info').setHover('show_text', '&aPerfect conditions &fare: breaking 20 blocks per second constantly for 60 minutes. This value is just an average value you should get.'),
        new TextComponent('\n&7> &e&lHourly XP Gain &r- Calculates the maximum Farming XP possible to obtain in 1h in perfect conditions '),
        new TextComponent('&e&lMore Info').setHover('show_text', '&aPerfect conditions &fare: breaking 20 blocks per second constantly for 60 minutes. This value is just an average value you should get.'),
        new TextComponent('\n&r&7> &e&lFarming Level &r- Displays your current farming level and progress to the next one'),
        new TextComponent('\n&7> &e&lCollection &r- Displays your collection for the current crop'),
        new TextComponent('\n&7> &e&lHoe Lock &r- Prevents you from accidentally opening the recipe GUI when holding a Mathematical Hoe'),
        new TextComponent('\n&7> &e&lEvent Reminder &r- Reminds you whenever the Jacob\'s Farming Contest is about to begin'),
    ).chat()
}