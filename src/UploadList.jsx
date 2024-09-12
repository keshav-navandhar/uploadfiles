import React, { useState } from 'react';
const UploadList = () => {
    const loadFilesFromStorage = () => {
        const savedFiles = localStorage.getItem('fileData');
        return savedFiles ? JSON.parse(savedFiles) :
            [
                { id: 1, internalName: 'Document 1', fileName: '', fileSize: null, preview: null },
                { id: 2, internalName: 'Document 2', fileName: '', fileSize: null, preview: null },
                { id: 3, internalName: 'Document 3', fileName: '', fileSize: null, preview: null },
            ];
    };
    const [files, setFiles] = useState(loadFilesFromStorage());useEffect(() => { localStorage.setItem('fileData', JSON.stringify(files)); }, [files]);
    const handleFileUpload = (event, fileIndex) => { const file = event.target.files[0]; if (file) { const newFiles = [...files]; const filePreview = URL.createObjectURL(file); newFiles[fileIndex] = { ...newFiles[fileIndex], fileName: file.name, fileSize: (file.size / 1024).toFixed(2), preview: filePreview, }; setFiles(newFiles); } };
    return (
        <div>
            <h2>Documents</h2>
            <table style={{ width: '70%', borderCollapse: 'collapse', margin: '40px 220px' }}>
                <thead>
                    <tr>
                        <th style={styles.th}>Internal File Name</th>
                        <th style={styles.th}>File Name</th>
                        <th style={styles.th}>File Size (KB)</th>
                        <th style={styles.th}>View</th>
                        <th style={styles.th}>Upload</th>
                    </tr>
                </thead>
                <tbody>
                    {files.map((file, index) => (
                        <tr key={file.id}>
                            <td style={styles.td}>{file.internalName}</td>
                            <td style={styles.td}>{file.fileName || '-'}</td>
                            <td style={styles.td}>{file.fileSize ? `${file.fileSize} KB` : '-'}</td>
                            <td style={styles.td}> {file.preview ? (file.fileName.endsWith('.png') || file.fileName.endsWith('.jpg') || file.fileName.endsWith('.jpeg') ? (<img src={file.preview} alt="preview" style={{ width: '100px', height: 'auto' }} />) : (<a href={file.preview} target="_blank" rel="noopener noreferrer"> View File </a>)) : ('No preview available')} </td>
                            <td style={styles.td}>
                                <input type="file" id={`fileInput${file.id}`} style={{ display: 'none' }} onChange={(e) => handleFileUpload(e, index)} />
                                <button className="upload-btn" style={styles.button} onClick={() => document.getElementById(`fileInput${file.id}`).click()} > Upload </button> </td>
                        </tr>))}
                </tbody>
            </table>
        </div>);
}; const styles = { th: { padding: '10px', border: '1px solid black', textAlign: 'left', }, td: { padding: '10px', border: '1px solid black', textAlign: 'left', }, button: { padding: '10px 10px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }, }; export default UploadList;
