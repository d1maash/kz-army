export default async function handler(req, res) {
    const response = await fetch('http://89.46.33.188/api/auth/login/', {
        method: req.method,
        headers: {
            'Content-Type': 'application/json',
            // Add any other headers you need
        },
        body: JSON.stringify(req.body),
    });

    const data = await response.json();
    res.status(response.status).json(data);
} 