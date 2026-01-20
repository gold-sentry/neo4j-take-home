const asyncWithRetry = async (fn, attempt = 1, maxRetries = 3) => {
    try {
        return await fn();
    } catch (error) {
        if (attempt === maxRetries) {
            throw error;
        }
        console.warn(`Attempt ${attempt} failed, retrying...`);
        return await asyncWithRetry(fn, attempt + 1, maxRetries);
    }
};

export default asyncWithRetry;