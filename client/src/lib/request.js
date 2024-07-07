export default async function requestUsers() {
    const domain = import.meta.env.VITE_SERVER_DOMAIN;

    const req = new Request(`${domain}/user/`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    try {
        const res = await fetch(req);

        if (!res.ok) {
            throw new Error(`${res.status}`);
        }

        const data = await res.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
}
