var inpImage = null;
var grayImage = null;
var redImage = null;
var blurImage = null;
var rainbowImage = null;
var canvas = document.getElementById("can");

function UploadImage() 
{
  var imgfile = document.getElementById("finput");
  inpImage = new SimpleImage(imgfile);
  grayImage = new SimpleImage(imgfile);
  redImage = new SimpleImage(imgfile);
  blurImage = new SimpleImage(imgfile);
  rainbowImage = new SimpleImage(imgfile);
  inpImage.drawTo(canvas);
}

function doGray() 
{
  if (imageIsLoaded(grayImage))
  {
    makeGray();
    grayImage.drawTo(canvas);
  }
  else 
    alert("Upload Error or Not loaded Successfully");
}

function doRed() 
{
  if (imageIsLoaded(redImage))
  {
    makeRed();
    redImage.drawTo(canvas);
  }
  else 
    alert("Upload Error or Not loaded Successfully");
}

function doBlur() 
{
  if (imageIsLoaded(blurImage))
  {
    makeBlur();
    blurImage.drawTo(canvas);
  }
  else 
    alert("Upload Error or Not loaded Successfully");
}

function doRainbow() 
{
  if (imageIsLoaded(rainbowImage))
  {
    makeRainbow();
    rainbowImage.drawTo(canvas);
  }
  else 
    alert("Upload Error or Not loaded Successfully");
}

function makeGray() 
{
  for (var pixel of grayImage.values())
  {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue() )/3;
    pixel.setRed(avg);
    pixel.setGreen(avg);
    pixel.setBlue(avg);
  }
}

function makeRed() 
{
  for (var pixel of redImage.values()) 
  {
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (avg < 128) 
    {
      pixel.setRed(2 * avg);
      pixel.setGreen(0);
      pixel.setBlue(0);
    } else 
    {
      pixel.setRed(255);
      pixel.setGreen(2 * avg - 255);
      pixel.setBlue(2 * avg - 255);
    }
  }
}

function makeBlur() 
{
  for (var pixel of blurImage.values()) 
  {
    var x = pixel.getX();
    var y = pixel.getY();
    if (Math.random() > 0.5) 
    {
        var other = getPixelNearby(blurImage, x, y, 10);
        blurImage.setPixel(x, y, other);
    }
    else
     {
        blurImage.setPixel(x, y, pixel);
    } 
  }
}
  
function getPixelNearby (blurImage, x, y, diameter) 
{
    var dx = Math.random() * diameter - diameter / 2;
    var dy = Math.random() * diameter - diameter / 2;
    var nx = ensureInImage(x + dx, blurImage.getWidth());
    var ny = ensureInImage(y + dy, blurImage.getHeight());
    return blurImage.getPixel(nx, ny);
}

// Randomly Blur 
function ensureInImage (coordinate, size) 
{
    // Check Coordinate valid or not
    if (coordinate < 0) 
    {
        return 0;
    }
    if (coordinate >= size) 
    {
        return size - 1;
    }
    return coordinate;
}
  
function makeRainbow()
 {
  var height = rainbowImage.getHeight();
  for (var pixel of rainbowImage.values()) 
  {
    var y = pixel.getY();
    var avg = (pixel.getRed() + pixel.getGreen() + pixel.getBlue()) / 3;
    if (y < height / 7) 
    {
      //Red
      if (avg < 128) 
      {
        pixel.setRed(2 * avg);
        pixel.setGreen(0);
        pixel.setBlue(0);
      } else 
      {
        pixel.setRed(255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 2 / 7) 
    {
      //Orange
      if (avg < 128) 
      {
        pixel.setRed(2 * avg);
        pixel.setGreen(0.8*avg);
        pixel.setBlue(0);
      } else 
      {
        pixel.setRed(255);
        pixel.setGreen(1.2 *avg - 51);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 3 / 7) 
    {
      //Yellow
      if (avg < 128) 
      {
        pixel.setRed(2 * avg);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else 
      {
        pixel.setRed(255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 4 / 7) 
    {
      //Green
      if (avg < 128) 
      {
        pixel.setRed(0);
        pixel.setGreen(2 * avg);
        pixel.setBlue(0);
      } else 
      {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(255);
        pixel.setBlue(2 * avg - 255);
      }
    } else if (y < height * 5 / 7)
     {
      //Blue
      if (avg < 128) 
      {
        pixel.setRed(0);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else 
      {
        pixel.setRed(2 * avg - 255);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else if (y < height * 6 / 7)
     {
      //Indigo
      if (avg < 128) 
      {
        pixel.setRed(.8 * avg);
        pixel.setGreen(0);
        pixel.setBlue(2 * avg);
      } else 
      {
        pixel.setRed(1.2 * avg - 51);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(255);
      }
    } else 
    {
      //Violet
      if (avg < 128) 
      {
        pixel.setRed(1.6 * avg);
        pixel.setGreen(0);
        pixel.setBlue(1.6 * avg);
      } else 
      {
        pixel.setRed(0.4 * avg + 153);
        pixel.setGreen(2 * avg - 255);
        pixel.setBlue(0.4 * avg + 153);
      }
    }
  }
}

function imageIsLoaded(image)
 {
  var imgLoaded;
  if (image == null || (!image.complete()))
    imgLoaded = false;
  else
    imgLoaded = true;
  return imgLoaded;
}

function resetImage() 
{
  if (imageIsLoaded(inpImage)) 
  {
    inpImage.drawTo(canvas);
  }
  else
    alert("Upload Error or Not loaded Successfully");
}
  
