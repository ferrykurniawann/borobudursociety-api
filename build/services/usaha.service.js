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
exports.getUsahaByPengusahaId = exports.getUsahaByJenisUsaha = exports.getUsahaFoto = exports.getusahaAndDelete = exports.insertUsaha = exports.getUsahaAndUpdate = exports.getUsahaById = exports.getAllUsaha = void 0;
const usaha_model_1 = __importDefault(require("../models/usaha.model"));
const auth_model_1 = __importDefault(require("../models/auth.model"));
const getAllUsaha = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield usaha_model_1.default
        .find()
        .then((data) => {
        return data;
    })
        .catch((error) => {
        console.log(error);
    });
});
exports.getAllUsaha = getAllUsaha;
const getUsahaById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usaha_model_1.default.findOne({ usaha_id: id });
});
exports.getUsahaById = getUsahaById;
const getUsahaAndUpdate = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usaha_model_1.default.findOneAndUpdate({
        usaha_id: id,
    }, {
        $set: payload,
    });
});
exports.getUsahaAndUpdate = getUsahaAndUpdate;
const insertUsaha = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield usaha_model_1.default.create(payload);
});
exports.insertUsaha = insertUsaha;
const getusahaAndDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield usaha_model_1.default.findOneAndDelete({ usaha_id: id });
    }
    catch (error) {
        throw error;
    }
});
exports.getusahaAndDelete = getusahaAndDelete;
const getUsahaFoto = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const usaha = yield usaha_model_1.default.findOne({ id });
    const usahaFoto = usaha === null || usaha === void 0 ? void 0 : usaha.foto_usaha;
    return usahaFoto;
});
exports.getUsahaFoto = getUsahaFoto;
const getUsahaByJenisUsaha = (jenis_usaha) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield usaha_model_1.default.find({
            jenis_usaha: jenis_usaha,
        });
        return result;
    }
    catch (error) {
        console.error("Database Query Error: ", error); // Log error
        throw error;
    }
});
exports.getUsahaByJenisUsaha = getUsahaByJenisUsaha;
const getUsahaByPengusahaId = (pengusaha_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userVideId = yield usaha_model_1.default.findOne({
            pengusaha_id: pengusaha_id,
        });
        const userId = yield auth_model_1.default.findOne({ user_id: user_id });
        if (userId && userVideId && userVideId.pengusaha_id === pengusaha_id) {
            return yield usaha_model_1.default
                .find({ pengusaha_id: pengusaha_id })
                .then((data) => {
                return data;
            })
                .catch((error) => {
                console.log(error);
            });
        }
        else {
            return yield usaha_model_1.default
                .find({ pengusaha_id: pengusaha_id })
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
exports.getUsahaByPengusahaId = getUsahaByPengusahaId;
//# sourceMappingURL=usaha.service.js.map