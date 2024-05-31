const urlMap = new Map();
const baseUrl = "https://<your-username>.github.io/<repository-name>/";
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const codeLength = 6;

// Function to generate a unique short code
function generateCode() {
    let code = '';
    for (let i = 0; i < codeLength; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        code += charset[randomIndex];
    }
    return code;
}

// Function to validate a URL
function isValidURL(url) {
    try {
        new URL(url);
        return true;
    } catch (_) {
        return false;
    }
}

// Function to encode a long URL to a short URL
function encodeURL(longUrl) {
    if (!isValidURL(longUrl)) {
        alert("Invalid URL. Please enter a valid URL.");
        return;
    }

    if (urlMap.has(longUrl)) {
        return baseUrl + urlMap.get(longUrl);
    }

    let code;
    do {
        code = generateCode();
    } while ([...urlMap.values()].includes(code));

    urlMap.set(longUrl, code);
    urlMap.set(code, longUrl);

    return baseUrl + code;
}

// Function to decode a short URL to a long URL
function decodeURL(shortUrl) {
    const code = shortUrl.replace(baseUrl, '');
    return urlMap.get(code);
}

// Function to handle the button click for shortening URL
function shortenUrl() {
    const longUrl = document.getElementById("longUrl").value;
    const shortUrl = encodeURL(longUrl);

    if (shortUrl) {
        document.getElementById("shortUrl").innerText = `Shortened URL: ${shortUrl}`;
    } else {
        document.getElementById("shortUrl").innerText = "";
    }
}
