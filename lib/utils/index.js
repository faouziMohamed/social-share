import bcrypt from 'bcrypt';

export async function hashPassword(password = '') {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

export function newHTMLElement(name = 'div', attributes = {}, childs = []) {
  const node = document.createElement(name);
  const keys = Object.getOwnPropertyNames(attributes);
  keys.forEach((key) => {
    node.setAttribute(key, attributes[key]);
  });

  node.append(...childs);
  return node;
}

const setStartCase = (txt) =>
  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

export const startCase = (str) => str.replace(/\w\S*/g, setStartCase);
