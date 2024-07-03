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
exports.getPesananAndDelete = exports.getPesananByUserId = exports.createPesanan = exports.getPesananById = exports.getAllPesanan = void 0;
const auth_model_1 = __importDefault(require("../models/auth.model"));
const pesanan_model_1 = __importDefault(require("../models/pesanan.model"));
const getAllPesanan = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield pesanan_model_1.default
        .find()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.getAllPesanan = getAllPesanan;
const getPesananById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pesanan_model_1.default.findOne({ pesanan_id: id });
});
exports.getPesananById = getPesananById;
const createPesanan = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield pesanan_model_1.default.create(payload);
    }
    catch (error) {
        console.log(error);
        throw new Error("Failed to create pesanan");
    }
});
exports.createPesanan = createPesanan;
const getPesananByUserId = (pemesan_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userPesananId = yield pesanan_model_1.default.findOne({
            user_id: user_id,
        });
        const userId = yield auth_model_1.default.findOne({ user_id: user_id });
        if (userId && userPesananId && userPesananId.user_id === pemesan_id) {
            return yield pesanan_model_1.default
                .find({ user_id: user_id })
                .then((data) => {
                return data;
            })
                .catch((error) => {
                console.log(error);
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
exports.getPesananByUserId = getPesananByUserId;
const getPesananAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield pesanan_model_1.default.findOneAndDelete({ pesanan_id: id });
    }
    catch (error) {
        throw error;
    }
});
exports.getPesananAndDelete = getPesananAndDelete;
//# sourceMappingURL=pesanan.service.js.map