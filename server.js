const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Corporate Portal</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1>Internal Employee Portal</h1>
                <p>Welcome. Please use the internal tools for your daily tasks.</p>
                <nav><a href="/">Home</a> | <a href="/console">Management Console</a></nav>
            </body>
        </html>
    `);
});

// The hidden directory found in common.txt
app.get('/console', (req, res) => {
    // We are now checking specifically for the 'role' header
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
        // Updated error message to show "role: guest" as requested
        res.status(403).send(`
            <div style="font-family: sans-serif; text-align: center; color: #333;">
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