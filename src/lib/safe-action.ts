import { createSafeActionClient } from "next-safe-action";

export const action = createSafeActionClient({
    // Can also be an async function.
    handleReturnedServerError(e) {
        // In this case, we can use the 'MyCustomError` class to unmask errors
        // and return them with their actual messages to the client.
            return e.message;

    },
});