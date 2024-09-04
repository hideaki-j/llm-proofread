const CHATGPT_PROMPT = `You are a professional proofreader. Your task is to proofread and rewrite the given text.
ONLY output rewritten sentences.

NOTES:
{{notes}}

CONTEXT (Context of the target text; does not need to be rewritten):
{{context}}

ORIGINAL TEXT (This should be rewritten):
{{text}}`;