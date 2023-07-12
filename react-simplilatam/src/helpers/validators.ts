const rutClean = (rut: string) => {
  return rut.replace(/^0+|[^0-9kK]+/g, "").toUpperCase();
};

export const emailValidate = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const rutValidate = (rut: string) => {
  if (/^0+/.test(rut)) {
    return false;
  }

  if (!/^0*(\d{1,3}(\.?\d{3})*)-?([\dkK])$/.test(rut)) {
    return false;
  }

  rut = rutClean(rut);

  let t = parseInt(rut.slice(0, -1), 10);
  let m = 0;
  let s = 1;

  while (t > 0) {
    s = (s + (t % 10) * (9 - (m++ % 6))) % 11;
    t = Math.floor(t / 10);
  }

  const v = s > 0 ? "" + (s - 1) : "K";
  return v === rut.slice(-1);
};
