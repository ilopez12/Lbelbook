'use scrict'
const fs = require('fs');
const configS3 = require("../config/s3");
const Resena = require('../Models/resena')

async function saveResena(req, res) {
    const s3Client = configS3.s3Client;
    const params = configS3.uploadParams;
    const fileContent = await fs.readFileSync(req.files.imagen.path);
    var location_aws = ""
    params.Key = await req.files.imagen.originalFilename;
    params.Body = await fileContent;

    await s3Client.upload(params, async (err, data) => {
        if (err) {
            throw err;
        }

        location_aws = await data.Location

        const resena = new Resena(
            {
                id_libro: req.body.id_libro,
                autor: req.body.autor,
                resena: req.body.resena,
                imagen: location_aws,
            })

        resena.save((err, resenaStored) => {
            if (err) res.status(500).send({ message: `Error creando la resena: ${err}` })
            res.status(200).send({ resena: resenaStored })
        })

    })

}


function getResena(req, res) {
    Resena.find({}, (err, resenas) => {
        if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
        if (!resenas) return res.status(404).send({ message: `No existe Resenas` })
        res.status(200).send({ resenas });
    }).populate('id_libro').lean()
}

function getResenaByLibro(req, res) {
    let libroId = req.params.id_libro;
    Resena.find({id_libro: libroId}, (err, resenas) => {
        if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
        if (!resenas) return res.status(404).send({ message: `No existe Resenas` })
        res.status(200).send({ resenas });
    }).populate('id_libro')
}

module.exports = {
    saveResena,
    getResena,
    getResenaByLibro
}