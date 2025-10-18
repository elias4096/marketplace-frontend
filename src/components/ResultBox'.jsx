import React from 'react';

function ResultBox({ result }) {
    if (!result) {
        return null;
    }

    return result.success ? (
        <span style={{color: "green"}}>{result.message}</span>
    ) : (
        <span style={{color: "red"}}>{result.message}</span>
    )
}

export default ResultBox;
