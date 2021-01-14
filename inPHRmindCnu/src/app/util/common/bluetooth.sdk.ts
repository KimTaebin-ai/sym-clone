import {Platform} from '@ionic/angular';
import {BLE} from '@ionic-native/ble/ngx';
import {Observable} from 'rxjs';
import {DeviceData} from '../../mind-module/data/device.data';
import {ServiceData} from '../../mind-module/data/service.data';

/**
 * 안드로이드 및 IOS 에서 사용되는 블루투스 SDK
 * 1. 주위에 블루투스 장비를 검색
 * 2. 검색된 블루투스 중 연결이 필요한 장비에 대해서 연결
 * 3. 연결된 장비에 데이터 수신 설정
 * 4. 장비에 발생되는 이벤트에 따른 데이터 수신
 */
export class BluetoothSdk {

    private scanDevices: Array<DeviceData>;
    private stopTimeout = -1;

    constructor(
        public platform: Platform,
        public ble: BLE
    ) {
        // Init
        this.init();
    }

    /**
     * SDK 초기화
     */
    public init() {
        if (this.platform.is('cordova')) {
            this.ble.isEnabled().then(obj => {
            }).catch(err => {
                this.ble.enable().then(obj => {
                });
            });
        }
    }

    /**
     * 주변 디바이스 검색 시작
     */
    public startScan(timeout?): Observable<DeviceData> {
        return new Observable<DeviceData>(observer => {
            // Buf Init
            this.scanDevices = new Array();

            // Start Scan
            const device: DeviceData = new DeviceData();
            device.status = 'start';
            observer.next(device);
            console.log(observer, 'observer')
            this.ble.startScan([]).subscribe(obj => {
                console.log(obj, 'obj')
                if (obj.name) {
                    const exist = this.scanDevices.some(function(item) {
                        console.log(item, 'id')
                        return item.address.includes(obj.id);
                    });
                    console.log(exist, 'exist');
                    if (!exist) {
                        const deviceInfo: DeviceData = new DeviceData();
                        deviceInfo.status = 'device';
                        deviceInfo.address = obj.id;
                        deviceInfo.name = obj.name;
                        deviceInfo.rssi = obj.rssi;
                        this.scanDevices.push(deviceInfo);
                        console.log(this.scanDevices, 'scanInfo')
                        console.log(this.scanDevices, 'scanInfo')
                        observer.next(deviceInfo);
                    }
                }
            }, err => {
                observer.error(err);
            });
            alert(timeout)
            // Set Scan Timeout
            if (!timeout) {
                timeout = 5000;
            }
            this.stopTimeout = 0;
            // @ts-ignore
            this.stopTimeout = setTimeout(() => {
                this.stopScan().then(() => {
                    this.stopTimeout = -1;
                    alert('stop')
                    const deviceInfo: DeviceData = new DeviceData();
                    deviceInfo.status = 'stop';
                    deviceInfo.data = this.scanDevices
                    observer.next(deviceInfo);
                    observer.complete();
                }).catch(err => {
                    observer.error(err);
                });
            }, timeout);
        });
    }

    /**
     * 주변 디바이스 검색 종료
     */
    public stopScan(): Promise<any> {
        if (this.stopTimeout !== -1){
            clearTimeout(this.stopTimeout);
            this.stopTimeout = -1;
        }
        return new Promise<any>((resolve, reject) => {
            this.ble.stopScan().then(obj => {
                resolve(true);
            }).catch(err => {
                reject(false);
            });
        });
    }

    /**
     * 디바이스 연결
     */
    public connect(address): Observable<any> {
        return new Observable<any>(observer => {
            // 이미 연결중인지 체크
            this.isConnected(address).subscribe(result => {
                // 연결 중이면 연결 중지 후 재 연결
                if (result) {
                    this.ble.disconnect(address).then(() => {
                        this.connecting(address).subscribe(obj => {
                            observer.next(obj);
                        }, err => {
                            observer.error(err);
                        });
                    });
                } else {
                    this.connecting(address).subscribe(obj => {
                        observer.next(obj);
                    }, err => {
                        observer.error(err);
                    });
                }
            }, err => {
                // 연결 안되어있을 시
                this.connecting(address).subscribe(obj => {
                    observer.next(obj);
                }, error => {
                    observer.error(error);
                });
            });
        });
    }

    /**
     * 디바이스 연결
     */
    private connecting(address): Observable<any> {
        return new Observable<any>(observer => {
            this.ble.connect(address).subscribe(obj => {
                console.log('bluetoothSDK connect obj => ', obj);
                const serviceMap: Map<String, Array<ServiceData>> = new Map();
                if (obj.characteristics) {
                    let services: Array<ServiceData> = null;
                    const chars: Array<any> = obj.characteristics;
                    chars.forEach(item => {
                        const data: ServiceData = new ServiceData();
                        data.service = item.service;
                        data.characteristic = item.characteristic;
                        data.properties = item.properties;
                        data.descriptors = item.descriptors;
                        if (serviceMap.has(data.service)) {
                            services = serviceMap.get(data.service);
                        } else {
                            services = new Array();
                        }
                        services.push(data);
                        serviceMap.set(data.service, services);
                    });
                    observer.next(serviceMap);
                } else {
                    observer.next(obj);
                }
                // observer.complete();
            }, err => {
                observer.error(err);
            });
        });
    }

    /**
     * 디바이스 연결 확인
     */
    private isConnected(address, connecting = false): Observable<any> {
        return new Observable<any>(observer => {
            this.ble.isConnected(address).then(() => {
                // connected
                observer.next(true);
            }, () => {
                // not connected
                if (connecting) {
                    this.connecting(address).subscribe(obj => {
                        observer.next(true);
                    }, err => {
                        observer.error(err);
                    });
                } else {
                    observer.next(false);
                }
            }).catch(err => {
                // connecting error
                if (connecting) {
                    this.connecting(address).subscribe(obj => {
                        observer.next(true);
                    }, error => {
                        observer.error(error);
                    });
                } else {
                    observer.error(err);
                }
            });
        });
    }

    // Read
    public read(address, data): Observable<any> {
        return new Observable<any>(observer => {
            this.isConnected(address, true).subscribe(result => {
                if (result){
                    this.ble.read(address, data.service, data.characteristic).then(obj => {
                        observer.next(obj);
                        observer.complete();
                    }).catch(err => {
                        observer.error(err);
                    });
                }
            }, err => {
                observer.error(err);
            });
        });
    }

    // Notify
    public notify(address, data): Observable<any> {
        return new Observable<any>(observer => {
            this.isConnected(address, true).subscribe(result => {
                observer.next(result);
                if (result) {
                    this.ble.startNotification(address, data.service, data.characteristic).subscribe(buffer => {
                        observer.next(buffer);
                    }, err => {
                        observer.error(err);
                    });
                }
            }, err => {
                observer.error(err);
            });
        });
    }

    // DisNotify
    public disNotify(address, data): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.isConnected(address, true).subscribe(obj => {
                this.ble.stopNotification(address, data.service, data.characteristic).then(obj => {
                    resolve(obj);
                }).catch(err => {
                    reject(err);
                });
            }, err => {
                reject(err);
            });
        });
    }

    // DisConnect
    public disConnect(address): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.ble.disconnect(address).then(() => {
                resolve(true);
            }, err => {
                reject(err);
            });
        });
    }

    // Write
    public write(address, data): Observable<any> {
        return new Observable<any>(observer => {
            this.isConnected(address, true).subscribe(result => {
                if (result) {
                    this.ble.write(address, data.service, data.characteristic, data.value).then(obj => {
                        observer.next(obj);
                        observer.complete();
                    }).catch(err => {
                        console.log('== write err==', err);
                        this.write(address, data);

                    });
                }
            }, err => {
                observer.error(err);
            });
        });
    }

    // writeWithoutResponse
    public writeWithoutResponse(address, data): Observable<any> {
        return new Observable<any>(observer => {
            this.isConnected(address, true).subscribe(obj => {
                this.ble.writeWithoutResponse(address, data.service, data.characteristic, data.value).then(obj => {
                    observer.next(obj);
                    observer.complete();
                }).catch(err => {
                    observer.error(err);
                });
            }, err => {
                observer.error(err);
            });
        });
    }

    public isBonded() {
        return new Observable<any>(observer => {
            this.ble.bondedDevices().then(result => {
                observer.next(result);
            }).catch(err => {
                observer.error(err);
            });
        });
    }
}
