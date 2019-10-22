"use strict";

import * as vscode from "vscode";

export function runSpecFile() {
    vscode.debug.startDebugging(currentFolder, buildDebugConfiguration({ bundlerPath: pathToBundler(), currentFile: true }));
}

export function runSpecFileAtCurrentLine() {
    if (!vscode.window.activeTextEditor) { return; }

    const line: number = vscode.window.activeTextEditor.selection.active.line;

    vscode.debug.startDebugging(currentFolder, buildDebugConfiguration({ bundlerPath: pathToBundler(), currentFile: true, line }));
}

export function runAllSpecsInProject() {
    vscode.debug.startDebugging(currentFolder, buildDebugConfiguration({ bundlerPath: pathToBundler() }));
}

const currentFolder: vscode.WorkspaceFolder | undefined = vscode.workspace.workspaceFolders ? vscode.workspace.workspaceFolders[0] : undefined;

function pathToBundler(): string { //TODO: parametrize path to bundler
    return '${workspaceRoot}/bin/bundle';
}

function buildDebugConfiguration(options: DebugOptions): vscode.DebugConfiguration {
    return {
        type: 'Ruby',
        name: 'Launch',
        request: 'launch',
        program: options.bundlerPath,
        args: ['exec', 'rspec', '--force-color', '-fd',
            options.currentFile ? options.line ? `\${file}:${options.line}` : '${file}' : null]
            .filter(Boolean)
    };
}

interface DebugOptions {
    bundlerPath: string;
    currentFile?: boolean;
    line?: number;
}

