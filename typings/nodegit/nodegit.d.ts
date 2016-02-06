// Type definitions for nodegit 0.11.0
// Project: https://github.com/nodegit/nodegit/
// Definitions by: Roger Chen <https://github.com/rcchen/>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/// <reference path="../es6-promise/es6-promise.d.ts" />

declare module "nodegit" {

  export class Reference {
    static nameToId(repository: Repository, headReference: string);
  }

  export class Repository {
    static init(repoPath: string, isBare: number): Promise<Repository>;
    static open(repoPath: string): Promise<Repository>;
    createCommit(headReference: string, author: Signature, committer: Signature,
        message: string, oid: any, parent: any[]): Promise<String>;
  }

  export class Signature {
    static create(name: string, email: string, timestamp: number, offset: number);
  }
}
