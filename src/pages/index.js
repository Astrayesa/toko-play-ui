'use client'
import { Typography, Toolbar, AppBar } from '@mui/material'
import Box from '@mui/material/Box'
import { Container } from '@mui/material'
import { Grid } from '@mui/material'
import { useEffect, useState } from 'react'
import VideoItem from '@/components/VideoItem'

export default function Home() {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    fetch("http://127.0.0.1:3001/videos", {
      headers: {
        "Content-Type": "application/json",
      }
    })
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        setVideos(data);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap>
            Toko Play
          </Typography>
        </Toolbar>
      </AppBar>
      <main>
        <Container sx={{ py: 8 }} maxWidth="md">
          <Grid container spacing={4}>
            {videos.map((video) => VideoItem(video))}
          </Grid>
        </Container>
      </main>
      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', p: 6 }} component="footer">
        <Typography variant="h6" align="center" gutterBottom>
          Toko Play
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          color="text.secondary"
          component="p"
        >
          A Tokopedia Play Clone
        </Typography>
      </Box>
      {/* End footer */}
    </>
  )
}
