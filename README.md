# Signup Form

A modern, multi-step signup form built with React.

## Features

- **3-Step Form**: Personal Information → Account Information → Review
- **Form Validations**:
  - Email format validation
  - Password minimum length (6 characters)
  - Password confirmation matching
- **Review Screen**: Displays all entered data before submission
- **Success Screen**: Shows confirmation message after successful submission
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Application

Start the development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

### Building for Production

Build the application:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## Project Structure

```
signup-form/
├── index.html
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── App.css
    └── index.css
```

## Technologies Used

- React 18
- Vite
- CSS3 (with responsive design)
