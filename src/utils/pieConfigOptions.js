// helper function
export const radiansToDegrees = (angle) => (angle * 180) / Math.PI;

// all values are provided in pixels
export const canvasOptions = {width: 600, height: 600, padding: 25}

export const config = {
    centerX: Math.floor((canvasOptions.width - canvasOptions.padding) / 2),
    centerY: Math.floor((canvasOptions.height - canvasOptions.padding) / 2),
    radius: 200,

    crustRadius: 20,
    crustColor: "#EEC670",

    labelRadiusModifier: 0.6,
    labelSize: 20,
    labelFontColor: "rgba(0, 0, 0, 0.8)"
};

// mood pie slice data
export const data = [
  { 
    name: 'Angry', 
    labelPosition: { offsetX: 0, offsetY: 0 },
    portionColor: "#FF4C33"
  },
  {
    name: 'Disgusted',
    labelPosition: {offsetX: -35, offsetY: 0 },
    portionColor: "#9D908E"
  },
  {
    name: 'Sad',
    labelPosition: {offsetX: -15, offsetY: 0},
    portionColor: "#759297"
  },
  {
    name: 'Happy',
    labelPosition: {offsetX: -30, offsetY: 0},
    portionColor: "#F1EE4B"
  },
  {
    name: 'Surprised',
    labelPosition: {offsetX: -55, offsetY: -5},
    portionColor: "#9372A3"
  },
  {
    name: 'Bad',
    labelPosition: {offsetX: -25, offsetY: 0},
    portionColor: "#62C465"
  },
  {
    name: 'Fearful',
    labelPosition: {offsetX: -25, offsetY: -10},
    portionColor: "#D5BC4B"
  }
];