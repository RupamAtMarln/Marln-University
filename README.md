# Marln University Management System

A modern web-based university management system built with React, providing a comprehensive platform for managing academic activities, courses, and student information.

## Features

- **Student Dashboard**
  - Course overview and progress tracking
  - Class schedules and upcoming events
  - Quick access to course materials
  - Assignment submission and tracking

- **Instructor Dashboard**
  - Course management
  - Assignment creation and grading
  - Student progress monitoring
  - Resource management

- **Course Management**
  - Interactive course content
  - PDF materials and video lectures
  - Progress tracking
  - Real-time updates

## Tech Stack

- React.js
- Tailwind CSS
- Lucide Icons
- AWS S3 (for file storage)

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/RupamAtMarln/Marln-University.git
   ```

2. Navigate to the project directory:
   ```bash
   cd Marln-University
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:3000`

## Project Structure

```
marln-university-site/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── student/   # Student-specific pages
│   │   └── instructor/# Instructor-specific pages
│   ├── assets/        # Static assets
│   └── utils/         # Utility functions
├── public/            # Public assets
└── package.json       # Project dependencies
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## Security

This project uses secure practices for handling sensitive data:
- Environment variables for configuration
- Secure file storage with AWS S3
- Protected routes for authenticated users

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Rupam At Marln - [@RupamAtMarln](https://github.com/RupamAtMarln)

Project Link: [https://github.com/RupamAtMarln/Marln-University](https://github.com/RupamAtMarln/Marln-University)
