
/// <reference path="ConnectMoon.Constants.ts" />
/// <reference path="ConnectMoon.Models.Device.ts" />
/// <reference path="SystemKit-JS.d.ts" />

namespace ConnectMoon {
	// expects SystemKit from `https://github.com/codemodify/SystemKit-JS`
	// declare var SystemKit;

	import helpersEvents = SystemKit.Helpers;
	import helpersNetworking = SystemKit.Helpers;
	import helpersStrings = SystemKit.Helpers;
	import helpersObjects = SystemKit.Helpers;
	import helpersUris = SystemKit.Helpers;
	import helpersGuids = SystemKit.Helpers;
	import helpersTasks = SystemKit.Helpers;
	import helpersNumbers = SystemKit.Helpers;

	import constants = ConnectMoon.Constants;

	export class Client {
		private _token: string = null;

		public Events: {
			DeviceConnected: helpersEvents.Event<{ DeviceId: string }>,
			DeviceDisconnected: helpersEvents.Event<{ DeviceId: string }>,

			DeviceServiceConnect: helpersEvents.Event<{ DeviceId: string, ServiceId: string }>,
			DeviceServiceDisconnect: helpersEvents.Event<{ DeviceId: string, ServiceId: string }>,

			DeviceScriptExec: helpersEvents.Event<{ DeviceId: string, Payload: string }>,
		}

		constructor(authToken: string) {
			var thisRef = this;

			thisRef._token = authToken;

			thisRef.Events = {
				DeviceConnected: new helpersEvents.Event<{ DeviceId: string }>(),
				DeviceDisconnected: new helpersEvents.Event<{ DeviceId: string }>(),

				DeviceServiceConnect: new helpersEvents.Event<{ DeviceId: string, ServiceId: string }>(),
				DeviceServiceDisconnect: new helpersEvents.Event<{ DeviceId: string, ServiceId: string }>(),

				DeviceScriptExec: new helpersEvents.Event<{ DeviceId: string, Payload: string }>(),
			}
		}

		public GetDevices(done: any) {
			var thisRef = this;

			helpersTasks.Run()
				.This((localDone) => {
					helpersNetworking.DoPostCall(
						constants.k_RemoteitGraphQLEndpoint,
						{
							"Content-Type": "application/json",
							"token": thisRef._token
						},
						JSON.stringify({
							"query": `{
                              login {
                                devices {
                                  items {
                                    id
                                    name
                                    services {
                                      id
                                      access {
                                        scripting
                                      }
                                      bulk
                                      created
                                      name
                                      port
                                      title
                                      type
                                      version
                                      endpoint {
                                        id
                                        city
                                        connectionType
                                        continent
                                        country
                                        externalAddress
                                        internalAddress
                                        isp
                                        latitude
                                        longitude
                                        postal
                                        region
                                        serverAddress
                                        timestamp
                                        timezone
                                        availability
                                        instability
                                        offlineCount
                                        offlineDuration
                                        offlineSince
                                        onlineCount
                                        onlineDuration
                                        onlineSince
                                        pingInterval
                                        state
                                        sessions {
                                          id
                                          timestamp
                                          source {
                                            id
                                            city
                                            connectionType
                                            continent
                                            country
                                            externalAddress
                                            internalAddress
                                            isp
                                            latitude
                                            longitude
                                            postal
                                            region
                                            serverAddress
                                            timestamp
                                            timezone
                                            type
                                            platform
                                            proxy
                                            version
                                          }
                                          target {
                                            id
                                            city
                                            connectionType
                                            continent
                                            country
                                            externalAddress
                                            internalAddress
                                            isp
                                            latitude
                                            longitude
                                            postal
                                            region
                                            serverAddress
                                            timestamp
                                            timezone
                                            availability
                                            instability
                                            offlineCount
                                            offlineDuration
                                            offlineSince
                                            onlineCount
                                            onlineDuration
                                            onlineSince
                                            pingInterval
                                            state
                                          }
                                        }
                                      }
                                    }
                                  }
                                }
                              }
							}`
						}),
						function (data) {
							localDone(data);
						},
						function (err) {
							localDone.fail(err);
						},
					)
				})
				.Then((localDone, data) => {
					// DOX: expects `data.login.devices.items` as an array

					var gqlDevices = data.data.login.devices.items as Models.GQLDevice[];

					var devices = [];
					for (var i = 0; i < gqlDevices.length; i++) {
						devices.push(new Models.Device({
							Id: gqlDevices[i].id,
							Name: gqlDevices[i].name,

							Latitude: 37.7927731, // helpersNumbers.RandomFloat(30, 40),   // lat: 37.7927731, lng: -122.4054696
							Longitude: -122.4054696 //helpersNumbers.RandomFloat(-130, -120)
						}))
					}

					done(devices);
					localDone();
				})
				.OnError((err) => {
					done.fail(err);
				});
		}
	}

	export function NewClient(done: any, user: string, pass: string, developerKey: string) {
		helpersTasks.Run()
			.This((localDone) => {
				helpersNetworking.DoPostCall(
					constants.k_UserLoginEndpoint,
					{
						"Content-Type": "application/json",
						"developerKey": developerKey
					},
					JSON.stringify({
						"username": user,
						"password": pass
					}),
					function (data) {
						localDone(data);
					},
					function (err) {
						localDone.fail(err);
					},
				)
			})
			.Then((localDone, data) => {
				var client = new Client(data.token);
				done(client);
				localDone();
			})
			.OnError((err) => {
				done.fail(err);
			});
	}
}
