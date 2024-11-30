type Schema = { [key: string]: "string" | "number" | "boolean" | "array" | "object" };

function validateInputControllers<T extends Record<string, any>>(
    input: T,
    schema: Schema
): boolean {
    if (typeof input !== "object" || input === null) {
        throw new Error("Invalid input: expected an object.");
    }

    if (typeof schema !== "object" || schema === null) {
        throw new Error("Invalid schema: expected an object.");
    }

    const errors: string[] = [];

    for (const [key, expectedType] of Object.entries(schema)) {
        if (!(key in input)) {
            errors.push(`Missing required key: ${key}`);
            continue;
        }

        const value = input[key];
        const actualType = Array.isArray(value) ? "array" : typeof value;

        if (actualType !== expectedType) {
            errors.push(
                `Invalid type for key "${key}": expected "${expectedType}", got "${actualType}".`
            );
        }
    }

    for (const key of Object.keys(input)) {
        if (!(key in schema)) {
            errors.push(`Unexpected key: ${key}`);
        }
    }

    if (errors.length > 0) {
        throw new Error(`Validation failed: \n${errors.join("\n")}`);
    }

    return true;
}
