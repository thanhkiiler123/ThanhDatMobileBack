const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')

const prisma = new PrismaClient()

const createDanhGia = async (req, res) => {
    const { TenKhachHang, NoiDungDanhGia, FK_MaDienThoai } = req.body
    if (!TenKhachHang || !NoiDungDanhGia || !FK_MaDienThoai) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }

    const DanhGia = await prisma.tblDanhGia.findFirst({
        where: {
            TenKhachHang: TenKhachHang,
            FK_MaDienThoai: FK_MaDienThoai,
        },
    })

    if (DanhGia) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Đã viết đánh giá cho điện thoại này' })
        throw new CustomAPIError.BadRequestError('Đã viết đánh giá cho điện thoại này')
    } else {
        await prisma.tblDanhGia.create({
            data: {
                TenKhachHang: TenKhachHang,
                NoiDungDanhGia: NoiDungDanhGia,
                FK_MaDienThoai: FK_MaDienThoai,
            },
        })
        res.status(StatusCodes.CREATED).json({ msg: 'Thêm đánh giá thành công' })
    }
}

const getAllDanhGia = async (req, res) => {
    const FK_MaDienThoai = parseInt(req.params.FK_MaDienThoai)
    if (!FK_MaDienThoai) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không có mã điện thoại' })
        throw new CustomAPIError.BadRequestError('Không có mã điện thoại')
    }
    const DanhGia = await prisma.tblDanhGia.findMany({
        where: {
            FK_MaDienThoai: FK_MaDienThoai,
        },
    })
    if (!DanhGia) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy đánh giá nào' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy đánh giá nào')
    } else {
        res.status(StatusCodes.OK).json(DanhGia)
    }
}

const updateDanhGia = async (req, res) => {
    const PK_MaDanhGia = parseInt(req.params.PK_MaDanhGia)
    const { TenKhachHang, NoiDungDanhGia } = req.body
    if (!TenKhachHang || !NoiDungDanhGia) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const DanhGia = await prisma.tblDanhGia.findFirst({
        PK_MaDanhGia: PK_MaDanhGia,
    })
    if (!DanhGia) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy đánh giá' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy đánh giá')
    } else {
        await prisma.tblDanhGia.update({
            data: {
                TenKhachHang: TenKhachHang,
                NoiDungDanhGia: NoiDungDanhGia,
            },
            where: {
                PK_MaDanhGia: PK_MaDanhGia,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Cập nhật đánh giá thành công' })
    }
}

const deleteDanhGia = async (req, res) => {
    const PK_MaDanhGia = parseInt(req.params.PK_MaDanhGia)
    if (!PK_MaDanhGia) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const DanhGia = await prisma.tblDanhGia.findFirst({
        PK_MaDanhGia: PK_MaDanhGia,
    })
    if (!DanhGia) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy đánh giá' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy đánh giá')
    } else {
        await prisma.tblDanhGia.delete({
            where: {
                PK_MaDanhGia: PK_MaDanhGia,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Xóa đánh giá thành công' })
    }
}

module.exports = {
    createDanhGia,
    getAllDanhGia,
    updateDanhGia,
    deleteDanhGia,
}
