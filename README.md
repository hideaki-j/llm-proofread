LLM Proofreader
===============

![Demo GIF](/images/demo.gif)

## How to use

### Step 1: Setup OpenAI API Key

Create `openai-api-key.js` under the same directory as `index.html`.
Put your OpenAI API key in `openai-api-key.js` as `const OPENAI_API_KEY = "<your-openai-api-key>";`

```sh
# create openai-api-key.js
touch openai-api-key.js
# add the following line to openai-api-key.js
echo "const OPENAI_API_KEY = '<your-openai-api-key>';" > openai-api-key.js
```

Alternatively, you can set the API key directly from the web UI.

### Step 2: Open the web UI

Simply double-click the `index.html` file to open the LLM Proofreader in your default web browser.