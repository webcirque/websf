# WEBSF.Main
The core for other modules to load.
## EnvironmentDetails (WEnv.js)
This module adds a constant named **wenv** to the global scope, which contains details of the running environment.

It uses environment-specific checks and userAgent string to get and verify the type and version of the environment.

Thanks to @[mumuy](https://github.com/mumuy) on GitHub for [mumuy/browser](https://github.com/mumuy/browser/), and @RobW on StackOverflow for his/her amazing answer!
## TextAlter (textAlter.js)
This module gives scripts ability to use formatted strings in any manner.
## LoadManager (loadMgr.js)
This module tries to load scripts in coders' desired manner.
