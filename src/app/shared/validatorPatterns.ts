interface Patterns {
    [key: string]: string
};

const patterns: Patterns = {
    email: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"
};

export default patterns;