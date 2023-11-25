import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';

export default function Prayer({name , time, image}) {
  return (
    <Card sx={{ width: "18%" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <h2 variant="h5" component="div">
            {name}
          </h2>
          <h1 variant="h3" color="text.secondary">
            {time}
          </h1>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}