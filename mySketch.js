const MARKS = ['¯', 'ˊ', 'ˇ', 'ˋ'];

let gMarks = [];

// Options
const gOptions = {
  numMarks: 2,
};

function setup() {
  // Prepare GUI
  prepareDatGUI(gOptions);

  const canvasSize = Math.min(windowHeight, windowWidth);
  createCanvas(canvasSize, canvasSize);

  strokeWeight(3);
  
  textFont('M PLUS Rounded 1c');
  textAlign(CENTER, CENTER);

  shuffleMarks();
}

function draw() {
  background(220);

  let boolShuffle = false;
  const opt = gOptions;

  if (opt.numMarks !== options.numMarks) {
    boolShuffle = true;
  }
  opt.numMarks = options.numMarks;

  if (boolShuffle) {
    shuffleMarks();
  }
  drawMarks();
}

const shuffleMarks = () => {
  gMarks = [];
  const numMarks = gOptions.numMarks;
  for (let i = 0; i < numMarks; i++) {
    gMarks.push(random(MARKS));
  }
};

const drawMarks = () => {
  const numMarks = gOptions.numMarks;
  const markSize = width / (numMarks + 1);

  gMarks.forEach((mark, idx) => {
    // Squares
    const xPos = ((idx + 1) * markSize) / (numMarks + 1) + idx * markSize;
    const yPos = height / 2 - markSize / 2;
    square(xPos, yPos, markSize);

    // Marks
    const coef = width / 720;
    textSize([720, 480, 360, 300][gOptions.numMarks - 1] * coef);
    const markXPos = xPos + markSize / 2;
    const markYPos = height / 2 + markSize / 2 + textSize() / 12;
    text(mark, markXPos, markYPos);

    // Mark descriptions
    textSize(textSize() / 12);
    const markDesc = ['第一声', '第二声', '第三声', '第四声'];
    text(markDesc[MARKS.indexOf(mark)], markXPos, markYPos);

    // Title
    textSize(50 * coef);
    text('ランダムmamaツール', width / 2, 100 * coef);
  });
};

function touchStarted() {
  // Shuffle!
  shuffleMarks();
}
