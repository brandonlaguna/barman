export const getUserData = () => {
  const userData = localStorage.getItem("userData");
  return JSON.parse(userData);
};

export const setUserData = (userData) => {
  localStorage.setItem("userData", userData);
  return true;
};
