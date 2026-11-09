import express from "express";
import path from "path";
const app = express();

app.use(express.json());
const PORT = 3000;

let pizze = [
    { id: 1, naziv: 'Margherita', cijena: 6.5 },
    { id: 2, naziv: 'Capricciosa', cijena: 8.0 },
    { id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
    { id: 4, naziv: 'Šunka sir', cijena: 7.0 },
    { id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

let narudzbe = [
    { id: 1, ime: 'Matej', adresa: 'Nobileova 27', pizza: 'Margherita' }
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

app.get('/pizze', (req, res) => {
    console.log("Pozvana je GET metoda na /pizze endpoint")
    return res.status(200).json(pizze); // 200 OK
});

app.get("/pizze/:naziv", (req, res) => {
    let naziv_param = req.params.naziv;

    // 400: Bad request (korisnik šalje podatke u krivom formatu)
    if (!isNaN(naziv_param)) {
        return res.status(400).json({ message: "Naziv pizze mora biti string" });
    }

    let pizza = pizze.find(
        (p) => p.naziv.toLocaleLowerCase() == naziv_param.toLocaleLowerCase(),
    );

    if (!pizza) {
        return res.status(404).json({ message: "Pizza ne postoji!" });
    }

    res.status(200).json(pizza);
});

app.get('/narudzbe', (req, res) => {
    console.log("Pozvana je GET metoda na /narudzbe endpoint");
    if (narudzbe.length == 0) {
        return res.status(404).json({ poruka: "Nema narudzba" });
    }
    return res.status(200).json(narudzbe); // 200 OK
});

app.get('/narudzbe/:id', (req, res) => {
    console.log("Pozvana je GET metoda na /narudzbe/:id endpoint");
    let id_param = req.params.id;

    if (isNaN(id_param)) {
        return res.status(400).json({ message: "Id mora biti broj" });
    };

    let narudzba = narudzbe.find(narudzba => narudzba.id == id_param);

    if (narudzba) {
        return res.status(200).json(narudzba); // 200 OK
    }

    return res.status(404).json({ message: "Nema te narudzbe!" });
});

// REST API GUIDELINES/PRINCIPI
// NEMA GLAGOLA, nema znakova

// radnju naglašava HTTP metoda
// POST = izradi/dodaj

// validacija podataka u dolaznom HTTP zahtjevu (bitno za kolokvij)

app.post("/narudzbe", (req, res) => {
    let narudzbe_dodavanje = req.body;
    let pizza_postoji = pizze.find(pizza => pizza.naziv.toLocaleLowerCase() == narudzbe_dodavanje.pizza.toLocaleLowerCase());

    if (!pizza_postoji) {
        return res.status(400).json({ message: "Pizza s tim nazivom ne postoji!" });
    }
    // else pizza postoji, dodaj je
    const novi_id = narudzbe.at(-1)['id'] + 1;

    narudzbe.push({ id: novi_id, ...narudzbe_dodavanje });
    res.json(narudzbe);
});

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
