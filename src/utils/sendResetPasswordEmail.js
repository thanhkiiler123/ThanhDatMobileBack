const sendEmail = require('./sendEmail')

const sendResetPasswordEmail = async ({ TenDangNhap, Email }) => {
    const message = `
    <p>Nhấn vào "Đặt lại mật khẩu" để đặt lại mật khẩu</p>
    <a href="http://localhost:8080/dat-lai-mat-khau">Đặt lại mật khẩu</a>`

    return sendEmail({
        to: Email,
        subject: 'Đặt lại mật khẩu',
        html: `<h4> Xin chào, ${TenDangNhap}</h4>
    ${message}
    `,
    })
}

module.exports = sendResetPasswordEmail
