import * as core from '@actions/core';
// {required: true} выкинет ошибку, если input не передан
const TOKEN = core.getInput('github-token', {required: true});