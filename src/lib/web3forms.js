const WEB3FORMS_ACCESS_KEY = "0e4ee18f-d6df-442b-b282-91ca2c8a3f71";
const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";

export async function submitToWeb3Forms(fields) {
    const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            access_key: WEB3FORMS_ACCESS_KEY,
            from_name: "Ash's Cravings Website",
            botcheck: false,
            ...fields,
        }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok || !data || data.success !== true) {
        throw new Error(data?.message || "Submission failed");
    }

    return data;
}
