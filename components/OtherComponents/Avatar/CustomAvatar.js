import React, { useState } from 'react'

import { Grid, FormControl, useTheme, InputLabel, TextField, OutlinedInput, FormControlLabel, Switch, AppBar, Tabs, Tab, Typography, Box, Button } from '@mui/material'
import { inject, observer } from 'mobx-react'
import Peep from 'react-peeps';

const styles = {
    peepStyle: {
        justifyContent: 'center',
        alignSelf: 'center'
    },
};

const hair = {
    0: "HatHip",
    1: "Bald",
    2: "BaldSides",
    3: "BaldTop",
    4: "Bangs",
    5: "BangsFilled",
    6: "Bear",
    7: "Bun",
    8: "BunCurly",
    9: "Buns",
    10: "FlatTop",
    11: "FlatTopLong",
    12: "Afro",
    13: "Long",
    14: "LongAfro",
    15: "LongBangs",
    16: "LongCurly",
    17: "Medium",
    18: "MediumBangs",
    19: "MediumBangsFilled",
    20: "MediumLong",
    21: "MediumShort",
    22: "MediumStraight",
    23: "Mohawk",
    24: "MohawkDino",
    25: "Pomp",
    26: "ShavedRight",
    27: "ShavedSides",
    28: "ShavedWavy",
    29: "Short",
    30: "ShortCurly",
    31: "ShortMessy",
    32: "ShortScratch",
    33: "ShortVolumed",
    34: "ShortWavy",
    35: "BantuKnots",
    36: "Beanie",
    37: "BunFancy",
    38: "CornRows",
    39: "CornRowsFilled",
    40: "GrayBun",
    41: "GrayMedium",
    42: "MediumShade",
    43: "GrayShort",
    44: "Hijab",
    45: "Twists",
    46: "TwistsVolumed",
}

const bustPose = {
    0: "ButtonShirt",
    1: "Shirt",
    2: "BlazerBlackTee",
    3: "Dress",
    4: "Gaming",
    5: "Geek",
    6: "Hoodie",
    7: "PointingUp",
    8: "Selena",
    9: "Thunder",
    10: "Turtleneck",
    11: "ArmsCrossed",
    12: "Coffee",
    13: "Device",
    14: "DotJacket",
    15: "Explaining",
    16: "FurJacket",
    17: "Killer",
    18: "Paper",
    19: "PocketShirt",
    20: "PoloSweater",
    21: "ShirtCoat",
    22: "ShirtFilled",
    23: "SportyShirt",
    24: "StripedShirt",
    25: "Sweater",
    26: "SweaterDots",
    27: "Whatever"
}

const facialHair = {
    "0": "None",
    "1": "Full",
    "2": "FullMajestic",
    "3": "FullMedium",
    "4": "Goatee",
    "5": "GoateeCircle",
    "6": "Dali",
    "7": "Handlebars",
    "8": "Imperial",
    "9": "Painters",
    "10": "PaintersFilled",
    "11": "Swashbuckler",
    "12": "MoustacheThin",
    "13": "Yosemite",
    "14": "GrayFull",
    "15": "MajesticHandlebars",
    "16": "Chin",
}

const face = {
    "0": "Smile",
    "1": "Blank",
    "2": "Calm",
    "3": "Cheeky",
    "4": "Concerned",
    "5": "Contempt",
    "6": "Cute",
    "7": "Driven",
    "8": "EatingHappy",
    "9": "EyesClosed",
    "10": "OldAged",
    "11": "Serious",
    "12": "Angry",
    "13": "Solemn",
    "14": "Suspicious",
    "15": "Tired",
    "16": "VeryAngry",
    "17": "Awe",
    "18": "ConcernedFear",
    "19": "Cyclops",
    "20": "Explaining",
    "21": "Fear",
    "22": "Hectic",
    "23": "LoveGrin",
    "24": "LoveGrinTeeth",
    "25": "Monster",
    "26": "Rage",
    "27": "SmileBig",
    "28": "SmileLol",
    "29": "SmileTeeth",
    "30": "CalmNM",
    "31": "SmileNM",
    "32": "CheersNM"
}


const accessory = {
    "0": "None",
    "1": "GlassRoundThick",
    "2": "SunglassClubmaster",
    "3": "SunglassWayfarer",
    "4": "GlassAviator",
    "5": "GlassButterfly",
    "6": "GlassButterflyOutline",
    "7": "GlassClubmaster",
    "8": "GlassRound",
    "9": "Eyepatch",
}

const CustomAvatar = inject('rootStore', 'settingsStore')(observer(({ rootStore, settingsStore, avatar, viewBox }) => {
    return (
        <Box sx={{
            height: '100%',
            width: '100%',
        }}>
            <Peep
                style={styles.peepStyle}
                accessory={accessory[avatar?.accessory ?? 0]}
                body={bustPose[avatar?.body ?? 0]}
                face={face[avatar?.face ?? 0]}
                hair={hair[avatar?.hair ?? 0]}
                facialHair={facialHair[avatar?.facialHair ?? 0]}
                strokeColor='#000000'
                backgroundColor={"rgba(255, 255, 255, 0.9)"}
                viewBox={viewBox}
            />
        </Box>
    );
}))

export default CustomAvatar