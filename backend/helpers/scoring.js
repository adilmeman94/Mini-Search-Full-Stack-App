const { tokenize } = require("./text");

// Basic term-frequency scoring with title weight & small substring
const scoreItem = (item, queryTerms) => {
    const titleTokens = tokenize(item.title);
    const bodyTokens = tokenize(item.body);

    let score = 0;
    for (const term of queryTerms) {
        const titleTF = titleTokens.filter((t) => t === term).length;
        const bodyTF = bodyTokens.filter((t) => t === term).length;

        score += titleTF * 2 + bodyTF * 1; // title weighted more
        if (item.title.toLowerCase().includes(term)) score += 0.5; // small substring
    }
    return score;
}

module.exports = { scoreItem };