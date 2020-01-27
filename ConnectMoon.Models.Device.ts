
/// <reference path="ConnectMoon.Models.Camera.ts" />

namespace ConnectMoon.Models {
	export class Device {
		public Id: string;
		public Type: string;
		public Name: string;

		public IsConnected: boolean;
		public ConnectedAt: string;
		public DisconnectedAt: string;

		public Telemetry: any[];
		public Cameras: Camera[];

		public Latitude: number;
		public Longitude: number;

		public constructor(init?: Partial<Device>) {
			(<any>Object).assign(this, init);
		}
	}
}
