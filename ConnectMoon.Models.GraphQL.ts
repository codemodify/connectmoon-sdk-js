
/// <reference path="ConnectMoon.Models.Camera.ts" />

namespace ConnectMoon.Models {

	export class GQLSession {
		public Id: string;
		public Timestamp: string;
		public Source: GQLUserEndpoint;
		public Target: GQLServiceEndpoint;

		public constructor(init?: Partial<GQLSession>) {
			(<any>Object).assign(this, init);
		}
	}

	export class GQLServiceEndpoint {
		public Id: string;

		public City: string;
		public ConnectionType: string;
		public Continent: string;
		public Country: string;
		public ExternalAddress: string;
		public InternalAddress: string;
		public ISP: string;
		public Latitude: string;
		public Longitude: string;
		public Postal: string;
		public Region: string;
		public ServerAddress: string;
		public Timestamp: string;
		public TimeZone: string;
		public Sessions: GQLSession[];

		public Availability: number;
		public Instability: number;

		public OfflineCount: number;
		public OfflineDuration: number;
		public OfflineSince: number;

		public OnlineCount: number;
		public OnlineDuration: number;
		public OnlineSince: number;

		public PingInterval: number;
		public State: string;
		// public Service: GQLService; ??

		public constructor(init?: Partial<GQLServiceEndpoint>) {
			(<any>Object).assign(this, init);
		}
	}

	export class GQLUserEndpoint {
		public Id: string;
		public City: string;
		public ConnectionType: string;
		public Continent: string;
		public Country: string;
		public ExternalAddress: string;
		public InternalAddress: string;
		public ISP: string;
		public Latitude: string;
		public Longitude: string;
		public Postal: string;
		public Region: string;
		public ServerAddress: string;
		public Timestamp: string;
		public TimeZone: string;
		// public Sessions: GQLSession[]; ??
		public Type: string;
		public Platform: string;
		public Proxy: boolean;
		// public User: GQLUser; ??
		public Version: string;

		public constructor(init?: Partial<GQLUserEndpoint>) {
			(<any>Object).assign(this, init);
		}
	}

	export class GQLUser {
		public Id: string;
		public Created: string;
		public Email: string;
		// public Endpoints: GQLUserEndpoint[]; ??
		public Language: string;
		public LastLogin: string;
		public Timezone: string;

		public constructor(init?: Partial<GQLUser>) {
			(<any>Object).assign(this, init);
		}
	}

	export class GQLAccess {
		public Scripting: boolean;
		public User: GQLUser;

		public constructor(init?: Partial<GQLAccess>) {
			(<any>Object).assign(this, init);
		}
	}

	export class GQLService {
		public Id: string;
		public Access: GQLAccess;
		public Application: number;
		public Bulk: boolean;
		public Created: string;
		public Endpoint: GQLServiceEndpoint;
		public Name: string;
		public Port: number;
		public Title: string;
		public Type: string;
		public Version: string;

		public constructor(init?: Partial<GQLService>) {
			(<any>Object).assign(this, init);
		}
	}

	export class GQLDevice {
		public id: string;
		public name: string;
		public services: GQLService[];

		public constructor(init?: Partial<GQLDevice>) {
			(<any>Object).assign(this, init);
		}
	}
}
