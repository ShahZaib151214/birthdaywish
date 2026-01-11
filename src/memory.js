export const memory = {
    // Birthday date: Month (0-11) or (1-12)? JS uses 0-11 for Date, but let's use 1-12 for clarity and convert internally.
    // Actually, consistency with Themes (months) is key. Let's use 1-12.
    date: {
        day: 7,
        month: 9, // December
        year: 2025,
    },
    name: "Shaheer Ahmad",
    from: "Shah Zaib",
    memories: [
        {
            image: "https://images.unsplash.com/photo-1544465544-1b71aee9dfa3?auto=format&fit=crop&q=80&w=1000",
            message: "Do you remember this day? We laughed so hard our stomachs hurt!",
        },
        {
            image: "https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&q=80&w=1000",
            message: "Exploring the unknown together. Best trip ever.",
        },
        {
            image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&q=80&w=1000",
            message: "Just a random nice evening. You looked great!",
        },
        // Developer can add more memories here
    ]
};
