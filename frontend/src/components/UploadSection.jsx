import { useState, useRef } from "react"
export default function UploadSection({onSubmit,loading})
{
    const [jobDescription, setJobDescription] = useState("")
    const [files, setFiles] = useState([])
    const fileInputRef = useRef()
    const [dragOver, setDragOver ] = useState(false)

    const handleFiles = (incoming) => {
        const valid = Array.from(incoming).filter ((f) => f.name.match(/\.pdf|docx|txt)$/i)
    )

    setFiles((prv) => {
        const names = new Set(prev.map((f) => f.name))
        return [...prev, ...valid.filter((f) => !names.has(f.name))]
    })
}

const removeFile = (name) => {
    setFiles((f)) => f.filter((x) => x.name !== name)
}

const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false) 
    handleFiles(e.dataTransfer.files) 

}

const handleSubmit = () =>
{ 
    if (!jobDescription.trim() || files.length === 0) return 
    onSubmit({ jobDescription, files})

}

const canSubmit = jobDescription.trim().length > 20
    && files.length > 0 
    && !loading 

    return (
        <section className = "upload-section">
            <div className = "panel">
                <label className = " panel-label">Job Description </label>
                <textarea 
                    className = "jb-textarea"
                    placeholder = "Enter job description..."
                    value = {jobDescription}
                    onChange = {(e) => setJobDescription(e.target.value)}
                />
            </div>


            <div className= "panel">
                <label className = "panel-label">
                    Resumes (PDF,DOCX, TXT)
                </label>

                <div 
                className = {`dropzone ${dragOver ? "drag-active" : ""} `}
                onDragOver = {(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave = {() => setDragOver (false)}
                onDrop = {handleDrop}
                onclick = {() => fileInputRef.current?.click()}
                >
                    <input 
                    ref ={fileInputRef}
                    type = "file"
                    multiple
                    accept =".pdf,.docx,.txt"
                    style ={{display : "none"}}
                    onChange = {(e) => handleFiles(e.target.files)}
                    />
                    <p>⬆ Drag & drop resumes here</p>
                    <p>or click to browse</p>
                    </div>

                    {files.length > 0 && (
                            <ul classNAme = "file-list">
                            {files.map((f) => ( 
                                    <li key = {f.name} className = "fileItem">
                                        <span> {f.name} </span>
                                   
                                    <span>{(f.size /1024).toFixed(1)} KB</span>
                                    <button onClick = {() => removeFile(f.name)}>x</button>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>

                <button
                className = { `screen-btn ${canSubmit ? "active" : "disabled"}`}
                onClick = {handleSubmit}
                disabled = {!canSubmit}
                >
                    {loading ? "Screening..." : `Screen ${files.length} Resume${files.length !== 1 ? "s" : ""}`}
                </button>
        </section>
    )
    }

