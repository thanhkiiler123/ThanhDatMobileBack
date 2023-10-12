const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')
const crypto = require('crypto')

const prisma = new PrismaClient()

const getNhanVien = async (req, res) => {
    const NhanVien = await prisma.tblNhanVien.findMany({})
    if (NhanVien.length === 0) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy nhân viên nào!' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy nhân viên nào!')
    }
    return res.status(StatusCodes.OK).json(NhanVien)
}

const addNhanVien = async (req, res) => {
    let {
        TenNhanVien,
        DiaChi,
        SoDienThoai,
        Email,
        TenDangNhap,
        MatKhau,
        NgaySinh,
        NgayVaoLam,
        LuongCoBan,
        PhuCap,
        Quyen,
    } = req.body
    if (
        !TenNhanVien ||
        !DiaChi ||
        !SoDienThoai ||
        !Email ||
        !TenDangNhap ||
        !MatKhau ||
        !NgaySinh ||
        !NgayVaoLam ||
        !LuongCoBan ||
        !PhuCap ||
        !Quyen
    ) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const NhanVien = await prisma.tblNhanVien.findFirst({
        where: {
            TenDangNhap: TenDangNhap,
        },
    })
    if (!NhanVien) {
        const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
        await prisma.tblNhanVien.create({
            data: {
                TenNhanVien: TenNhanVien,
                DiaChi: DiaChi,
                SoDienThoai: SoDienThoai,
                Email: Email,
                TenDangNhap: TenDangNhap,
                MatKhau: hashedPassword,
                NgaySinh: NgaySinh,
                NgayVaoLam: NgayVaoLam,
                LuongCoBan: LuongCoBan,
                PhuCap: PhuCap,
                Quyen: Quyen,
            },
        })
        res.status(StatusCodes.CREATED).json({ msg: 'Thêm nhân viên thành công' })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Đã có nhân viên này' })
        throw new CustomAPIError.BadRequestError('Đã có nhân viên này')
    }
}
const updateNhanVien = async (req, res) => {
    const PK_MaNhanVien = parseInt(req.params.PK_MaNhanVien)
    let {
        TenNhanVien,
        DiaChi,
        SoDienThoai,
        Email,
        TenDangNhap,
        MatKhau,
        NgaySinh,
        NgayVaoLam,
        LuongCoBan,
        PhuCap,
        Quyen,
    } = req.body
    if (
        !TenNhanVien ||
        !DiaChi ||
        !SoDienThoai ||
        !Email ||
        !TenDangNhap ||
        !MatKhau ||
        !NgaySinh ||
        !NgayVaoLam ||
        !LuongCoBan ||
        !PhuCap ||
        !Quyen
    ) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const NhanVien = await prisma.tblNhanVien.findFirst({
        where: {
            PK_MaNhanVien: PK_MaNhanVien,
        },
    })
    if (!NhanVien) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy nhân viên' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy nhân viên')
    } else {
        const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
        await prisma.tblNhanVien.update({
            data: {
                TenNhanVien: TenNhanVien,
                DiaChi: DiaChi,
                SoDienThoai: SoDienThoai,
                Email: Email,
                TenDangNhap: TenDangNhap,
                MatKhau: hashedPassword,
                NgaySinh: NgaySinh,
                NgayVaoLam: NgayVaoLam,
                LuongCoBan: LuongCoBan,
                PhuCap: PhuCap,
                Quyen: Quyen,
            },
            where: {
                PK_MaNhanVien: PK_MaNhanVien,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Sửa thông tin nhân viên thành công' })
    }
}

const deleteNhanVien = async (req, res) => {
    let PK_MaNhanVien = parseInt(req.params.PK_MaNhanVien)
    if (!PK_MaNhanVien) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const NhanVien = await prisma.tblNhanVien.findFirst({
        where: {
            PK_MaNhanVien: PK_MaNhanVien,
        },
    })
    if (!NhanVien) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy nhân viên' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy nhân viên')
    } else {
        await prisma.tblNhanVien.delete({
            where: {
                PK_MaNhanVien: PK_MaNhanVien,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Xóa nhân viên thành công' })
    }
}

module.exports = {
    addNhanVien,
    getNhanVien,
    updateNhanVien,
    deleteNhanVien,
}
