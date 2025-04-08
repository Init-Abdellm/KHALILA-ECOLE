# KHALILA-ECOLE - School Management System

Welcome to KHALILA-ECOLE, a comprehensive school management system designed to streamline educational administration and enhance the learning experience. Built with modern web technologies, this platform serves as a central hub for all school-related activities, connecting administrators, directors, teachers, and students in a seamless digital environment.

**Live Preview:** [https://khalilia.vercel.app/](https://khalilia.vercel.app/)

## Overview

KHALILA-ECOLE is built using React and TypeScript, providing a robust and maintainable codebase. The system is designed to handle all aspects of school management, from administrative tasks to academic tracking and communication.

## Key Features

### Administrative Features
- Complete user management system with role-based access control
- Comprehensive dashboard for school administrators
- Advanced reporting and analytics tools
- System-wide configuration and settings management
- Bulk data import/export capabilities

### Director Management
- Teacher performance tracking and evaluation
- Class and course management
- Resource allocation and scheduling
- Academic progress monitoring
- Department management and oversight

### Teacher Portal
- Course content management
- Student progress tracking
- Grade management and reporting
- Attendance tracking
- Assignment creation and management
- Parent-teacher communication tools

### Student Portal
- Course registration and management
- Grade viewing and progress tracking
- Schedule access
- Assignment submission
- Communication with teachers
- Resource access

### Communication Features
- Integrated notification system
- Internal messaging platform
- Announcement broadcasting
- Event calendar and scheduling
- Parent communication portal

## Technical Details

### Frontend Architecture
- React 18 for the user interface
- TypeScript for type safety and better development experience
- Vite as the build tool for fast development and optimized production builds
- Tailwind CSS for styling with a utility-first approach
- shadcn/ui components built on Radix UI for accessible and customizable UI elements

### State Management and Data Handling
- React Query for efficient server state management
- React Hook Form for form handling with Zod validation
- Appwrite integration for backend services
- Excel export capabilities using xlsx library

### Internationalization
- Multi-language support using i18next
- Automatic language detection
- RTL support for Arabic language

## Project Structure

The project follows a modular architecture with clear separation of concerns:

```
src/
├── components/     # Reusable UI components
│   ├── ui/        # Basic UI elements
│   ├── forms/     # Form-related components
│   └── layouts/   # Layout components
├── pages/         # Page components
│   ├── admin/     # Administrative interfaces
│   ├── director/  # Director management interfaces
│   ├── teacher/   # Teacher-specific pages
│   └── student/   # Student portal pages
├── lib/          # Core utilities and configurations
│   ├── api/      # API integration
│   ├── auth/     # Authentication logic
│   └── utils/    # Helper functions
├── hooks/        # Custom React hooks
├── i18n/         # Translation files
├── types/        # TypeScript definitions
├── integrations/ # Third-party service integrations
└── middleware/   # Route protection and guards
```

## Getting Started

### System Requirements
- Node.js version 16 or higher
- npm, yarn, or bun package manager
- Modern web browser (Chrome, Firefox, Safari, or Edge)
- Git for version control

### Installation Steps

1. First, clone the repository:
   ```bash
   git clone https://github.com/Init-Abdellm/KHALILA-ECOLE
   cd KHALILA-ECOLE
   ```

2. Install the project dependencies:
   ```bash
   npm install
   # or
   yarn install
   # or
   bun install
   ```

3. Set up your environment variables:
   Create a `.env` file in the root directory with:
   ```env
   VITE_APPWRITE_ENDPOINT=your_appwrite_endpoint
   VITE_APPWRITE_PROJECT_ID=your_project_id
   VITE_APPWRITE_DATABASE_ID=your_database_id
   VITE_APPWRITE_COLLECTION_ID=your_collection_id
   VITE_API_URL=your_api_url
   VITE_ENVIRONMENT=development
   ```

4. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   bun dev
   ```

### Development Workflow

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Description of your changes"
   ```

3. Push your changes and create a pull request:
   ```bash
   git push origin feature/your-feature-name
   ```

### Production Deployment

1. Build the project:
   ```bash
   npm run build
   # or
   yarn build
   # or
   bun run build
   ```

2. The built files will be in the `dist` directory, ready for deployment.

## Testing

The project includes several types of tests:
- Unit tests for individual components
- Integration tests for feature workflows
- End-to-end tests for critical user journeys

Run tests using:
```bash
npm run test
# or
yarn test
# or
bun test
```

## Documentation

Detailed documentation is available for:
- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Appwrite Documentation](https://appwrite.io/docs)

## Contributing

We welcome contributions to KHALILA-ECOLE! Here's how you can help:

1. Fork the repository
2. Create your feature branch
3. Make your changes
4. Write or update tests as needed
5. Ensure all tests pass
6. Submit a pull request

Please ensure your pull request:
- Includes a clear description of the changes
- References any related issues
- Follows the project's coding standards
- Includes appropriate tests

## Support

For support, please:
1. Check the documentation
2. Search existing issues
3. Create a new issue if needed

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Authors

- ZINEBI (UPSICAST) - Lead Developer

## Acknowledgments

We'd like to thank:
- The shadcn/ui team for their excellent component library
- Appwrite for providing robust backend services
- All contributors who have helped shape this project
- The open-source community for their invaluable tools and libraries 