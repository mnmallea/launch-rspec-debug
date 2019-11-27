"use strict";

import * as vscode from "vscode";
import * as childProcess from "child_process";
import { bundlerPath } from "./configuration";
import { resolve } from "url";

export function retrieveSpecInfo(): Promise<SpecInfo> {
    const workspacePath = vscode.workspace.rootPath as string;


    const child = childProcess.spawn(bundlerPath().replace("${workspaceRoot}", workspacePath), ['exec', 'rspec', '-fj', '--dry-run']);

    return new Promise((resolve) => {
        var result = "";

        child.stdout.on("data", (data) => {
            console.log(data.toString());
            result += data;
        });

        child.stderr.on("data", (data) => {
            console.log(data.toString());
        });

        child.on("close", (code, signal) => {
            console.log(`Closed with code: ${code}, singal: ${signal}`);
            resolve(result);
        });
    });
}

interface SpecInfo { }
