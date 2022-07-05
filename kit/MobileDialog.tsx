import * as React from 'react';
import { Global } from '@emotion/react';
import { styled } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { grey } from '@mui/material/colors';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';

const drawerBleeding = 56;

interface Props {
    open: boolean;
    // eslint-disable-next-line no-unused-vars
    setOpen: (newOpen: boolean) => void;
    title: string;
    children: React.ReactNode;
}

const Root = styled('div')(({ theme }) => ({
    // height: '100%',
    backgroundColor:
        theme.palette.mode === 'light' ? grey[100] : theme.palette.background.default,
}));

const StyledBox = styled(Box)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'light' ? '#fff' : grey[800],
}));

const Puller = styled(Box)(({ theme }) => ({
    width: 30,
    height: 6,
    backgroundColor: theme.palette.mode === 'light' ? grey[900] : grey[300],
    borderRadius: 3,
    position: 'absolute',
    top: 8,
    left: 'calc(50% - 15px)',
}));

export default function MobileDialog(props: Props) {
    const { open, setOpen, title, children } = props;

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };

    return (
        <Root>
            <CssBaseline />
            <Global
                styles={{
                    '.MuiDrawer-root > .MuiPaper-root': {
                        height: `calc(75% - ${drawerBleeding}px)`,
                        overflow: 'visible',
                    },
                }}
            />
            <SwipeableDrawer
                anchor="bottom"
                open={open}
                onClose={toggleDrawer(false)}
                onOpen={toggleDrawer(true)}
                swipeAreaWidth={drawerBleeding}
                disableSwipeToOpen
                ModalProps={{
                    keepMounted: true,
                }}
                PaperProps={{
                    sx: {
                        bgcolor: grey[800],
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                    }
                }}
            >
                <Puller />
                <Typography sx={{ p: 2, color: 'text.primary' }}>{title}</Typography>
                <StyledBox
                    sx={{
                        pt: 2,
                        px: 2,
                        pb: 2,
                        height: '100%',
                        overflow: 'auto',
                    }}
                >
                    {children}
                </StyledBox>
            </SwipeableDrawer>
        </Root >
    );
}