
export default class ChangedPasswordTemplate {
    socialUrls = {
        facebook: "",
        instagram: ""
    }
    supportEmail = "supportheratcustoms.af"
    constructor(resetPasswordUrl, recipient, ipAddress, baseUrl) {
        this.baseUrl = baseUrl;
        this.resetPasswordUrl = resetPasswordUrl;
        this.recipient = recipient;
        this.ipAddress = ipAddress;
    }

    render() {
        return `
      <!DOCTYPE html>
      <html lang="en" dir="rtl" >
      <head>
          <meta charset="utf-8">
          <meta name="x-apple-disable-message-reformatting">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
          <!--[if mso]>
          <xml>
              <o:officedocumentsettings>
                  <o:pixelsperinch>96</o:pixelsperinch>
              </o:officedocumentsettings>
          </xml>
          <![endif]-->
          <title>بازیابی رمز عبور</title>
          <link rel="stylesheet" media="screen" href="../public/fonts/kalameh/font.css">
          <style>
              .hover-underline:hover {text-decoration: underline !important;}
              @media (max-width: 600px) {
                  .sm-w-full {width: 100% !important;}
                  .sm-px-24 {padding-left: 24px !important;padding-right: 24px !important;}
                  .sm-py-32 {padding-top: 32px !important;padding-bottom: 32px !important;}
              }
              .main-table td {
                text-align: right;
              }
          </style>
      </head>
      <body dir="rtl" style="direction: rtl; text-align: right; margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #eceff1;">
      <div style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; display: none;">
          .درخواستی برای بازنشانی رمز عبور از حساب گمرگ شما دریافت شد
      </div>
      <div role="article" aria-roledescription="email" aria-label="Reset your Password" lang="en"
           style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
          <table style="width: 100%; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0"
                 cellspacing="0" role="presentation">
              <tr>
                  <td align="center"
                      style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
                      <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                              <td class="sm-py-32 sm-px-24"
                                  style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
                                  <a href="${this.baseUrl}" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
                                      <img src="../public/images/logo.png" width="155" alt="رهانت"
                                           style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
                                  </a>
                              </td>
                          </tr>
                          <tr>
                              <td align="center" class="sm-px-24"
                                  style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
                                  <table style="width: 100%;" class="main-table" cellpadding="0" cellspacing="0" role="presentation">
                                      <tr>
                                          <td class="sm-px-24"
                                              style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: right; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">
                                                  سلام</p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-top: 0; font-size: 24px; font-weight: 700; color: #ff5850;">
                                              ${this.recipient.firstName} ${this.recipient.lastName}
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                                                  .درخواستی برای بازنشانی رمز عبور از حساب
                                                  <span style="font-weight: 600;">رهانت</span>
                                                  شما -
                                                  <a href="mailto:${this.recipient.email}" class="hover-underline" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #7367f0; text-decoration: none;">
                                                  ${this.recipient.email}
                                                  </a>
                                                  از
                                                  <span>${this.ipAddress}</span>
                                                  دریافت شد.
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                                                  ازین پیوند برای بازنشانی رمز عبور و ورود به حساب کاربری تان استفاده کنید.</p>
                                              <a href="${this.resetPasswordUrl}"
                                                 style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 24px; display: block; font-size: 16px; line-height: 100%; color: #7367f0; text-decoration: none;">${this.resetPasswordUrl}</a>
                                              <table cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                      <td style="mso-line-height-rule: exactly; mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #7367f0; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
                                                          <a id="reset-password-url-btn" href="${this.resetPasswordUrl}"
                                                             style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;"> بازنشانی رمزعبور&rarr;</a>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-top: 24px; margin-bottom: 24px;">
                                                  <span style="font-weight: 600;">توجه:</span> این لینک از زمانی که برای شما ارسال شده است به مدت 1 ساعت معتبر است و تنها یک بار می توانید رمز عبور خود را تغییر دهید.
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0;">
                                                  اگر شما این درخواست برای بازنشانی رمز عبور را نکرده اید نگران نباشید، و ازین درخواست صرف نظر کنید.
                                              </p>
                                              <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                                                  <tr>
                                                      <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                                                          <div style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">
                                                              &zwnj;
                                                          </div>
                                                      </td>
                                                  </tr>
                                              </table>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                                                  مطمئن نیستید که چرا این ایمیل را دریافت کرده اید؟
                                                  لطفا با ما در جریان بگذارید.
                                                  <a href="mailto:${this.supportEmail}" class="hover-underline"
                                                     style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #7367f0; text-decoration: none;">
                                                      ما در جریان</a>.
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                                                  با احترام, <br>تیم پشتیبانی رهانت</p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 20px;"></td>
                                      </tr>
                                      <tr>
                                          <td style="mso-line-height-rule: exactly; padding-left: 48px; padding-right: 48px; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; color: #eceff1;">
                                              <p align="center"
                                                 style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 16px; cursor: default;">
                                                  <a id="facebook-url" href=""
                                                     style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238; text-decoration: none;"><img
                                                          src="${this.socialUrls.facebook}" width="17" alt="فیسبوک"
                                                          style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin-right: 12px;"></a>
                                                  &bull;
                                                  <a id="instagram-url" href=""
                                                     style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238; text-decoration: none;"><img
                                                          src="${this.socialUrls.instagram}" width="17" alt="انستاگرام"
                                                          style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin-right: 12px;"></a>
                                              </p>
                                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238;">
                                                  استفاده از خدمات و وب سایت ما تابع شرایط استفاده و سیاست حفظ حریم خصوصی ما است.
                                              </p>
                                          </td>
                                      </tr>
                                      <tr>
                                          <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 16px;"></td>
                                      </tr>
                                  </table>
                              </td>
                          </tr>
                      </table>
                  </td>
              </tr>
          </table>
      </div>
      </body>
      </html>
    `
    }
}