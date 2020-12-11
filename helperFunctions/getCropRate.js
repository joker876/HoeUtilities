import { rarities } from './constants';
export default function getCropRate() {
    const itemNBT = Player.getHeldItem().getItemNBT();
    let cropRate = 100;
    let multiDropChance = 100
    global.hoeutils.debug.croprate = {};
    global.hoeutils.debug.croprate.stages = [];
    global.hoeutils.debug.croprate.stages.push(cropRate); //0
    
    //cropRate
    if (itemNBT.getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)) {
        const hoeBonusValues = [ 10, 25, 50 ];
        let tier = itemNBT.getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('id').match(/HOE_(?:CANE|POTATO|CARROT|WHEAT|WARTS)_([123])/)[1];
        cropRate += hoeBonusValues[tier-1];
        global.hoeutils.debug.croprate.tier = tier;
    }
    global.hoeutils.debug.croprate.stages.push(cropRate); //1
    
    //multiDropChance
    const heldItem = Player.getHeldItem().getItemNBT().getCompoundTag('tag').getCompoundTag('ExtraAttributes');
    
    const lore = JSON.parse(Player.getHeldItem().getRawNBT().match(/Lore:(\[.+\])/)[1].replace(/\d+:/g, ''));
    let rarity;
    if (heldItem.getString('id').match(/HOE/)) {
        for (let i = 1; i <= 6; i++) {
            if (lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)) {
                rarity = lore[lore.length - i].match(/(COMMON|UNCOMMON|RARE|EPIC|LEGENDARY|MYTHIC)/)[1];
            }
        }
    }
    global.hoeutils.debug.croprate.rarity = rarity;
    if (itemNBT.getCompoundTag('tag').getCompoundTag('ExtraAttributes').getString('modifier') === 'blessed') multiDropChance += rarities[rarity];
    global.hoeutils.debug.croprate.stages.push(cropRate); //2
    
    //cropRate
    cropRate += global.hoeutils.farmingLevel * 4;
    global.hoeutils.debug.croprate.level = global.hoeutils.farmingLevel;
    global.hoeutils.debug.croprate.stages.push(cropRate); //3
    
    //cropRate
    global.hoeutils.debug.croprate.enchants = {};
    if (heldItem.getCompoundTag('enchantments').getInteger('harvesting')) {
        cropRate += heldItem.getCompoundTag('enchantments').getInteger('harvesting') * 12.5
        global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('harvesting');
    } 
    global.hoeutils.debug.croprate.stages.push(cropRate); //4
    
    if (heldItem.getString('id').match(/HOE_CANE/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_cane')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_cane') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_cane');
        }
    } else if (heldItem.getString('id').match(/HOE_POTATO/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_potato')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_potato') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_potato');
        }
    } else if (heldItem.getString('id').match(/HOE_CARROT/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_carrot');
        }
    } else if (heldItem.getString('id').match(/HOE_WHEAT/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_wheat');
        }
    } else if (heldItem.getString('id').match(/HOE_WARTS/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_warts')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_warts') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_warts');
        }
    } else if (heldItem.getString('id').match(/PUMPKIN_DICER/)) {
        cropRate += 64*0.114 + 160*0.043 + 10*160*0.007 + 64*160*0.001;
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_pumpkin');
        }
    } else if (heldItem.getString('id').match(/MELON_DICER/)) {
        cropRate += 160*0.114 + 5*160*0.043 + 50*160*0.007 + 2*160*160*0.001;
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_melon')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_melon') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_melon');
        }
    } else if (heldItem.getString('id').match(/COCOA_CHOPPER/)) {
        if (heldItem.getCompoundTag('enchantments').getInteger('turbo_coco')) {
            cropRate += heldItem.getCompoundTag('enchantments').getInteger('turbo_coco') * 5;
            global.hoeutils.debug.croprate.enchants.harvesting = heldItem.getCompoundTag('enchantments').getInteger('turbo_coco');
        }
    }
    //cropRate
    global.hoeutils.debug.croprate.stages.push(cropRate); //5
    if (heldItem.getString('id').match(/HOE/)) {
        lore.forEach(str => {
            str = ChatLib.removeFormatting(str);
            if (str.match(/Counter bonus: \+(\d{1,3})%/i)) {
                cropRate += Number(str.match(/Counter bonus: \+(\d{1,3})%/i)[1]);
                global.hoeutils.debug.croprate.counter = Number(str.match(/Counter bonus: \+(\d{1,3})%/i)[1]);
            }
        });
    }
    global.hoeutils.debug.croprate.stages.push(cropRate); //6
    
    //multiDropChance
    multiDropChance += global.hoeutils.elephantPetLevel * 0.5;
    global.hoeutils.debug.croprate.stages.push(cropRate); //7
    global.hoeutils.debug.croprate.elephant = global.hoeutils.elephantPetLevel;
    
    //multiDropChance
    multiDropChance += global.hoeutils.anitaBonus
    global.hoeutils.debug.croprate.stages.push(cropRate); //8
    global.hoeutils.debug.croprate.anita = global.hoeutils.anitaBonus;
    
    return cropRate * multiDropChance / 100;
}