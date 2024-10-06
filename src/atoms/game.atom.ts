import { atom } from "jotai";
import { uuidv4 } from "../utils/uuidv4";

export const gameAtom = {
	isStarted: atom(false),
	isOver: atom(false),
	session: atom(uuidv4())
};
