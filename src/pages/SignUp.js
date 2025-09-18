import { useState } from 'react';
import { TextField, Button, Container, Typography, Paper } from '@mui/material';
import axios from 'axios';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async () => {
        try {
            await axios.post('https://markethub-backend-fp2f.onrender.com/api/auth/register', { email, password });
            alert('User registered successfully!');
        } catch (err) {
            alert(err.response?.data?.error || 'Error registering');
        }
    };

    return (
        <Container maxWidth="sm">
            <Paper sx={{ p: 4, mt: 8 }}>
                <Typography variant="h5" gutterBottom color="primary">
                    Sign Up
                </Typography>
                <TextField label="Email" fullWidth margin="normal" value={email} onChange={(e) => setEmail(e.target.value)} />
                <TextField label="Password" type="password" fullWidth margin="normal" value={password} onChange={(e) => setPassword(e.target.value)} />
                <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>Sign Up</Button>
            </Paper>
        </Container>
    );
}
