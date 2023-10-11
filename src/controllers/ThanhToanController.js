const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const { redisGet, redisSet } = require('../utils/redisGetSet')
const CustomAPIError = require('../errors')
const { checkPermissions } = require('../utils')

const prisma = new PrismaClient()

let checkOut = async (req, res) => {
    let { TenNguoiNhan, DiaChi, SoDienThoai } = req.body
    if (!TenNguoiNhan || !DiaChi || !SoDienThoai) {
        return res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
    }
    let GioHang = await prisma.tblGioHang.findMany({
        where: {
            TenDangNhap: TenNguoiNhan,
        },
    })
    let DonHang = await prisma.tblDonHang.create({
        data: {
            TenNguoiNhan: TenNguoiNhan,
            DiaChiGiaoHang: DiaChi,
            SoDienThoai: SoDienThoai,
            TrangThai: 'Đã xác nhận',
        },
    })
    for (let i = 0; i < GioHang.length; i++) {
        await prisma.tblChiTietDonHang.create({
            data: {
                SoLuong: GioHang[i].SoLuong,
                DonGia: GioHang[i].DonGia,
                FK_MaDonHang: DonHang.PK_MaDonHang,
                FK_MaDienThoai: GioHang[i].FK_MaDienThoai,
            },
        })
    }
    // let products = await redisGet()
    // if (products.length == 0) {
    //     await redisSet()
    //     products = await redisGet()
    // }
    res.status(StatusCodes.OK).json({
        msg: 'Cảm ơn bạn đã mua hàng',
    })
}

module.exports = checkOut
