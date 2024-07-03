"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const pesananSchema = new mongoose_1.default.Schema({
    pesanan_id: {
        type: String,
        unique: true,
    },
    usaha_id: {
        type: String,
    },
    user_id: {
        type: String,
    },
    no_telp: {
        type: String,
    },
    nama_usaha: {
        type: String,
    },
    foto_usaha: {
        type: [String],
    },
    alamat_usaha: {
        type: String,
    },
    jenis_usaha: {
        type: String,
    },
}, { timestamps: true, _id: true });
const pesananModel = mongoose_1.default.model("pesanan", pesananSchema);
exports.default = pesananModel;
//# sourceMappingURL=pesanan.model.js.map