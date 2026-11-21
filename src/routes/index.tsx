import { DEFAULT_LANG } from "../lib/lang";
import { homeHandler } from "./home";

const ssg = true;

const GET = homeHandler(DEFAULT_LANG);

export { GET, ssg };
