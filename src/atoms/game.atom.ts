import { atom } from "jotai";
import { uuidv4 } from "../utils/uuidv4";

export const isGameOver = atom(false);

export const gameSession = atom(uuidv4());
