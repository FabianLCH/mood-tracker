// helper function
export const radiansToDegrees = (angle) => (angle * 180) / Math.PI;

export const config = {
    centerX: 350,
    centerY: 350,
    radius: 200,
    padding: 15,
    crustRadius: 50,
    crustColor: "#EEC670",
    textSize: "25px"
};

// mood pie slice data
export const data = [
  { 
    name: 'Angry', 
    labelPosition: { dx: 85, dy: 25 },
    portionColor: "#FF4C33"
  },
  {
    name: 'Disgusted',
    labelPosition: {dx: 20, dy: 50 },
    portionColor: "#9D908E"
  },
  {
    name: 'Sad',
    labelPosition: {dx: -90, dy: 100, rotation: 300},
    portionColor: "#759297"
  },
  {
    name: 'Happy',
    labelPosition: {dx: -150, dy: -10, rotation: 0},
    portionColor: "#F1EE4B"
  },
  {
    name: 'Surprised',
    labelPosition: {dx: -115, dy: -135, rotation: 40},
    portionColor: "#9372A3"
  },
  {
    name: 'Bad',
    labelPosition: {dx: 5, dy: -90},
    portionColor: "#62C465"
  },
  {
    name: 'Fearful',
    labelPosition: {dx: 70, dy: -40},
    portionColor: "#D5BC4B"
  }
];