// Read github.com/RooRay/B2Worker for setup instructions

export async function handleFile(event) {
    const url = new URL(event.request.url);
    const cache = caches.default;
    let response = await cache.match(event.request);
    let contentType = 'application/octet-stream'; // Default content type

    if (!response) {
        // Replace this URL with your friendly URL as per the instructions
        response = await fetch(`https://f003.backblazeb2.com/file/RooImg${url.pathname}`);
        const headers = { "cache-control": "public, max-age=14400" };

        // Set the appropriate Content-Type header based on the file extension.
        contentType = getContentTypeFromExtension(url.pathname);
        headers["Content-Type"] = contentType;

        response = new Response(response.body, { ...response, headers });
        event.waitUntil(cache.put(event.request, response.clone()));
    }

    // If the file is an image, instruct the browser to display it in the browser.
    if (contentType.startsWith('image/')) {
        const disposition = `inline; filename="${url.pathname.split('/').pop()}"`;
        response.headers.set('Content-Disposition', disposition);
    }

    return response;
}

function getContentTypeFromExtension(pathname) {
    const extension = pathname.split('.').pop().toLowerCase();
    switch (extension) {
        case 'mp4':
            return 'video/mp4';
        case 'webm':
            return 'video/webm';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'png':
            return 'image/png';
        // Add more cases for other image formats if needed.
        default:
            return 'application/octet-stream'; // Fallback content type.
    }
}

addEventListener("fetch", (event) => {
    try {
        event.respondWith(handleFile(event));
    } catch (e) {
        return new Response("Something went wrong", { status: 500 });
    }
});
