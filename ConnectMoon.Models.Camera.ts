namespace ConnectMoon.Models {
	export class Camera {
		public Id: string;
		public Name: string;
		public StreamUrl: string;
		public LastPicUrl: string;
		public IsStreaming: boolean;

		public constructor(init?: Partial<Camera>) {
			(<any>Object).assign(this, init);
		}
	}
}
