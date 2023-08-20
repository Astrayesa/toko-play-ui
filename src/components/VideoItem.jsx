import { Typography } from '@mui/material'
import { Grid } from '@mui/material'
import { Card, CardMedia, CardContent, CardActions } from '@mui/material'
import { Button } from '@mui/material'
import Link from 'next/link'

export default function VideoItem({ _id, title, thumbnail_url }) {
  return <Grid item key={_id} xs={12} sm={6} md={4}>
    <Card
      sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
    >
      <CardMedia
        component="div"
        sx={{
          // 16:9
          pt: '56.25%',
        }}
        image={thumbnail_url}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Typography gutterBottom variant="h5" component="h2">
          {title}
        </Typography>
      </CardContent>

      <CardActions>
        <Link href={`/videos/${_id}`} video_id={_id}>Show</Link>
        <Button>View</Button>
      </CardActions>

    </Card>
  </Grid>
}