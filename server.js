const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3000;

// Serve the "innocent" landing page
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head><title>Corporate Portal</title></head>
            <body style="font-family: sans-serif; text-align: center; padding-top: 50px;">
                <h1>Welcome to the Employee Portal</h1>
                <p>Public notice: All activity is logged.</p>
                <nav><a href="/">Home</a> | <a href="#">Contact</a></nav>
            </body>
        </html>
    `);
});

// The hidden directory found in common.txt (e.g., /console or /internal)
app.get('/console', (req, res) => {
    const userRole = req.get('role'); // Students will look for this header

    if (userRole === 'admin') {
        res.send(`
            <div style="color: green; border: 2px solid green; padding: 20px;">
                <h1>Admin Access Granted</h1>
                <p>System status: Nominal.</p>
                <p><b>FLAG:</b> CTF{HEADER_HACKER_99}</p>
            </div>
        `);
    } else {
        // Students see this first after fuzzing
        res.status(403).send(`
            <div style="color: red; font-family: sans-serif; text-align: center;">
                <h1>403 Forbidden</h1>
                <p>Error: Access Denied. Your current role does not have permission to view /console.</p>
                <p><i>Server Trace: User-Role: ${userRole || 'guest'}</i></p>
            </div>
        `);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});