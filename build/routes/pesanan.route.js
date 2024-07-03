"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pesananRouter = void 0;
const express_1 = require("express");
const pesanan_controller_1 = require("../controllers/pesanan.controller");
exports.pesananRouter = (0, express_1.Router)();
exports.pesananRouter.get("/", pesanan_controller_1.getAllPesananController);
exports.pesananRouter.get("/:id", pesanan_controller_1.getAllPesananController);
exports.pesananRouter.get("/:pemesan_id/:user_id", pesanan_controller_1.getPesananByUser);
exports.pesananRouter.post("/", pesanan_controller_1.createPesananController);
exports.pesananRouter.delete("/:id", pesanan_controller_1.deletePesanan);
//# sourceMappingURL=pesanan.route.js.map