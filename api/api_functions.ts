const api_base_url: string = "http://192.168.1.8:3000";

export async function send_api(endpoint: string, data: object | null = null) {
    try {
        console.log("DATA: ");
        console.log(data);
        const raw_response = await fetch(api_base_url+endpoint, {
            method: "POST",
            headers: {
                "authorization": "IA9as9dASya9fashi12raCasdwq",
                "Content-Type": data ? "application/json" : "text/plain"
            },
            body: JSON.stringify(data)
        });

        const response = await raw_response.json();

        console.log("RESPONSE:");
        console.log(response);
        
        const error = response.error_code;
        
        // If there's an error
        if(error) {
            console.warn(error);
        }
        
        return {
            success: raw_response.ok,
            data: response,
            error: error
        };
    }
    catch(error) {
        return {
            success: false,
            data: null,
            error: error
        };
    }

}