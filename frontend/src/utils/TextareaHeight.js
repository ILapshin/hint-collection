const countTextareaHeight = (v) => {
  let lines = v.split("\n");
  let rows = lines.length + 1;
  for (let i in lines) {
    if (lines[i] === "") {
      continue;
    }
    rows += Math.floor(lines[i].length / 100);
  }
  return rows;
};

export default countTextareaHeight;
