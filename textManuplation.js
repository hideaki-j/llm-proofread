function stripLinesAndRejoin(text) {
    const lines = text.split(/\r?\n/).map(line => line === '' ? '' : line.trim());
    const strippedLines = lines.map(line => line.trim());
    return strippedLines.join('\n');
}