"use strict";

import * as vscode from "vscode";
import { debug } from "util";

export function runSpecFile() {
    vscode.debug.startDebugging(undefined, 'rspec-debug')
}
