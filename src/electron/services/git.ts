import * as nodeGit from "nodegit";

import path = require("path");

const COMMITTER = nodeGit.Signature.create("FlowAI", "hello@flowai.com", 123456789, 10);

export function openProject(projectPath: string) {
  const repoPath = path.resolve(projectPath);
  nodeGit.Repository.open(repoPath).then((repo) => {

  }, (error) => {
    // TODO: Figure out what the error is for missing .git folder
    createProject(repoPath);
  });
}

export function commitFilesToProject(projectPath: string) {
  let index = null;
  let oid = null;
  let repo = null;
  const repoPath = path.resolve(projectPath);
  console.log("TRYING TO COMMIT");
  nodeGit.Repository.open(repoPath).then((openedRepo) => {
    repo = openedRepo;
    return repo.openIndex();
  }).then((indexResult) => {
    index = indexResult;
    return index.read(1);
  }).then(() => {
    return index.addByPath(".")
  }).then(() => {
    return index.write();
  }).then(() => {
    return index.writeTree();
  }).then((oidResult) => {
    oid = oidResult;
    console.log("oid");
    return nodeGit.Reference.nameToId(repo, "HEAD")
  }).then((head) => {
    console.log("headref");
    return repo.getCommit(head);
  }).then((parent) => {
    const committer = nodeGit.Signature.create("FlowAI", "hello@flowai.com", 123456789, 10);
    return repo.createCommit("HEAD", committer, committer, "Revision xx", oid, [parent])
  }).then(function(commitId) {
    console.log("New Commit: ", commitId);
  });
}

function createProject(projectPath: string) {
  const repoPath = path.resolve(projectPath);
  const isBare = 0;
  let index = null;
  let repo = null;
  nodeGit.Repository.init(repoPath, isBare).then((_repo) => {
    repo = _repo;
    return repo.openIndex();
  }).then((_index) => {
    index = _index;
    return index.read(1);
  }).then(() => {
    return index.addAll();
  }).then(() => {
    return index.write();
  }).then(() => {
    return index.writeTree();
  }).then((oid) => {
    return repo.createCommit("HEAD", COMMITTER, COMMITTER, "Revision xx", oid, []);
  }).then((commitId) => {
    console.log("MOOCOW: " + commitId);
  });
}
