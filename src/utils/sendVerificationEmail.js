const sendEmail = require('./sendEmail')

const sendVerificationEmail = async ({ TenDangNhap, Email, verificationToken, origin }) => {
    const message = `<p>Nhấn vào "Xác minh Email" để xác minh Email</p>
    <form method="post" action="${origin}/api/v1/auth/verifyEmail/">
        <input type="hidden" name="verificationToken" value="${verificationToken}">
        <input type="hidden" name="Email" value="${Email}">
        <button type="submit">Xác minh Email</button>
    </form>`

    return sendEmail({
        to: Email,
        subject: 'Xác nhận mật khẩu',
        html: `<h4> Xin chào, ${TenDangNhap}</h4>
    ${message}
    `,
    })
}

module.exports = sendVerificationEmail
