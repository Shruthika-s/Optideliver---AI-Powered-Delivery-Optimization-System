# Optideliver - AI-Powered Delivery Optimization System

## Introduction

The **OptiDeliver** is a comprehensive solution designed to optimize delivery routes, track deliveries, and provide an interface for senders to manage their shipments. The system consists of three main components:

- **Sender Interface**: A web application for senders to create and manage delivery orders.
- **Postman App**: An application for delivery personnel to view and update delivery statuses.
- **Route Optimization Dashboard**: A dashboard for optimizing delivery routes and tracking delivery metrics.

## Project Structure

```markdown
├── Dataset.csv
├── Finale OptiDeliver_Infinitely Innovative_SIH-2024_final.pptx
├── Postman-app/
│   └── project/
│       ├── .bolt/
│       ├── .env
│       ├── .gitignore
│       ├── eslint.config.js
│       ├── index.html
│       └── src/
├── prediction.ipynb
├── Route-optimization-dashboard/
│   └── route/
│       └── project/
│           ├── .bolt/
│           ├── .env
│           ├── .gitignore
│           ├── index.html
│           └── src/
├── Sender-interface/
│   ├── .bolt/
│   ├── .env
│   ├── .gitignore
│   ├── dashboard.js
│   ├── eslint.config.js
│   ├── index.html
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   ├── src/
│   ├── styles.css
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── Survey Responses.xlsx
```

## Components

### Sender Interface

Located in [`Sender-interface`](Sender-interface), this React application allows senders to:

- Create new delivery orders.
- Manage and track existing orders.
- Receive notifications about delivery statuses.

#### Features

- User authentication and authorization.
- Order creation with recipient details and delivery preferences.
- Real-time tracking of deliveries.

### Postman App

Found in [`Postman-app/project`](Postman-app/project), this application enables delivery personnel to:

- View assigned deliveries.
- Update delivery statuses (e.g., pending, in-progress, completed).
- View optimized delivery routes on a map.

#### Features

- Interactive map display using Leaflet and React Leaflet.
- Delivery metrics calculation (e.g., completed deliveries, distance covered).
- Real-time updates and notifications.

### Route Optimization Dashboard

Located in [`Route-optimization-dashboard/route/project`](Route-optimization-dashboard/route/project), this dashboard provides:

- Visualization of delivery routes.
- Optimization algorithms to calculate the most efficient delivery order.
- Tracking of delivery progress and statuses.

#### Features

- Map visualization with markers for delivery points.
- Route optimization using custom utilities.
- Integration with delivery tracking data.

## Installation

### Prerequisites

- **Node.js** (version 14 or higher)
- **npm** or **yarn**

### Clone the Repository

```bash
git clone https://github.com/rishitsura/india-post-delivery-system.git
```

## Installing Dependencies

### Sender Interface
```bash
cd india-post-delivery-system/Sender-interface
npm install
```

### Postman App
```bash
cd india-post-delivery-system/Postman-app/project
npm install
```

### Route Optimization Dashboard
```bash
cd india-post-delivery-system/Route-optimization-dashboard/route/project
npm run dev
```

## Usage

- Access the Sender Interface at [http://localhost:3000](http://localhost:3000) to create and manage delivery orders.
- Use the Postman App to view assigned deliveries and update their statuses.
- Utilize the Route Optimization Dashboard to visualize and optimize delivery routes.


## Contributing

We welcome contributions to improve the India Post Delivery System! Please follow these steps:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Contribution Guidelines

- Follow the existing code style and conventions
- Write clear commit messages
- Update documentation as needed
- Add tests for new features
- Ensure all tests pass before submitting PR

### Co-Owners

### [Shruthika Sunku](https://github.com/shruthika-s)
### [Suhas Uppala](https://github.com/Suhas-Uppala)
### [Sujay Nimmagadda](https://github.com/sujaynsv)
### [Yaswanth Jonnala](https://github.com/yaswanthjonnala)
### [Amit Dandu](https://github.com/amitexe2)
