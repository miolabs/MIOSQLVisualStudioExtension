import * as vscode from 'vscode';

/**
 * Represents the connection information for a PostgreSQL database venue
 */
export interface VenueConnectionInfo {
    host: string;
    port: number;
    database: string;
    user: string;
    password: string;
    schema?: string;
    ssl?: boolean;
}

/**
 * Represents a database venue with its metadata
 */
export interface Venue {
    name: string;
    description: string;
    environment: 'production' | 'staging' | 'development' | 'test';
    isDefault?: boolean;
}

/**
 * Service for managing PostgreSQL database configurations and connections
 * through an external API service that provides venue information
 */
export class ConfigService {
    private static instance: ConfigService;
    private apiUrl: string | undefined;
    private apiToken: string | undefined;
    private secretStorage: vscode.SecretStorage;

    private constructor(context: vscode.ExtensionContext) {
        this.secretStorage = context.secrets;
        this.loadConfiguration();

        // Listen for configuration changes
        vscode.workspace.onDidChangeConfiguration(e => {
            if (e.affectsConfiguration('pgCanvas')) {
                this.loadConfiguration();
            }
        });
    }

    /**
     * Get the singleton instance of the ConfigService
     */
    public static getInstance(context: vscode.ExtensionContext): ConfigService {
        if (!ConfigService.instance) {
            ConfigService.instance = new ConfigService(context);
        }
        return ConfigService.instance;
    }

    /**
     * Load configuration from VS Code settings
     */
    private loadConfiguration(): void {
        const config = vscode.workspace.getConfiguration('pgCanvas');
        this.apiUrl = config.get<string>('venueApiUrl');
        this.apiToken = config.get<string>('apiAuthToken');
    }

    /**
     * Check if the service is properly configured
     */
    public isConfigured(): boolean {
        return !!this.apiUrl && !!this.apiToken;
    }

    /**
     * Get the default venue from configuration
     */
    public getDefaultVenue(): string | undefined {
        const config = vscode.workspace.getConfiguration('pgCanvas');
        return config.get<string>('defaultVenue');
    }

    /**
     * Fetch all available venues from the API
     */
    public async getAvailableVenues(): Promise<Venue[]> {
        // Simulated response - replace with actual API call
        return [
            { name: 'production', description: 'Production Database', environment: 'production' },
            { name: 'staging', description: 'Staging Database', environment: 'staging' },
            { name: 'development', description: 'Development Database', environment: 'development', isDefault: true },
            { name: 'test', description: 'Test Database', environment: 'test' }
        ];
    }

    /**
     * Get connection information for a specific venue
     */
    public async getVenueConnectionInfo(venueName: string, credentials?: { username: string, password: string }): Promise<VenueConnectionInfo> {
        if (!credentials) {
            throw new Error('Database credentials are required');
        }

        // Simulated response based on venue name
        return {
            host: `${venueName}-db.example.com`,
            port: 5432,
            database: venueName,
            user: credentials.username,
            password: credentials.password,
            schema: 'public',
            ssl: venueName === 'production' || venueName === 'staging'
        };
    }

    /**
     * Prompt the user for database credentials
     */
    public async promptForCredentials(venueName: string): Promise<{ username: string, password: string } | undefined> {
        const username = await vscode.window.showInputBox({
            prompt: `Enter username for ${venueName}`,
            placeHolder: 'Username'
        });
        
        if (!username) {
            return undefined;
        }
        
        const password = await vscode.window.showInputBox({
            prompt: `Enter password for ${username}@${venueName}`,
            placeHolder: 'Password',
            password: true
        });
        
        if (!password) {
            return undefined;
        }
        
        return { username, password };
    }
}
