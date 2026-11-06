import express from "express";
import path from "path";
const app = express();
// Naglašavamo da će server obrađivati JSON u zahtjevima koji dolaze
app.use(express.json());
const PORT = 3000;

const pizze = [
    { id: 1, naziv: 'Margherita', cijena: 6.5 },
    { id: 2, naziv: 'Capricciosa', cijena: 8.0 },
    { id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
    { id: 4, naziv: 'Šunka sir', cijena: 7.0 },
    { id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

let narudzbe = {};

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
    console.log("Pozvana je GET metoda na /pizze endpoint")
    if (!narudzdbe.length) {
        return res.status(404).json({ message: "Nema narudžbi!" });
    }
    return res.status(200).json(narudzbe); // 200 OK
});

app.get('/narudzbe/:id', (req, res) => {
    console.log("Pozvana je GET metoda na /narudzbe endpoint");
    let id_param = req.params.id;

    if (isNaN(id_param)) {
        return res.status(400).json({ message: "Id mora biti broj" });
    }

    let narudzba = narudzbe.find(
        (n) => n.id == id_param,
    );

    if (!naruzdba) {
        return res.status(404).json({ message: "Ta pizza ne postoji!" });
    }

    res.status(200).json(narudzba); // 200 OK
});

// REST API GUIDELINES/PRINCIPI
// NEMA GLAGOLA, nema znakova

// radnju naglašava HTTP metoda
// POST = izradi/dodaj

// validacija podataka u dolaznom HTTP zahtjevu (bitno za kolokvij)

app.post("/pizze", (req, res) => {
    let nova_pizza = req.body;
    let pizza_postoji = pizze.find((pizza) => pizza.naziv.toLocaleLowerCase() == nova_pizza.naziv.toLocaleLowerCase());

    if (pizza_postoji) {
        return res
            .status(409)
            .json({ message: "Pizza s tim nazivom već postoji!" });
    }

    // else pizza postoji, dodaj je
    let novi_id = pizze.at(-1).id + 1;
    nova_pizza.id = novi_id;
    pizze.push(nova_pizza);
    return res.status(201).json({ message: "Pizza je dodana!", pizze: pizze });
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
