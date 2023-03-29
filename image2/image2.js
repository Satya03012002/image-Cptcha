
const Jimp = require("jimp")
const sharp = require("sharp")

Jimp.read('My project.png')
  .then(image => {
    image.resize(700, 150)
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];
      if (red === 0 && green === 0 && blue === 0 && alpha === 255) { // Check if pixel is black
        this.bitmap.data[idx + 0] = 255; // Set pixel to white
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
      }
    })
    .write('output-image.png', (err, info) => {
      if (err) throw err;
      console.log('Black color in image converted to white successfully!');
    });
  })
  .catch(err => {
    console.error(err);
  });


  sharp('output-image.png')


  .threshold(128, { 
    black: [0, 0, 0],
    white: [255, 255, 255]}) .modulate({ brightness: 1 })  
       
  .toFile('ooutput-image.png', (err, info) => {
    if (err) throw err;
    console.log('Image background color converted to white successfully!');
  });



  Jimp.read('ooutput-image.png')
  .then(image => {
    image.resize(700, 150)
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const red = this.bitmap.data[idx + 0];
      const green = this.bitmap.data[idx + 1];
      const blue = this.bitmap.data[idx + 2];
      const alpha = this.bitmap.data[idx + 3];
      if (red === 0 && green === 0 && blue === 0 && alpha === 255) { // Check if pixel is black
        this.bitmap.data[idx + 0] = 255; // Set pixel to white
        this.bitmap.data[idx + 1] = 255;
        this.bitmap.data[idx + 2] = 255;
      }
    })
    .write('oooutput-image.png', (err, info) => {
      if (err) throw err;
      console.log('Black color in image converted to white successfully!');
    });
  })
  .catch(err => {
    console.error(err);
  });


  //###########################################################################################################################



const fs = require('fs');
const PNG = require('pngjs').PNG;
async function resize() {
    // reads the image'D:/captcha/image/Modified.png
    const image = await Jimp.read('oooutput-image.png'); //image2\Captcha United.jpg
    // resizes the image to width 150 and heigth 150.
    await image.greyscale();
    // saves the image on the file system

    await image.writeAsync("Modified.png");
}

resize();

const normal = async () => {
    await resize();

    // open image

    const captcha = fs.readFileSync("Modified.png");

    const pngImage = PNG.sync.read(captcha);
    let { data, height, width } = pngImage;

    // create a dictionary to keep track of our pixel counts
    let colorOccurrences = {};

    for (let y = 0; y < height; y++) {  // rows
        for (let x = 0; x < width; x++) { // columns
            
            let index = (width * y + x) * 4;

            let color = `${data[index]}-${data[index + 1]}-${data[index + 2]}`;
           
            if (color !== "255-255-255") {
               
                colorOccurrences[color] = (colorOccurrences[color] || 0) + 1;
            }
        }
    }

    let colors = Object.entries(colorOccurrences);
   
    colors.sort((a, b) => b[1] - a[1]);
   
    let secondColor = colors.find(([color]) => color !== "255-255-255" && color !== colors[0][0])?.[0];
   
    for (let y = 0; y < height; y++) { // rows
        for (let x = 0; x < width; x++) { // columns
            let index = (width * y + x) * 4;
            let color = `${data[index]}-${data[index + 1]}-${data[index + 2]}`;
            if (color === secondColor) {
                data[index] = 0;
                data[index + 1] = 0;
                data[index + 2] = 0;
            } else {
                data[index] = 255;
                data[index + 1] = 255;
                data[index + 2] = 255;
            }
        }
    }

    pngImage.data = data;
    fs.writeFileSync("Modified.png", PNG.sync.write(pngImage));
}
normal()

const  Tesseract  =  require('tesseract.js');

const config = {
    lang: "eng", // default
    oem: 3,
    psm: 3,
  }
const func = async()=>{
   let img = await Tesseract.recognize('Modified.png','eng')
   console.log(img.data.text)
  
}
func()
