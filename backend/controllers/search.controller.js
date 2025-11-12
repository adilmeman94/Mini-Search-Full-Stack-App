const faqs = require("../data/faqs");
const { tokenize, makeSnippet, summarizeTop } = require("../helpers/text");
const { scoreItem } = require("../helpers/scoring");


const postSearch = async (req, res, next) => {
    try {
        const q = (req.body?.query || "").trim();
        if (!q) {
            return res.status(400).json({ message: "Query must not be empty." });
        }

        const terms = tokenize(q);

        const scored = faqs.map((item) => ({
            item,
            score: scoreItem(item, terms),
        }));

        // Only keep positive scores
        const filtered = scored.filter((x) => x.score > 0);
        filtered.sort((a, b) => b.score - a.score || Number(a.item.id) - Number(b.item.id));

        const topThreeResult = filtered.slice(0, 3);

        const results = topThreeResult.map(({ item, score }) => ({
            id: item.id,
            title: item.title,
            snippet: makeSnippet(item.body, terms),
            score: Number(score.toFixed(2)),
        }));

        if (results.length === 0) {
            return res.status(404).json({ results: [], message: "No matches found." });
        }

        const topItems = topThreeResult.map((t) => t.item);
        const summary = summarizeTop(topItems);
        const sources = topItems.map((t) => t.id);

        return res.status(200).json({ results, summary, sources });
    } catch (err) {
        next(err);
    }
}

module.exports = { postSearch };
