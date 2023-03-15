import { t } from "i18next"

export default class EmailVerificationTemplate {
  socialUrls = {
    facebook: "",
    instagram: ""
  }
  supportEmail = "support@rahanet.af"

  constructor(link, recipient, baseUrl) {
    this.baseUrl = baseUrl;
    this.link = link;
    this.recipient = recipient;
  }

  render() {
    return `
      <!DOCTYPE html>
<html xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="x-apple-disable-message-reformatting">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="format-detection" content="telephone=no, date=no, address=no, email=no">
  <!--[if mso]>
    <xml><o:officedocumentsettings><o:pixelsperinch>96</o:pixelsperinch></o:officedocumentsettings></xml>
  <![endif]-->
    <title>${t('verify-email', { ns: 'emails' })}</title>
              <link rel="stylesheet" media="screen" href="../public/fonts/kalameh/font.css">
    <style>
    * {
        direction: rtl !important;
        color: black;
    }
.hover-underline:hover {
  text-decoration: underline !important;
}
@media (max-width: 600px) {
  .sm-w-full {
    width: 100% !important;
  }
  .sm-px-24 {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
  .sm-py-32 {
    padding-top: 32px !important;
    padding-bottom: 32px !important;
  }
  .sm-leading-32 {
    line-height: 32px !important;
  }
}
</style>
</head>
<body style="margin: 0; width: 100%; padding: 0; word-break: break-word; -webkit-font-smoothing: antialiased; background-color: #b7d0cd;">
    <div style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; display: none;">${t('please-verify-email', { ns: 'emails' })}</div>
  <div role="article" aria-roledescription="email" aria-label="${t('verify-email', { ns: 'emails' })}" lang="en" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
    <table style="width: 100%; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;" cellpadding="0" cellspacing="0" role="presentation">
      <tr>
        <td align="center" style="mso-line-height-rule: exactly; background-color: #eceff1; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
          <table class="sm-w-full" style="width: 600px;" cellpadding="0" cellspacing="0" role="presentation">
            <tr>
  <td class="sm-py-32 sm-px-24" style="mso-line-height-rule: exactly; padding: 48px; text-align: center; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
    <a href="https://" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
      <img src="public/images/logo.png" width="155" alt="Rahanet ISP" style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0;">
    </a>
  </td>
</tr>
              <tr>
                <td align="center" class="sm-px-24" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly;">
                  <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                    <tr>
                      <td class="sm-px-24" style="mso-line-height-rule: exactly; border-radius: 4px; background-color: #ffffff; padding: 48px; text-align: right; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif; font-size: 16px; line-height: 24px; color: #626262;">
                        <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 0; font-size: 20px; font-weight: 600;">${t('hi', { ns: 'emails' })}</p>
                        <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-top: 0; font-size: 24px; font-weight: 700; color: rgb(68,68,68);">${this.recipient.fullName}</p>
                        <p class="sm-leading-32" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px; font-size: 24px; font-weight: 600; color: #263238;">
                          ${t("thanks-for", { key: t("emails:signing-up"), ns: 'emails' })}! 👋
                        </p>
                        <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                          ${t("join-message", { ns: 'emails' })}.
                        </p>
  
                        <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                          ${t("did-not-signup-message", { ns: 'emails' })}
                          <a href="mailto:${this.supportEmail}" class="hover-underline" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #00b8a5; text-decoration: none;">${this.supportEmail}</a>
                        </p>
                        <a href="${this.link}" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 24px; display: block; font-size: 14px; line-height: 100%; color: #00b8a5; text-decoration: none; word-break: break-all; text-wrap: wrap">${this.link}</a>
                        <table cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="mso-line-height-rule: exactly; mso-padding-alt: 16px 24px; border-radius: 4px; background-color: #00b8a5; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif;">
                              <a href="${this.link}" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; display: block; padding-left: 24px; padding-right: 24px; padding-top: 16px; padding-bottom: 16px; font-size: 16px; font-weight: 600; line-height: 100%; color: #ffffff; text-decoration: none;">${t("verify-now", { ns: 'emails' })}</a>
                            </td>
                          </tr>
                        </table>
                        
                        <table style="width: 100%;" cellpadding="0" cellspacing="0" role="presentation">
                          <tr>
                            <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; padding-top: 32px; padding-bottom: 32px;">
                              <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 24px;">
                                ${t("email-validation-note", { ns: 'emails', time: 10 })}.
                              </p>
                              <div style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 1px; background-color: #eceff1; line-height: 1px;">&zwnj;</div>
                            </td>
                          </tr>
                        </table>
                        <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">
                          ${t("not-sure-why-received-this", { email: this.supportEmail, ns: 'emails' })}
                        </p>
                        <p style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin: 0; margin-bottom: 16px;">${t("thanks", { ns: 'emails' })}, <br>${t("rahanet-support-team", { ns: 'emails' })}</p>
                      </td>
                    </tr>
                    <tr>
  <td style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; height: 20px;"></td>
</tr>
<tr>
  <td style="mso-line-height-rule: exactly; padding-left: 48px; padding-right: 48px; font-family: Kalameh, -apple-system, 'Segoe UI', sans-serif; font-size: 14px; color: #eceff1;">
    <p align="center" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; margin-bottom: 16px; cursor: default;">
      <a href="${this.socialUrls.facebook}" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238; text-decoration: none;"><img src="public/images/facebook.png" width="17" alt="Facebook" style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin-right: 12px;"></a>
      &bull;
      <a href="${this.socialUrls.instagram}" style="font-family: 'Kalameh', sans-serif; mso-line-height-rule: exactly; color: #263238; text-decoration: none;"><img src="public/images/instagram.png" width="17" alt="Instagram" style="max-width: 100%; vertical-align: middle; line-height: 100%; border: 0; margin-right: 12px;"></a>
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