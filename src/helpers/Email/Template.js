function EmailBody(type, data) {
    if (type == 'active_account') {
        var template = `
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <style type="text/css">
        /* SPECIAL CLIENT STYLES */
        #outlook a {
            padding: 0;
        }

        /* Force Outlook to provide a "view in browser" message */
        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        /* Force HM to display emails at full width */
        .ExternalClass,
        .ExternalClass p,
        .ExternalClass span,
        .ExternalClass font,
        .ExternalClass td,
        .ExternalClass div {
            line-height: 100%;
        }

        /* Force HM to display normal line spacing */
        body,
        table,
        td,
        p,
        a,
        li,
        blockquote {
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        /* Prevent WebKit and Windows mobile changing default text sizes */
        table,
        td {
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        /* Remove spacing between tables in Outlook 2007 and up */
        img {
            -ms-interpolation-mode: bicubic;
        }

        /* Allow smoother rendering of resized image in Internet Explorer */
        /* RESET STYLES */
        body {
            margin: 0;
            padding: 0;
        }

        img {
            border: 0 none;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
        }

        a img {
            border: 0 none;
        }

        .imageFix {
            display: block;
        }

        table,
        td {
            border-collapse: collapse;
        }

        #bodyTable {
            height: 100% !important;
            margin: 0;
            padding: 0;
            width: 100% !important;
        }

        #footer a {
            color: #00a4bd;
            text-decoration: none;
        }

        /* Responsive Styles */
        @media only screen and (max-width: 480px) {
            .responsiveRow {
                width: 100% !important;
            }

            .responsiveColumn {
                display: block !important;
                width: 100% !important;
            }
        }
    </style>

    <!--[if mso]><style type="text/css">body, table, td {
        font-family: Helvetica Neue, Avenir Next, Arial, Helvetica, sans-serif !important;
        }</style><![endif]-->
</head>

<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0" bgcolor="#f5f8fa"
    style="-webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; margin: 0; padding: 0; font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; height: 100%; width: 100%; min-width: 100%;">
    <table id="outerWrapper" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" bgcolor="#f5f8fa"
        style="font-family: Helvetica Neue, Helvetica, Arial, sans-serif; font-size: 16px; color: #425b76; line-height: 1.5; width: 100%; min-width: 100%; background-color:#f5f8fa;">
        <tbody>
            <tr>
                <td align="center" valign="top">
                    <table border="0" cellpadding="20" cellspacing="0" width="600" style="width: 600px;"
                        class="emailContainer">
                        <tbody>
                            <tr>
                                <td align="center" valign="top" width="100%" style="width: 100%; min-width: 100%;">
                                    <table cellpadding="12" border="0" cellspacing="0" width="100%" bgcolor="#b9babb"
                                        style="width: 100%; min-width:100%;">
                                        <tbody>
                                            <tr>
                                                <td align="center" valign="middle" width="100%"
                                                    style="background: linear-gradient(to right, #e0e2e2 0%, #c6c6c7 100%); width: 100%; padding: 20px; min-width:100%; color: #ffffff">
                                                    <img src="https://postaltrack.com.br/img/logo.png"
                                                        alt="HubSpot" width="120" height="80"
                                                        style="width: 120px; height: 100px; vertical-align: middle; clear: both; width: auto; max-width: 100%;"><span
                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                        &nbsp;</span></td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <table id="backgroundTable" border="0" cellpadding="0" cellspacing="0" height="100%"
                                        width="100%" bgcolor="#ffffff" style="width: 100%; min-width: 100%;">
                                        <tbody>
                                            <tr>
                                                <td align="left" valign="top" style="font-size: 16px; padding: 0 50px">
                                                    <table cellpadding="0" border="0" cellspacing="0" width="100%"
                                                        style="color: #425b76; background-color: ; font-size: 20px; width: 100%; margin: initial; min-width: 100%; ">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center" valign="middle" style="padding: 0; ">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        width="100%"
                                                                        style="font-size: 0; height: 50px; width: 100%; min-width: 100%; line-height: 0;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td height="50"><span
                                                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                                                        &nbsp;</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <h1
                                                                        style="font-size: 24px; font-weight: 600; margin: 0; text-align: center;color:#ecc94b">
                                                                        Só falta mais 1 passo para você começar a user a
                                                                        PostalTrack</h1>
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        width="100%"
                                                                        style="font-size: 0; height: 30px; width: 100%; min-width: 100%; line-height: 0;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td height="30"><span
                                                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                                                        &nbsp;</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                    <hr
                                                                        style="height: 1px; color: #eaf0f6; background-color: #eaf0f6; border: none; margin: 0px; padding: 0px;">
                                                                    <table border="0" cellpadding="0" cellspacing="0"
                                                                        width="100%"
                                                                        style="font-size: 0; height: 30px; width: 100%; min-width: 100%; line-height: 0;">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td height="30"><span
                                                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                                                        &nbsp;</span></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>

                                                    <p style="margin: 0">Para ativar a sua conta e começar a utilizar
                                                        nosso sistema, confirme o seu email clicando no botão abaixo.
                                                    </p><br>

                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="font-size: 0; height: 50px; width: 100%; min-width: 100%; line-height: 0;">
                                                        <tbody>
                                                            <tr>
                                                                <td height="50"><span
                                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                                        &nbsp;</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                                                        <tbody>
                                                            <tr>
                                                                <td align="center">
                                                                    <table border="0" cellspacing="0" cellpadding="0">
                                                                        <tbody>
                                                                            <tr>
                                                                                <td align="center"
                                                                                    style="border-radius: 3px;"
                                                                                    bgcolor="#ecc94b" width="auto"><a
                                                                                        href="https://postaltrack.com.br/active_account?${data.active_key}"
                                                                                        target="_blank"
                                                                                        style="border: 1px solid #ecc94b; border-radius: 3px; color: #FFFFFF; display: inline-block; font-size: 14px; font-weight: 500; line-height: 1; padding: 12px 20px; text-decoration: none; width: auto; min-width: 170px; white-space: nowrap; ">Confirmar
                                                                                        Email</a></td>
                                                                            </tr>
                                                                        </tbody>
                                                                    </table>
                                                                </td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <div itemscope itemtype="http://schema.org/EmailMessage">
                                                        <div itemprop="potentialAction" itemscope
                                                            itemtype="http://schema.org/ViewAction">
                                                            <link itemprop="target"
                                                                href="https://app.hubspot.com/login?loginRedirectUrl=https%3A%2F%2Fapp.hubspot.com%2Fsignup%2Fcrm%3FloginPortalId%3D733590%26didShowPartnerPrivacy%3Dfalse%26utm_medium%3Demail%26preReferrer%3Dhttps%25253A%25252F%25252Fapp.hubspot.com%25252Flogin%25253FloginPortalId%25253D733590%252526utm_source%25253Dhs_email%252526utm_medium%25253Demail%252526utm_content%25253D25593492%26utm_source%3Dhs_email%26utm_content%3D25593492%26nov%3D1%26lang%3Den">
                                                            <meta itemprop="name" content="Log in">
                                                        </div>
                                                        <meta itemprop="description" content="Log in">
                                                    </div>
                                                    <div itemprop="publisher" itemscope
                                                        itemtype="http://schema.org/Organization">
                                                        <meta itemprop="name" content="HubSpot">
                                                        <link itemprop="url" content="https://www.hubspot.com">
                                                        <link itemprop="url/googlePlus"
                                                            content="https://plus.google.com/+hubspot/">
                                                    </div>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="font-size: 0; height: 50px; width: 100%; min-width: 100%; line-height: 0;">
                                                        <tbody>
                                                            <tr>
                                                                <td height="50"><span
                                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                                        &nbsp;</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                    <p style="font-size: 14px; margin: 0">Não se cadastrou em
                                                        postaltrack.com? <a href="https://help.postaltrack.com.br"
                                                            target="_blank"
                                                            style="text-decoration: none; color: #00a4bd;">Nos
                                                            informe.</a></p>
                                                    <table border="0" cellpadding="0" cellspacing="0" width="100%"
                                                        style="font-size: 0; height: 50px; width: 100%; min-width: 100%; line-height: 0;">
                                                        <tbody>
                                                            <tr>
                                                                <td height="50"><span
                                                                        style="-webkit-text-size-adjust:100%; -ms-text-size-adjust:100%; color: transparent; background: none; user-select: none; -moz-user-select: none; -ms-user-select:none; -webkit-user-select:none; text-overflow: ellipsis; opacity: 0; width:100%; min-width: 100%; height:1; overlfow:hidden; margin: -1px 0 0 0; padding:0; font-size: 0;">
                                                                        &nbsp;</span></td>
                                                            </tr>
                                                        </tbody>
                                                    </table>
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </tbody>
    </table>
</body>

</html>
        
        `
        return template
    }
}

module.exports = EmailBody