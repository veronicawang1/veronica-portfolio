/* Pixel art for the golden retriever, its toys, the toy basket and its house.
   Each character is one pixel; "." is transparent. The dog faces left.
   The sitting pose is traced from the reference sprite; the other poses are
   drawn to match it. */

export const PALETTE: Record<string, string> = {
  // dog
  C: "#835640", // outline
  D: "#a57856", // dark fur
  A: "#f9e3ae", // fur
  B: "#ecca8e", // fur shade
  F: "#fff6dc", // light fur
  G: "#e3b878", // ear
  I: "#cc9a62", // ear shade
  J: "#1f1510", // eyes + nose
  K: "#d62733", // tongue + bandana highlight
  E: "#740722", // bandana shade
  L: "#b91d44", // bandana
  H: "#ea3e4a", // bandana light
  // toys
  Y: "#d4e83a", // tennis ball
  S: "#f6fbd8", // tennis ball seam
  i: "#f8efd8", // bone
  R: "#d23a3a", // rope
  X: "#f4efe6", // rope
  Q: "#3f97d6", // frisbee
  T: "#9fd4f5", // frisbee center
  // basket
  h: "#d9a86c", // rim
  n: "#5c3a24", // inside
  W: "#c08a52", // weave
  w: "#a8723f", // weave shade
  // house
  k: "#1c140e", // outline + sign lettering
  o: "#cd894a", // roof
  p: "#eab686", // roof light
  q: "#9b5a19", // roof shade
  u: "#f1e3ad", // siding
  v: "#faeec8", // siding light
  x: "#d4c88e", // siding shade
  z: "#252525", // doorway
  m: "#c08a52", // sign
  M: "#e0b47c", // sign light
};

export const SPRITE_COLS = 24;
export const SPRITE_ROWS = 20;

const HEAD = [
  "......DDC.....",
  "...DDDABC.....",
  "..CBBAAAACC...",
  ".CIDAAAAAABC..",
  ".CGDAJFFAAAIC.",
  "CGDAFFFFJADGC.",
  "CIDFJJJFFADBGC",
  ".CDCFJFFCADBBC",
  "..DBCKCCBBDGBC",
  "...CBBBBBCDIGC",
];
const MOUTH = { row: 8, col: 5 };

const SIT_BODY = [
  "...ECCCCCLEDD......",
  "...EKHHLLLEFFC.....",
  "...ELLHHEEAAFFD....",
  "...CEHKEBAAFAFFD...",
  "...DEEEBBCBABAFD...",
  "...DABBBACBBCAAFC..",
  "...CFCBDFCBDFFABCCC",
  "...CFCCDFCBDFAABBAC",
  "..DAACDAACCAAABCCC.",
  "..DDC.DDC.CCCCC....",
];

// Same as SIT_BODY with the tail flicked up, alternated to wag.
const SIT_BODY_WAG = [
  ...SIT_BODY.slice(0, 5),
  "...DABBBACBBCAAFC.CC",
  "...CFCBDFCBDFFABCCAC",
  "...CFCCDFCBDFAABBCC.",
  "..DAACDAACCAAABCC...",
  "..DDC.DDC.CCCCC.....",
];

// Back and tail, drawn to the right of the head rows while standing.
const WALK_SIDES: Record<number, string>[] = [
  { 5: "....CC", 6: "...CAC", 7: "..CAC.", 8: "CCAACC", 9: "AAAAAC" },
  { 4: "..CC..", 5: "..CAC.", 6: "..CAC.", 7: "..CAC.", 8: "CCAACC", 9: "AAAAAC" },
];

const WALK_BODY = [
  "...ECCCCCLEDDBAAAAAC",
  "...EKHHLLLEFFBBAAABC",
  "...ELLHHEEAAFFFBBBBC",
  "...CEHKEBAFFFCCBBBC.",
];

// Four-step walk cycle in diagonal pairs; far legs are shaded. The stride frames are a
// row shorter, so the body dips as the legs spread.
const WALK_LEGS = [
  [
    "...CFFCBC....CFFCBC...",
    "....CFFC.....CFFCBC...",
    "...CCCCCC...CCCCCCCC..",
  ],
  [
    "...CFFCBC....CFFCBC...",
    "...CFFCBC....CFFCBC...",
    "...CFFCBC....CFFCBC...",
    "...CCCCCC....CCCCCC...",
  ],
  [
    "...CFFCBC....CFFCBC...",
    "..CFFCCBBC...CFFCBC...",
    ".CCCC..CCCC...CCCC....",
  ],
  [
    "...CFFCBC....CFFCBC...",
    "...CFFCBC....CFFCBC...",
    "...CFFCBC....CFFCBC...",
    "...CCCCCC....CCCCCC...",
  ],
];

const LIE_SIDE: Record<number, string> = { 7: "CCCCCCCC..", 8: "AAAAAAABC.", 9: "AAAAAAAABC" };
const LIE_BODY = [
  "...ECCCCCLEDDBAAAAAAABC.",
  "..CEKHHLLLEFFBBAAAAABBC.",
  ".CFFLHHEEFFFFFBBBBBBBC..",
  ".CCCCCCCCCCCCCCCCCCCC...",
];

export type ToyKind = "ball" | "bone" | "rope" | "frisbee";

export const TOY_ART: Record<ToyKind, string[]> = {
  ball: [".CCC.", "CYYSC", "CYSYC", "CSYYC", ".CCC."],
  bone: [".CC....CC.", "CiiCCCCiiC", ".CiiiiiiC.", "CiiCCCCiiC", ".CC....CC."],
  rope: ["CC.....CC", "RXCCCCCXR", "XRXRXRXRX", "RXCCCCCXR", "CC.....CC"],
  frisbee: ["..CCCCCC..", ".CQQQQQQC.", "CQTTTTTTQC", ".CQQQQQQC.", "..CCCCCC.."],
};

const BASKET_COLS = 28;
const weave = (width: number, offset: number) =>
  Array.from({ length: width }, (_, i) => ((i + offset) % 4 < 2 ? "W" : "w")).join("");

export const BASKET_BACK = [
  "..C" + "C".repeat(BASKET_COLS - 6) + "C..",
  ".C" + "h".repeat(BASKET_COLS - 4) + "C.",
  "Ch" + "n".repeat(BASKET_COLS - 4) + "hC",
];
export const BASKET_FRONT = [
  "C" + "h".repeat(BASKET_COLS - 2) + "C",
  "C".repeat(BASKET_COLS),
  ...[0, 2].map((offset) => ".C" + weave(BASKET_COLS - 4, offset) + "C."),
  ...[0, 2].map((offset) => "..C" + weave(BASKET_COLS - 6, offset) + "C.."),
  "..." + "C".repeat(BASKET_COLS - 6) + "...",
];

// The dog's house, with its name over the door. The doorway fits the dog's head.
export const HOUSE = [
  "......................kkkkkkkkkkkkkkkkkk......................",
  ".....................opkppppppppppppppppk.....................",
  "....................kkopkooooooooooooooook....................",
  "...................kpokopkooooooooooooooook...................",
  "..................kpokukopkqqqqqqqqqqqqqqqqk..................",
  ".................kpokxxxkopkppppppppppppppppk.................",
  "................kpokvvvvvkopkooooooooooooooook................",
  "...............kpokuuuuuuukopkooooooooooooooook...............",
  "..............kpokxxxxxxxxxkopkqqqqqqqqqqqqqqqqk..............",
  ".............kpokvvvvvvvvvvvkopkppppppppppppppppk.............",
  "............kpokuuuuuuuuuuuuukopkooooooooooooooook............",
  "...........kpokxxxxxxxxxxxxxxxkopkooooooooooooooook...........",
  "..........kpokvvvvvvvvvvvvvvvvvkopkqqqqqqqqqqqqqqqqk..........",
  ".........kpokuuuuuuuuuuuuuuuuuuukopkppppppppppppppppk.........",
  "........kpokxxxxxxxxxxxxxxxxxxxxxkopkooooooooooooooook........",
  ".......kpokvvvvvvvvvvvvvvvvvvvvvvvkopkooooooooooooooook.......",
  "......kpokuuuuuuuuuuuuuuuuuuuuuuuuukopkqqqqqqqqqqqqqqqqk......",
  ".....kpokxxxxxxxxxxxxxxxxxxxxxxxxxxxkopkppppppppppppppppk.....",
  "....kpokvvvvvvvvvvvvvvvvvvvvvvvvvvvvvkopkooooooooooooooook....",
  "...kpokkuuuuuuuuuuuuuuuuuuuuuuuuuuuuukkopkqqqqqqqqqqqqqqqqk...",
  "..kkkk.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkukkkkkkkkkkkkkkkkkkkkk..",
  ".......kkMMMMMMMMMMMMMMMMMMMMMMMMMMMkkxxxxxxxxxxxxxxxk........",
  "........kmkkkmmmmmmmmmmmmmmmmmmmmkmmkvvvvvvvvvvvvvvvvk........",
  "........kmkmmmmkmmkkmkkmmkmmmkkmkkkmkuuuuuuuuuuuuuuuuk........",
  "........kmkkmmkmkmkmmkmmkkkmkmmmmkmmkxxxxxxxxxxxxxxxxxk.......",
  ".......kkmkmmmkmkmkmmkmmkmmmmmkmmkmmkkvvvvvvvvvvvvvvvvk.......",
  ".......kkmkmmmmkmmkmmkmmmkkmkkmmmmkmkkuuuuuuuuuuuuuuuuk.......",
  ".......kkmmmmmmmmmmmmmmmmmmmmmmmmmmmkkxxxxxxxxxxxxxxxk........",
  "........kkkkkkkkkkkkkkkkkkkkkkkkkkkkkvvvvvvvvvvvvvvvvk........",
  "........kxxxxxxxxxxxxxxxxxxxxxxxxxxxkuuuuuuuuuuuuuuuuk........",
  "........kvvvvvvvvvkkkkkkkkkvvvvvvvvvkxxxxxxxxxxxxxxxxxk.......",
  ".......kuuuuuuuukzzzzzzzzzzzkuuuuuuuukvvvvvvvvvvvvvvvvk.......",
  ".......kxxxxxxxkzzzzzzzzzzzzzkxxxxxxxkuuuuuuuuuuuuuuuuk.......",
  ".......kvvvvvvkzzzzzzzzzzzzzzzkvvvvvvkxxxxxxxxxxxxxxxk........",
  "........kuuuuukzzzzzzzzzzzzzzzkuuuuukvvvvvvvvvvvvvvvvk........",
  "........kxxxxxkzzzzzzzzzzzzzzzkxxxxxkuuuuuuuuuuuuuuuuk........",
  "........kvvvvvkzzzzzzzzzzzzzzzkvvvvvkxxxxxxxxxxxxxxxxxk.......",
  ".......kuuuuuukzzzzzzzzzzzzzzzkuuuuuukvvvvvvvvvvvvvvvvk.......",
  ".......kxxxxxxkzzzzzzzzzzzzzzzkxxxxxxkuuuuuuuuuuuuuuuuk.......",
  ".......kvvvvvvkzzzzzzzzzzzzzzzkvvvvvvkxxxxxxxxxxxxxxxk........",
  "........kuuuuukzzzzzzzzzzzzzzzkuuuuukvvvvvvvvvvvvvvvvk........",
  "........kxxxxxkzzzzzzzzzzzzzzzkxxxxxkuuuuuuuuuuuuuuuuk........",
  "k.kkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk....k.k",
];
// Where the dog's head goes when it peeks out of the doorway.
export const HOUSE_PEEK = { col: 15, row: HOUSE.length - 1 - 10 };

export type Pose = "sit" | "walk" | "lie";
export type Eyes = "open" | "closed";
export type Carry = ToyKind | null;

export interface Look {
  pose: Pose;
  eyes: Eyes;
  step: 0 | 1 | 2 | 3; // walk cycle; its parity sets the tail position while wagging
  wag: boolean;
  carrying: Carry;
}

const patch = (row: string, at: number, text: string) =>
  row.slice(0, at) + text + row.slice(at + text.length);

function head(eyes: Eyes, mouthOpen: boolean) {
  const rows = [...HEAD];
  if (eyes === "closed") {
    rows[4] = patch(rows[4], 4, "DD");
    rows[5] = patch(rows[5], 8, "DD");
  }
  if (!mouthOpen) rows[MOUTH.row] = patch(rows[MOUTH.row], MOUTH.col, "C");
  return rows;
}

function overlay(rows: string[], art: string[], top: number, left: number) {
  return rows.map((row, y) => {
    const line = art[y - top];
    if (!line) return row;
    let out = row;
    for (let i = 0; i < line.length; i++) {
      if (line[i] !== ".") out = patch(out, left + i, line[i]);
    }
    return out;
  });
}

// Pads to the shared canvas size, keeping the paws on the bottom row.
function frame(rows: string[]) {
  const padded = rows.map((row) => row.padEnd(SPRITE_COLS, "."));
  while (padded.length < SPRITE_ROWS) padded.unshift(".".repeat(SPRITE_COLS));
  return padded;
}

export function dogSprite({ pose, eyes, step, wag, carrying }: Look) {
  const mouthOpen = pose !== "lie" && !carrying;
  let rows: string[];

  if (pose === "sit") {
    rows = [...head(eyes, mouthOpen), ...(wag && step % 2 ? SIT_BODY_WAG : SIT_BODY)];
  } else if (pose === "walk") {
    const side = WALK_SIDES[wag ? step % 2 : 0];
    rows = head(eyes, mouthOpen).map((row, i) => row + (side[i] ?? ""));
    rows = [...rows, ...WALK_BODY, ...WALK_LEGS[step]];
  } else {
    rows = head("closed", false).map((row, i) => row + (LIE_SIDE[i] ?? ""));
    rows = [...rows, ...LIE_BODY];
  }

  rows = frame(rows);

  if (carrying) {
    const art = TOY_ART[carrying];
    const headTop = rows.findIndex((row) => row.includes("C"));
    const top = headTop + MOUTH.row - Math.floor(art.length / 2);
    rows = overlay(rows, art, top, Math.round(MOUTH.col + 0.5 - art[0].length / 2));
  }
  return rows;
}

export function houseSprite(peek: { eyes: Eyes; mouthOpen: boolean } | null) {
  if (!peek) return HOUSE;
  return overlay(HOUSE, head(peek.eyes, peek.mouthOpen), HOUSE_PEEK.row, HOUSE_PEEK.col);
}
