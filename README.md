# ![](https://fonts.gstatic.com/s/i/materialiconsoutlined/info/v1/24px.svg) SystemKit-JS

This is the JS implementation of the https://github.com/codemodify/SystemKit-SPEC
Check https://github.com/codemodify/SystemKit for as reference implementation

# ![](https://fonts.gstatic.com/s/i/materialiconsoutlined/cloud/v1/24px.svg) Include Hosted
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.9/system.min.js"></script>

<script src="https://github.com/codemodify/SystemKit-JS/releases/download/v1.0/SystemKit-JS.js"></script>
```

# ![](https://fonts.gstatic.com/s/i/materialiconsoutlined/cloud_off/v1/24px.svg) Include Offline
```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/systemjs/6.1.9/system.min.js"></script>
<script src="SystemKit-JS.js"></script>
```

# ![](https://fonts.gstatic.com/s/i/materialiconsoutlined/book/v1/24px.svg) Dox
See more in each readme file per folder

# ![](https://fonts.gstatic.com/s/i/materialiconsoutlined/code/v1/24px.svg) Code Sample
```javascript
let logging = SystemKit.Logging;
let loggingC = SystemKit.Logging.Contracts;
let loggingF = SystemKit.Logging.Formatters;
let loggingM = SystemKit.Logging.Mixers;
let loggingP = SystemKit.Logging.Persisters;

logging.Init(
	loggingF.NewSimpleFormatterLogger(
		loggingM.NewMultiLogger(
			[
				loggingP.NewConsoleLogger(loggingC.TypeDebug),
				loggingP.NewMemoryLogger(loggingC.TypeDebug)
			],
		),
	),
)

...

logging.Instance().LogTrace("Trace line")
logging.Instance().LogPanic("Panic line")
logging.Instance().LogFatal("Fatal line")
logging.Instance().LogError("Error line")
logging.Instance().LogWarning("Warning line")
logging.Instance().LogInfo("Info line")
logging.Instance().LogDebug("Debug line")

```