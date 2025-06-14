import {randomInt} from "crypto";
export const GenerateOTP = () => {
    return randomInt(100000 + 1000000).toString();
}