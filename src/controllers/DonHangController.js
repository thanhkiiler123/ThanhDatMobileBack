const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const prisma = new PrismaClient()

const getDonHang = async (req, res) => {
    let DonHang = await prisma.tblDonHang.findMany({})
    if (DonHang.length === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy dữ liệu' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy dữ liệu')
    } else {
        res.status(StatusCodes.OK).json(DonHang)
    }
}

const getChiTietDonHang = async (req, res) => {
    let PK_MaDonHang = parseInt(req.params.PK_MaDonHang)
    let ChiTietDonHang = await prisma.tblChiTietDonHang.findMany({
        where: {
            FK_MaDonHang: PK_MaDonHang,
        },
    })
    if (ChiTietDonHang.length === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy dữ liệu' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy dữ liệu')
    } else {
        res.status(StatusCodes.OK).json(ChiTietDonHang)
    }
}

const updateDonHang = async (req, res) => {
    let PK_MaDonHang = parseInt(req.params.PK_MaDonHang)
    let { TenNguoiNhan, DiaChiGiaoHang, SoDienThoai, GhiChu, TrangThai } = req.body
    if (!TenNguoiNhan || !DiaChiGiaoHang || !SoDienThoai || !GhiChu || !TrangThai) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let DonHang = await prisma.tblDonHang.findFirst({
        PK_MaDonHang: PK_MaDonHang,
    })
    if (!DonHang) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy đơn hàng' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy đơn hàng')
    } else {
        await prisma.tblDonHang.update({
            data: {
                TenNguoiNhan: TenNguoiNhan,
                DiaChiGiaoHang: DiaChiGiaoHang,
                SoDienThoai: SoDienThoai,
                GhiChu: GhiChu,
                TrangThai: TrangThai,
            },
            where: {
                PK_MaDonHang: PK_MaDonHang,
            },
        })
    }
    res.status(StatusCodes.OK).json({ msg: 'Cập nhật đơn hàng thành công' })
}

module.exports = { getDonHang, getChiTietDonHang, updateDonHang }
