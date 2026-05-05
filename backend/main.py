from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from typing import List
from resume_parser import extract_text
from screener import screen_resume

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "server is running!"}

@app.post("/screen")
async def screen_resumes(
    job_description: str = Form(...),
    resumes: List[UploadFile] = File(...),
):
    results = []

    for resume in resumes:
        file_bytes = await resume.read()
        text = extract_text(file_bytes, resume.filename)
        result = screen_resume(resume.filename, text, job_description)
        results.append(result)

    results.sort(key=lambda r: r["overall_score"], reverse=True)

    for i, r in enumerate(results):
        r["rank"] = i + 1

    return {"results": results}