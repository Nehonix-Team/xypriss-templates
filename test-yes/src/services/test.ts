import { hashPassword } from "../utils/crypto";
import "xypriss";

const p = "MySeCurePass";
console.log("hash: ", await hashPassword(p));
__sys__.exit();
