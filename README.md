src/
├── app/
│   ├── dashboard/
│   │   ├── page.tsx
│   │   └── layout.tsx
│   └── students/
│       └── page.tsx
│
├── components/
│   ├── ui/
│   │   ├── buttons/
│   │   │   ├── Button.tsx
│   │   ├── inputs/
│   │   │   ├── Input.tsx
│   ├── common/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Footer.tsx
│   │   ├── Loader.tsx
│   │   └── ConfirmModal.tsx
|	|
│   ├── dashboard/
│   │   ├── AnalyticsCharts.tsx
│   │   ├── FacultyList.tsx
│   │   ├── PopularCourses.tsx
│   │   ├── TopStudents.tsx
│   │   └── StatsCard.tsx
│   │
│   ├── tables/
│   │   ├── students/
│   │   │   ├── StudentTable.tsx
│   │   │   └── studentColumns.ts       ← Table column definitions
│   │   ├── courses/
│   │   │   ├── CourseTable.tsx
│   │   │   └── courseColumns.ts
│   │   └── faculty/
│   │       ├── FacultyTable.tsx
│   │       └── facultyColumns.ts
│   │
│   ├── forms/
│   │   ├── students/
│   │   │   ├── StudentForm.tsx
│   │   │   ├── studentSchema.ts        ← Zod/Yup schema
│   │   │   └── studentDefaultValues.ts ← React Hook Form default values
│   │   ├── courses/
│   │   │   ├── CourseForm.tsx
│   │   │   ├── courseSchema.ts
│   │   │   └── courseDefaultValues.ts
│   │   └── faculty/
│   │       ├── FacultyForm.tsx
│   │       ├── facultySchema.ts
│   │       └── facultyDefaultValues.ts
│   │
│   └── panels/
│       ├── FacultyPanel.tsx
│       └── ReportExport.tsx
│
├── constants/
│   ├── menus.ts               ← Navbar & sidebar menu item arrays
│   ├── selectOptions.ts       ← Static dropdown options
│   ├── messages.ts            ← Success/error message constants
│   ├── roles.ts               ← User role definitions
│   ├── apiEndpoints.ts        ← API endpoint constants
│   └── index.ts               ← Re-exports all constants
│
├── context/
│   ├── SidebarProvider.tsx
│   └── ThemeProvider.tsx
│
├── features/
│   ├── students/
│   │   ├── studentSlice.ts
│   │   ├── studentApi.ts
│   │   └── hooks/
│   │       └── useStudentActions.ts
│   ├── courses/
│   │   ├── courseSlice.ts
│   │   ├── courseApi.ts
│   │   └── hooks/
│   │       └── useCourseActions.ts
│   └── faculty/
│       ├── facultySlice.ts
│       ├── facultyApi.ts
│       └── hooks/
│           └── useFacultyActions.ts
│
├── hooks/
│   ├── useSidebar.ts
│   ├── usePagination.ts
│   ├── useToast.ts
│   └── useTheme.ts
│
├── redux/
│   ├── store.ts
│   └── rootReducer.ts
│
├── utils/
│   ├── formatDate.ts
│   ├── calculateGPA.ts
│   ├── exportCSV.ts
│   └── generateReportPDF.ts
│
├── config/
│   ├── siteConfig.ts
│   ├── apiConfig.ts
│   └── themeConfig.ts
|
├── services/
│   ├── reportService.ts
│   ├── emailService.ts
│   └── authService.ts
│
├── types/
│   ├── course.ts
│   ├── faculty.ts
│   ├── student.ts
│   ├── report.ts
│   ├── apiResponse.ts
│   ├── enums.ts
│   └── index.ts
│
├── styles/
│   ├── globals.css
│   ├── custom.css
│   └── animations.css
|
├── public/
│   ├── images/
│   │   ├── logo.svg
│   │   └── banners/
│   ├── icons/
│   │   └── dashboard.svg
│   └── docs/
│       └── student-guide.pdf
│
├── middleware.ts
└── .env.example