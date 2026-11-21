import { LANG } from "../../lib/lang";
import { homeHandler } from "../home";

const ssg = true;

const GET = homeHandler(LANG.JAPANESE);

export { GET, ssg };
