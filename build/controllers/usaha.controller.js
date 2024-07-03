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
exports.deleteUsaha = exports.updateUsaha = exports.createUsaha = exports.getJenisUsaha = exports.getUsahaByPengusaha = exports.getUsaha = void 0;
const usaha_service_1 = require("../services/usaha.service");
const uuid_1 = require("uuid");
const getUsaha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        if (id) {
            const usaha = yield (0, usaha_service_1.getUsahaById)(id);
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
            const usaha = yield (0, usaha_service_1.getAllUsaha)();
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
exports.getUsaha = getUsaha;
const getUsahaByPengusaha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pengusaha_id, user_id } = req.params;
    try {
        const usaha = yield (0, usaha_service_1.getUsahaByPengusahaId)(pengusaha_id, user_id);
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
exports.getUsahaByPengusaha = getUsahaByPengusaha;
const getJenisUsaha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { jenis_usaha } = req.body;
    try {
        const usaha = yield (0, usaha_service_1.getUsahaByJenisUsaha)(jenis_usaha);
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
    catch (error) {
        return res.status(500).send({
            status: false,
            status_code: 500,
            message: "Internal Server Error",
            data: {},
        });
    }
});
exports.getJenisUsaha = getJenisUsaha;
const createUsaha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const usaha_id = (0, uuid_1.v4)();
    const { pengusaha_id, nama_usaha, deskripsi_usaha, jenis_usaha, alamat_usaha, foto_usaha, harga, fasilitas, } = req.body;
    if (!pengusaha_id ||
        !nama_usaha ||
        !deskripsi_usaha ||
        !jenis_usaha ||
        !alamat_usaha ||
        !foto_usaha ||
        !fasilitas ||
        !harga) {
        return res.status(400).send({
            status: false,
            status_code: 400,
            message: "All fields are required",
        });
    }
    try {
        const usahaData = {
            usaha_id,
            pengusaha_id,
            nama_usaha,
            deskripsi_usaha,
            jenis_usaha,
            alamat_usaha,
            foto_usaha,
            harga,
            fasilitas,
        };
        yield (0, usaha_service_1.insertUsaha)(usahaData);
        return res.status(200).json({
            status: true,
            status_code: 200,
            message: "Usaha created successfully",
            data: usahaData,
        });
    }
    catch (error) {
        console.error("Error inserting usaha:", error);
        return res.status(422).send({
            status: false,
            status_code: 422,
            message: error,
        });
    }
});
exports.createUsaha = createUsaha;
const updateUsaha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const { pengusaha_id, nama_usaha, deskripsi_usaha, jenis_usaha, alamat_usaha, foto_usaha, harga, fasilitas, } = req.body;
    if (!pengusaha_id ||
        !nama_usaha ||
        !deskripsi_usaha ||
        !jenis_usaha ||
        !alamat_usaha ||
        !fasilitas ||
        !harga) {
        return res.status(400).send({
            status: false,
            status_code: 400,
            message: "All fields are required",
        });
    }
    try {
        const fotoPrevious = foto_usaha || (yield (0, usaha_service_1.getUsahaFoto)(id));
        const usahaData = {
            pengusaha_id,
            nama_usaha,
            deskripsi_usaha,
            jenis_usaha,
            alamat_usaha,
            foto_usaha: fotoPrevious,
            harga,
            fasilitas,
        };
        const updatedUsaha = yield (0, usaha_service_1.getUsahaAndUpdate)(id, usahaData);
        if (updatedUsaha) {
            return res.status(200).send({
                status: true,
                status_code: 200,
                message: "Usaha updated successfully",
                data: updatedUsaha,
            });
        }
        else {
            return res.status(404).json({
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
            message: error.message || "An error occurred",
            data: {},
        });
    }
});
exports.updateUsaha = updateUsaha;
const deleteUsaha = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const result = yield (0, usaha_service_1.getusahaAndDelete)(id);
        if (result) {
            res.status(200).json({
                status: true,
                status_code: 200,
                message: "Delete usaha successfully",
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
exports.deleteUsaha = deleteUsaha;
//# sourceMappingURL=usaha.controller.js.map