import React from "react";
import { Box } from "@mui/material";
import { inject, observer } from "mobx-react";
import Avatar from "avataaars";
import { bgcolor, topType, accessoriesType, hairColor, facialHairType, clotheType, eyeType, eyebrowType, mouthType, skinColor } from './const';

const CustomAvatar = inject()(observer(({ avatar, reverse = false, height, width }) => (
    <Box sx={{
        height,
        width,
        bgcolor: bgcolor[avatar.bgcolor] ?? "none",
        borderRadius: 2,
        transform: reverse ? "scale(-1, 1)" : "none",
    }}>
        <Avatar
            style={{ width, height }}
            avatarStyle='Transparent'
            topType={topType[avatar?.topType ?? 0]}
            accessoriesType={accessoriesType[avatar?.accessoriesType ?? 0]}
            hairColor={hairColor[avatar?.hairColor ?? 0]}
            facialHairType={facialHairType[avatar?.facialHairType ?? 0]}
            clotheType={clotheType[avatar?.clotheType ?? 0]}
            eyeType={eyeType[avatar?.eyeType ?? 0]}
            mouthType={mouthType[avatar?.mouthType ?? 0]}
            eyebrowType={eyebrowType[avatar?.eyebrowType ?? 0]}
            skinColor={skinColor[avatar?.skinColor ?? 0]}
        />
    </Box>
)));

export default CustomAvatar;