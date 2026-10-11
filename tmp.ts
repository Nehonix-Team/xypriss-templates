async function test(a?: number) {
  console.log("démarrage");
  const f = fetch("url");
  console.log("autre chose");
  //////////////////
  const r = (await f).json();
  console.log("resultaut: ", r)
}

test()