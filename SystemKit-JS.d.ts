declare namespace SystemKit.Config {
    interface IPersister {
        Save(data: any, done: any): any;
        Read(dataContainer: any, done: any): any;
    }
    interface Config {
        CreateOrReturnInstance(): Config;
        DefaultConfig(): Config;
        String(): string;
    }
}
declare namespace SystemKit.Config {
    import configContracts = SystemKit.Config;
    class LocalStoragePersister implements configContracts.IPersister {
        private _key;
        constructor(key: string);
        Save(data: any, done: any): void;
        Read(dataContainer: any, done: any): void;
    }
}
declare namespace SystemKit.Helpers {
    interface Delegate<T> {
        (data?: T): void;
    }
    interface IEvent<T> {
        OnHappen(delegate: Delegate<T>): void;
        Notify(data?: T): void;
        RemoveHandler(delegate: Delegate<T>): void;
    }
    class Event<T> implements IEvent<T> {
        private _delegates;
        OnHappen(delegate: Delegate<T>): void;
        Notify(data?: T): void;
        RemoveHandler(delegate: Delegate<T>): void;
    }
}
declare namespace SystemKit.Helpers {
    function NewGUID(): string;
}
declare namespace SystemKit.Helpers {
    function DoGetCall(url: any, headers: any, onSuccess: any, onError: any): void;
    function DoPostCall(url: any, headers: any, data: any, onSuccess: any, onError: any): void;
    function DoPutCall(url: any, headers: any, data: any, onSuccess: any, onError: any): void;
    function DoDeleteCall(url: any, headers: any, onSuccess: any, onError: any): void;
}
declare namespace SystemKit.Helpers {
    function RandomInt(min: number, max: number): number;
    function RandomFloat(min: number, max: number): number;
}
declare namespace SystemKit.Helpers {
    function IsNullOrEmpty(object: any): boolean;
    function CloneObject(object: any): any;
}
declare namespace SystemKit.Helpers {
    function Replace(originalString: string, stringToFind: string, replacingString: string, count: number): string;
    function ReplaceAll(originalString: string, stringToFind: string, replacingString: string): string;
    function ReplaceAllInArray(originalString: string, stringsToFind: string[], replacingString: string): string;
    function RemoveIfExistsAtEnd(originalString: string, stringToFind: string): string;
    function StartsWith(originalString: string, stringToFind: string): boolean;
    function EndsWith(originalString: string, stringToFind: string): boolean;
    function Contains(originalString: string, stringToFind: string): boolean;
}
declare namespace SystemKit.Helpers {
    class TaskRunner {
        private _asq;
        constructor();
        Parallel(...args: any[]): TaskRunner;
        This(p: any): TaskRunner;
        Then(p: any): TaskRunner;
        OnError(p: any): TaskRunner;
    }
    function Run(): TaskRunner;
}
declare namespace SystemKit.Helpers {
    import helpersEvents = SystemKit.Helpers;
    interface IThread {
        Start(): any;
        Stop(): any;
        IsRunning(): any;
    }
    class PeriodicalThread implements IThread {
        private _threadId;
        private _threadedCode;
        private _period;
        constructor(threadedCode: any, period: number);
        Start(): void;
        Stop(): void;
        IsRunning(): boolean;
    }
    class Semaphore {
        private _count;
        private _monitoringThread;
        WhenAllThreadsFinsihed: helpersEvents.Event<void>;
        constructor();
        ThreadStarted(): void;
        ThreadFinished(): void;
    }
}
declare namespace SystemKit.Helpers {
    class Uri {
        Protocol: string;
        Host: string;
        Hostname: string;
        Port: string;
        Pathname: string;
        Hash: string;
        Search: string;
        ToHref(): string;
    }
    function Parse(url: string): Uri;
}
declare namespace SystemKit.Logging.Contracts {
    enum LogType {
        TypeDisable = 0,
        TypeTrace = 1,
        TypePanic = 2,
        TypeFatal = 3,
        TypeError = 4,
        TypeWarning = 5,
        TypeInfo = 6,
        TypeDebug = 7
    }
    var LogTypeAsString: string[];
    type Fields = any;
    class LogEntry {
        Time: number;
        Type: LogType;
        Tag: string;
        Level: number;
        Message: string;
        constructor(init?: Partial<LogEntry>);
    }
    interface Logger {
        Log(logEntry: LogEntry): any;
    }
    interface EasyLogger extends Logger {
        KeepOnlyLogs(logTypes: LogType[]): any;
        LogPanicWithTagAndLevel(tag: string, level: number, message: string): any;
        LogFatalWithTagAndLevel(tag: string, level: number, message: string): any;
        LogErrorWithTagAndLevel(tag: string, level: number, message: string): any;
        LogWarningWithTagAndLevel(tag: string, level: number, message: string): any;
        LogInfoWithTagAndLevel(tag: string, level: number, message: string): any;
        LogDebugWithTagAndLevel(tag: string, level: number, message: string): any;
        LogTraceWithTagAndLevel(tag: string, level: number, message: string): any;
        LogPanic(message: string): any;
        LogFatal(message: string): any;
        LogError(message: string): any;
        LogWarning(message: string): any;
        LogInfo(message: string): any;
        LogDebug(message: string): any;
        LogTrace(message: string): any;
        LogPanicWithFields(fields: Fields): any;
        LogFatalWithFields(fields: Fields): any;
        LogErrorWithFields(fields: Fields): any;
        LogWarningWithFields(fields: Fields): any;
        LogInfoWithFields(fields: Fields): any;
        LogDebugWithFields(fields: Fields): any;
        LogTraceWithFields(fields: Fields): any;
    }
}
declare namespace SystemKit.Logging.Persisters {
    import loggingC = SystemKit.Logging.Contracts;
    class consoleLogger implements loggingC.Logger {
        logUntil: loggingC.LogType;
        Log(logEntry: loggingC.LogEntry): void;
        constructor(init?: Partial<consoleLogger>);
    }
    function NewConsoleLogger(logUntil: loggingC.LogType): loggingC.Logger;
}
declare namespace SystemKit.Logging.housekeeping {
    import loggingC = SystemKit.Logging.Contracts;
    class defaultHelperImplmentation implements loggingC.EasyLogger {
        loggerToSendTo: loggingC.Logger;
        logTypes: loggingC.LogType[];
        Log(logEntry: loggingC.LogEntry): void;
        KeepOnlyLogs(logTypes: loggingC.LogType[]): void;
        LogPanicWithTagAndLevel(tag: string, level: number, message: string): void;
        LogFatalWithTagAndLevel(tag: string, level: number, message: string): void;
        LogErrorWithTagAndLevel(tag: string, level: number, message: string): void;
        LogWarningWithTagAndLevel(tag: string, level: number, message: string): void;
        LogInfoWithTagAndLevel(tag: string, level: number, message: string): void;
        LogDebugWithTagAndLevel(tag: string, level: number, message: string): void;
        LogTraceWithTagAndLevel(tag: string, level: number, message: string): void;
        LogPanic(message: string): void;
        LogFatal(message: string): void;
        LogError(message: string): void;
        LogWarning(message: string): void;
        LogInfo(message: string): void;
        LogDebug(message: string): void;
        LogTrace(message: string): void;
        LogPanicWithFields(fields: loggingC.Fields): void;
        LogFatalWithFields(fields: loggingC.Fields): void;
        LogErrorWithFields(fields: loggingC.Fields): void;
        LogWarningWithFields(fields: loggingC.Fields): void;
        LogInfoWithFields(fields: loggingC.Fields): void;
        LogDebugWithFields(fields: loggingC.Fields): void;
        LogTraceWithFields(fields: loggingC.Fields): void;
    }
    function NewDefaultHelperImplmentation(logger: loggingC.Logger): loggingC.EasyLogger;
}
declare namespace SystemKit.Logging {
    import loggingC = SystemKit.Logging.Contracts;
    var instance: loggingC.EasyLogger;
    function Instance(): loggingC.EasyLogger;
    function Init(logger: loggingC.EasyLogger): void;
    function NewConsoleLogger(): loggingC.EasyLogger;
    function NewEasyLoggerForLogger(logger: loggingC.Logger): loggingC.EasyLogger;
}
