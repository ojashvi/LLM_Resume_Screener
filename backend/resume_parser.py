import pdfplumber
import docx
import io

def extract_text(file_bytes, filename):
    file = io.BytesIO(file_bytes)
    if filename.endswith(".pdf"):
        with pdfplumber.open(file) as pdf:
            pages = [page.extract_text() or "" for page in pdf.pages]
            return "\n".join(pages)

    elif filename.endswith(".docx"):
        doc = docx.Document(file)
        paragraphs = [p.text for p in doc.paragraphs if p.text.strip()]
        return "\n".join(paragraphs)

    elif filename.endswith(".txt"):
        return file_bytes.decode("utf-8", errors="ignore")
    
    else:
        raise ValueError(f"Unsupported file type : {filename}")