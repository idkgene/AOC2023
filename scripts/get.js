const fs = require("fs").promises;
const path = require("path");
const https = require("https");

const YEAR = 2023;
const SESSION_COOKIE = "53616c7465645f5f934644a1a44ebf7cc09555ba5ae48622778c85d857983bd217ae822188245d4ca06d1daebb969dff6559b38e9e5d1057c4380700c644953d";
const MAX_DAYS = 25;

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithCookie(url) {
  return new Promise((resolve, reject) => {
    const options = {
      headers: {
        Cookie: `session=${SESSION_COOKIE}`,
      },
    };

    https
      .get(url, options, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          if (res.statusCode === 404) {
            resolve(null); 
          } else {
            resolve(data);
          }
        });
      })
      .on("error", reject);
  });
}

async function createDayStructure(day) {
  console.log(`Processing Day ${day}...`);

  const puzzleUrl = `https://adventofcode.com/${YEAR}/day/${day}`;
  const puzzleHtml = await fetchWithCookie(puzzleUrl);

  if (!puzzleHtml) {
    console.log(`Day ${day} is not available yet`);
    return false;
  }

  const basePath = path.join(__dirname, `Day ${day}`);

  const folders = [
    "",
    "Part 1",
    "Part 1/implementations",
    "Part 1/input",
    "Part 1/tests",
    "Part 2",
    "Part 2/implementations",
    "Part 2/input",
    "Part 2/tests",
  ];

  for (const folder of folders) {
    await fs.mkdir(path.join(basePath, folder), { recursive: true });
  }

  try {
    const part1Match = puzzleHtml.match(
      /<article class="day-desc">([\s\S]*?)<\/article>/
    );
    const part2Match = puzzleHtml.match(
      /<article class="day-desc">([\s\S]*?)<\/article>/g
    );

    const part1 = part1Match ? part1Match[1] : "";
    const part2 = part2Match && part2Match[1] ? part2Match[1] : "";

    const inputUrl = `https://adventofcode.com/${YEAR}/day/${day}/input`;
    const input = await fetchWithCookie(inputUrl);

    if (input) {
      await fs.writeFile(path.join(basePath, "Part 1/task.md"), part1);
      if (part2) {
        await fs.writeFile(path.join(basePath, "Part 2/task.md"), part2);
      }
      await fs.writeFile(path.join(basePath, "Part 1/input/input.txt"), input);
      await fs.writeFile(path.join(basePath, "Part 2/input/input.txt"), input);
      await fs.writeFile(path.join(basePath, "README.md"), `# Day ${day}`);

      console.log(`Day ${day} processed successfully`);
      return true;
    }
  } catch (error) {
    console.error(`Error processing Day ${day}:`, error);
    return false;
  }
}

async function main() {
  let successfulDays = 0;

  for (let day = 1; day <= MAX_DAYS; day++) {
    const success = await createDayStructure(day);
    if (success) {
      successfulDays++;
      await sleep(2500);
    } else {
      console.log(
        `\nStopping at Day ${day} - future days are not available yet`
      );
      break;
    }
  }

  console.log(`\nCompleted! Successfully processed ${successfulDays} days.`);
}

main().catch(console.error);
