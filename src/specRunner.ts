"use strict";

import * as vscode from "vscode";
import { debug } from "util";

export function runSpecFile() {
    const debugConfiguration: vscode.DebugConfiguration = {
        type: 'Ruby',
        name: 'Launch',
        request: 'launch',
        program: 'bundle',
        args: ['exec', 'rspec', '-fd', '${file}']
    }
    const folder: vscode.WorkspaceFolder | undefined = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined
    vscode.debug.startDebugging(folder, debugConfiguration)
}
