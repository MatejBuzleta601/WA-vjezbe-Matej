import express from "express";
import path from "path";
import nekretnineRouter from "./routes/nekretnine.js"
import ponudeRouter from "./routes/ponude.js"
const app = express();

// middleware funkcija (prije routera)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Dobrodošli u Zadatak 2 Express poslužitelj!');
});
app.use("/nekretnine", nekretnineRouter);
app.use("/ponude", ponudeRouter);

const PORT = 3000;

app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
});