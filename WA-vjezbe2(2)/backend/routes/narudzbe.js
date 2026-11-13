import express from "express";

const router = express.Router();

let narudzbe = [
    { id: 1, ime: 'Matej', adresa: 'Nobileova 27', pizza: 'Margherita' },
    { id: 2, ime: 'Marko', adresa: 'Benciceva 32', pizza: 'Margherita' }
];

router.get('/', (req, res) => {
    console.log("Pozvana je GET metoda na /narudzbe endpoint");
    if (narudzbe.length == 0) {
        return res.status(404).json({ poruka: "Nema narudzba" });
    }
    return res.status(200).json(narudzbe); // 200 OK
});

router.get('/:id', (req, res) => {
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

router.post("/", (req, res) => {
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

export default router;