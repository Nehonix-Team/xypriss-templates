import "xypriss"
import { hashPassword } from "utils/crypto";

const p = "MySeCurePass"
console.log("hash: ", await hashPassword(p));
__sys__.exit()
