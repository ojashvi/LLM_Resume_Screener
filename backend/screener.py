import google.generativeai as genai
import os 
import json
from dotenv import load_dotenv

load_dotenv()
genai.configure(api_key = os.getenv("GEMINI_API_KEY"))

model = genai.GenerativeModel("gemini-1.5-flash")

def screen_resume(filename, resume_text, job_description):
    prompt = f"""
      You are an expert recruiter. Evaluate this resume against the job description.

    Score each category from 0 to 10:
    - skills_match: How well do their skills match the job requirements?
    - experience_relevance: How relevant is their work experience?
    - education_fit: Does their education suit the role?
    - overall_score: Your overall assessment of their fit

    Also provide:
    - strengths: 2-3 specific strengths (as a list)
    - gaps: 1-2 missing qualifications (as a list)
    - summary: 2 sentence recruiter summary
    - recommendation: exactly one of "Strong Yes", "Yes", "Maybe", "No"

    Reply ONLY with a JSON object. No extra text, no markdown.

    JOB DESCRIPTION:
    {job_description}

    RESUME:
    {resume_text}
    """

    response = model.generate_content(prompt)
    raw = response.text.strip()
    if raw.startswith("```"):
        raw = raw.split("```")[1]
        if raw.startswith("json"):
            raw = raw[4:]
    
    scores = json.loads(raw)
    scores["filename"] = filename

    return scores