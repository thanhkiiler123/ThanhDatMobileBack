const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const crypto = require('crypto')

const prisma = new PrismaClient()

const getKhachHang = async (req, res) => {
    const KhachHang = await prisma.tblKhachHang.findMany({})
    if (!KhachHang) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy khách hàng nào!' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy khách hàng nào!')
    }
    return res.status(StatusCodes.OK).json(KhachHang)
}

const addKhachHang = async (req, res) => {
    let { TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau, IsVerified, TinhTrangHoatDong } = req.body
    if (!TenKhachHang || !DiaChi || !SoDienThoai || !Email || !TenDangNhap || !MatKhau) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let checkKhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            TenDangNhap: TenDangNhap,
        },
    })
    if (!checkKhachHang) {
        const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
        IsVerified = !!IsVerified
        TinhTrangHoatDong = !!TinhTrangHoatDong
        await prisma.tblKhachHang.create({
            data: {
                TenKhachHang: TenKhachHang,
                DiaChi: DiaChi,
                SoDienThoai: SoDienThoai,
                Email: Email,
                TenDangNhap: TenDangNhap,
                MatKhau: hashedPassword,
                IsVerified: IsVerified,
                TinhTrangHoatDong: TinhTrangHoatDong,
            },
        })
        res.status(StatusCodes.CREATED).json({ msg: 'Thêm khách hàng thành công' })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Khách hàng đã tồn tại' })
        throw new CustomAPIError.BadRequestError('Khách hàng đã tồn tại')
    }
}

const updateKhachHang = async (req, res) => {
    let { TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau, IsVerified, TinhTrangHoatDong } = req.body
    const PK_MaKhachHang = parseInt(req.params.PK_MaKhachHang)
    if (!TenKhachHang || !DiaChi || !SoDienThoai || !Email || !TenDangNhap || !MatKhau) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let checkKhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            TenDangNhap: TenDangNhap,
        },
    })
    if (checkKhachHang) {
        const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
        IsVerified = !!IsVerified
        TinhTrangHoatDong = !!TinhTrangHoatDong
        await prisma.tblKhachHang.update({
            data: {
                TenKhachHang: TenKhachHang,
                DiaChi: DiaChi,
                SoDienThoai: SoDienThoai,
                Email: Email,
                TenDangNhap: TenDangNhap,
                MatKhau: hashedPassword,
                IsVerified: IsVerified,
                TinhTrangHoatDong: TinhTrangHoatDong,
            },
            where: {
                PK_MaKhachHang: PK_MaKhachHang,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Chỉnh sửa khách hàng thành công' })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Khách hàng không tồn tại' })
        throw new CustomAPIError.BadRequestError('Khách hàng không tồn tại')
    }
}

const deleteKhachHang = async (req, res) => {
    let PK_MaKhachHang = parseInt(req.params.PK_MaKhachHang)
    if (!PK_MaKhachHang) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblKhachHang.delete({
        where: {
            PK_MaKhachHang: PK_MaKhachHang,
        },
    })
    res.status(StatusCodes.OK).json({ msg: 'Xóa khách hàng thành công' })
}

module.exports = {
    addKhachHang,
    getKhachHang,
    updateKhachHang,
    deleteKhachHang,
}
