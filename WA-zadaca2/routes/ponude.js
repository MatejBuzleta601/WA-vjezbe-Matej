import express from "express";
import { nekretnine } from "./nekretnine.js";

const router = express.Router();

const ponude = [
    { id: 1, id_nekretnine: 1, ime_kupca: 'Luka', prezime_kupca: 'Buro', ponudjena_cijena: 3000.0, broj_telefona_kupca: 977495564 },
    { id: 2, id_nekretnine: 3, ime_kupca: 'Vito', prezime_kupca: 'Martin', ponudjena_cijena: 5000.0, broj_telefona_kupca: 97788454 }
];

router.get('/', (req, res) => {
    console.log("Pozvana je GET metoda na /ponude endpoint");
    return res.status(200).json(ponude); // 200 OK
});

router.post("/", (req, res) => {
    const nova_ponuda = req.body;

    if (
        nova_ponuda.id_nekretnine === undefined ||
        !nova_ponuda.ime_kupca ||
        !nova_ponuda.prezime_kupca ||
        nova_ponuda.ponudjena_cijena === undefined ||
        !nova_ponuda.broj_telefona_kupca
    ) {
        return res.status(400).json({ message: "Nisu poslani svi potrebni podaci!" });
    }

    if (
        isNaN(nova_ponuda.id_nekretnine) ||
        isNaN(nova_ponuda.ponudjena_cijena) ||
        nova_ponuda.ponudjena_cijena < 0
    ) {
        return res.status(400).json({ message: "ID nekretnine i ponuđena cijena moraju biti ispravni pozitivni brojevi!" });
    }

    const nekretnina_postoji = nekretnine.find(
        (nekretnina) => nekretnina.id === Number(nova_ponuda.id_nekretnine)
    );

    if (!nekretnina_postoji) {
        return res.status(404).json({ message: "Nekretnina s navedenim ID-em ne postoji!" });
    }

    const novi_id = ponude.length > 0 ? ponude.at(-1).id + 1 : 1;

    const kreirana_ponuda = {
        id: novi_id,
        id_nekretnine: Number(nova_ponuda.id_nekretnine),
        ime_kupca: nova_ponuda.ime_kupca,
        prezime_kupca: nova_ponuda.prezime_kupca,
        ponudjena_cijena: Number(nova_ponuda.ponudjena_cijena),
        broj_telefona_kupca: nova_ponuda.broj_telefona_kupca
    };

    ponude.push(kreirana_ponuda);

    return res.status(201).json({ message: "Ponuda je uspješno poslana!", ponuda: kreirana_ponuda });
});

export default router;