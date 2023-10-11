const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')

const prisma = new PrismaClient()

const getLienHe = async (req, res) => {
    const LienHe = await prisma.tblLienHe.findMany({})
    if (!LienHe) {
        throw new CustomAPIError.NotFoundError('Không tìm thấy liên hệ nào')
    }
    res.status(StatusCodes.OK).json(LienHe)
}

const addLienHe = async (req, res) => {
    const { TenNguoiGui, Email, SoDienThoai, TinNhan } = req.body
    if (!TenNguoiGui || !Email || !SoDienThoai || !TinNhan) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    await prisma.tblLienHe.create({
        data: {
            TenNguoiGui: TenNguoiGui,
            Email: Email,
            SoDienThoai: SoDienThoai,
            TinNhan: TinNhan,
        },
    })
    res.status(StatusCodes.CREATED).json({ msg: 'Thêm liên hệ thành công' })
}
const updateLienHe = async (req, res) => {
    const { TenNguoiGui, Email, SoDienThoai, TinNhan } = req.body
    const PK_MaLienHe = parseInt(req.params.PK_MaLienHe)
    if (!TenNguoiGui || !Email || !SoDienThoai || !TinNhan) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const LienHe = await prisma.tblLienHe.findFirst({
        where: {
            PK_MaLienHe: PK_MaLienHe,
        },
    })
    if (!LienHe) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy liên hệ' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy liên hệ')
    } else {
        await prisma.tblLienHe.update({
            data: {
                TenNguoiGui: TenNguoiGui,
                Email: Email,
                SoDienThoai: SoDienThoai,
                TinNhan: TinNhan,
            },
            where: {
                PK_MaLienHe: PK_MaLienHe,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Sửa liên hệ thành công' })
    }
}

const deleteLienHe = async (req, res) => {
    const PK_MaLienHe = parseInt(req.params.PK_MaLienHe)
    if (!PK_MaLienHe) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const LienHe = await prisma.tblLienHe.findFirst({
        where: {
            PK_MaLienHe: PK_MaLienHe,
        },
    })
    if (!LienHe) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy liên hệ' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy liên hệ')
    } else {
        await prisma.tblLienHe.delete({
            where: {
                PK_MaLienHe: PK_MaLienHe,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Xóa liên hệ thành công' })
    }
}
module.exports = {
    getLienHe,
    addLienHe,
    updateLienHe,
    deleteLienHe,
}
