export async function getLaws(congress: string) {
  const response = await fetch(
    `https://whopassedwhat-default-rtdb.firebaseio.com/laws/${congress}-congress.json`
  );
  const data = await response.json();
  console.log(data);
}
