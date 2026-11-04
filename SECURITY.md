# Security Policy

## Supported Versions

| Version | Supported          |
| ------- | ------------------ |
| 1.0.x   | :white_check_mark: |

## Reporting a Vulnerability

The Eye Care Optical project takes data privacy and administration security seriously.

If you discover a security vulnerability in the portal, authentication handlers, or database rules:

1. **Do not** create a public GitHub issue.
2. Email the maintainers directly at **security@eyecareoptical.com** or **info@eyecareoptical.com** with details and reproduction steps.
3. Include:
   - Type of issue (e.g. unauthorized route access, Firestore rule leakage, XSS).
   - Affected file(s) or route(s).
   - Step-by-step instructions or proof-of-concept payload.

We will acknowledge receipt within 48 hours and work on a fix promptly.

## Security Practices Followed

- **Client Secrets Protection:** Service account keys and private certificates are never stored in the client-side codebase.
- **Environment Isolation:** All Firebase keys and admin allowlists are managed through `.env` files and `.gitignore`.
- **Database & Storage Rules:** `firestore.rules` and `storage.rules` enforce granular permissions, ensuring only authenticated admins can create, modify, or delete catalog items and media assets.
- **Input Sanitization:** Product inputs, pricing, and image URLs are validated prior to storage.
