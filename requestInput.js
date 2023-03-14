export default async function createRequestInput(readline, message) {
  let input = await new Promise((resolve) => {
    readline.question(message, resolve);
  });

  return input;
}