# Contributing to Eye Care Optical

Thank you for your interest in contributing to the **Eye Care Optical** web project!

## Getting Started

### 1. Prerequisites
- **Node.js**: v18.x or v20.x or newer
- **npm**: v9.x or newer
- **Git**

### 2. Fork & Clone
```bash
# Clone the repository
git clone https://github.com/<your-username>/eye-care-optical.git
cd "eye-care-optical"
```

### 3. Setup Environment
```bash
# Copy sample environment configuration
cp .env.example .env

# Install project dependencies
npm install
```

### 4. Running Locally
```bash
# Start Vite development server
npm run dev
# The website will be available at http://localhost:3000
```

### 5. Running Build Verification
Before submitting a pull request, always ensure the production build succeeds without errors:
```bash
npm run build
```

## Pull Request Guidelines

1. **Branch Naming**:
   - `feature/your-feature-name`
   - `fix/issue-description`
   - `docs/documentation-update`
2. **Commit Messages**:
   - Write clear, concise commit messages (e.g., `feat: add progressive lens filter`, `fix: update WhatsApp phone link`).
3. **Keep Design Consistency**:
   - Maintain the primary color palette (`#0d3b66`, `#00a896`, `#e76f51`).
   - Use Bootstrap 5 grid and Lucide React icons.
4. **Bilingual Support**:
   - When adding new user-facing text, ensure entries exist for both English (`en`) and Marathi (`mr`) in `src/data/translations.js`.
