import { cp, rm } from "node:fs/promises";

const source = new URL("../client/dist/", import.meta.url);
const destination = new URL("../server/public/", import.meta.url);
await rm(destination, { recursive: true, force: true });
await cp(source, destination, { recursive: true });
