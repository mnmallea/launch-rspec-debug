"use strict";

import * as vscode from "vscode";
import { testStatus } from './testStatus';
import { bundlerPath } from './configuration';

export function runSpecFile() {
    runConfiguration(buildDebugConfiguration({ currentFile: true }));
}

export function runSpecFileAtCurrentLine() {
    if (!vscode.window.activeTextEditor) { return; }

    const line: number = vscode.window.activeTextEditor.selection.active.line;

    runConfiguration(buildDebugConfiguration({ currentFile: true, line }));
}

export function runAllSpecsInProject() {
    runConfiguration(buildDebugConfiguration());
}

export function runLastConfiguration() {
    if (testStatus.lastConfiguration) {
        runConfiguration(testStatus.lastConfiguration);
    } else {
        vscode.window.showErrorMessage('Last configuration doesn´t exist');
    }
}

function runConfiguration(configuration: vscode.DebugConfiguration) {
    vscode.debug.startDebugging(currentFolder, configuration);
    testStatus.lastConfiguration = configuration;
}

const currentFolder: vscode.WorkspaceFolder | undefined = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;



function buildDebugConfiguration(options: DebugOptions = {}): vscode.DebugConfiguration {
    return {
        type: 'Ruby',
        name: 'Launch',
        request: 'launch',
        program: options.bundlerPath || bundlerPath(),
        args: ['exec', 'rspec', '--force-color', '-fd',
            options.currentFile ? options.line ? `\${file}:${options.line}` : '${file}' : null]
            .filter(Boolean)
    };
}

interface DebugOptions {
    bundlerPath?: string;
    currentFile?: boolean;
    line?: number;
}

