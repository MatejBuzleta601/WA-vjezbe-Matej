import express from "express";
import path from "path";
const app = express();
const PORT = 3000;
const users = [
    { id: 1, ime: 'Chris', prezime: 'Davis' },
    { id: 2, ime: 'Matthew', prezime: 'Addison' },
    { id: 3, ime: 'Osuke', prezime: 'Suzuki' }
];

app.get('/', (req, res) => {
    console.log("HELLO WORLD!");
    let putanja = path.join('public', 'zadatak1.html');
    let abs_putanja = path.resolve(putanja);
    res.sendFile(abs_putanja);
});

app.get('/about', (req, res) => {
    let putanja = path.join('public', 'zadatak2.html');
    let abs_putanja = path.resolve(putanja);
    res.sendFile(abs_putanja);
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
});

/*
app.HTTP_METODA('URL', (HTTP_REQUEST, HTTP_RESPONSE) => {
    // javascript kod
})
*/
