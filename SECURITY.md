# Security Policy

## Reporting Security Issues

RageTV takes the security of its platform and users seriously.

If you believe you have discovered a vulnerability or security issue, please do **NOT** open a public issue. Instead, report it privately via GitHub:

1. Navigate to the **Security** tab of this repository.
2. Click **Report a vulnerability** to submit a private report.
3. Our maintainers will review the submission promptly and keep you updated.

## Security Practices
- Strict Content Security Policy (CSP) blocking unauthorized script execution and unapproved iframe sources.
- No storage of sensitive user data, credentials, or cookies.
- Server-side validation of all external provider inputs with Zod schemas.
- Dependency auditing via automated supply-chain scanners and Dependabot.
