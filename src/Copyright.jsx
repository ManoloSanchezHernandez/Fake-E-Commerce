import * as React from 'react';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

export default function Copyright() {
  return (
    <Typography
      variant="body2"
      align="center"
      gutterBottom
      sx={{
        color: 'text.secondary',
      }}
    >
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Juan Manuel Sanchez Hernandez
      </Link>{' '}
      {new Date().getFullYear()}.
    </Typography>
  );
}
