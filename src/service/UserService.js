import { AsyncStorage } from "react-native";

export const setUserLogged = async (user) => {
  await AsyncStorage.setItem("@@user", JSON.stringify(user));
};

export const getUserLogged = async () => {
  const json = await AsyncStorage.getItem("@@user");
  return JSON.parse(json);
};

export const logout = async () => {
  await AsyncStorage.removeItem("@@user");
};

export const addNewUser = async (email, name, password) => {
  const json = await AsyncStorage.getItem("@@listuser");
  let users = [];
  if (json) users = JSON.parse(json);

  let user = users.find((u) => u.email === email);
  if (user) {
    user.name = name;
    user.password = password;
  } else {
    user = { email, name, password, devices: [] };
    users.push(user);
  }

  await AsyncStorage.setItem("@@listuser", JSON.stringify(users));
  return user;
};

export const getUser = async (email, password) => {
  const json = await AsyncStorage.getItem("@@listuser");
  if (!json) return null;

  const users = JSON.parse(json || []);
  const user = users.find((u) => u.email === email && u.password === password);
  return user;
};

export const getListUser = async () => {
  const json = await AsyncStorage.getItem("@@listuser");
  if (!json) return [];
  return JSON.parse(json);
};

export const getUserByEmail = async (email) => {
  const users = await getListUser();
  const user = users.find((u) => u.email === email);
  return user;
};

export const addDeviceToUser = async (qrcode) => {
  const userLogged = await getUserLogged();
  const users = await getListUser();
  const user = users.find((u) => u.email === userLogged.email);
  if (!user.devices) user.devices = [];
  user.devices.push({ qrcode });

  await AsyncStorage.setItem("@@listuser", JSON.stringify(users));
  await setUserLogged(user);
};
