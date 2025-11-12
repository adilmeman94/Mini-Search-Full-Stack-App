// Lowercase tokenization
const tokenize = (text) => {
    return text.toLowerCase().split(/[^a-z0-9]+/).filter(Boolean);
}

// Short snippet around first matched term
const makeSnippet = (body, queryTerms, maxLen = 120) => {
    const lower = body.toLowerCase();
    let idx = -1;

    for (const term of queryTerms) {
        const i = lower.indexOf(term);
        if (i !== -1) { idx = i; break; }
    }

    if (idx === -1) {
        return body.length <= maxLen ? body : body.slice(0, maxLen).trimEnd() + "…";
    }

    const start = Math.max(0, idx - 30);
    const end = Math.min(body.length, idx + 30);
    const chunk = body.slice(start, end);
    const prefix = start > 0 ? "…" : "";
    const suffix = end < body.length ? "…" : "";
    return (prefix + chunk + suffix).replace(/\s+/g, " ");
}

// summary of top results
const summarizeTop = (items) => {
    if (items.length === 0) return "";
    if (items.length === 1) return `Top result: ${items[0].title}. ${items[0].body}`;
    if (items.length === 2) {
        return `${items[0].title} and ${items[1].title} are related. ${items[0].body} ${items[1].body}`;
    }
    return `${items[0].title}, ${items[1].title}, and ${items[2].title} are relevant. ${items[0].body} ${items[1].body} ${items[2].body}`;
}

module.exports = { tokenize, makeSnippet, summarizeTop };