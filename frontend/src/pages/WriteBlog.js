import React from 'react';

export default function WriteBlog() {
    return (
        <form>
            <label for="title"> Blog Title</label>
            <input type="text" placeholder="Title" name="title" />
        </form>
    )
}