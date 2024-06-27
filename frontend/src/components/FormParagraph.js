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
        <div className="form-paragraph">
            <div className="new-paragraph--all-title">
                <h6>Paragraph {id/2 + 1}</h6>
                {totalParagraphs === id && id > 0 && <button type="button" className="green-button" id="remove-paragraph--button" onClick={removeParagraph} name={id}>Remove</button>}
            </div>
            <div className="form--subcontainer small-bottom-margin">
                <label htmlFor={subtitleHTML} className="form-paragraph--subtitle">Subtitle</label>
                <input type="text" placeholder="Subtitle" name={subtitleHTML} onChange={handleContent} value={content[id]}  id={id} />
            </div>

            <div className="form--subcontainer no-margin">
                <label htmlFor={contentHTML} className="form-paragraph--subtitle">Body</label>
                <textarea placeholder="Content" name={contentHTML} onChange={handleContent} value={content[id + 1]} id={id + 1} />
            </div>
        </div>  
    )
}