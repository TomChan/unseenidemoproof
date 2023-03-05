import { EventEmitter } from 'node:events';
import { BaseEventHandler, ParsedEventData } from '../model/baseEventHandler';
import { Web3EventQueue } from './SQSClient';

export class Web3EventEmitter extends EventEmitter {
    static startApp(eventListeners: BaseEventHandler[]) {
        const INSTANCE = new Web3EventEmitter(eventListeners);
        // INSTANCE.emit(`POLYGON:0x2791bca1f2de4661ed88a30c99a7a9449aa84174:Transfer`,
        //     {
        //         chain: 'POLYGON',
        //         contractAddress: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
        //         eventData: {
        //             from: '0x1',
        //             to: '0x2',
        //             value: { type: 'BigNumber', hex: '0x01308de6' }
        //         }
        //     }
        // );
        INSTANCE.start();
    }

    private pollInterval: number;

    constructor(eventListeners: BaseEventHandler[], pollInterval: number = 10000) {
        super();
        this.pollInterval = pollInterval;
        eventListeners.forEach(eventListener => {
            eventListener.registerOnEvents(this);
        })
    }

    listenToEventMesssage(sqs: Web3EventQueue) {
        // eslint-disable-next-line no-console
        console.log('Started pollling messages!');
        setInterval(() => {
            sqs.pollQueue((parsedEventData: ParsedEventData) => {
                // eslint-disable-next-line no-console
                console.log(`Event triggered on ${parsedEventData.chain}:${parsedEventData.contractAddress}:${parsedEventData.eventName}`);
                this.emit(
                    `${parsedEventData.chain}:${parsedEventData.contractAddress}:${parsedEventData.eventName}`,
                    parsedEventData
                );
            })
        }, this.pollInterval); // Poll every 10 seconds (adjust as needed)
    }

    addEventListener(eventListener: BaseEventHandler) {
        eventListener.registerOnEvents(this);
    }

    start() {
        this.listenToEventMesssage(new Web3EventQueue());
    }
}

