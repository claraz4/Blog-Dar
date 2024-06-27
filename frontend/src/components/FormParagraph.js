import React from 'react';

export default function FormParagraph({ id, content, setContent, removeParagraph, totalParagraphs }) {
    const subtitleHTML = `subtitle${id}`;
    const contentHTML = `content${id}`;

    // Handle content change
    function handleContent(event) {
        const { id, value } = event.target;

        setContent((prev) => {
            const arr = [...prev];
            arr[id] = value;
            return arr;
        })
    }

    return (
        <div>
            <div className="new-paragraph--all-title">
                <h6>New Paragraph</h6>
                {totalParagraphs === id && id > 0 && <button type="button" onClick={removeParagraph} name={id}>Remove</button>}
            </div>
            <div className="form--subcontainer">
                <label htmlFor={subtitleHTML}> Subtitle</label>
                <input type="text" placeholder="Subtitle" name={subtitleHTML} onChange={handleContent} value={content[id]}  id={id} />
            </div>

            <div className="form--subcontainer">
                <label htmlFor={contentHTML}>Body</label>
                <textarea placeholder="Content" name={contentHTML} onChange={handleContent} value={content[id + 1]} id={id + 1} />
            </div>
        </div>  
    )
}