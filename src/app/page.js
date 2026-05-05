"use client";

import { useState, useRef } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [file, setFile] = useState(null);
  const [jobDesc, setJobDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("Please upload a resume (PDF).");
      return;
    }
    
    setLoading(true);
    setResults(null);
    
    try {
      const formData = new FormData();
      formData.append("resume", file);
      formData.append("jobDesc", jobDesc);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });
      
      const data = await res.json();
      
      if (res.ok) {
        setResults(data);
      } else {
        alert(data.error || "An error occurred during analysis.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to reach the server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Smart Resume Analyzer</h1>
        <p className={styles.subtitle}>Upload your resume and a target job description to get an instant ATS compatibility score.</p>
      </header>

      {!results && (
        <>
          <div className={styles.uploadSection}>
            <div className={`${styles.glassPanel} ${styles.card}`}>
              <h2>1. Upload Resume (PDF)</h2>
              <div 
                className={`${styles.dropzone} ${dragActive ? styles.active : ""}`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={onButtonClick}
              >
                <div className={styles.fileIcon}>📄</div>
                <p>{file ? file.name : "Drag & Drop your PDF here or click to browse"}</p>
                <input
                  ref={fileInputRef}
                  type="file"
                  className={styles.fileInput}
                  accept="application/pdf"
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className={`${styles.glassPanel} ${styles.card}`}>
              <h2>2. Target Job Description (Optional)</h2>
              <textarea 
                className={styles.textarea}
                placeholder="Paste the job description here to see how well your resume matches..."
                value={jobDesc}
                onChange={(e) => setJobDesc(e.target.value)}
              />
            </div>
          </div>

          <button 
            className={styles.button} 
            onClick={handleAnalyze} 
            disabled={loading || !file}
          >
            {loading ? "Analyzing..." : "Analyze Resume"}
          </button>
          
          {loading && (
            <div className={styles.loading}>
              <div className={styles.spinner}></div>
              <p>Scanning for keywords and generating insights...</p>
            </div>
          )}
        </>
      )}

      {results && !loading && (
        <div className={`${styles.glassPanel} ${styles.card} ${styles.results}`}>
          <h2>Analysis Results</h2>
          <div className={styles.scoreCircle}>
            {results.score}%
          </div>
          
          <div className={styles.resultsGrid}>
            <div className={styles.resultBox}>
              <h3>Strengths</h3>
              <ul className={styles.resultList}>
                {results.strengths.length > 0 ? (
                  results.strengths.map((str, i) => <li key={i}>{str}</li>)
                ) : (
                  <li>No specific strengths identified.</li>
                )}
              </ul>
            </div>
            <div className={styles.resultBox}>
              <h3>Missing Keywords</h3>
              <ul className={styles.resultList}>
                {results.missing.length > 0 ? (
                  results.missing.map((kw, i) => <li key={i}>{kw}</li>)
                ) : (
                  <li>Your resume contains all the required keywords!</li>
                )}
              </ul>
            </div>
          </div>
          
          <div style={{ marginTop: '2rem' }}>
            <button className={styles.button} onClick={() => setResults(null)}>
              Analyze Another Resume
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
