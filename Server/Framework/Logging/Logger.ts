import { Logger as WinstonLogger, LoggerInstance as WinstonLoggerInstance, transports } from 'winston';
import * as Guid from 'guid';
import { AppSettings } from '../../Settings/AppSettings';
import { CommunicationDirection } from './CommunicationDirection';
export interface ILoggerOptions {
    DebugLogPath: string;
    InfoLogPath: string;
    ErrorDetailLogPath: string;
}

export class Logger {

    private static _instance: Logger;
    public static get Instance(): Logger {
        if (!Logger._instance) {
            Logger._instance = new Logger();
        }
        return Logger._instance;
    }

    private _infoLogger: WinstonLoggerInstance;
    private _debugLogger: WinstonLoggerInstance;
    private _errorDetailLogger: WinstonLoggerInstance;

    private _getTimestamp(): string {
        // let d: Date = new Date();
        // return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}.${d.getMilliseconds()}`;
        return new Date().toISOString();
    }

    private _getLogMessage(
        type: string,
        message: string, caller: Function | string = null,
        messageName: string = '',
        commDir: CommunicationDirection = CommunicationDirection.Neutral,
        logEntryId: string = ''
    ): string {
        let timestamp: string = this._getTimestamp(),
            sessionId: string = AppSettings.SessionId,
            address: string = AppSettings.IpAddress,
            port: number = AppSettings.Port,
            commDirStr: string,
            callerName = '';

        switch (commDir) {
            case CommunicationDirection.Input:
                commDirStr = 'i';
                break;
            case CommunicationDirection.Output:
                commDirStr = 'o';
                break;
            case CommunicationDirection.Neutral:
            default:
                commDirStr = '-';
                break;
        }

        if (typeof caller === 'string') {
            callerName = caller;
        }
        else if (caller) {
            callerName = caller.constructor.name;
        }

        return `${timestamp} ${type} --- ${callerName} : ${address} | ${port} | ${commDirStr} | ${sessionId} | ${messageName} | ${message}`
            + (logEntryId ? ` | ${logEntryId}` : '');
    }

    public Initialize(options: ILoggerOptions) {
        this._infoLogger = new WinstonLogger({
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: options.InfoLogPath
                })
            ]
        });

        this._debugLogger = new WinstonLogger({
            level: 'debug',
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: options.DebugLogPath
                })
            ]
        });

        this._errorDetailLogger = new WinstonLogger({
            transports: [
                new transports.Console(),
                new transports.File({
                    filename: options.ErrorDetailLogPath
                })
            ]
        });
    }

    public Debug(message: string, caller?: any, messageName?: string, commDir?: CommunicationDirection): void {
        if (AppSettings.Get('IsDebugMode')) {
            let logMessage: string = this._getLogMessage('DEBUG', message, caller, messageName, commDir);
            this._debugLogger.debug(logMessage);
        }
    }

    public Info(message: string, caller?: any, messageName?: string, commDir?: CommunicationDirection): void {
        let logMessage: string = this._getLogMessage('INFO', message, caller, messageName, commDir);
        this._infoLogger.info(logMessage);
    }

    public Warn(message: string, caller?: any, messageName?: string, commDir?: CommunicationDirection): void {
        let logMessage: string = this._getLogMessage('WARN', message, caller, messageName, commDir);
        this._infoLogger.warn(logMessage);
    }

    public Error(error: any, caller?: any, commDir?: CommunicationDirection): void {
        let logEntryId: string = Guid.raw(),
            logMessage: string = this._getLogMessage('ERROR', error.message, caller, error.name, commDir, logEntryId),
            errorDetailMessage: string = this._getLogMessage('ERROR DETAIL', error.stack, caller, error.name, commDir, logEntryId),
            details: string = error.Details && `| ${JSON.stringify(error.Details)}`;
        this._infoLogger.error(logMessage);
        this._errorDetailLogger.error(errorDetailMessage, details);
    }
}
