import express from "express";

const router = express.Router();

export const nekretnine = [
    { id: 1, naziv: 'Apartman Luka', opis: 'Ovaj apartman je izvrsan za one koji se zovu Luka.', cijena: 3000.0, lokacija: 'Banjole', broj_soba: 2, povrsina: 300},
    { id: 2, naziv: 'Apartman Vito', opis: 'Ovaj apartman je izvrsan za VITINA PIZZA!', cijena: 1000.0, lokacija: 'Pazin', broj_soba: 1, povrsina: 60},
    { id: 3, naziv: 'Apartman LaBella', opis: 'Ovaj apartman je izvrsan za ljepotice.', cijena: 5000.0, lokacija: 'Split', broj_soba: 3, povrsina: 700},
    { id: 4, naziv: 'Apartman HelloWorld', opis: 'Ovaj apartman je izvrsan za programere.', cijena: 8000.0, lokacija: 'Zagreb', broj_soba: 5, povrsina: 1000}
];

router.get('/', (req, res) => {
    console.log("Pozvana je GET metoda na /nekretnine endpoint");
    return res.status(200).json(nekretnine); // 200 OK
});

router.get('/:id', (req, res) => {
    console.log("Pozvana je GET metoda na /nekretnine/:id endpoint");
    let id_param = req.params.id;

    if (isNaN(id_param)) {
        return res.status(400).json({ message: "Id mora biti broj" });
    };

    let nekretnina = nekretnine.find(nekretnina => nekretnina.id == id_param);

    if (nekretnina) {
        return res.status(200).json(nekretnina); // 200 OK
    }

    return res.status(404).json({ message: "Nema te nekretnine!" });
});

router.post("/", (req, res) => {
    let nova_nekretnina = req.body;

    if (!nova_nekretnina.naziv ||
        !nova_nekretnina.opis ||
        !nova_nekretnina.lokacija ||
        nova_nekretnina.cijena === undefined ||
        nova_nekretnina.broj_soba === undefined ||
        nova_nekretnina.povrsina === undefined
    ) {
        return res.status(400).json({ message: "Nisu poslani svi potrebni podaci!" });
    }

    if (
        isNaN(nova_nekretnina.cijena) ||
        isNaN(nova_nekretnina.broj_soba) ||
        isNaN(nova_nekretnina.povrsina) ||
        nova_nekretnina.cijena < 0 ||
        nova_nekretnina.broj_soba < 0 ||
        nova_nekretnina.povrsina <= 0
    ) {
        return res.status(400).json({ message: "Cijena, broj soba i površina moraju biti ispravni pozitivni brojevi!" });
    }

    let nekretnina_postoji = nekretnine.find(
        (nekretnina) =>
            nekretnina.naziv.toLocaleLowerCase() == nova_nekretnina.naziv.toLocaleLowerCase()
    );

    if (nekretnina_postoji) {
        return res
            .status(409)
            .json({ message: "Nekretnina već postoji!", nekretnine: nekretnine })
    };

    let novi_id = nekretnine.length > 0 ? nekretnine.at(-1).id + 1 : 1;
    nova_nekretnina.id = novi_id;
    nekretnine.push(nova_nekretnina);
    return res.status(201).json({ message: "Nekretnina je dodana!", nekretnine: nekretnine });
});

router.put("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Id mora biti broj" });
    };

    const azurirana_nekretnina = req.body;

    if (
        !azurirana_nekretnina.naziv ||
        !azurirana_nekretnina.opis ||
        !azurirana_nekretnina.lokacija ||
        azurirana_nekretnina.cijena === undefined ||
        azurirana_nekretnina.broj_soba === undefined ||
        azurirana_nekretnina.povrsina === undefined
    ) {
        return res.status(400).json({ message: "Nisu poslani svi potrebni podaci!" });
    }

    if (
        isNaN(azurirana_nekretnina.cijena) ||
        isNaN(azurirana_nekretnina.broj_soba) ||
        isNaN(azurirana_nekretnina.povrsina) ||
        azurirana_nekretnina.cijena < 0 ||
        azurirana_nekretnina.broj_soba < 0 ||
        azurirana_nekretnina.povrsina <= 0
    ) {
        return res.status(400).json({ message: "Cijena, broj soba i površina moraju biti ispravni pozitivni brojevi!" });
    }

    const index = nekretnine.findIndex((nekretnina) => nekretnina.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Nekretnina s tim ID-em ne postoji!" });
    }

    nekretnine[index] = {
        id: id,
        naziv: azurirana_nekretnina.naziv,
        opis: azurirana_nekretnina.opis,
        cijena: azurirana_nekretnina.cijena,
        lokacija: azurirana_nekretnina.lokacija,
        broj_soba: azurirana_nekretnina.broj_soba,
        povrsina: azurirana_nekretnina.povrsina
    };

    return res.status(200).json({ message: "Nekretnina je uspješno ažurirana!", nekretnina: nekretnine[index] });
});

router.patch("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Id mora biti broj!" });
    }

    const index = nekretnine.findIndex((nekretnina) => nekretnina.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Nekretnina s tim ID-em ne postoji!" });
    }

    const podaci = req.body;

    if (!podaci || Object.keys(podaci).length === 0) {
        return res.status(400).json({ message: "Niste poslali niti jedan podatak!" });
    }

    if (
        (podaci.cijena !== undefined && (isNaN(podaci.cijena) || podaci.cijena < 0)) ||
        (podaci.broj_soba !== undefined && (isNaN(podaci.broj_soba) || podaci.broj_soba < 0)) ||
        (podaci.povrsina !== undefined && (isNaN(podaci.povrsina) || podaci.povrsina <= 0))
    ) {
        return res.status(400).json({ message: "Cijena, broj soba i površina moraju biti ispravni pozitivni brojevi!" });
    }

    nekretnine[index] = {
        ...nekretnine[index],
        ...podaci,
        id: id
    };

    return res.status(200).json({ message: "Nekretnina je djelomično ažurirana!", nekretnina: nekretnine[index] });
});

router.delete("/:id", (req, res) => {
    const id = Number(req.params.id);

    if (isNaN(id)) {
        return res.status(400).json({ message: "Id mora biti broj!" });
    }

    const index = nekretnine.findIndex((nekretnina) => nekretnina.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Nekretnina s tim ID-em ne postoji!" });
    }

    nekretnine.splice(index, 1);

    return res.status(200).json({ message: "Nekretnina je uspješno obrisana!" });
});

export default router;