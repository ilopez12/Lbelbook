"use scrict";
const fs = require('fs');
const configS3 = require("../config/s3");
const Categoria = require("../Models/categoria");

async function saveCategoria(req, res) {
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
        let categoria =  new Categoria({
            nombre: req.body.nombre,
            imagen: location_aws,
        });

        categoria.save((err, categoriaStored) => {
            if (err) res.status(500).send({ message: `Error creando la caregoria: ${err}` })
            res.status(200).send({ categoria: categoriaStored })
        })
   })

}

function getCategories(req, res) {
    Categoria.find({}, (err, categories) => {
        if (err)
            return res
                .status(500)
                .send({ message: `Error making the request: ${err}` });
        if (!categories)
            return res.status(404).send({ message: `No existe categorias` });
        res.status(200).send({ categories });
    });
}

module.exports = {
    saveCategoria,
    getCategories,
};
