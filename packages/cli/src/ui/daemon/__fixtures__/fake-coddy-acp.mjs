#!/usr/bin/env node
/**
 * @license
 * Copyright 2026 NeuralDeep
 * SPDX-License-Identifier: Apache-2.0
 */

// Поддельный `coddy acp` для тестов движка Coddy: ndjson JSON-RPC через stdio с особенностями
// настоящего агента — виды инструментов write/run_command, свои session/update (token_usage,
// provider_usage), session/request_question, ответ без result на session/set_mode.
// Первый аргумент должен быть `acp`. HANG_NEW_SESSION=1 — session/new не отвечает.

import readline from 'node:readline';

if (process.argv[2] !== 'acp') {
  process.stderr.write('ожидался аргумент acp\n');
  process.exit(2);
}

const send = (msg) =>
  process.stdout.write(JSON.stringify({ jsonrpc: '2.0', ...msg }) + '\n');
let nextId = 1000;
const waiting = new Map();
const ask = (method, params) =>
  new Promise((resolve) => {
    const id = nextId++;
    waiting.set(id, resolve);
    send({ id, method, params });
  });

const options = {
  mode: 'agent',
  model: 'neuraldeep/qwen3.8-27b',
  permission_mode: 'ask',
};
const configOptions = () => [
  {
    id: 'mode',
    name: 'Session mode',
    category: 'mode',
    type: 'select',
    currentValue: options.mode,
    options: [
      { value: 'agent', name: 'Agent' },
      { value: 'plan', name: 'Plan' },
    ],
  },
  {
    id: 'model',
    name: 'Model',
    category: 'model',
    type: 'select',
    currentValue: options.model,
    options: [
      { value: 'neuraldeep/qwen3.8-27b', name: 'qwen3.8-27b' },
      { value: 'neuraldeep/glm-5.1', name: 'glm-5.1' },
    ],
  },
  {
    id: 'permission_mode',
    name: 'Permission mode',
    category: '_permission_mode',
    type: 'select',
    currentValue: options.permission_mode,
    options: [
      { value: 'ask', name: 'Ask' },
      { value: 'accept_edits', name: 'Accept edits' },
      { value: 'bypass', name: 'Bypass' },
    ],
  },
];

async function prompt(id, p) {
  const u = (update) =>
    send({
      method: 'session/update',
      params: { sessionId: p.sessionId, update },
    });
  const text = p.prompt.map((b) => b.text ?? '').join('');
  if (text === 'умри') process.exit(5);
  // свои виды обновлений Coddy клиенту не мешают
  u({ sessionUpdate: 'token_usage', inputTokens: 1, outputTokens: 1 });
  u({ sessionUpdate: 'provider_usage', provider: 'neuraldeep' });
  if (text.startsWith('/model ')) {
    options.model = text.slice(7).trim();
    u({
      sessionUpdate: 'config_option_update',
      configOptions: configOptions(),
    });
    u({
      sessionUpdate: 'agent_message_chunk',
      content: { type: 'text', text: 'модель сменена' },
    });
    return send({ id, result: { stopReason: 'end_turn' } });
  }
  if (text.includes('спроси')) {
    const r = await ask('session/request_question', {
      sessionId: p.sessionId,
      requestId: 'q1',
      questions: [
        {
          header: 'Стек',
          question: 'На чём писать?',
          options: [{ label: 'Go' }, { label: 'Rust' }],
        },
      ],
    });
    const answer = r.error ? 'нет ответа' : r.result.answers[0].join('+');
    u({
      sessionUpdate: 'agent_message_chunk',
      content: { type: 'text', text: `выбрано: ${answer}` },
    });
    return send({ id, result: { stopReason: 'end_turn' } });
  }
  if (text.includes('просто')) {
    u({
      sessionUpdate: 'agent_message_chunk',
      content: {
        type: 'text',
        text: `ок [${options.mode}/${options.permission_mode}]`,
      },
    });
    return send({ id, result: { stopReason: 'end_turn' } });
  }
  u({
    sessionUpdate: 'agent_message_chunk',
    content: { type: 'text', text: 'Пишу ' },
  });
  u({
    sessionUpdate: 'agent_message_chunk',
    content: { type: 'text', text: 'файл' },
  });
  u({
    sessionUpdate: 'tool_call',
    toolCallId: 't1',
    title: 'write a.txt',
    kind: 'write',
    status: 'pending',
  });
  const r = await ask('session/request_permission', {
    sessionId: p.sessionId,
    toolCall: {
      toolCallId: 't1',
      title: 'write a.txt',
      kind: 'write',
      status: 'pending',
      content: [{ type: 'text', text: 'Write: a.txt' }],
    },
    options: [
      { optionId: 'allow', name: 'Allow', kind: 'allow_once' },
      { optionId: 'allow_always', name: 'Allow always', kind: 'allow_always' },
      { optionId: 'reject', name: 'Reject', kind: 'reject_once' },
    ],
  });
  const o = r.result?.outcome;
  const ok = o?.outcome === 'selected' && o.optionId === 'allow';
  u({
    sessionUpdate: 'tool_call_update',
    toolCallId: 't1',
    status: ok ? 'completed' : 'failed',
  });
  u({
    sessionUpdate: 'agent_message_chunk',
    content: { type: 'text', text: ok ? 'готово' : 'отказано' },
  });
  send({ id, result: { stopReason: 'end_turn' } });
}

readline.createInterface({ input: process.stdin }).on('line', (line) => {
  if (!line.trim()) return;
  const msg = JSON.parse(line);
  if (!msg.method) {
    waiting.get(msg.id)?.(msg);
    waiting.delete(msg.id);
    return;
  }
  switch (msg.method) {
    case 'initialize':
      return send({
        id: msg.id,
        result: {
          protocolVersion: 1,
          agentCapabilities: { loadSession: true },
          agentInfo: {
            name: 'coddy-agent',
            title: 'Coddy Agent',
            version: 'test',
          },
          authMethods: [],
        },
      });
    case 'session/new':
      if (process.env.HANG_NEW_SESSION) return;
      send({
        id: msg.id,
        result: {
          sessionId: 's-' + msg.params.cwd.length,
          configOptions: configOptions(),
        },
      });
      send({
        method: 'session/update',
        params: {
          sessionId: 's-' + msg.params.cwd.length,
          update: {
            sessionUpdate: 'available_commands_update',
            availableCommands: [
              { name: 'model', description: 'Switch the model' },
              { name: 'plan' },
            ],
          },
        },
      });
      return;
    case 'session/set_mode':
      options.mode = msg.params.modeId;
      // как Coddy: успешный ответ без result
      return send({ id: msg.id });
    case 'session/set_config_option':
      options[msg.params.configId] = msg.params.value;
      return send({ id: msg.id, result: { configOptions: configOptions() } });
    case 'session/prompt':
      return void prompt(msg.id, msg.params);
    case 'session/cancel':
      return;
    default:
      if (msg.id !== undefined)
        send({
          id: msg.id,
          error: { code: -32601, message: 'method not found' },
        });
  }
});
