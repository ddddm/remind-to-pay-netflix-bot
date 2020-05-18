export const success = (body: string) => {
    return {
        statusCode: 200,
        body,
    }
}

export const failure = (body: string) => {
    return {
        statusCode: 500,
        body,
    }
} 