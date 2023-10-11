const { PrismaClient } = require('@prisma/client')
const { redisGet, redisSet } = require('../utils/redisGetSet')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const prisma = new PrismaClient()

const getGioHang = async (req, res) => {
    const TenDangNhap = req.params.TenDangNhap
    if (!TenDangNhap) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const GioHang = await prisma.tblGioHang.findMany({
        where: {
            TenDangNhap: TenDangNhap,
            TrangThaiThanhToan: false,
        },
    })
    res.status(StatusCodes.OK).json(GioHang)
}

let addGioHang = async (req, res) => {
    const TenDangNhap = req.params.TenDangNhap
    let { HinhAnh, TenDienThoai, SoLuong, DonGia, FK_MaDienThoai } = req.body
    if (!HinhAnh || !TenDienThoai || !SoLuong || !DonGia || !TenDangNhap || !FK_MaDienThoai) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblGioHang.create({
        data: {
            HinhAnh: HinhAnh,
            TenDienThoai: TenDienThoai,
            SoLuong: SoLuong,
            DonGia: DonGia,
            TenDangNhap: TenDangNhap,
            FK_MaDienThoai: FK_MaDienThoai,
            TrangThaiThanhToan: false,
        },
    })
    // let products = await redisGet()
    // if (products.length == 0) {
    //     await redisSet()
    //     products = await redisGet()
    // }
    res.status(StatusCodes.CREATED).json({
        msg: 'Thêm vào giỏ hàng thành công',
    })
}

let removeGioHang = async (req, res) => {
    const TenDangNhap = req.params.TenDangNhap
    let { PK_MaGioHang } = req.body
    if (!TenDangNhap || !PK_MaGioHang) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblGioHang.delete({
        where: {
            PK_MaGioHang: PK_MaGioHang,
            TenDangNhap: TenDangNhap,
        },
    })
    const GioHang = await prisma.tblGioHang.findMany({
        where: {
            TenDangNhap: TenDangNhap,
            TrangThaiThanhToan: false,
        },
    })
    res.status(StatusCodes.OK).json(GioHang)
}

module.exports = {
    getGioHang,
    addGioHang,
    removeGioHang,
}
