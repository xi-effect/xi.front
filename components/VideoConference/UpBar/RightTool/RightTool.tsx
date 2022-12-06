import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Grid } from '@xieffect/base.icons.grid';
import { Maximize } from '@xieffect/base.icons.maximize';
import { External } from '@xieffect/base.icons.external';
import { Settings } from '@xieffect/base.icons.settings';

const RightTool = () => (
  <Stack
    direction="row"
    justifyContent="flex-start"
    alignItems="center"
    sx={{
      width: '100%',
      height: 48,
    }}
  >
    <Tooltip title="Переключить вид" placement="bottom">
      <IconButton
        sx={{
          ml: '2px',
          height: '40px',
          width: '96px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '20px',
        }}
      >
        <Grid />
        <Typography
          sx={{
            ml: '8px',
            fontWeight: 500,
            fontSize: '16px',
            lineHeight: '20px',
          }}
        >
          Вид
        </Typography>
      </IconButton>
    </Tooltip>
    <Tooltip title="Переключить вид" placement="bottom">
      <IconButton
        sx={{
          ml: '8px',
          height: '40px',
          width: '40px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '20px',
        }}
      >
        <Maximize />
      </IconButton>
    </Tooltip>
    <Tooltip title="Переключить вид" placement="bottom">
      <IconButton
        sx={{
          ml: '8px',
          height: '40px',
          width: '40px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '20px',
        }}
      >
        <External />
      </IconButton>
    </Tooltip>
    <Tooltip title="Переключить вид" placement="bottom">
      <IconButton
        sx={{
          ml: '8px',
          height: '40px',
          width: '40px',
          color: 'grayscale.0',
          bgcolor: 'grayscale.100',
          borderRadius: '20px',
        }}
      >
        <Settings />
      </IconButton>
    </Tooltip>
  </Stack>
);

export default RightTool;
