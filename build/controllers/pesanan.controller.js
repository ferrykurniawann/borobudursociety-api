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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePesanan = exports.getPesananByUser = exports.createPesananController = exports.getAllPesananController = void 0;
const pesanan_service_1 = require("../services/pesanan.service");
const uuid_1 = require("uuid");
const getAllPesananController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (id) {
            const usaha = yield (0, pesanan_service_1.getPesananById)(id);
            if (usaha) {
                return res.status(200).send({
                    status: true,
                    status_code: 200,
                    message: "Get detail data usaha successfully",
                    data: usaha,
                });
            }
            else {
                return res.status(404).send({
                    status: false,
                    status_code: 404,
                    message: "No usaha found",
                    data: {},
                });
            }
        }
        else {
            const usaha = yield (0, pesanan_service_1.getAllPesanan)();
            if (Array.isArray(usaha) && usaha.length > 0) {
                return res.status(200).send({
                    status: true,
                    status_code: 200,
                    message: "Get data usaha success",
                    data: usaha,
                });
            }
            else {
                return res.status(200).send({
                    status: true,
                    status_code: 200,
                    message: "No usaha found",
                    data: [],
                });
            }
        }
    }
    catch (error) {
        return res.status(500).send({
            status: false,
            status_code: 500,
            message: "Internal Server Error",
            data: {},
        });
    }
});
exports.getAllPesananController = getAllPesananController;
const createPesananController = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const pesanan_id = (0, uuid_1.v4)();
    const { user_id, usaha_id, no_telp, nama_usaha, jenis_usaha, alamat_usaha, foto_usaha, } = req.body;
    if (!user_id ||
        !usaha_id ||
        !no_telp ||
        !nama_usaha ||
        !jenis_usaha ||
        !alamat_usaha ||
        !foto_usaha) {
        return res.status(400).send({
            status: false,
            status_code: 400,
            message: "All fields are required",
        });
    }
    try {
        const pesananData = {
            pesanan_id,
            user_id,
            usaha_id,
            no_telp,
            nama_usaha,
            jenis_usaha,
            alamat_usaha,
            foto_usaha,
        };
        yield (0, pesanan_service_1.createPesanan)(pesananData);
        return res.status(200).json({
            status: true,
            status_code: 200,
            message: "Pesanan created successfully",
            data: pesananData,
        });
    }
    catch (error) {
        console.error("Error inserting Pesanan:", error);
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: error,
        });
    }
});
exports.createPesananController = createPesananController;
const getPesananByUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pemesan_id, user_id } = req.params;
    try {
        const usaha = yield (0, pesanan_service_1.getPesananByUserId)(pemesan_id, user_id);
        if (Array.isArray(usaha) && usaha.length > 0) {
            return res.status(200).send({
                status: true,
                status_code: 200,
                message: "Get data usaha by user id success",
                data: usaha,
            });
        }
        else {
            return res.status(200).send({
                status: true,
                status_code: 200,
                message: "No usaha posted",
                data: {},
            });
        }
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
});
exports.getPesananByUser = getPesananByUser;
const deletePesanan = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield (0, pesanan_service_1.getPesananAndDelete)(id);
        if (result) {
            res.status(200).json({
                status: true,
                status_code: 200,
                message: "Delete pesanan successfully",
            });
        }
        else {
            res.status(404).json({
                status: false,
                status_code: 404,
                message: "Data not found",
                data: {},
            });
        }
    }
    catch (error) {
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: error.message,
        });
    }
});
exports.deletePesanan = deletePesanan;
//# sourceMappingURL=pesanan.controller.js.map