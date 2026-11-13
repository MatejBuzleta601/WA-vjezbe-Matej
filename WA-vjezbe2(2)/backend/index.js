import express from "express";
import path from "path";
import pizzeRouter from "./routes/pizze.js"
import narudzbeRouter from "./routes/narudzbe.js"
const app = express();

// middleware funkcija (prije routera)
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Dobrodošli u Pizza Express poslužitelj!');
});
app.use("/pizze", pizzeRouter);
app.use("/narudzbe", narudzbeRouter);

const PORT = 3000;

// REST API GUIDELINES/PRINCIPI
// NEMA GLAGOLA, nema znakova

// radnju naglašava HTTP metoda
// POST = izradi/dodaj

// validacija podataka u dolaznom HTTP zahtjevu (bitno za kolokvij)

app.listen(PORT, error => {
    if (error) {
        console.error(`Greška prilikom pokretanja poslužitelja: ${error.message}`);
    } else {
        console.log(`Server je pokrenut na http://localhost:${PORT}`);
    }
});

// GET narudzbe, ako je polje prazno, vrati 404
// GET naruzdbe/:id, ako id ne postoji, vrati 404
// POST narudzbe, ako korisnik proba naručiti pizzu koja ne postoji, vrati 400

// DODATI U POSTMAN OBAVEZNO
/*
{
    "id": 1, ovo generira server, ne šalje klijent
    "ime": "Radola", ovo šalje klijent u req.body
    "adresa": "Teslina 5", ovo šalje klijent u req.body
    "pizza": objekt ovo šalje klijent u req.body
}
*/
/*
app.HTTP_METODA('URL', (HTTP_REQUEST, HTTP_RESPONSE) => {
    // javascript kod
})
*/