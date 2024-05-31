const urlMap = new Map();
const baseUrl = "http://short.url/";
const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const codeLength = 6;
const MAX_CODE_GENERATION_ATTEMPTS = 10; // Maximum attempts to generate unique code

// Function to generate a unique short code (optimized for efficiency)
function generateUniqueCode() {
  let code;
  let attempts = 0;
  do {
    code = "";
    for (let i = 0; i < codeLength; i++) {
      code += charset[Math.floor(Math.random() * charset.length)];
    }
    attempts++;
  } while (urlMap.has(code) && attempts < MAX_CODE_GENERATION_ATTEMPTS);

  if (attempts >= MAX_CODE_GENERATION_ATTEMPTS) {
    throw new Error("Failed to generate unique code after multiple attempts");
  }
  return code;
}

// Function to validate a URL using regex (no change)
function isValidURL(url) {
  const urlPattern = /^www\.[a-zA-Z0-9-]+\.[a-zA-Z]{2,}$/;
  return urlPattern.test(url);
}

// Function to encode a long URL to a short URL (combined optimizations with error handling)
function encodeURL(longUrl) {
  if (!isValidURL(longUrl)) {
    alert("Please enter a valid URL in the format www.<urlstring>.com");
    return null;
  }

  const existingCode = urlMap.get(longUrl);
  if (existingCode) {
    return baseUrl + existingCode; // Reuse existing code if available
  }

  try {
    const code = generateUniqueCode();
    urlMap.set(longUrl, code);
    urlMap.set(code, longUrl);
    return baseUrl + code;
  } catch (error) {
    console.error("Error generating unique code:", error.message);
    alert("An error occurred while shortening the URL. Please try again later.");
    return null;
  }
}

// Function to decode a short URL to a long URL (no change)
function decodeURL(shortUrl) {
  const code = shortUrl.replace(baseUrl, '');
  return urlMap.get(code);
}

// Function to handle the button click for shortening URL (no change)
function shortenUrl() {
  const longUrl = document.getElementById("longUrl").value;
  const shortUrl = encodeURL(longUrl);

  if (shortUrl) {
    document.getElementById("shortUrl").innerText = `Shortened URL: ${shortUrl}`;
  } else {
    document.getElementById("shortUrl").innerText = "";
  }
}