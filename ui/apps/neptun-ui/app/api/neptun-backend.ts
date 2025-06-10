import { SystemState } from "@neptun/data-model";

export class NeptunBackend {
    apiUrl: string;

    /**
     * Creates an instance of NeptunBackend.
     * @param apiUrl - The base URL for the Neptun API.
     */
    constructor(apiUrl: string) {
        this.apiUrl = apiUrl;
    }

    async getSystemState(): Promise<SystemState> {
        try {
            const response = await fetch(`${this.apiUrl}/water`);
            return response.json() as Promise<SystemState>;
        } catch (error) {
            console.error('Error fetching system state:', error);
            throw error;
        }
    }
}