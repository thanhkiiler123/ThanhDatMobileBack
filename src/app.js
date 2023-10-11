require('dotenv').config()
require('express-async-errors')

//express
const express = require('express')
const app = express()
//pakages khac
const cookieParser = require('cookie-parser')
const cors = require('cors')

//routers
const authRouter = require('./routes/authRoutes')
const DanhGiaRouter = require('./routes/DanhGiaRoutes')
const DienThoaiRouter = require('./routes/DienThoaiRoutes')
const DonHangRouter = require('./routes/DonHangRoutes')
const GioHangRouter = require('./routes/GioHangRoutes')
const KhachHangRouter = require('./routes/KhachHangRoutes')
const LienHeRouter = require('./routes/LienHeRoutes')
const NhanVienRouter = require('./routes/NhanVienRoutes')
const ThanhToanRouter = require('./routes/ThanhToanRoutes')

//middleware
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser(process.env.JWT_SECRET))

app.use('/api/v1/auth', authRouter)
app.use('/api/v1/danhgia', DanhGiaRouter)
app.use('/api/v1/dienthoai', DienThoaiRouter)
app.use('/api/v1/donhang', DonHangRouter)
app.use('/api/v1/giohang', GioHangRouter)
app.use('/api/v1/khachhang', KhachHangRouter)
app.use('/api/v1/lienhe', LienHeRouter)
app.use('/api/v1/nhanvien', NhanVienRouter)
app.use('/api/v1/thanhtoan', ThanhToanRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000

try {
    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`)
    })
} catch (error) {
    console.log(error)
}
