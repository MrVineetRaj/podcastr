# Podcastr ![Podcastr Logo](https://podcastr-taupe-two.vercel.app/icons/logo.svg)

# [Live Demo](https://podcastr-taupe-two.vercel.app/)

## Overview

**Podcastr** is a groundbreaking podcasting app powered by AI. With Podcastr, users can effortlessly generate podcasts by simply providing a prompt. Our AI engine generates episode content, converts it to speech using Amazon Polly, and stores the audio files in Cloudinary. Users can listen to these podcasts from any device, anywhere, at any time.

## Features ✨

- **AI-Generated Content**: Users provide a prompt, and our AI generates an array of text content for multiple podcast episodes.
- **Text-to-Speech**: Amazon Polly converts generated text into high-quality audio files.
- **Cloud Storage**: Audio files are securely stored in Cloudinary for easy access.
- **Seamless Access**: Listen to pre-created podcasts without authentication. Create an account to generate and store new podcasts.
- **Responsive Design**: Accessible from any device, ensuring a seamless experience on mobile, tablet, and desktop.

## Technologies Used 🛠️

- **Next.js**: Front-end framework for building a dynamic user interface.
- **Node.js & Express.js**: Back-end server for handling API requests and user authentication.
- **Gemini-1.5-flash**: AI model for generating podcast content from user prompts.
- **Amazon Polly**: Service for converting text content to speech.
- **Cloudinary**: Cloud service for storing and delivering audio files.
- **Vercel**: Platform for deploying the web application.

## Getting Started 🚀

### Prerequisites

Before you begin, ensure you have the following installed:

- Node.js
- npm

### Installation


1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Set up environment variables**:

   Create a `.env.local` file in the root directory and add the following:


    ### `Clerk`
    ```
    WEBHOOK_SECRET=
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
    CLERK_SECRET_KEY=
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=
    ```

    ### `MongoDB`
    ```
    MONGODB_URI=
    ```

    ### `ResponsiveVoice`
    ```
    NEXT_PUBLIC_RESPONSIVE_VOICE_API_KEY=
    ```

    ### `Cloudinary`
    ```
    CLOUDINARY_CLOUD_NAME=
    CLOUDINARY_API_SECRET=
    CLOUDINARY_API_KEY=
    ```


    ### `SECRET_KEY`
    ```
    NEXT_PUBLIC_PODCASTR_UTILS_SECRET_KEY= You can request from me as i create this
    ```

3. **Run the development server**:

    ```bash
   npm run dev
    ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Usage 🎧

1. **Listening to Podcasts**:
   - Visit the homepage to browse and listen to pre-created podcasts without needing an account.

2. **Creating a Podcast**:
   - Sign up for an account.
   - Log in and navigate to the "Create Podcast" section.
   - Enter a prompt (e.g., "Summary of the book Ramayan").
   - Let the AI generate content and convert it to speech.
   - Access your generated podcasts from your account dashboard.

## Deployment 🌐

The project is deployed on Vercel. Visit [Podcastr](https://podcastr-taupe-two.vercel.app/) to see the live application.

## Contributing 🤝

We welcome contributions! Please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b feature-name`.
3. Make your changes and commit them: `git commit -m 'Add some feature'`.
4. Push to the branch: `git push origin feature-name`.
5. Open a pull request.

## Contact 📧

If you have any questions or feedback, please reach out to us at [My Linked In Profile](https://www.linkedin.com/in/vineet-raj-b96381257/).

