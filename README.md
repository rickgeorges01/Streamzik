# StreamZik

StreamZik is a robust Spotify clone designed to deliver a seamless music streaming experience. Dive into the details below to understand its features, architecture, and how to get started.

## Key Features

 - **Song Upload**: Upload and manage your music files with ease.

- **Stripe Integration**: Enable premium subscriptions within the application using Stripe for payment processing.

- **Database Handling**: Learn to set up a Supabase project, create database schemas, and manage data with PostgreSQL.

- **Sleek User Interface**: Using Tailwind CSS, create a UI that closely resembles Spotify's sleek design.

- **Responsiveness**: This application is fully responsive and compatible with all devices.

- **Authentication**: Secure user registration and login processes with Supabase.

- **Github Authentication Integration**: Enable secure login using Github authentication.

- **File/Image Upload**: Upload files and images using Supabase storage.

- **Form Validation**: Efficient client form validation and handling using react-hook-form.

- **Error Handling**: Smooth server error handling with react-toast.

- **Audio Playback**: Enable song playback within the application.

- **Favorites System**: Users can mark songs as favorites.

- **Playlists / Liked Songs System**: Create and manage song playlists.

- **Advanced Player Component**: Explore the functionality of an advanced music player component.

- **Stripe Recurring Payment Integration**: Manage recurring payments and subscriptions using Stripe.

- **POST, GET, and DELETE Routes**: Learn to write and manage these crucial routes in route handlers (app/api).

- **Data Fetching**: Master fetching data in server React components by directly accessing the database without API, like magic!

- **Handling Relations**: Handle relations between Server and Child components in a real-time environment.

- **Cancelling Stripe Subscriptions**: Learn how to cancel Stripe subscriptions within the application.


## Installation and Setup

### Prerequisites/ build with

- Next.js 13.4
- React
- Tailwind CSS
- Supabase
- PostgreSQL
- Stripe
- npm (v6+)
- Supabase account for backend services

Instructions

  Clone the Repository:
  
    git clone https://github.com/yourusername/streamzik.git
    cd streamzik
    
  Install Dependencies:

    npm install

  Environment Configuration:
Create a .env file with the following variables:

makefile

    SUPABASE_URL=your-supabase-url
    SUPABASE_KEY=your-supabase-key

Running the Application

    Start the Development Server:

    bash

    npm start

    Access the Application:
    Open your browser and visit http://localhost:3000.

Project Structure

    components/: UI components such as AuthModal, Button, and more.
    contexts/: Providers like SupabaseProvider and ModalProvider.
    hooks/: Custom hooks like useAuthModal, usePlayer, and others.
    services/: Fetch functions for songs, users, etc.
    styles/: Centralized styling resources.
    utils/: General utility functions.

License

Distributed under the MIT License.
Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or feature requests.
