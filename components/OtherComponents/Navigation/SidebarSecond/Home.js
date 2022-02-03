/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useRouter } from "next/router"
import { inject, observer } from "mobx-react"

import { MenuItem, Box, MenuList, useMediaQuery } from "@mui/material";
import Image from "next/image";

const menuHome = [
    {
        id: 0,
        label: "Профиль 1",
        href: "/home?profile=1",
    },
]

const MenuHomeComp = inject()(observer(() => {
    const router = useRouter()
    const mobile = useMediaQuery((theme) => theme.breakpoints.down("dl"))

    return (
        <>
            <MenuList sx={{ width: "100%", }}>
                {menuHome.map((item, index) => (
                    <MenuItem
                        selected
                        onClick={() => router.push(`${item.href}`)}
                        key={index.toString()}
                        sx={{
                            "&.Mui-selected": {
                                bgcolor: "primary.light",
                                "&:hover": {
                                    bgcolor: "primary.light",
                                }
                            },
                            pl: 1,
                            pr: 1,
                            pt: 0.2,
                            pb: 0.2,
                            fontSize: mobile ? 18 : 22,
                            width: "100%",
                            borderRadius: 1,
                            cursor: "pointer",
                        }}
                    >
                        {item.label.toLowerCase()}
                    </MenuItem>))}
            </MenuList>
            <Box
                sx={{
                    width: 256,
                    height: 256,
                }}
            >
                <Image
                    alt="alt"
                    src="/app/DataReport.svg"
                    quality={100}
                    width={256}
                    height={256}
                />
            </Box>
        </>

    )
}));

export default MenuHomeComp;