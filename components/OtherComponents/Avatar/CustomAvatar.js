import React from "react"
import { Box } from "@mui/material"
import { inject, observer } from "mobx-react"
import Peep from '../Peeps/index.tsx'
import { bgcolor, styles, accessory, bustPose, face, hair, facialHair } from './const';

const CustomAvatar = inject()(observer(({ avatar, viewBox, reverse = false }) => (
    <Box sx={{
        height: "100%",
        width: "100%",
        bgcolor: bgcolor[avatar.bgcolor] ?? "none",
        borderRadius: 2,
        transform: reverse ? "scale(-1, 1)" : "none",
    }}>
        <Peep
            style={styles.peepStyle}
            accessory={accessory[avatar?.accessory ?? 0]}
            body={bustPose[avatar?.body ?? 0]}
            face={face[avatar?.face ?? 0]}
            hair={hair[avatar?.hair ?? 0]}
            facialHair={facialHair[avatar?.facialHair ?? 0]}
            strokeColor="#000000"
            backgroundColor="rgba(255, 255, 255, 1)"
            viewBox={viewBox}
        />
    </Box>
)))

export default CustomAvatar;