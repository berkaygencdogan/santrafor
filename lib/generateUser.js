export function generateUser() {
  const username = "user_" + Math.random().toString(36).substring(2, 8);
  const password = Math.random().toString(36).substring(2, 10);

  return { username, password };
}
