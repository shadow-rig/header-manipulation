const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Landing page with NO links to the hidden console
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Corporate Portal</title>
                <style>
                    body { font-family: sans-serif; text-align: center; padding: 50px; background-color: #f4f4f9; }
                    .container { border: 1px solid #ddd; padding: 20px; background: white; display: inline-block; border-radius: 8px; }
                </style>
            </head>
            <body>
                <div class="container">
                    <h1>Internal Employee Portal</h1>
                    <p>Welcome to the secure internal network. Unauthorized access is strictly prohibited.</p>
                    <hr>
                    <p>Public Announcements: The cafeteria is now serving breakfast until 10 AM.</p>
                </div>
            </body>
        </html>
    `);
});

// The hidden directory found only via fuzzing (common.txt)
app.get('/console', (req, res) => {
    const userRole = req.get('role');

    if (userRole === 'admin') {
        res.send(`
            <div style="color: green; border: 2px solid green; padding: 20px; font-family: monospace; text-align: center;">
                <h1>ACCESS GRANTED</h1>
                <p>System identity verified as ADMINISTRATOR.</p>
                <p><b>FLAG:</b> CTF{HEADER_FLIP_SUCCESS}</p>
            </div>
        `);
    } else {
        res.status(403).send(`
            <div style="font-family: sans-serif; text-align: center; color: #333; padding: 50px;">
                <h1>403 Forbidden</h1>
                <p>Error: Access Denied. Your current role does not have permission to view /console.</p>
                <hr style="width: 50%">
                <p style="color: #666;"><i>Server Trace: <b>role: ${userRole || 'guest'}</b></i></p>
            </div>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Lab running on port ${PORT}`);
});