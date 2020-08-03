'use scrict'
const fs = require('fs');
const configS3 = require("../config/s3");
const Libro = require('../Models/Libro')

async function saveLibro(req, res) {
    const s3Client = configS3.s3Client;
    const params = configS3.uploadParams;
    const fileContent = await fs.readFileSync(req.files.img.path);
    var location_aws = ""
    params.Key = await req.files.img.originalFilename;
   params.Body = await fileContent;


    await s3Client.upload(params, async (err, data) => {
        if (err) {
            throw err;
        }

       location_aws = await data.Location
        const libro = new Libro(
            {
                estado: req.body.estado,
                nombre: req.body.nombre,
                autor: req.body.autor,
                codigo: req.body.codigo,
                precio: req.body.precio,
                cantidad: req.body.cantidad,
                descripcion: req.body.descripcion,
                img: location_aws,
               // img: req.body.img,
                categoria : req.body.categoria,
                id_categoria: req.body.id_categoria,
            })


        libro.save((err, LibroStored) => {
            if (err) res.status(500).send({ message: `Error creando el libro: ${err}` })
            res.status(200).send({ libro: LibroStored })
        })

    })

}

function getLibros(req, res) {
    Libro.find({}, (err, libros) => {
        if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
        if (!libros) return res.status(404).send({ message: `No existe Libros` })
        res.status(200).send({ libros });
    }).populate('id_categoria')
}

function getLibroByID(req, res) {
    let libroId = req.params.libro_id;
    Libro.findById(libroId, (err, libro) => {
        if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
        if (!libro) return res.status(404).send({ message: `No existe Libro` })
        res.status(200).send(libro);
    }).populate('id_categoria')
}

function getLibroByCategoria(req, res) {
    let categoriaId = req.params.categoria_id;
    Libro.find({id_categoria: categoriaId}, (err, libros) => {
        if (err) return res.status(500).send({ message: `Error making the request: ${err}` })
        if (!libros) return res.status(404).send({ message: `No existen Libros para esta categoria.` })
        res.status(200).send({libros});
    }).populate('id_categoria')
}

module.exports = {
    saveLibro,
    getLibros,
    getLibroByID,
    getLibroByCategoria
}