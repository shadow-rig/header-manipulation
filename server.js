const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to "leak" the role header in every response
app.use((req, res, next) => {
    res.setHeader('role', 'guest'); 
    next();
});

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Corporate Portal</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1>Internal Employee Portal</h1>
                <p>Welcome. Please use the internal tools for your daily tasks.</p>
            </body>
        </html>
    `);
});

// The directory found in common.txt
app.get('/console', (req, res) => {
    // The server checks the REQUEST header sent by the user
    const userRole = req.get('role');

    if (userRole === 'admin') {
        res.send(`
            <div style="color: green; border: 2px solid green; padding: 20px; font-family: monospace;">
                <h1>ACCESS GRANTED</h1>
                <p>System identity verified as ADMINISTRATOR.</p>
                <p><b>FLAG:</b> CTF{HEADER_FLIP_SUCCESS}</p>
            </div>
        `);
    } else {
        res.status(403).send(`
            <div style="font-family: sans-serif; text-align: center;">
                <h1>403 Forbidden</h1>
                <p>Insufficient Permissions: Your current role does not have access to this management console.</p>
            </div>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Lab running on port ${PORT}`);
});