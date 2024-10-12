import { config } from "config";

export const getRandomXLocation = () => Math.floor(Math.random() * config.canvas.width);
