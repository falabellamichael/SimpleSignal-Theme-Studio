const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname, '..');
const presets = require(path.join(root, 'out', 'presets.js'));

function assertUniqueIds(definitions, label) {
  const ids = definitions.map((definition) => definition.id);
  assert.equal(new Set(ids).size, ids.length, `${label} IDs must be unique`);
}

function assertExactCoverage(groups, supportedIds, label) {
  const owners = new Map();

  for (const group of groups) {
    assert.ok(group.section, `${label} group ${group.id} must have a section`);
    assert.ok(group.targets.length > 0, `${label} group ${group.id} must own at least one target`);
    for (const target of group.targets) {
      assert.ok(supportedIds.has(target), `${label} group ${group.id} targets unsupported role ${target}`);
      const previous = owners.get(target);
      assert.equal(previous, undefined, `${label} role ${target} is owned by both ${previous} and ${group.id}`);
      owners.set(target, group.id);
    }
  }

  const missing = [...supportedIds].filter((id) => !owners.has(id));
  assert.deepEqual(missing, [], `${label} roles missing from Simple mode: ${missing.join(', ')}`);
  return owners;
}

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`${name}="([^"]+)"`));
  return match?.[1];
}

function relativeLuminance(hex) {
  const channels = hex.slice(1).match(/.{2}/g).map((value) => parseInt(value, 16) / 255);
  const linear = channels.map((value) => value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4);
  return (0.2126 * linear[0]) + (0.7152 * linear[1]) + (0.0722 * linear[2]);
}

function contrastRatio(first, second) {
  const high = Math.max(relativeLuminance(first), relativeLuminance(second));
  const low = Math.min(relativeLuminance(first), relativeLuminance(second));
  return (high + 0.05) / (low + 0.05);
}

function assertReadablePair(colors, foreground, background, label) {
  const ratio = contrastRatio(colors[foreground], colors[background]);
  assert.ok(ratio >= 4.5, `${label} must remain WCAG AA readable; received ${ratio.toFixed(2)}:1`);
}

function validatePreviewMappings(markup, simpleAttribute, advancedAttribute, groups, owners, label) {
  const byId = new Map(groups.map((group) => [group.id, group]));
  const represented = new Set();
  const tagPattern = new RegExp(`<[^>]*${simpleAttribute}="[^"]+"[^>]*>`, 'g');

  for (const tag of markup.match(tagPattern) || []) {
    const simpleId = readAttribute(tag, simpleAttribute);
    const advancedId = readAttribute(tag, advancedAttribute);
    assert.ok(/class="[^"]*mock-clickable[^"]*"/.test(tag), `${label} preview for ${simpleId} must remain clickable`);
    assert.ok(byId.has(simpleId), `${label} preview references unknown group ${simpleId}`);
    assert.ok(advancedId, `${label} preview for ${simpleId} must identify one granular role`);
    represented.add(simpleId);
    assert.equal(owners.get(advancedId), simpleId, `${label} preview maps ${advancedId} to ${simpleId}, but its owner is ${owners.get(advancedId)}`);
  }

  const missingRepresentatives = groups.map((group) => group.id).filter((id) => !represented.has(id));
  assert.deepEqual(missingRepresentatives, [], `${label} groups missing a clickable preview representative: ${missingRepresentatives.join(', ')}`);
}

function findTagByAttribute(markup, attribute, value) {
  const tagPattern = new RegExp(`<[^>]*${attribute}="${value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>`);
  return markup.match(tagPattern)?.[0];
}

function validateCompleteRoleGallery(markup, roleAttribute, advancedAttribute, simpleAttribute, definitions, owners, label) {
  const expectedIds = new Set(definitions.map((definition) => definition.id));
  const represented = new Set();
  const previewTargetIds = [];
  const tagPattern = new RegExp(`<button[^>]*${roleAttribute}="[^"]+"[^>]*>`, 'g');

  for (const tag of markup.match(tagPattern) || []) {
    const roleId = readAttribute(tag, roleAttribute);
    const advancedId = readAttribute(tag, advancedAttribute);
    const simpleId = readAttribute(tag, simpleAttribute);
    const previewTargetId = readAttribute(tag, 'data-preview-target');

    assert.ok(expectedIds.has(roleId), `${label} gallery references unknown role ${roleId}`);
    assert.equal(advancedId, roleId, `${label} gallery item ${roleId} must open its exact granular control`);
    assert.equal(simpleId, owners.get(roleId), `${label} gallery item ${roleId} must open its owning Simple control`);
    assert.ok(/class="[^"]*mock-clickable[^"]*"/.test(tag), `${label} gallery item ${roleId} must be clickable`);
    assert.equal(readAttribute(tag, 'type'), 'button', `${label} gallery item ${roleId} must be a native button`);
    assert.ok(readAttribute(tag, 'aria-label'), `${label} gallery item ${roleId} must have an accessible name`);
    assert.ok(previewTargetId, `${label} gallery item ${roleId} must have a stable preview target ID`);

    represented.add(roleId);
    previewTargetIds.push(previewTargetId);
  }

  assert.deepEqual([...represented].sort(), [...expectedIds].sort(), `${label} gallery must expose every supported role`);
  assert.equal(previewTargetIds.length, definitions.length, `${label} gallery must contain exactly one item per supported role`);
  assert.equal(new Set(previewTargetIds).size, previewTargetIds.length, `${label} gallery preview target IDs must be unique`);
}

function extractElementMarkup(markup, id) {
  const marker = `id="${id}"`;
  const markerIndex = markup.indexOf(marker);
  assert.notEqual(markerIndex, -1, `Generated preview must contain #${id}`);
  const start = markup.lastIndexOf('<', markerIndex);
  const tagPattern = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>/g;
  tagPattern.lastIndex = start;
  let depth = 0;

  for (let match = tagPattern.exec(markup); match; match = tagPattern.exec(markup)) {
    const tag = match[0];
    if (tag.startsWith('<!--')) continue;
    if (tag.startsWith('</')) {
      depth -= 1;
      if (depth === 0) return markup.slice(start, tagPattern.lastIndex);
      continue;
    }

    const tagName = tag.match(/^<([a-zA-Z][\w-]*)/)?.[1]?.toLowerCase();
    const isVoid = /\/>$/.test(tag) || ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tagName);
    if (!isVoid) depth += 1;
  }

  assert.fail(`Generated preview element #${id} must have a closing tag`);
}

function assertNoBarePreviewText(markup, elementId) {
  const fragment = extractElementMarkup(markup, elementId);
  const tokenPattern = /<!--[\s\S]*?-->|<\/?[a-zA-Z][^>]*>|[^<]+/g;
  const stack = [];

  for (const token of fragment.match(tokenPattern) || []) {
    if (token.startsWith('<!--')) continue;
    if (token.startsWith('</')) {
      stack.pop();
      continue;
    }
    if (token.startsWith('<')) {
      const tagName = token.match(/^<([a-zA-Z][\w-]*)/)?.[1]?.toLowerCase();
      const isVoid = /\/>$/.test(token) || ['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr'].includes(tagName);
      if (!isVoid) stack.push(token);
      continue;
    }

    const visibleText = token.replace(/&(?:#\d+|#x[\da-f]+|[a-z]+);/gi, 'x').trim();
    if (!visibleText) continue;
    const parent = stack.at(-1) || '';
    assert.ok(
      /class="[^"]*mock-clickable[^"]*"/.test(parent),
      `Visible preview text "${visibleText.slice(0, 40)}" in #${elementId} must have its own color click target`
    );
  }
}

function assertPreviewTarget(markup, targetId, expected) {
  const tag = findTagByAttribute(markup, 'data-preview-target', targetId);
  assert.ok(tag, `Generated preview must retain ${targetId}`);
  assert.equal(readAttribute(tag, expected.advancedAttribute), expected.advanced, `${targetId} must open ${expected.advanced}`);
  assert.equal(readAttribute(tag, expected.simpleAttribute), expected.simple, `${targetId} must open ${expected.simple}`);
  assert.ok(/class="[^"]*mock-clickable[^"]*"/.test(tag), `${targetId} must remain clickable`);
}

function validateRepeatedPreviewTargets(markup) {
  const lineNumberTags = markup.match(/<span[^>]*class="[^"]*mock-line-number[^"]*"[^>]*>/g) || [];
  assert.equal(lineNumberTags.length, 15, 'Every displayed editor line number must be independently clickable');
  assert.equal(
    new Set(lineNumberTags.map((tag) => readAttribute(tag, 'data-preview-target'))).size,
    15,
    'Repeated line-number preview targets must remain distinct'
  );

  for (let line = 1; line <= 15; line += 1) {
    const isActive = line === 9;
    assertPreviewTarget(markup, `editor-line-number-${line}`, {
      advancedAttribute: 'data-inspect-ui',
      advanced: isActive ? 'editorLineNumber.activeForeground' : 'editorLineNumber.foreground',
      simpleAttribute: 'data-inspect-simple-ui',
      simple: isActive ? 'simple.accent' : 'simple.mutedText',
    });
  }

  for (const targetId of ['code-semicolon-import', 'code-dot-console-log', 'code-colon-model', 'code-paren-log-close']) {
    assertPreviewTarget(markup, targetId, {
      advancedAttribute: 'data-inspect-syntax',
      advanced: 'operators',
      simpleAttribute: 'data-inspect-simple-syntax',
      simple: 'simple.variables',
    });
  }

  assertPreviewTarget(markup, 'chat-request-background', {
    advancedAttribute: 'data-inspect-ui',
    advanced: 'chat.requestBackground',
    simpleAttribute: 'data-inspect-simple-ui',
    simple: 'simple.inputBg',
  });
  assertPreviewTarget(markup, 'chat-request-text', {
    advancedAttribute: 'data-inspect-ui',
    advanced: 'foreground',
    simpleAttribute: 'data-inspect-simple-ui',
    simple: 'simple.primaryText',
  });
  assertPreviewTarget(markup, 'editor-selection-background', {
    advancedAttribute: 'data-inspect-ui',
    advanced: 'editor.selectionBackground',
    simpleAttribute: 'data-inspect-simple-ui',
    simple: 'simple.selectionBg',
  });
  assertPreviewTarget(markup, 'editor-selection-text', {
    advancedAttribute: 'data-inspect-ui',
    advanced: 'editor.foreground',
    simpleAttribute: 'data-inspect-simple-ui',
    simple: 'simple.primaryText',
  });

  assertNoBarePreviewText(markup, 'mockCanvas');
  assertNoBarePreviewText(markup, 'mockWindow');
}

function createFakeElement(attributes = {}) {
  const listeners = new Map();
  const classes = new Set();
  const style = {
    setProperty(name, value) {
      this[name] = value;
    },
  };

  return {
    style,
    value: '',
    innerText: '',
    textContent: '',
    title: '',
    offsetWidth: 1,
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      toggle(name, force) {
        if (force === undefined ? !classes.has(name) : force) classes.add(name);
        else classes.delete(name);
      },
      contains: (name) => classes.has(name),
    },
    addEventListener(type, listener) {
      if (!listeners.has(type)) listeners.set(type, []);
      listeners.get(type).push(listener);
    },
    dispatch(type, event = {}) {
      for (const listener of listeners.get(type) || []) {
        listener.call(this, { key: undefined, ...event });
      }
    },
    getAttribute(name) {
      return attributes[name] ?? null;
    },
    setAttribute(name, value) {
      attributes[name] = String(value);
    },
    querySelector() {
      return null;
    },
    scrollIntoView() {},
  };
}

function createWebviewHarness(script) {
  const elementsById = new Map();
  const elementsBySelector = new Map();
  const postedMessages = [];
  const windowListeners = new Map();
  const timers = new Map();
  let nextTimerId = 1;

  const editorPicker = createFakeElement({ 'data-target': 'editor.background' });
  const editorHex = createFakeElement({ 'data-target': 'editor.background' });
  const stringPicker = createFakeElement({ 'data-syntax-id': 'strings' });
  const stringHex = createFakeElement({ 'data-syntax-id': 'strings' });
  const repeatedLineNumbers = Array.from({ length: 14 }, () => createFakeElement());
  const activeLineNumber = createFakeElement();
  const repeatedOperators = [createFakeElement(), createFakeElement()];
  const uiGallerySample = createFakeElement({ 'data-preview-ui-role': 'editorLineNumber.foreground' });
  const syntaxGallerySample = createFakeElement({ 'data-preview-syntax-role': 'operators' });
  const previewUiLeaf = createFakeElement({
    'data-inspect-ui': 'editorLineNumber.foreground',
    'data-inspect-simple-ui': 'simple.mutedText',
    title: 'Edit repeated line number text',
  });
  const previewSyntaxLeaf = createFakeElement({
    'data-inspect-syntax': 'operators',
    'data-inspect-simple-syntax': 'simple.variables',
    title: 'Edit repeated operator text',
  });
  const previewUiCard = createFakeElement();
  const previewSyntaxCard = createFakeElement();
  elementsBySelector.set('.adv-color-picker[data-target="editor.background"]', editorPicker);
  elementsBySelector.set('.adv-hex-input[data-target="editor.background"]', editorHex);
  elementsBySelector.set('.adv-syntax-picker[data-syntax-id="strings"]', stringPicker);
  elementsBySelector.set('.adv-syntax-hex[data-syntax-id="strings"]', stringHex);
  elementsBySelector.set('[data-simple-ui-id="simple.mutedText"]', previewUiCard);
  elementsBySelector.set('[data-simple-syntax-id="simple.variables"]', previewSyntaxCard);

  const document = {
    activeElement: null,
    documentElement: createFakeElement(),
    getElementById(id) {
      if (!elementsById.has(id)) elementsById.set(id, createFakeElement());
      return elementsById.get(id);
    },
    querySelector(selector) {
      if (selector.includes('.active')) return null;
      if (!elementsBySelector.has(selector)) elementsBySelector.set(selector, createFakeElement());
      return elementsBySelector.get(selector);
    },
    querySelectorAll(selector) {
      if (selector === '.adv-color-picker') return [editorPicker];
      if (selector === '.adv-hex-input') return [editorHex];
      if (selector === '.adv-syntax-picker') return [stringPicker];
      if (selector === '.adv-syntax-hex') return [stringHex];
      if (selector === '.mock-line-number:not(.mock-line-number-active)') return repeatedLineNumbers;
      if (selector === '.mock-line-number-active') return [activeLineNumber];
      if (selector === '.syn-op') return repeatedOperators;
      if (selector === '[data-preview-ui-role]') return [uiGallerySample];
      if (selector === '[data-preview-syntax-role]') return [syntaxGallerySample];
      if (selector === '.mock-clickable') return [previewUiLeaf, previewSyntaxLeaf];
      return [];
    },
  };

  const window = {
    addEventListener(type, listener) {
      if (!windowListeners.has(type)) windowListeners.set(type, []);
      windowListeners.get(type).push(listener);
    },
  };

  const setTimeout = (callback, _delay) => {
    const id = nextTimerId++;
    timers.set(id, callback);
    return id;
  };
  const clearTimeout = (id) => timers.delete(id);
  const acquireVsCodeApi = () => ({ postMessage: (message) => postedMessages.push(message) });

  new Function('document', 'window', 'CSS', 'acquireVsCodeApi', 'setTimeout', 'clearTimeout', script)(
    document,
    window,
    { supports: () => true },
    acquireVsCodeApi,
    setTimeout,
    clearTimeout
  );

  return {
    document,
    editorPicker,
    editorHex,
    stringPicker,
    stringHex,
    repeatedLineNumbers,
    activeLineNumber,
    repeatedOperators,
    uiGallerySample,
    syntaxGallerySample,
    previewUiLeaf,
    previewSyntaxLeaf,
    previewUiCard,
    previewSyntaxCard,
    postedMessages,
    dispatchMessage(data) {
      for (const listener of windowListeners.get('message') || []) listener({ data });
    },
    runAllTimers() {
      let turns = 0;
      while (timers.size > 0) {
        assert.ok(turns++ < 20, 'Fake timer queue must settle without an infinite loop');
        const callbacks = [...timers.values()];
        timers.clear();
        callbacks.forEach((callback) => callback());
      }
    },
    window,
  };
}

function fullThemeSnapshot(overrides = {}) {
  return {
    themeKind: 'dark',
    colors: {
      ...Object.fromEntries(presets.UI_COLOR_DEFINITIONS.map((definition) => [definition.id, definition.defaultValue])),
      ...overrides,
    },
    tokenColors: presets.SYNTAX_SCOPE_DEFINITIONS.map((definition) => ({
      scope: definition.scopes,
      settings: { foreground: definition.defaultColor },
    })),
  };
}

function validateWebviewProtocols(script) {
  const deltaHarness = createWebviewHarness(script);
  const uiDefault = (id) => presets.UI_COLOR_DEFINITIONS.find((definition) => definition.id === id).defaultValue;
  const syntaxDefault = (id) => presets.SYNTAX_SCOPE_DEFINITIONS.find((definition) => definition.id === id).defaultColor;

  assert.ok(
    deltaHarness.repeatedLineNumbers.every((lineNumber) => lineNumber.style.color === uiDefault('editorLineNumber.foreground')),
    'Live preview painting must update every repeated normal line number'
  );
  assert.equal(
    deltaHarness.activeLineNumber.style.color,
    uiDefault('editorLineNumber.activeForeground'),
    'Live preview painting must keep the active line number on its distinct option'
  );
  assert.ok(
    deltaHarness.repeatedOperators.every((operator) => operator.style.color === syntaxDefault('operators')),
    'Live syntax painting must update every repeated punctuation target'
  );
  assert.equal(
    deltaHarness.uiGallerySample.style['--preview-role-color'],
    uiDefault('editorLineNumber.foreground'),
    'The complete UI gallery must paint from the active granular role color'
  );
  assert.equal(
    deltaHarness.syntaxGallerySample.style['--preview-role-color'],
    syntaxDefault('operators'),
    'The complete syntax gallery must paint from the active syntax role color'
  );
  assert.equal(
    deltaHarness.document.getElementById('mockChatBubbleSurface').style.background,
    uiDefault('chat.requestBackground'),
    'Chat request background painting must target the surface around its independently clickable text'
  );

  let uiClickStopped = false;
  deltaHarness.previewUiLeaf.dispatch('click', {
    stopPropagation: () => { uiClickStopped = true; },
  });
  assert.ok(uiClickStopped, 'A repeated foreground click must not fall through to its background container');
  assert.ok(deltaHarness.previewUiCard.classList.contains('tile-highlighted'), 'Repeated UI text must open its owning Simple card');
  assert.equal(deltaHarness.previewUiLeaf.getAttribute('role'), 'button', 'Non-button preview targets must gain button semantics');
  assert.equal(deltaHarness.previewUiLeaf.getAttribute('tabindex'), '0', 'Non-button preview targets must be keyboard focusable');

  let syntaxKeyPrevented = false;
  deltaHarness.previewSyntaxLeaf.dispatch('keydown', {
    key: 'Enter',
    stopPropagation: () => {},
    preventDefault: () => { syntaxKeyPrevented = true; },
  });
  assert.ok(syntaxKeyPrevented, 'Keyboard preview activation must prevent the default key action');
  assert.ok(deltaHarness.previewSyntaxCard.classList.contains('tile-highlighted'), 'Repeated syntax punctuation must open its owning Simple card');

  deltaHarness.window.loadSavedProfile('profile-under-test');
  const profileRequest = deltaHarness.postedMessages.find((message) => message.command === 'loadProfile');
  assert.ok(profileRequest, 'Profile load must post an authoritative request');

  deltaHarness.editorPicker.value = '#123456';
  deltaHarness.editorPicker.dispatch('input');
  deltaHarness.stringPicker.value = '#654321';
  deltaHarness.stringPicker.dispatch('input');
  const profileSnapshot = fullThemeSnapshot({
    'editor.background': '#abcdef',
    'sideBar.background': '#fedcba',
  });
  profileSnapshot.tokenColors = profileSnapshot.tokenColors.map((rule, index) => ({
    ...rule,
    settings: {
      ...rule.settings,
      foreground: index === 2 ? '#aabbcc' : rule.settings.foreground,
    },
  }));
  deltaHarness.dispatchMessage({
    command: 'profileLoaded',
    requestRevision: profileRequest.requestRevision,
    profileName: 'Loaded Profile',
    ...profileSnapshot,
  });

  assert.equal(
    deltaHarness.document.querySelector('.adv-hex-input[data-target="editor.background"]').value,
    '#123456',
    'A post-request editor edit must be replayed over a loaded profile snapshot'
  );
  assert.equal(
    deltaHarness.document.querySelector('.adv-hex-input[data-target="sideBar.background"]').value,
    '#fedcba',
    'Unedited roles must come from the loaded profile snapshot'
  );
  assert.equal(
    deltaHarness.document.getElementById('activeProfileLabel').innerText,
    'Custom',
    'Replaying a post-request edit must mark the loaded profile Custom'
  );
  assert.equal(deltaHarness.stringHex.value, '#654321', 'A post-request syntax edit must be replayed over a loaded profile snapshot');

  const batchingHarness = createWebviewHarness(script);
  batchingHarness.editorPicker.value = '#111111';
  batchingHarness.editorPicker.dispatch('input');
  batchingHarness.editorPicker.dispatch('change');
  const firstBatches = batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveColors');
  assert.equal(firstBatches.length, 1, 'The first drag value must start exactly one live batch');
  assert.equal(firstBatches[0].colors['editor.background'], '#111111');

  batchingHarness.editorPicker.value = '#222222';
  batchingHarness.editorPicker.dispatch('input');
  batchingHarness.editorPicker.dispatch('change');
  batchingHarness.editorPicker.value = '#333333';
  batchingHarness.editorPicker.dispatch('input');
  batchingHarness.editorPicker.dispatch('change');
  assert.equal(
    batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveColors').length,
    1,
    'No second live batch may post while the first is in flight'
  );

  batchingHarness.dispatchMessage({ command: 'liveColorsApplied', batchId: firstBatches[0].batchId + 100, ok: true });
  assert.equal(
    batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveColors').length,
    1,
    'A mismatched UI acknowledgement must be ignored'
  );
  batchingHarness.dispatchMessage({ command: 'liveColorsApplied', batchId: firstBatches[0].batchId, ok: true });
  const settledBatches = batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveColors');
  assert.equal(settledBatches.length, 2, 'Settling the first batch must release one merged follow-up batch');
  assert.equal(
    settledBatches[1].colors['editor.background'],
    '#333333',
    'The follow-up live batch must contain only the newest pending drag value'
  );

  batchingHarness.stringPicker.value = '#101010';
  batchingHarness.stringPicker.dispatch('input');
  batchingHarness.stringPicker.dispatch('change');
  const firstTokenBatch = batchingHarness.postedMessages.find((message) => message.command === 'applyLiveTokenColors');
  batchingHarness.stringPicker.value = '#202020';
  batchingHarness.stringPicker.dispatch('input');
  batchingHarness.stringPicker.dispatch('change');
  batchingHarness.stringPicker.value = '#303030';
  batchingHarness.stringPicker.dispatch('input');
  batchingHarness.stringPicker.dispatch('change');
  assert.equal(
    batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveTokenColors').length,
    1,
    'No second syntax batch may post while the first is in flight'
  );
  batchingHarness.dispatchMessage({ command: 'liveTokenColorsApplied', batchId: firstTokenBatch.batchId + 100, ok: true });
  assert.equal(
    batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveTokenColors').length,
    1,
    'A mismatched syntax acknowledgement must be ignored'
  );
  batchingHarness.dispatchMessage({ command: 'liveTokenColorsApplied', batchId: firstTokenBatch.batchId, ok: true });
  const settledTokenBatches = batchingHarness.postedMessages.filter((message) => message.command === 'applyLiveTokenColors');
  assert.equal(settledTokenBatches.length, 2, 'Settling syntax must release one merged follow-up batch');
  assert.equal(settledTokenBatches[1].colors.strings, '#303030');

  const splitSyntaxHarness = createWebviewHarness(script);
  const splitSnapshot = fullThemeSnapshot();
  splitSnapshot.tokenColors = splitSnapshot.tokenColors.filter((_, index) => index !== 2);
  splitSnapshot.tokenColors.push(
    { scope: 'string', settings: { foreground: '#111111' } },
    { scope: 'string.quoted.double', settings: { foreground: '#222222' } }
  );
  splitSyntaxHarness.dispatchMessage({ command: 'syncActiveTheme', themeName: 'Split Syntax', ...splitSnapshot });
  splitSyntaxHarness.stringPicker.value = '#abcdef';
  splitSyntaxHarness.stringPicker.dispatch('input');
  splitSyntaxHarness.document.getElementById('btnApplyAll').dispatch('click');
  const splitApply = splitSyntaxHarness.postedMessages.find((message) => message.command === 'applyAll');
  const updatedSplitRules = splitApply.tokenColors.filter((rule) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
    return scopes.includes('string') || scopes.includes('string.quoted.double');
  });
  assert.equal(updatedSplitRules.length, 2, 'Split installed syntax aliases must remain represented');
  assert.ok(
    updatedSplitRules.every((rule) => rule.settings.foreground === '#abcdef'),
    'Editing one syntax role must unify every matching split installed rule'
  );

  const supersededFailureHarness = createWebviewHarness(script);
  supersededFailureHarness.editorPicker.value = '#aa0000';
  supersededFailureHarness.editorPicker.dispatch('input');
  supersededFailureHarness.editorPicker.dispatch('change');
  const supersededBatch = supersededFailureHarness.postedMessages.find((message) => message.command === 'applyLiveColors');
  supersededFailureHarness.window.loadSavedProfile('new-profile');
  supersededFailureHarness.dispatchMessage({
    command: 'liveColorsApplied',
    batchId: supersededBatch.batchId,
    ok: false,
    message: 'simulated write failure',
  });
  supersededFailureHarness.runAllTimers();
  assert.equal(
    supersededFailureHarness.postedMessages.filter((message) => message.command === 'applyLiveColors').length,
    1,
    'A failed pre-profile live batch must not retry after the authoritative request'
  );

  const cancelledResetHarness = createWebviewHarness(script);
  cancelledResetHarness.editorPicker.value = '#445566';
  cancelledResetHarness.editorPicker.dispatch('input');
  cancelledResetHarness.document.getElementById('btnResetTheme').dispatch('click');
  const cancelledResetRequest = cancelledResetHarness.postedMessages.find((message) => message.command === 'resetTheme');
  assert.ok(cancelledResetRequest, 'Reset must post a queued authoritative request');
  assert.equal(
    cancelledResetHarness.postedMessages.filter((message) => message.command === 'applyLiveColors').length,
    0,
    'An unsent pre-reset edit must remain held while confirmation is unresolved'
  );
  cancelledResetHarness.dispatchMessage({
    command: 'themeResetResolved',
    requestRevision: cancelledResetRequest.requestRevision,
    confirmed: false,
    themeName: 'Host Theme',
    ...fullThemeSnapshot({ 'editor.background': '#abcdef' }),
  });
  assert.equal(cancelledResetHarness.editorHex.value, '#445566', 'Cancelling reset must preserve the held local edit');
  const cancelledResetBatches = cancelledResetHarness.postedMessages.filter((message) => message.command === 'applyLiveColors');
  assert.equal(cancelledResetBatches.length, 1, 'Cancelling reset must release the held live edit');
  assert.equal(cancelledResetBatches[0].colors['editor.background'], '#445566');

  const confirmedResetHarness = createWebviewHarness(script);
  confirmedResetHarness.editorPicker.value = '#111111';
  confirmedResetHarness.editorPicker.dispatch('input');
  confirmedResetHarness.document.getElementById('btnResetTheme').dispatch('click');
  const confirmedResetRequest = confirmedResetHarness.postedMessages.find((message) => message.command === 'resetTheme');
  confirmedResetHarness.editorPicker.value = '#778899';
  confirmedResetHarness.editorPicker.dispatch('input');
  confirmedResetHarness.editorPicker.dispatch('change');
  confirmedResetHarness.dispatchMessage({
    command: 'themeResetResolved',
    requestRevision: confirmedResetRequest.requestRevision,
    confirmed: true,
    themeName: 'Default Theme',
    ...fullThemeSnapshot({ 'editor.background': '#000000' }),
  });
  assert.equal(confirmedResetHarness.editorHex.value, '#778899', 'An edit made after Reset was requested must layer over confirmed defaults');
  const confirmedResetBatches = confirmedResetHarness.postedMessages.filter((message) => message.command === 'applyLiveColors');
  assert.equal(confirmedResetBatches.length, 1, 'Confirmed reset must release only the post-request held edit');
  assert.equal(confirmedResetBatches[0].colors['editor.background'], '#778899');

  const draftHarness = createWebviewHarness(script);
  draftHarness.dispatchMessage({
    command: 'syncActiveTheme',
    themeName: 'Draft Base',
    liveApply: false,
    ...fullThemeSnapshot({ 'editor.background': '#101010' }),
  });
  draftHarness.editorPicker.value = '#202020';
  draftHarness.editorPicker.dispatch('input');
  draftHarness.dispatchMessage({
    command: 'syncActiveTheme',
    themeName: 'Cooldown Echo',
    liveApply: false,
    ...fullThemeSnapshot({ 'editor.background': '#303030' }),
  });
  assert.equal(
    draftHarness.editorHex.value,
    '#202020',
    'An unversioned cooldown sync must not erase a local draft while Live Apply is disabled'
  );

  const reconciliationHarness = createWebviewHarness(script);
  reconciliationHarness.dispatchMessage({
    command: 'syncActiveTheme',
    themeName: 'Reconciliation Base',
    liveApply: false,
    ...fullThemeSnapshot({ 'editor.background': '#111111' }),
  });
  reconciliationHarness.window.loadSavedProfile('profile-that-fails');
  const failedProfileRequest = reconciliationHarness.postedMessages.find((message) => message.command === 'loadProfile');
  reconciliationHarness.editorPicker.value = '#222222';
  reconciliationHarness.editorPicker.dispatch('input');
  reconciliationHarness.dispatchMessage({
    command: 'authoritativeActionError',
    requestCommand: 'loadProfile',
    requestRevision: failedProfileRequest.requestRevision,
    message: 'simulated profile failure',
  });
  const reconciliationRequest = reconciliationHarness.postedMessages.find(
    (message) => message.command === 'refreshThemeFromVsCode' && message.silent
  );
  assert.ok(reconciliationRequest, 'A failed authoritative write must start one silent reconciliation after transport is idle');
  reconciliationHarness.dispatchMessage({
    command: 'syncActiveTheme',
    requestRevision: reconciliationRequest.requestRevision,
    themeName: 'Reconciled Host',
    liveApply: false,
    ...fullThemeSnapshot({ 'editor.background': '#333333' }),
  });
  assert.equal(
    reconciliationHarness.editorHex.value,
    '#222222',
    'Error reconciliation must replay a post-request draft over the exact host snapshot'
  );

  const failedApplyHarness = createWebviewHarness(script);
  failedApplyHarness.dispatchMessage({
    command: 'syncActiveTheme',
    themeName: 'Apply Base',
    liveApply: false,
    ...fullThemeSnapshot({ 'editor.background': '#111111' }),
  });
  failedApplyHarness.editorPicker.value = '#444444';
  failedApplyHarness.editorPicker.dispatch('input');
  failedApplyHarness.document.getElementById('btnApplyAll').dispatch('click');
  const failedApplyRequest = failedApplyHarness.postedMessages.find((message) => message.command === 'applyAll');
  failedApplyHarness.dispatchMessage({
    command: 'authoritativeActionError',
    requestCommand: 'applyAll',
    requestRevision: failedApplyRequest.requestRevision,
    message: 'simulated apply failure',
  });
  const failedApplyReconciliation = failedApplyHarness.postedMessages.find(
    (message) => message.command === 'refreshThemeFromVsCode' && message.silent
  );
  assert.ok(failedApplyReconciliation, 'A failed Apply must reconcile once without abandoning its submitted draft');
  failedApplyHarness.dispatchMessage({
    command: 'syncActiveTheme',
    requestRevision: failedApplyReconciliation.requestRevision,
    themeName: 'Partially Applied Host',
    liveApply: false,
    ...fullThemeSnapshot({ 'editor.background': '#555555' }),
  });
  assert.equal(
    failedApplyHarness.editorHex.value,
    '#444444',
    'Failed Apply reconciliation must preserve the submitted local design for retry'
  );

  const splitFailureHarness = createWebviewHarness(script);
  const splitFailureSnapshot = fullThemeSnapshot();
  splitFailureSnapshot.tokenColors = splitFailureSnapshot.tokenColors.filter((_, index) => index !== 2);
  splitFailureSnapshot.tokenColors.push(
    { scope: 'string', settings: { foreground: '#111111' } },
    { scope: 'string.quoted.double', settings: { foreground: '#222222' } }
  );
  splitFailureHarness.dispatchMessage({
    command: 'syncActiveTheme',
    themeName: 'Split Failure Base',
    liveApply: false,
    ...splitFailureSnapshot,
  });
  splitFailureHarness.editorPicker.value = '#666666';
  splitFailureHarness.editorPicker.dispatch('input');
  splitFailureHarness.document.getElementById('btnApplyAll').dispatch('click');
  const splitFailureApply = splitFailureHarness.postedMessages.find((message) => message.command === 'applyAll');
  splitFailureHarness.dispatchMessage({
    command: 'authoritativeActionError',
    requestCommand: 'applyAll',
    requestRevision: splitFailureApply.requestRevision,
    message: 'simulated split apply failure',
  });
  const splitFailureReconciliation = splitFailureHarness.postedMessages.find(
    (message) => message.command === 'refreshThemeFromVsCode' && message.silent
  );
  splitFailureHarness.dispatchMessage({
    command: 'syncActiveTheme',
    requestRevision: splitFailureReconciliation.requestRevision,
    themeName: 'Split Failure Host',
    liveApply: false,
    ...splitFailureSnapshot,
  });
  splitFailureHarness.document.getElementById('btnApplyAll').dispatch('click');
  const splitRetryApply = splitFailureHarness.postedMessages.filter((message) => message.command === 'applyAll').at(-1);
  const splitRetryStrings = splitRetryApply.tokenColors.filter((rule) => {
    const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
    return scopes.includes('string') || scopes.includes('string.quoted.double');
  });
  assert.deepEqual(
    splitRetryStrings.map((rule) => rule.settings.foreground),
    ['#111111', '#222222'],
    'Failed Apply reconciliation must preserve an unrelated split syntax Mixed state'
  );

  const failedRefreshHarness = createWebviewHarness(script);
  failedRefreshHarness.window.refreshFromVsCode();
  const failedRefreshRequest = failedRefreshHarness.postedMessages.find((message) => message.command === 'refreshThemeFromVsCode');
  failedRefreshHarness.dispatchMessage({
    command: 'authoritativeActionError',
    requestCommand: 'refreshThemeFromVsCode',
    requestRevision: failedRefreshRequest.requestRevision,
    message: 'simulated refresh failure',
  });
  assert.equal(
    failedRefreshHarness.postedMessages.filter((message) => message.command === 'refreshThemeFromVsCode').length,
    1,
    'A failed reconciliation refresh must remain terminal instead of looping'
  );
}

const uiIds = new Set(presets.UI_COLOR_DEFINITIONS.map((definition) => definition.id));
const syntaxIds = new Set(presets.SYNTAX_SCOPE_DEFINITIONS.map((definition) => definition.id));
const hexColorPattern = /^#(?:[0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i;

assertUniqueIds(presets.UI_COLOR_DEFINITIONS, 'Advanced UI');
assertUniqueIds(presets.SYNTAX_SCOPE_DEFINITIONS, 'Advanced syntax');
assertUniqueIds(presets.SIMPLE_UI_DEFINITIONS, 'Simple UI');
assertUniqueIds(presets.SIMPLE_SYNTAX_DEFINITIONS, 'Simple syntax');
assertUniqueIds(presets.THEME_PRESETS, 'Preset');
assert.equal(uiIds.size, 83, 'Advanced UI role coverage must include all normal, empty-window and debugging status-bar roles');
assert.equal(syntaxIds.size, 10, 'Advanced syntax role coverage must remain at 10');
assert.equal(presets.THEME_PRESETS.length, 66, 'The bundled Studio preset catalog must remain complete');

const whiteTuxedo = presets.THEME_PRESETS.find((preset) => preset.id === 'white-tuxedo');
assert.ok(whiteTuxedo, 'The screenshot-inspired White Tuxedo preset must remain bundled');
for (const [foreground, background, label] of [
  ['foreground', 'editor.background', 'global text'],
  ['descriptionForeground', 'editor.background', 'muted workspace text'],
  ['editor.foreground', 'editor.background', 'editor text'],
  ['editorLineNumber.foreground', 'editor.background', 'editor line numbers'],
  ['editorHoverWidget.foreground', 'editorHoverWidget.background', 'hover widget text'],
  ['editorSuggestWidget.foreground', 'editorSuggestWidget.background', 'suggestion text'],
  ['editorSuggestWidget.selectedForeground', 'editorSuggestWidget.selectedBackground', 'selected suggestion text'],
  ['editorWidget.foreground', 'editorWidget.background', 'Studio card text'],
  ['activityBar.foreground', 'activityBar.background', 'activity-bar text'],
  ['activityBar.inactiveForeground', 'activityBar.background', 'inactive activity-bar text'],
  ['activityBarBadge.foreground', 'activityBarBadge.background', 'activity badge text'],
  ['sideBar.foreground', 'sideBar.background', 'sidebar text'],
  ['sideBarSectionHeader.foreground', 'sideBarSectionHeader.background', 'sidebar section text'],
  ['titleBar.activeForeground', 'titleBar.activeBackground', 'active title-bar text'],
  ['titleBar.inactiveForeground', 'titleBar.inactiveBackground', 'inactive title-bar text'],
  ['statusBar.foreground', 'statusBar.background', 'status-bar text'],
  ['statusBar.noFolderForeground', 'statusBar.noFolderBackground', 'empty-window status text'],
  ['statusBar.debuggingForeground', 'statusBar.debuggingBackground', 'debug status text'],
  ['tab.activeForeground', 'tab.activeBackground', 'active tab text'],
  ['tab.inactiveForeground', 'tab.inactiveBackground', 'inactive tab text'],
  ['terminal.foreground', 'terminal.background', 'terminal text'],
  ['input.foreground', 'input.background', 'input text'],
  ['input.placeholderForeground', 'input.background', 'input placeholder text'],
  ['panelTitle.activeForeground', 'panel.background', 'active panel title'],
  ['panelTitle.inactiveForeground', 'panel.background', 'inactive panel title'],
  ['chat.avatarForeground', 'chat.avatarBackground', 'chat avatar text'],
  ['chat.slashCommandForeground', 'chat.slashCommandBackground', 'slash-command text'],
  ['badge.foreground', 'badge.background', 'badge text'],
]) {
  assertReadablePair(whiteTuxedo.colors, foreground, background, `White Tuxedo ${label}`);
}
for (const rule of whiteTuxedo.tokenColors) {
  const scope = Array.isArray(rule.scope) ? rule.scope[0] : rule.scope;
  const ratio = contrastRatio(rule.settings.foreground, whiteTuxedo.colors['editor.background']);
  assert.ok(ratio >= 4.5, `White Tuxedo ${scope} syntax must remain readable; received ${ratio.toFixed(2)}:1`);
}

const inheritedStatusBar = presets.normalizeStatusBarVariants({
  'statusBar.background': '#123456',
  'statusBar.foreground': '#abcdef',
  'statusBar.debuggingBackground': '#654321',
});
assert.equal(inheritedStatusBar['statusBar.noFolderBackground'], '#123456', 'Empty-window status bar must inherit the normal background');
assert.equal(inheritedStatusBar['statusBar.noFolderForeground'], '#abcdef', 'Empty-window status bar must inherit the normal foreground');
assert.equal(inheritedStatusBar['statusBar.debuggingForeground'], '#abcdef', 'Debug status bar must inherit the normal foreground');

const explicitStatusBar = presets.normalizeStatusBarVariants({
  'statusBar.background': '#111111',
  'statusBar.foreground': '#eeeeee',
  'statusBar.noFolderBackground': '#222222',
  'statusBar.noFolderForeground': '#dddddd',
  'statusBar.debuggingForeground': '#cccccc',
});
assert.equal(explicitStatusBar['statusBar.noFolderBackground'], '#222222', 'Explicit empty-window status backgrounds must be preserved');
assert.equal(explicitStatusBar['statusBar.noFolderForeground'], '#dddddd', 'Explicit empty-window status foregrounds must be preserved');
assert.equal(explicitStatusBar['statusBar.debuggingForeground'], '#cccccc', 'Explicit debug status foregrounds must be preserved');

for (const themeFile of [
  'simpletheme-dark-color-theme.json',
  'simpletheme-light-color-theme.json',
  'simpletheme-oled-color-theme.json',
  'simpletheme-lemonade-color-theme.json',
]) {
  const theme = JSON.parse(fs.readFileSync(path.join(root, 'themes', themeFile), 'utf8'));
  assert.equal(
    theme.colors['statusBar.noFolderBackground'],
    theme.colors['statusBar.background'],
    `${themeFile} must not fall back to VS Code's unrelated empty-window status color`
  );
  assert.equal(
    theme.colors['statusBar.noFolderForeground'],
    theme.colors['statusBar.foreground'],
    `${themeFile} must keep empty-window status text aligned with normal status text`
  );
}

assert.deepEqual(
  Object.keys(presets.SYNTAX_SCOPE_MAP).sort(),
  [...syntaxIds].sort(),
  'The shared host/client syntax scope map must cover every syntax role'
);
for (const definition of presets.SYNTAX_SCOPE_DEFINITIONS) {
  assert.deepEqual(presets.SYNTAX_SCOPE_MAP[definition.id], definition.scopes, `Shared scope map drifted for ${definition.id}`);
}
const exactScopeOwners = new Map();
for (const definition of presets.SYNTAX_SCOPE_DEFINITIONS) {
  for (const scope of definition.scopes) {
    assert.equal(exactScopeOwners.get(scope), undefined, `Exact syntax scope ${scope} belongs to multiple roles`);
    exactScopeOwners.set(scope, definition.id);
  }
}

for (const preset of presets.THEME_PRESETS) {
  const presetIds = new Set(Object.keys(preset.colors));
  assert.deepEqual([...presetIds].sort(), [...uiIds].sort(), `Preset ${preset.id} must define every supported UI role exactly once`);
  assert.equal(preset.tokenColors.length, syntaxIds.size, `Preset ${preset.id} must not contain unmatched extra token rules`);
  for (const [key, color] of Object.entries(preset.colors)) {
    assert.match(color, hexColorPattern, `Preset ${preset.id} has an invalid color for ${key}`);
  }

  for (const syntax of presets.SYNTAX_SCOPE_DEFINITIONS) {
    const matches = preset.tokenColors.filter((rule) => {
      const scopes = Array.isArray(rule.scope) ? rule.scope : [rule.scope];
      return scopes.some((scope) => syntax.scopes.includes(scope));
    });
    assert.equal(matches.length, 1, `Preset ${preset.id} must resolve syntax role ${syntax.id} to exactly one token rule`);
    const matchedScopes = Array.isArray(matches[0].scope) ? matches[0].scope : [matches[0].scope];
    assert.deepEqual(
      [...matchedScopes].sort(),
      [...syntax.scopes].sort(),
      `Preset ${preset.id} must preserve every ${syntax.id} syntax alias`
    );
    assert.match(matches[0].settings.foreground, hexColorPattern, `Preset ${preset.id} has an invalid ${syntax.id} syntax color`);
  }
}

const uiOwners = assertExactCoverage(presets.SIMPLE_UI_DEFINITIONS, uiIds, 'UI');
const syntaxOwners = assertExactCoverage(presets.SIMPLE_SYNTAX_DEFINITIONS, syntaxIds, 'Syntax');

const Module = require('node:module');
const originalLoad = Module._load;
Module._load = function loadWithVscodeMock(request, parent, isMain) {
  if (request === 'vscode') {
    return {
      workspace: {
        getConfiguration: () => ({ get: (_key, fallback) => fallback }),
      },
    };
  }
  return originalLoad.call(this, request, parent, isMain);
};

try {
  const { ThemeEngine } = require(path.join(root, 'out', 'themeEngine.js'));
  const { ProfileManager } = require(path.join(root, 'out', 'profileManager.js'));
  const { ThemeStudioWebview } = require(path.join(root, 'out', 'themeStudioWebview.js'));
  ThemeEngine.getEffectiveThemeState = () => ({
    themeName: 'Mapping Test',
    themeKind: 'dark',
    colors: Object.fromEntries(presets.UI_COLOR_DEFINITIONS.map((definition) => [definition.id, definition.defaultValue])),
    tokenColors: presets.SYNTAX_SCOPE_DEFINITIONS.map((definition) => ({
      scope: definition.scopes,
      settings: { foreground: definition.defaultColor },
    })),
  });
  ProfileManager.getProfiles = () => [];

  const studio = Object.create(ThemeStudioWebview.prototype);
  const html = studio._getHtmlForWebview();
  const script = html.match(/<script>([\s\S]*?)<\/script>/)?.[1];
  assert.ok(script, 'Generated Theme Studio HTML must contain a script');
  assert.doesNotThrow(() => new Function(script), 'Generated Theme Studio script must parse');
  assert.ok(html.includes('Foundations'), 'Generated Theme Studio must render UI sections');
  assert.ok(html.includes('Mixed'), 'Generated Theme Studio must explain mixed linked colors');
  assert.ok(html.includes(`All UI (${uiIds.size})`), 'Preview must expose its complete UI role gallery');
  assert.ok(html.includes(`Syntax (${syntaxIds.size})`), 'Preview must expose its complete syntax role gallery');
  assert.match(html, /\.mock-clickable:focus-visible/, 'Preview click targets must retain a visible keyboard focus state');
  assert.match(html, /--card-text:/, 'Studio cards must expose a foreground paired to their own background');
  assert.match(html, /--card-text-muted:/, 'Studio cards must derive readable contextual secondary text');
  assert.match(script, /\['editorWidget\.background', 'sideBar\.background', 'panel\.background'\]/, 'Studio cards must prefer editor-widget colors over unrelated sidebar colors');
  assert.match(script, /setProperty\('--card-text', cardText\)/, 'Live preset changes must refresh the contextual card foreground');
  assert.match(script, /addEventListener\('keydown'/, 'Non-button preview targets must support keyboard activation');

  validatePreviewMappings(html, 'data-inspect-simple-ui', 'data-inspect-ui', presets.SIMPLE_UI_DEFINITIONS, uiOwners, 'UI');
  validatePreviewMappings(html, 'data-inspect-simple-syntax', 'data-inspect-syntax', presets.SIMPLE_SYNTAX_DEFINITIONS, syntaxOwners, 'Syntax');
  validateCompleteRoleGallery(
    html,
    'data-preview-ui-role',
    'data-inspect-ui',
    'data-inspect-simple-ui',
    presets.UI_COLOR_DEFINITIONS,
    uiOwners,
    'UI'
  );
  validateCompleteRoleGallery(
    html,
    'data-preview-syntax-role',
    'data-inspect-syntax',
    'data-inspect-simple-syntax',
    presets.SYNTAX_SCOPE_DEFINITIONS,
    syntaxOwners,
    'Syntax'
  );
  validateRepeatedPreviewTargets(html);
  validateWebviewProtocols(script);
} finally {
  Module._load = originalLoad;
}

console.log(
  `Simple mode mapping verified: ${presets.SIMPLE_UI_DEFINITIONS.length} UI controls cover ${uiIds.size} UI roles; ` +
  `${presets.SIMPLE_SYNTAX_DEFINITIONS.length} syntax controls cover ${syntaxIds.size} syntax roles across ${presets.THEME_PRESETS.length} presets.`
);
