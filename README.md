# Smart Resume Analyzer 🚀

A modern, fast, and intuitive web application built with **Next.js** that helps candidates evaluate their resumes against specific job descriptions. The application instantly parses PDF resumes and provides an ATS compatibility score, highlights missing keywords, and offers actionable feedback.

## ✨ Features

- **Drag-and-Drop Interface**: Easily upload your resume (PDF format) with a smooth drag-and-drop experience.
- **Instant PDF Extraction**: Securely extracts text from your resume directly on the server without relying on heavy third-party parsing APIs.
- **ATS Compatibility Scoring**: Matches the extracted text against a target job description to generate a simulated ATS score.
- **Keyword Analysis**: Automatically identifies which critical skills and keywords are present in your resume and which ones are missing from the job description.
- **Premium Design**: Built using modern Vanilla CSS with dark mode, glassmorphism elements, and smooth gradient animations.

## 🛠️ Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Styling**: Vanilla CSS (CSS Modules)
- **PDF Parsing**: `pdf-parse` (v1.1.1 for maximum Node.js stability)
- **Deployment Ready**: Fully optimized for deployments on Vercel or any Node.js environment.

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/YOUR_USERNAME/smart-resume-analyzer.git
   ```
2. Navigate into the project directory:
   ```bash
   cd smart-resume-analyzer
   ```
3. Install the dependencies:
   ```bash
   npm install
   ```

### Running the Development Server

Start the application locally:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 💡 How It Works

1. **Upload**: The user uploads a `.pdf` file of their resume.
2. **Input JD**: The user optionally pastes the target job description into the text area.
3. **Parse**: The backend API uses `pdf-parse` to convert the PDF buffer into readable text.
4. **Analyze**: A local rule-based algorithm compares the resume text against industry keywords and the provided job description to generate actionable insights and a percentage score.

## 📝 License

This project is open-source and available under the [MIT License](LICENSE).
