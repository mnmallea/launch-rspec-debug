"use strict";

import * as vscode from "vscode";
import { debug } from "util";

export function runSpecFile() {
    const debugConfiguration: vscode.DebugConfiguration = {
        type: 'Ruby',
        name: 'Launch',
        request: 'launch',
        program: pathToBundler(),
        args: ['exec', 'rspec', '-fd', '${file}']
    };
    vscode.debug.startDebugging(currentFolder, debugConfiguration);
}

export function runSpecFileAtCurrentLine() {
    if (!vscode.window.activeTextEditor) { return; }

    const line: number = vscode.window.activeTextEditor.selection.active.line;

    const debugConfiguration: vscode.DebugConfiguration = {
        type: 'Ruby',
        name: 'Launch',
        request: 'launch',
        program: pathToBundler(),
        args: ['exec', 'rspec', '-fd', '${file}:' + line.toString()]
    };
    vscode.debug.startDebugging(currentFolder, debugConfiguration);
}

const currentFolder: vscode.WorkspaceFolder | undefined = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;

function pathToBundler(): string { //TODO: parametrize path to bundler
    return '${workspaceRoot}/bin/bundle';
}

