const alphabet = "abcdefghijklmnopqrstuvwxyz0123456789";
const length = 8;

export function generateShortId() {
  let id = "";
  for (let i = 0; i < length; i++) {
    id += alphabet.charAt(Math.floor(Math.random() * alphabet.length));
  }
  return id;
}
