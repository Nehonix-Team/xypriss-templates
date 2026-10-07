import "xypriss";
import { hashPassword } from "helpers/crypto";

const p = "MySeCurePass";
console.log("hash: ", await hashPassword(p));
__sys__.exit();
