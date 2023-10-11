const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const CustomAPIError = require('../errors')

const prisma = new PrismaClient()

const createDienThoai = async (req, res) => {
    let {
        TenDienThoai,
        DoPhanGiai,
        ThuongHieu,
        HinhAnh,
        HeDieuHanh,
        CamTruoc,
        CamSau,
        RAM,
        ROM,
        Pin,
        SoLuong,
        DonGia,
    } = req.body
    if (
        !TenDienThoai ||
        !DoPhanGiai ||
        !ThuongHieu ||
        !HinhAnh ||
        !HeDieuHanh ||
        !CamTruoc ||
        !CamSau ||
        !RAM ||
        !ROM ||
        !Pin ||
        !SoLuong ||
        !DonGia
    ) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let DienThoai = await prisma.tblDienThoai.findFirst({
        where: {
            TenDienThoai: TenDienThoai,
        },
    })
    if (!DienThoai) {
        await prisma.tblDienThoai.create({
            data: {
                TenDienThoai: TenDienThoai,
                DoPhanGiai: DoPhanGiai,
                ThuongHieu: ThuongHieu,
                HinhAnh: HinhAnh,
                HeDieuHanh: HeDieuHanh,
                CamTruoc: CamTruoc,
                CamSau: CamSau,
                RAM: RAM,
                ROM: ROM,
                Pin: Pin,
                SoLuong: SoLuong,
                DonGia: DonGia,
            },
        })
        res.status(StatusCodes.CREATED).json({ msg: 'Thêm điện thoại thành công' })
    } else {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Điện thoại đã tồn tại' })
        throw new CustomAPIError.BadRequestError('Điện thoại đã tồn tại')
    }
}

const getAllDienThoai = async (req, res) => {
    let DienThoai = await prisma.tblDienThoai.findMany({})
    if (!DienThoai) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy điện thoại' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy điện thoại')
    }
    res.status(StatusCodes.OK).json(DienThoai)
}

const getSingleDienThoai = async (req, res) => {
    const PK_MaDienThoai = parseInt(req.params.PK_MaDienThoai)
    const DienThoai = await prisma.tblDienThoai.findFirst({
        where: {
            PK_MaDienThoai: PK_MaDienThoai,
        },
    })
    if (!DienThoai) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: `Không tìm thấy điện thoại với id: ${PK_MaDienThoai}` })
        throw new CustomAPIError.NotFoundError(`Không tìm thấy điện thoại với id: ${PK_MaDienThoai}`)
    }
    res.status(StatusCodes.OK).json(DienThoai)
}

const updateDienThoai = async (req, res) => {
    const PK_MaDienThoai = parseInt(req.params.PK_MaDienThoai)
    let {
        TenDienThoai,
        DoPhanGiai,
        ThuongHieu,
        HinhAnh,
        HeDieuHanh,
        CamTruoc,
        CamSau,
        RAM,
        ROM,
        Pin,
        SoLuong,
        DonGia,
    } = req.body
    SoLuong = parseInt(req.body.SoLuong)
    DonGia = parseInt(req.body.DonGia)
    if (
        !TenDienThoai ||
        !DoPhanGiai ||
        !ThuongHieu ||
        !HinhAnh ||
        !HeDieuHanh ||
        !CamTruoc ||
        !CamSau ||
        !RAM ||
        !ROM ||
        !Pin ||
        !SoLuong ||
        !DonGia
    ) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const DienThoai = await prisma.tblDienThoai.findUnique({
        where: {
            PK_MaDienThoai: PK_MaDienThoai,
        },
    })
    if (DienThoai) {
        await prisma.tblDienThoai.update({
            data: {
                TenDienThoai: TenDienThoai,
                DoPhanGiai: DoPhanGiai,
                ThuongHieu: ThuongHieu,
                HinhAnh: HinhAnh,
                HeDieuHanh: HeDieuHanh,
                CamTruoc: CamTruoc,
                CamSau: CamSau,
                RAM: RAM,
                ROM: ROM,
                Pin: Pin,
                SoLuong: SoLuong,
                DonGia: DonGia,
            },
            where: {
                PK_MaDienThoai: PK_MaDienThoai,
            },
        })
        res.status(StatusCodes.OK).json({ msg: 'Cập nhật điện thoại thành công' })
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy điện thoại' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy điện thoại')
    }
}

const deleteDienThoai = async (req, res) => {
    const PK_MaDienThoai = parseInt(req.params.PK_MaDienThoai)

    const DienThoai = await prisma.tblDienThoai.findUnique({
        where: {
            PK_MaDienThoai: PK_MaDienThoai,
        },
    })
    if (!DienThoai) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy điện thoại' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy điện thoại')
    }
    await prisma.tblDienThoai.delete({
        where: {
            PK_MaDienThoai: PK_MaDienThoai,
        },
    })
    res.status(StatusCodes.OK).json({ msg: 'Xóa điện thoại thành công' })
}

module.exports = {
    createDienThoai,
    getAllDienThoai,
    getSingleDienThoai,
    updateDienThoai,
    deleteDienThoai,
}
