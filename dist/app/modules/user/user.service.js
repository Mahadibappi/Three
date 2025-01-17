"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_model_1 = __importDefault(require("./user.model"));
const user_utils_1 = require("./user.utils");
const config_1 = __importDefault(require("../../config"));
const createUserIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        payload.password = yield (0, user_utils_1.hashPassword)(payload.password);
        const newUser = yield user_model_1.default.create(payload);
        return newUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
// admin creation
const createAdminIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        payload.password = yield (0, user_utils_1.hashPassword)(payload.password);
        const newUser = yield user_model_1.default.create(payload);
        return newUser;
    }
    catch (error) {
        throw new Error(error.message);
    }
});
const loginUser = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.default.findOne({ email: email });
    console.log(user);
    if (!user) {
        throw new Error("This user not exist");
    }
    const isPasswordValid = yield (0, user_utils_1.comparePassword)(password, user === null || user === void 0 ? void 0 : user.password);
    if (!isPasswordValid) {
        throw new Error("Password did't match");
    }
    //generate jwt token
    const token = jsonwebtoken_1.default.sign({ id: user._id, email: user.email }, config_1.default.jwt_access_secret, { expiresIn: "1d" });
    return { user, token };
});
exports.UserService = { createUserIntoDB, createAdminIntoDB, loginUser };
