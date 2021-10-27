const setStartCase = (txt) =>
  txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();

export const startCase = (str) => str.replace(/\w\S*/g, setStartCase);

export const removeTrailingSlash = (str) => str.replace(/\/$/, '');
export const removeExtraSpaces = (str) => str.replace(/\s+/g, ' ');
export const pow = (x, y) => x ** y;
export const isEmpty = (str) => !str || str.trim().length === 0;
export const round = (n, precision) => {
  const prec = pow(10, precision);
  return Math.round(n * prec) / prec;
};

export function golfyNumber(number) {
  const n = Number(number);
  const { floor, abs, log } = Math;
  const abbrev = 'kmb';
  let base = floor(log(abs(n)) / log(1000));
  const suffix = abbrev[Math.min(2, base - 1)];
  base = abbrev.indexOf(suffix) + 1;
  return suffix ? round(n / pow(1000, base), 2) + suffix : `${n}`;
}

export async function disconnectUser(mutate) {
  await fetch('/api/logout');
  mutate({ user: null });
  window.location = '/';
}
