export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePassword(password) {
  return password.length >= 6;
}

export function validateName(name) {
  const nameRegex = /^[A-Za-z\s]{2,}$/;
  return nameRegex.test(name);
}
