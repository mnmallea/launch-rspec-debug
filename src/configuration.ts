"use strict";

import * as vscode from 'vscode';

const extensionName = 'rspec-debug';

const getConfig = () => vscode.workspace.getConfiguration().get(extensionName) as any;

export function bundlerPath(): string {
    const config = getConfig();
    return config ? config.bundlerPath : undefined || '${workspaceRoot}/bin/bundle';
}
