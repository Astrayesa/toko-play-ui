import { useState } from "react";
import { Box, IconButton, ListItem, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { useOnlineStatus } from "@/utility/useOnline";

export default function CommentForm({ video_id, setPostSubmit }) {
    const isOnline = useOnlineStatus();
    const [username, setUsername] = useState('');
    const [comment, setComment] = useState('');
    const handleSubmitForm = (e) => {
        e.preventDefault();
        fetch(`http://localhost:3001/comments/${video_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, comment })
        })
            .then(res => res.json())
            .then((data) => {
                setUsername('');
                setComment('');
                setPostSubmit(true);
            })
            .catch(err => console.error(err))

    }
    return <Box component="form" sx={
        {
            '& .MuiTextField-root': { m: 1 },
            display: 'flex',
            position: 'fixed',
            bottom: 0,
        }
    } onSubmit={handleSubmitForm}>
        <div>
            <TextField
                id="username-input"
                label="Username"
                autoComplete="username"
                size="small"
                disabled={!isOnline}
                value={username}
                required
                onChange={(e) => setUsername(e.target.value)}
            />
            <TextField
                id="comment-input"
                label="Comment"
                multiline
                maxRows={4}
                size="small"
                disabled={!isOnline}
                value={comment}
                required
                onChange={(e) => setComment(e.target.value)}
            />
        </div>
        <IconButton size="small" sx={{ ml: 1 }} disabled={!isOnline} type="submit" aria-label="submit">
            <SendIcon fontSize="inherit" />
        </IconButton>
    </Box>
}