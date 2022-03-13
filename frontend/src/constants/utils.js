export const playersButtons = [
  { number: 1, selected: false, label: "Un jugador" },
  { number: 2, selected: false, label: "Dos jugadores" },
];
export const avatars = [
  { id: 1, name: "witch", url: require("../assets/images/avatar/witch.png") },
  {
    id: 2,
    name: "dracula",
    url: require("../assets/images/avatar/dracula.png"),
  },
  {
    id: 3,
    name: "frankenstein",
    url: require("../assets/images/avatar/frankenstein.png"),
  },
  { id: 4, name: "scream", url: require("../assets/images/avatar/scream.png") },
  {
    id: 5,
    name: "werewolf",
    url: require("../assets/images/avatar/werewolf.png"),
  },
  { id: 6, name: "zombie", url: require("../assets/images/avatar/zombie.png") },
];

export const MAX_SCORE = 10000;
export const MAX_TIME_GAME = 300;

export const NUMBER_CARDS = 10;

export const url = "https://api.unsplash.com/search/photos?query=";
