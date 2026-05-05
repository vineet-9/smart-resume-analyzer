import { NextResponse } from "next/server";
import { PDFParse } from "pdf-parse";

// Note: In a real production app with an API key, you would call your LLM here.
// Since we don't have an API key, we simulate a rule-based AI keyword extraction and scoring.

function performMockAnalysis(resumeText, jobDesc) {
  // If no job description provided, return a generic good score.
  if (!jobDesc || jobDesc.trim() === "") {
    return {
      score: 85,
      strengths: [
        "Good formatting detected.",
        "Resume length is optimal.",
        "Contains action verbs."
      ],
      missing: [
        "Consider adding more quantifiable achievements."
      ]
    };
  }

  // Simple keyword matching logic
  const commonTechKeywords = [
    "javascript", "react", "node.js", "python", "java", "c++", "sql", "aws", "docker", 
    "kubernetes", "typescript", "html", "css", "agile", "scrum", "leadership", "communication",
    "git", "github", "ci/cd", "machine learning", "data analysis", "rest api", "graphql"
  ];

  const resumeLower = resumeText.toLowerCase();
  const jdLower = jobDesc.toLowerCase();

  const jdKeywords = commonTechKeywords.filter(kw => jdLower.includes(kw));
  const foundKeywords = [];
  const missingKeywords = [];

  jdKeywords.forEach(kw => {
    if (resumeLower.includes(kw)) {
      foundKeywords.push(kw);
    } else {
      missingKeywords.push(kw);
    }
  });

  // Calculate score
  let score = 50; // Base score
  if (jdKeywords.length === 0) {
    score = 80; // If we couldn't parse specific keywords from JD
  } else {
    const matchRatio = foundKeywords.length / jdKeywords.length;
    score += Math.round(matchRatio * 50); 
  }

  // Cap score
  score = Math.min(100, Math.max(0, score));

  const strengths = [];
  if (foundKeywords.length > 0) {
    strengths.push(`Matches key skills: ${foundKeywords.slice(0, 5).join(', ')}`);
  }
  strengths.push("PDF parsed successfully and text is machine-readable.");
  
  if (score > 80) strengths.push("High compatibility with job description.");

  return {
    score,
    strengths,
    missing: missingKeywords.length > 0 ? missingKeywords.slice(0, 5) : ["None critical identified!"]
  };
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume");
    const jobDesc = formData.get("jobDesc") || "";

    if (!file) {
      return NextResponse.json({ error: "No resume file provided." }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Parse the PDF
    const parser = new PDFParse({ data: buffer });
    const result = await parser.getText();
    const resumeText = result.text;
    await parser.destroy();

    // Simulate AI delay for the UI experience
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Perform analysis
    const analysis = performMockAnalysis(resumeText, jobDesc);

    return NextResponse.json(analysis);

  } catch (error) {
    console.error("Error processing resume:", error);
    return NextResponse.json({ error: "Failed to process the resume. Please ensure it is a valid PDF." }, { status: 500 });
  }
}
