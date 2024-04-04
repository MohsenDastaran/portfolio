// NAMINGS:
// First color - background
// Second color - primary
// Third color - secondary

// VALUES:
//   r    g    b
// [235, 235, 235]

const WhitePinkGreen = {
  color1: {
    dark: [3, 3, 3],
    light: [247, 247, 247],
  },
  color2: {
    dark: [255, 230, 237],
    light: [255, 181, 202],
  },
  color3: {
    dark: [125, 179, 132],
    light: [106, 168, 114],
  },
};

// const WhiteGreenPink = {
//   color1: {
//     dark: [0, 0, 0],
//     light: [235, 235, 235],
//   },
//   color2: {
//     dark: [125, 179, 132],
//     light: [106, 168, 114],
//   },
//   color3: {
//     dark: [255, 230, 237],
//     light: [255, 181, 202],
//   },
// };

const BeigeGreyNavy = {
  color1: {
    dark: [169, 154, 140],
    light: [229, 228, 223],
  },
  color2: {
    dark: [96, 96, 96],
    light: [173, 173, 173],
  },
  color3: {
    dark: [27, 42, 53],
    light: [96, 125, 139],
  },
};

const CreamBlackWhite = {
  color1: {
    dark: [240, 235, 215],
    light: [255, 254, 250],
  },
  color2: {
    dark: [37, 37, 37],
    light: [90, 89, 91],
  },
  color3: {
    dark: [242, 242, 242],
    light: [255, 255, 255],
  },
};


const SandStoneGrey = {
  color1: {
    dark: [213, 203, 196],
    light: [255, 254, 252],
  },
  color2: {
    dark: [117, 111, 97],
    light: [186, 181, 174],
  },
  color3: {
    dark: [69, 79, 79],
    light: [158, 170, 173],
  },
};

const DesertSandStone = {
  color1: {
    dark: [200, 178, 123],
    light: [247, 237, 203],
  },
  color2: {
    dark: [255, 250, 240],
    light: [255, 255, 255],
  },
  color3: {
    dark: [83, 93, 115],
    light: [162, 173, 186],
  },
};

const SandstoneShadowSmoke = {
  color1: {
    dark: [213, 203, 196],
    light: [255, 254, 252],
  },
  color2: {
    dark: [0, 0, 0],
    light: [82, 82, 82],
  },
  color3: {
    dark: [118, 118, 118],
    light: [197, 197, 197],
  },
};
const blackWhiteRed = {
  color1: { dark: [33, 33, 33], light: [33, 33, 33] }, color2: { dark: [124, 61, 61], light: [124, 61, 61] }, color3: { dark: [288, 288, 288], light: [288, 288, 288] }
}

const colorPalettes = [
  WhitePinkGreen,
  BeigeGreyNavy,
  CreamBlackWhite,
  SandStoneGrey,
  DesertSandStone,
  SandstoneShadowSmoke,
  blackWhiteRed
];

export function getRandomColorPalette() {
  const index = Math.floor(Math.random() * colorPalettes.length);
  return colorPalettes[index];
}