// helper function
export const radiansToDegrees = (angle) => (angle * 180) / Math.PI;

// all values are provided in pixels
export const canvasOptions = {width: 500, height: 500, padding: 25}

export const config = {
    centerX: Math.floor((canvasOptions.width - canvasOptions.padding) / 2),
    centerY: Math.floor((canvasOptions.height - canvasOptions.padding) / 2),
    radius: 200,

    crustRadius: 20,
    crustColor: "#EEC670",

    labelRadiusModifier: 0.6,
    labelSize: 18,
    labelFontColor: "rgba(0, 0, 0, 0.8)"
};

// mood pie slice data
export const data = [
  { 
    name: 'Frustrated', 
    labelPosition: { offsetX: -30, offsetY: 0 },
    portionColor: "#EB8838"
  },
  {
    name: 'Numb',
    labelPosition: {offsetX: -20, offsetY: 0 },
    portionColor: "#C2B5A6"
  },
  {
    name: 'Sad',
    labelPosition: {offsetX: -15, offsetY: 0},
    portionColor: "#5D6EE4"
  },
  {
    name: 'Happy',
    labelPosition: {offsetX: -25, offsetY: 5},
    portionColor: "#EFED49"
  },
  {
    name: 'Surprised',
    labelPosition: {offsetX: -45, offsetY: 10},
    portionColor: "#E35AD8"
  },
  {
    name: 'Drowsy',
    labelPosition: {offsetX: -45, offsetY: 5},
    portionColor: "#AFA6B6"
  },
  {
    name: 'Fearful',
    labelPosition: {offsetX: -37, offsetY: -5},
    portionColor: "#D5BA42"
  },
  {
    name: 'Confident',
    labelPosition: {offsetX: -35, offsetY: 0},
    portionColor: "#52E798"
  },
  {
    name: 'Delighted',
    labelPosition: {offsetX: -30, offsetY: 5},
    portionColor: "#B3EA4A"
  }
];

const moodColorMapping = {}
data.forEach( (entry) => { moodColorMapping[entry.name] = entry.portionColor });

export { moodColorMapping };