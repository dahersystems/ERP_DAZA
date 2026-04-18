const { searchGlobal } = require("./src/actions/search");

async function test() {
  try {
    console.log("Searching for 'Teclado'...");
    const res = await searchGlobal("Teclado");
    console.log("Result:", JSON.stringify(res, null, 2));

    console.log("\nSearching for '000'...");
    const res2 = await searchGlobal("000");
    console.log("Result:", JSON.stringify(res2, null, 2));
  } catch (e) {
    console.error(e);
  }
}

test();
