
'use scrict'
const fs = require('fs');
const Slider = require('../Models/slider')
const configS3 = require("../config/s3");

async function saveSlider(req,res) {
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

        const slider = new Slider
        (
            {
                posicion: req.body.posicion,
                imagen: location_aws
            }
        )

        slider.save((err, sliderStored) => {
            if(err) res.status(500).send({message: `Error creando el slider: ${err}`})
            res.status(200).send({slider:sliderStored})  
        })

    })
    
}

function getSlider(req,res){
    Slider.find({},null,{sort: 'posicion'},(err,sliders) => {
    if(err) return res.status(500).send({message: `Error making the request: ${err}`})
    if(!sliders) return res.status(404).send({message: `No existen sliders.`})
    res.status(200).send({sliders});    
    })

}


module.exports = {
    saveSlider,
    getSlider

}