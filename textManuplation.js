function splitIntoLines(text) {
    return text.split(/\r?\n/).filter(line => line.trim() !== '');
}

function stripLinesAndRejoin(text) {
    const lines = splitIntoLines(text);
    const strippedLines = lines.map(line => line.trim());
    return strippedLines.join('\n');
}