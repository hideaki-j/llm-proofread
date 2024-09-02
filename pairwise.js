let originalLines = [];
let rewrittenLines = [];
let currentLineIndex = 0;
let selectedLines = [];

function splitIntoLines(text) {
    return text.split(/\r?\n/).filter(line => line.trim() !== '');
}

function startPairwiseComparison() {
    const removalsText = document.getElementById('removals').innerText;
    const additionsText = document.getElementById('additions').innerText;

    if (removalsText.trim() === '' || additionsText.trim() === '') {
        alert("Please run the Proofread function first to generate comparison data.");
        return;
    }

    originalLines = splitIntoLines(removalsText);
    rewrittenLines = splitIntoLines(additionsText);

    if (originalLines.length !== rewrittenLines.length) {
        const confirmContinue = confirm("The number of lines in the original and rewritten text do not match. The comparison may not be accurate. Do you want to continue?");
        if (!confirmContinue) {
            return;
        }
    }

    currentLineIndex = 0;
    selectedLines = [];
    showComparisonPopup();
}

function showComparisonPopup() {
    const popup = document.getElementById('pairwisePopup');
    const originalBox = document.getElementById('originalComparisonBox');
    const rewrittenBox = document.getElementById('rewrittenComparisonBox');
    const progress = document.getElementById('comparisonProgress');

    if (currentLineIndex < Math.max(originalLines.length, rewrittenLines.length)) {
        const originalLine = originalLines[currentLineIndex] || '';
        const rewrittenLine = rewrittenLines[currentLineIndex] || '';

        const dmp = new diff_match_patch();
        const diffs = dmp.diff_main(originalLine, rewrittenLine);
        dmp.diff_cleanupSemantic(diffs);

        let originalHtml = '';
        let rewrittenHtml = '';

        for (let i = 0; i < diffs.length; i++) {
            const [type, text] = diffs[i];
            switch (type) {
                case -1: // Removed
                    originalHtml += `<span class="removed">${text}</span>`;
                    break;
                case 0: // Unchanged
                    originalHtml += text;
                    rewrittenHtml += text;
                    break;
                case 1: // Added
                    rewrittenHtml += `<span class="added">${text}</span>`;
                    break;
            }
        }

        originalBox.innerHTML = originalHtml;
        rewrittenBox.innerHTML = rewrittenHtml;

        progress.textContent = `Progress: ${currentLineIndex + 1} / ${Math.max(originalLines.length, rewrittenLines.length)}`;
        popup.style.display = 'block';
    } else {
        showResultPopup();
    }
}

function selectLine(type) {
    selectedLines.push(type === 'original' ? originalLines[currentLineIndex] : rewrittenLines[currentLineIndex]);
    currentLineIndex++;
    showComparisonPopup();
}

function showResultPopup() {
    const pairwisePopup = document.getElementById('pairwisePopup');
    const resultPopup = document.getElementById('resultPopup');
    const resultContainer = document.getElementById('resultContainer');

    pairwisePopup.style.display = 'none';
    resultContainer.value = selectedLines.join('\n');
    resultPopup.style.display = 'block';
}

function closePairwisePopup() {
    document.getElementById('pairwisePopup').style.display = 'none';
}