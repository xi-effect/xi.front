import React from 'react';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material';
import Image from 'next/image'
import { useRouter } from 'next/router'
import { inject, observer } from 'mobx-react'

const PREFIX = 'BackgroundImg';

const classes = {
  background: `${PREFIX}-background`
};

// TODO jss-to-styled codemod: The Fragment root was replaced by div. Change the tag if needed.
const Root = styled('div')((
  {
    theme
  }
) => ({
  [`& .${classes.background}`]: {
    backgroundColor: 'black',
    filter: 'grayscale(10%) opacity(100%)',
    mixBlendMode: 'multiply',
    position: 'fixed',
    height: '100vh',
    width: '100vw',
    zIndex: '-1',
  }
}));

const BackgroundImg = inject('uiStore')(observer(({ uiStore, src, alt = 'background' }) => {
  const theme = useTheme();

  const router = useRouter()
  const onLoad = () => {
    uiStore.setLoading(router.pathname)
  }

  return (
    <div className={classes.background}>
      <Image
        onLoad={() => onLoad()}
        alt={alt}
        src={src}
        layout="fill"
        objectFit="cover"
        quality={100}
      />
    </div>

  )


  // < Image className = { classes.background } src = { src } alt = { alt } priority = "true" layout = "responsive" />; //objectFit="cover"
}));

export default BackgroundImg;
