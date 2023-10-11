const { PrismaClient } = require('@prisma/client')
const { StatusCodes } = require('http-status-codes')
const jwt = require('jsonwebtoken')
const CustomAPIError = require('../errors')
const crypto = require('crypto')
const { sendVerificationEmail, sendResetPasswordEmail } = require('../utils')
const path = require('path')
const prisma = new PrismaClient()

const register = async (req, res) => {
    let { TenKhachHang, DiaChi, SoDienThoai, Email, TenDangNhap, MatKhau } = req.body
    if (!TenKhachHang || !DiaChi || !SoDienThoai || !Email || !TenDangNhap || !MatKhau) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    let KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            OR: [{ Email: Email }, { TenDangNhap: TenDangNhap }],
        },
    })
    if (KhachHang) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Tài khoản đã tồn tại' })
        throw new CustomAPIError.BadRequestError('Tài khoản đã tồn tại')
    }
    const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
    const verificationToken = crypto.randomBytes(40).toString('hex')
    await prisma.tblKhachHang.create({
        data: {
            TenKhachHang: TenKhachHang,
            DiaChi: DiaChi,
            SoDienThoai: SoDienThoai,
            Email: Email,
            TenDangNhap: TenDangNhap,
            MatKhau: hashedPassword,
            VerificationToken: verificationToken,
        },
    })
    const origin = 'http://localhost:3000'

    await sendVerificationEmail({
        TenDangNhap: TenDangNhap,
        Email: Email,
        verificationToken: verificationToken,
        origin,
    })
    return res.status(StatusCodes.CREATED).json({ msg: 'Đăng ký thành công, hãy kiểm tra email của bạn' })
}

const verifyEmail = async (req, res) => {
    const { verificationToken, Email } = req.body
    if (!verificationToken || !Email) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            Email: Email,
        },
    })
    if (KhachHang.length === 0) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.UnauthenticatedError('Không tìm thấy người dùng')
    }
    if (KhachHang.VerificationToken !== verificationToken) {
        res.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.UnauthenticatedError('Không đúng token')
    }
    await prisma.tblKhachHang.update({
        data: {
            IsVerified: true,
            VerificationToken: '',
            VerifiedDate: new Date(),
        },
        where: {
            PK_MaKhachHang: KhachHang.PK_MaKhachHang,
            Email: KhachHang.Email,
        },
    })
    return res.status(StatusCodes.OK).sendFile(path.join(__dirname, '../public/VerifySuccess.html'))
}

const login = async (req, res) => {
    try {
        const { TenDangNhap, MatKhau } = req.body
        if (!TenDangNhap || !MatKhau) {
            res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
            throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
        }
        let KhachHang = await prisma.tblKhachHang.findFirst({
            where: {
                TenDangNhap: TenDangNhap,
            },
        })
        if (!KhachHang) {
            let NhanVien = await prisma.tblNhanVien.findFirst({
                where: {
                    TenDangNhap: TenDangNhap,
                },
            })
            if (!NhanVien) {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Tài khoản hoặc mật khẩu sai' })
                throw new CustomAPIError.UnauthenticatedError('Tài khoản hoặc mật khẩu sai')
            }
            const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
            if (NhanVien.MatKhau !== hashedPassword) {
                res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Sai mật khẩu' })
                throw new CustomAPIError.UnauthenticatedError('Sai mật khẩu!')
            }
            const token = jwt.sign(
                {
                    PK_MaNhanVien: NhanVien.PK_MaNhanVien,
                    TenDangNhap: NhanVien.TenDangNhap,
                },
                process.env.JWT_SECRET,
                { expiresIn: '15m' }
            )
            return res.status(StatusCodes.OK).json({
                token: token,
                username: TenDangNhap,
                role: NhanVien.Quyen,
                message: 'Đăng nhập thành công',
            })
        }
        const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
        if (KhachHang.MatKhau !== hashedPassword) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Sai mật khẩu' })
            throw new CustomAPIError.UnauthenticatedError('Sai mật khẩu!')
        }
        if (!KhachHang.IsVerified) {
            res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Chưa xác nhận email' })
            throw new CustomAPIError.UnauthenticatedError('Chưa xác nhận email')
        }
        const token = jwt.sign(
            {
                PK_MaKhachHang: KhachHang.PK_MaKhachHang,
                TenDangNhap: KhachHang.TenDangNhap,
            },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        )
        return res.status(StatusCodes.OK).json({
            token: token,
            username: TenDangNhap,
            role: 'KhachHang',
            message: 'Đăng nhập thành công',
        })
    } catch (error) {
        console.log(error)
    }
}

const forgotPassword = async (req, res) => {
    const { Email } = req.body
    if (!Email) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Hãy cung cấp email')
    }
    const KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            Email: Email,
        },
    })
    if (!KhachHang) {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy email' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy Email')
    } else {
        await sendResetPasswordEmail({
            TenDangNhap: KhachHang.TenDangNhap,
            Email: KhachHang.Email,
        })
    }
    return res.status(StatusCodes.OK).json({ msg: 'Kiểm tra email của bạn' })
}

const resetPassword = async (req, res) => {
    const { Email, MatKhau } = req.body
    if (!Email || !MatKhau) {
        res.status(StatusCodes.BAD_REQUEST).json({ msg: 'Không đủ dữ liệu' })
        throw new CustomAPIError.BadRequestError('Không đủ dữ liệu')
    }
    const KhachHang = await prisma.tblKhachHang.findFirst({
        where: {
            Email: Email,
        },
    })
    const hashedPassword = crypto.createHash('sha256').update(MatKhau).digest('hex')
    if (KhachHang) {
        await prisma.tblKhachHang.update({
            data: {
                MatKhau: hashedPassword,
            },
            where: {
                PK_MaKhachHang: KhachHang.PK_MaKhachHang,
                Email: Email,
            },
        })
        return res.status(StatusCodes.OK).json({ msg: 'Đổi mật khẩu thành công' })
    } else {
        res.status(StatusCodes.NOT_FOUND).json({ msg: 'Không tìm thấy người dùng' })
        throw new CustomAPIError.NotFoundError('Không tìm thấy người dùng')
    }
}

module.exports = {
    register,
    verifyEmail,
    login,
    forgotPassword,
    resetPassword,
}
