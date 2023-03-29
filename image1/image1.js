

const fs = require('fs');
const PNG = require('pngjs').PNG;

const Jimp = require('jimp');
async function resize() {
 
  const image = await Jimp.read('Captcha United.jpg');
 
  await image.resize(270, 150);
  
  await image.greyscale();
  await image.writeAsync("Modified1.png");
}

const normal = async()=>{
    await resize();

   
const captcha = fs.readFileSync("Modified1.png");

const pngImage = PNG.sync.read(captcha);
let {data, height, width} = pngImage;


let colorOccurrences = {};

for (let y = 0; y < height; y++) {  // rows
  for (let x = 0; x < width; x++) { // columns
    
    let index = (width * y + x) * 4;

    
    let color = `${data[index]}-${data[index+1]}-${data[index+2]}`;
  
    if(color !== "255-255-255"){
    
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
fs.writeFileSync("Modified1.png", PNG.sync.write(pngImage));
}
normal()



const  Tesseract  =  require('tesseract.js');

const func = async()=>{
   let img = await Tesseract.recognize('Modified1.png','eng')
   console.log(img.data.text)
}
func()
