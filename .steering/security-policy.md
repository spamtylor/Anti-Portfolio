# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.x.x   | :white_check_mark: |
| < 1.0   | :x:                |

## Reporting a Vulnerability

### How to Report

**DO NOT** create a public GitHub issue for security vulnerabilities.

Instead:
1. **Email**: [security@yourproject.com]
2. **Subject**: `[SECURITY] Brief description`
3. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

### What to Expect

- **Acknowledgment**: Within 48 hours
- **Initial Assessment**: Within 7 days
- **Update**: Every 7 days until resolved
- **Resolution**: Depends on severity

### Disclosure Policy

- **Private disclosure** until fix is available
- **Coordinated disclosure** with security researcher
- **Public disclosure** after fix is released
- **Credit** given to reporter (if desired)

## Security Best Practices

### For Developers

- ✅ **Never commit secrets** - Use environment variables
- ✅ **Validate all inputs** - Never trust user input
- ✅ **Use parameterized queries** - Prevent SQL injection
- ✅ **Keep dependencies updated** - Regular security audits
- ✅ **Follow principle of least privilege** - Minimal permissions
- ✅ **Encrypt sensitive data** - At rest and in transit
- ✅ **Use secure defaults** - Secure by default
- ✅ **Log security events** - Audit trail

### For Users

- ✅ **Keep software updated** - Install latest versions
- ✅ **Use strong passwords** - If applicable
- ✅ **Enable 2FA** - If available
- ✅ **Report suspicious activity** - Immediately

## Security Checklist

### Pre-Release

- [ ] Security audit completed
- [ ] Dependencies scanned for vulnerabilities
- [ ] Secrets not in codebase
- [ ] Input validation implemented
- [ ] Authentication/authorization tested
- [ ] Encryption configured
- [ ] Security headers set
- [ ] Rate limiting implemented
- [ ] Error messages don't leak information
- [ ] Logging doesn't expose sensitive data

### Ongoing

- [ ] Regular dependency updates
- [ ] Security monitoring active
- [ ] Incident response plan ready
- [ ] Security documentation current

## Known Vulnerabilities

### Currently None

This section will list any known vulnerabilities and their status.

## Security Updates

Security updates are released as:
- **Critical**: Immediate patch release
- **High**: Patch release within 7 days
- **Medium**: Next minor release
- **Low**: Next minor or major release

## Responsible Disclosure

We appreciate responsible disclosure. Security researchers who follow these guidelines will be:
- ✅ Acknowledged (if desired)
- ✅ Given credit in security advisories
- ✅ Not subject to legal action

## Contact

- **Security Email**: [security@yourproject.com]
- **PGP Key**: [If applicable]
- **Security Policy**: [Link to this file]

## Resources

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [CWE Top 25](https://cwe.mitre.org/top25/)
- [Security Best Practices](./.steering/security-best-practices.md)

