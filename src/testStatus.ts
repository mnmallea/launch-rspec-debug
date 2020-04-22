'use strict'

import * as vscode from 'vscode'

export const testStatus: TestStatus = {}

interface TestStatus {
    lastConfiguration?: vscode.DebugConfiguration;
}
