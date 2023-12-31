// 'use client'
import { Typography, Toolbar, AppBar, Drawer, Divider, Box, List, ListItem, ListItemText, ListItemButton } from '@mui/material'
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import YoutubeEmbed from '@/components/YoutubeEmbed';
import CommentForm from '@/components/CommentForm';

// use fe server for fetching data from backend
// export async function getServerSideProps({ params }) {
//     const { id } = params;
//     const response = await fetch(`http://127.0.0.1:3001/videos/${id}`);
//     const data = await response.json();
//     return { props: data }
// }

export default function Details() {
    const router = useRouter();
    const [data, setData] = useState(null);
    const [comments, setComments] = useState([]);
    const [videoId, setVideoId] = useState(null);
    useEffect(() => {
        if (router.isReady) {
            fetch(`http://127.0.0.1:3001/videos/${router.query.id}`)
                .then((response) => response.json())
                .then((response) => {
                    setData(response);
                    setVideoId(id_extractor(response.url));
                })
                .catch(err => console.log("Gagal fetch detail video: ", err))
            fetch(`http://127.0.0.1:3001/comments/${router.query.id}`)
                .then((response) => response.json())
                .then((response) => {
                    setComments(response);
                })
                .catch(err => console.log("Gagal fetch comments: ", err))
        }
    }, [router.isReady])

    const [postSubmit, setPostSubmit] = useState(false);
    useEffect(() => {
        fetch(`http://127.0.0.1:3001/comments/${router.query.id}`)
            .then((response) => response.json())
            .then((response) => {
                setComments(response);
            })
            .catch(err => console.log("Gagal fetch comments: ", err))
        setPostSubmit(false);
    }, [postSubmit]);


    const drawerWidth = 240;
    return <Box sx={{ display: 'flex' }}>
        <AppBar position="fixed"
            sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}>
            <Toolbar>
                <Typography variant="h6" color="inherit" noWrap>
                    Toko Play
                </Typography>
            </Toolbar>
        </AppBar>
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Toolbar >
                <Typography variant="h6" color="inherit" noWrap>
                    Products
                </Typography>
            </Toolbar>
            <Divider />
            <List>
                {
                    data?.products.map(
                        (product) =>
                            <ListItem key={product._id} disablePadding>
                                <ListItemButton href={product.url} target="_blank">
                                    <ListItemText primary={product.title} secondary={product.price} />
                                </ListItemButton>
                            </ListItem>
                    )
                }
            </List>

        </Drawer>
        {/* embed video */}
        <Box
            component="main"
            sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
        >
            <Toolbar />
            <YoutubeEmbed embedId={videoId} />
        </Box>
        {/* comment component */}
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="permanent"
            anchor="right"
        >
            <Toolbar >
                <Typography variant="h6" color="inherit" noWrap>
                    Comments
                </Typography>
            </Toolbar>
            <Divider />
            <List sx={
                {
                    height: '70%',
                    overflow: 'auto'
                }
            }
            >
                {
                    Array.isArray(comments) ? comments?.map(
                        (comment) =>
                            <ListItem key={comment._id} disablePadding divider >
                                <ListItemButton >
                                    <ListItemText primary={comment.comment} secondary={comment.username} />
                                </ListItemButton>
                            </ListItem>
                    ) : null
                }
            </List>
            {/* form to add comment */}
            <CommentForm video_id={router.query.id} setPostSubmit={setPostSubmit} />
        </Drawer>
    </Box>
}

function id_extractor(url) {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length == 11) ? match[7] : false;

}
