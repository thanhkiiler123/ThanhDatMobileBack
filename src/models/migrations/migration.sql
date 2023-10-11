-- CreateTable
CREATE TABLE `tblChiTietDonHang` (
    `PK_MaChiTietDonHang` INTEGER NOT NULL AUTO_INCREMENT,
    `FK_MaDonHang` INTEGER NOT NULL,
    `FK_MaDienThoai` INTEGER NOT NULL,
    `SoLuongMua` INTEGER NOT NULL,
    `DonGia` INTEGER NOT NULL,

    INDEX `FK_MaDienThoai`(`FK_MaDienThoai`),
    INDEX `FK_MaDonHang`(`FK_MaDonHang`),
    PRIMARY KEY (`PK_MaChiTietDonHang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblChiTietPhieuNhap` (
    `PK_MaChiTietPhieuNhap` INTEGER NOT NULL AUTO_INCREMENT,
    `GhiChu` TEXT NULL,
    `SoLuongNhap` INTEGER NOT NULL,
    `GiaNhap` INTEGER NOT NULL,
    `FK_MaPhieuNhap` INTEGER NOT NULL,
    `FK_MaDienThoai` INTEGER NOT NULL,

    INDEX `FK_MaDienThoai`(`FK_MaDienThoai`),
    INDEX `FK_MaPhieuNhap`(`FK_MaPhieuNhap`),
    PRIMARY KEY (`PK_MaChiTietPhieuNhap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblDanhGia` (
    `PK_MaDanhGia` INTEGER NOT NULL AUTO_INCREMENT,
    `NoiDungDanhGia` TEXT NOT NULL,
    `ThoiGianDanhGia` DATETIME(0) NOT NULL,
    `Sao` INTEGER NOT NULL DEFAULT 0,
    `Thich` INTEGER NOT NULL DEFAULT 0,
    `FK_MaDienThoai` INTEGER NOT NULL,
    `FK_MaNguoiDung` INTEGER NOT NULL,

    INDEX `FK_MaDienThoai`(`FK_MaDienThoai`),
    INDEX `FK_MaNguoiDung`(`FK_MaNguoiDung`),
    PRIMARY KEY (`PK_MaDanhGia`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblDienThoai` (
    `PK_MaDienThoai` INTEGER NOT NULL AUTO_INCREMENT,
    `TenDienThoai` VARCHAR(50) NOT NULL,
    `DoPhanGiai` VARCHAR(15) NOT NULL,
    `HinhAnh` VARCHAR(100) NOT NULL,
    `HeDieuHanh` VARCHAR(10) NOT NULL,
    `CamTruoc` VARCHAR(10) NOT NULL,
    `CamSau` VARCHAR(10) NOT NULL,
    `RAM` VARCHAR(10) NOT NULL,
    `ROM` VARCHAR(10) NOT NULL,
    `Pin` VARCHAR(10) NOT NULL,
    `SoLuong` INTEGER NOT NULL,
    `DonGia` INTEGER NOT NULL,
    `FK_MaHang` INTEGER NULL,

    INDEX `FK_MaHang`(`FK_MaHang`),
    PRIMARY KEY (`PK_MaDienThoai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblDonHang` (
    `PK_MaDonHang` INTEGER NOT NULL AUTO_INCREMENT,
    `TenNguoiNhan` VARCHAR(50) NOT NULL,
    `DiaChiGiaoHang` TEXT NOT NULL,
    `SoDienThoai` VARCHAR(10) NOT NULL,
    `GhiChu` TEXT NULL,
    `ThoiGianTaoDonHang` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `FK_MaNguoiDung` INTEGER NOT NULL,
    `FK_MaNhanVien` INTEGER NOT NULL,
    `FK_MaTrangThaiDonHang` INTEGER NOT NULL,
    `ThoiGianCapNhatTrangThai` DATETIME(0) NOT NULL,

    INDEX `FK_MaNguoiDung`(`FK_MaNguoiDung`),
    INDEX `FK_MaNhanVienXuLy`(`FK_MaNhanVien`),
    INDEX `FK_MaTrangThaiDonHang`(`FK_MaTrangThaiDonHang`),
    PRIMARY KEY (`PK_MaDonHang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblGioHang` (
    `PK_MaGioHang` INTEGER NOT NULL AUTO_INCREMENT,
    `HinhAnh` VARCHAR(100) NOT NULL,
    `TenDienThoai` VARCHAR(50) NOT NULL,
    `SoLuong` INTEGER NOT NULL,
    `DonGia` INTEGER NOT NULL,
    `TenDangNhap` VARCHAR(50) NOT NULL,
    `TrangThaiThanhToan` BOOLEAN NOT NULL,
    `FK_MaDienThoai` INTEGER NOT NULL,

    INDEX `FK_MaDienThoai`(`FK_MaDienThoai`),
    PRIMARY KEY (`PK_MaGioHang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblHang` (
    `PK_MaHang` INTEGER NOT NULL AUTO_INCREMENT,
    `TenHang` VARCHAR(50) NOT NULL,
    `MoTa` VARCHAR(50) NULL,

    PRIMARY KEY (`PK_MaHang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblKhuyenMai` (
    `PK_MaKhuyenMai` INTEGER NOT NULL AUTO_INCREMENT,
    `TenChuongTrinhKhuyenMai` VARCHAR(50) NOT NULL,
    `NgayBatDau` DATETIME(0) NOT NULL,
    `NgayKetThuc` DATETIME(0) NOT NULL,
    `PhanTramGiamGia` INTEGER NOT NULL,
    `Note` VARCHAR(50) NULL,
    `FK_MaDienThoai` INTEGER NULL,

    INDEX `FK_MaDienThoai`(`FK_MaDienThoai`),
    PRIMARY KEY (`PK_MaKhuyenMai`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblLichSuTrangThaiDonHang` (
    `PK_MaLichSu` INTEGER NOT NULL AUTO_INCREMENT,
    `FK_MaDonHang` INTEGER NOT NULL,
    `FK_MaTrangThaiDonHang` INTEGER NOT NULL,
    `ThoiGianCapNhat` DATETIME(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
    `TenNguoiCapNhat` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`PK_MaLichSu`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblNhaCungCap` (
    `PK_MaNhaCungCap` INTEGER NOT NULL AUTO_INCREMENT,
    `TenNhaCungCap` VARCHAR(50) NOT NULL,
    `DiaChi` VARCHAR(100) NOT NULL,
    `SoDienThoai` VARCHAR(10) NOT NULL,

    PRIMARY KEY (`PK_MaNhaCungCap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblPhanHoi` (
    `PK_MaPhanHoi` INTEGER NOT NULL AUTO_INCREMENT,
    `NoiDungPhanHoi` TEXT NOT NULL,
    `ThoiGianPhanHoi` DATETIME(0) NOT NULL,
    `Sao` INTEGER NOT NULL,
    `Thich` INTEGER NOT NULL,
    `FK_MaNguoiDung` INTEGER NULL,
    `FK_MaDanhGia` INTEGER NULL,

    INDEX `FK_MaDanhGia`(`FK_MaDanhGia`),
    INDEX `FK_MaNguoiDung`(`FK_MaNguoiDung`),
    PRIMARY KEY (`PK_MaPhanHoi`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblPhieuNhap` (
    `PK_MaPhieuNhap` INTEGER NOT NULL AUTO_INCREMENT,
    `NgayNhap` DATETIME(0) NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    `FK_MaNhaCungCap` INTEGER NOT NULL,
    `FK_MaNhanVien` INTEGER NOT NULL,

    INDEX `FK_MaNhaCungCap`(`FK_MaNhaCungCap`),
    INDEX `FK_MaNhanVien`(`FK_MaNhanVien`),
    PRIMARY KEY (`PK_MaPhieuNhap`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblTrangThaiDonHang` (
    `PK_MaTrangThaiDonHang` INTEGER NOT NULL AUTO_INCREMENT,
    `TenTrangThaiDonHang` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`PK_MaTrangThaiDonHang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblKhachHang` (
    `PK_MaKhachHang` INTEGER NOT NULL AUTO_INCREMENT,
    `TenKhachHang` VARCHAR(50) NOT NULL,
    `NgaySinh` DATE NULL,
    `DiaChi` VARCHAR(50) NULL,
    `SoDienThoai` VARCHAR(10) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `TenDangNhap` VARCHAR(20) NOT NULL,
    `MatKhau` VARCHAR(50) NOT NULL,
    `VerificationToken` VARCHAR(50) NULL,
    `IsVerified` BOOLEAN NULL DEFAULT false,
    `VerifiedDate` DATE NULL,
    `TinhTrangHoatDong` BOOLEAN NULL DEFAULT true,
    `PasswordToken` VARCHAR(50) NULL,
    `PasswordTokenExpiration` DATE NULL,

    PRIMARY KEY (`PK_MaKhachHang`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tblNhanVien` (
    `PK_MaNhanVien` INTEGER NOT NULL AUTO_INCREMENT,
    `TenNhanVien` VARCHAR(50) NOT NULL,
    `DiaChi` VARCHAR(100) NOT NULL,
    `SoDienThoai` VARCHAR(10) NOT NULL,
    `Email` VARCHAR(50) NOT NULL,
    `TenDangNhap` VARCHAR(50) NOT NULL,
    `MatKhau` VARCHAR(50) NOT NULL,
    `NgaySinh` DATE NOT NULL,
    `NgayVaoLam` DATE NOT NULL,
    `NgayKetThuc` DATE NULL,
    `LuongCoBan` FLOAT NULL,
    `PhuCap` FLOAT NULL,
    `Quyen` VARCHAR(20) NOT NULL DEFAULT 'NhanVien',

    PRIMARY KEY (`PK_MaNhanVien`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `tblChiTietDonHang` ADD CONSTRAINT `tblChiTietDonHang_ibfk_1` FOREIGN KEY (`FK_MaDonHang`) REFERENCES `tblDonHang`(`PK_MaDonHang`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tblChiTietDonHang` ADD CONSTRAINT `tblChiTietDonHang_ibfk_2` FOREIGN KEY (`FK_MaDienThoai`) REFERENCES `tblDienThoai`(`PK_MaDienThoai`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `tblPhieuNhap` ADD CONSTRAINT `FK_MaNhanVien` FOREIGN KEY (`FK_MaNhanVien`) REFERENCES `tblNhanVien`(`PK_MaNhanVien`) ON DELETE RESTRICT ON UPDATE RESTRICT;

