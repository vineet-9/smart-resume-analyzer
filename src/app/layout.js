import "./globals.css";

export const metadata = {
  title: "Smart Resume Analyzer | AI-Powered Resume Scoring",
  description: "Upload your resume and a target job description to get an instant ATS compatibility score, identify missing keywords, and receive actionable feedback.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
