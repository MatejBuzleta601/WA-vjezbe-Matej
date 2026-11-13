import express from "express";

const router = express.Router();

const pizze = [
    { id: 1, naziv: 'Margherita', cijena: 6.5 },
    { id: 2, naziv: 'Capricciosa', cijena: 8.0 },
    { id: 3, naziv: 'Quattro formaggi', cijena: 10.0 },
    { id: 4, naziv: 'Šunka sir', cijena: 7.0 },
    { id: 5, naziv: 'Vegetariana', cijena: 9.0 }
];

router.get('/', (req, res) => {
    console.log("Pozvana je GET metoda na /pizze endpoint");
    return res.status(200).json(pizze); // 200 OK
});

router.get("/:naziv", (req, res) => {
    let naziv_param = req.params.naziv;

    // 400: Bad request (korisnik šalje podatke u krivom formatu)
    if (!isNaN(naziv_param)) {
        return res.status(400).json({ message: "Naziv pizze mora biti string" });
    }

    let pizza = pizze.find(
        (p) => p.naziv.toLocaleLowerCase() == naziv_param.toLocaleLowerCase()
    );

    if (!pizza) {
        return res.status(404).json({ message: "Pizza ne postoji!" });
    }

    return res.status(200).json(pizza);
});

router.post("/", (req, res) => {
    let nova_pizza = req.body;

    let pizza_postoji = pizze.find(
        (pizza) =>
            pizza.naziv.toLocaleLowerCase() == nova_pizza.naziv.toLocaleLowerCase()
    );

    if (pizza_postoji) {
        return res
            .status(409)
            .json({ message: "Pizza je dodana!", pizze: pizze })
    };

    let novi_id = pizze.at(-1).id + 1;
    nova_pizza.id = novi_id;
    pizze.push(nova_pizza);
    return res.status(200).json({ message: "Pizza je dodana!", pizze: pizze });
});

export default router;