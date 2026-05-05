import { useState } from "react"
import UploadSection from "./components/UploadSection"
import ResultsTable from "./components/ResultsTable"
import "./App.css"

export default function App() {

  // These 3 variables store the app's current state
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // This function runs when the user clicks "Screen Resumes"
  const handleScreen = async ({ jobDescription, files }) => {
    setLoading(true)
    setError(null)
    setResults(null)

    // FormData is how we send files + text to the backend
    const formData = new FormData()
    formData.append("job_description", jobDescription)
    files.forEach((f) => formData.append("resumes", f))

    try {
      // Send everything to our FastAPI backend
      const res = await fetch("http://localhost:8000/screen", {
        method: "POST",
        body: formData,
      })

      if (!res.ok) throw new Error("Server error — check your backend terminal")

      const data = await res.json()
      setResults(data.results)

    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="app">

      <header className="header">
        <h1>RecruitLens</h1>
        <p>AI-powered resume screening</p>
      </header>

      <main className="main">
        <UploadSection onSubmit={handleScreen} loading={loading} />

        {error && (
          <div className="error-banner">⚠ {error}</div>
        )}

        {loading && (
          <div className="loading-state">
            <div className="spinner" />
            <p>Analyzing resumes with Gemini AI...</p>
          </div>
        )}

        {results && !loading && (
          <ResultsTable results={results} />
        )}
      </main>

    </div>
  )
}