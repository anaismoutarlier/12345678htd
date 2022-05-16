const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const html = fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf8');
const css = fs.readFileSync(path.resolve(__dirname, './style.css'), 'utf8');

// Create virtual DOM
const virtualPage = new JSDOM(html);
const document = virtualPage.window.document;
document.head.innerHTML = `<style>${css}</style>`;

function getSelector(selector) {
  const cssRules = document.styleSheets.item(0).cssRules;
  const result = { isExist: false, style: null };
  for (let i = 0; i < cssRules.length; i++) {
    if (cssRules[i].selectorText == selector) {
      result.isExist = true;
      result.style = cssRules[i].style;
    }
  }
  return result;
}

// Color squares
it('Color squares presence', () => {
  expect(document.querySelectorAll('.color').length).toBe(5);
});

it('Color squares size', () => {
  const selector = getSelector('.color');
  expect(selector.style.height).toBe('85px');
  expect(selector.style.width).toBe('85px');
});

it('Color squares background colors', () => {
  expect(getSelector('.darkgrey').style).toEqual(expect.objectContaining({ 'background-color': '#212529' }));
  expect(getSelector('.grey').style).toEqual(expect.objectContaining({ 'background-color': '#CED4DA' }));
  expect(getSelector('.darkblue').style).toEqual(expect.objectContaining({ 'background-color': '#03045E' }));
  expect(getSelector('.blue').style).toEqual(expect.objectContaining({ 'background-color': '#023E8A' }));
  expect(getSelector('.lightblue').style).toEqual(expect.objectContaining({ 'background-color': '#CAF0F8' }));
});

// Button
it('Button presence', () => {
  expect(document.querySelector('.btn')).toBeTruthy();
});

it('Button CSS', () => {
  const selector = getSelector('.btn');
  expect(selector.style.width).toBe('120px');
  expect(selector.style.cursor).toBe('pointer');
  expect(selector.style).toEqual(expect.objectContaining({ 'border-radius': '4px' }));
  expect(selector.style).toEqual(expect.objectContaining({ 'background-color': '#03045E' }));
});

it('Button CSS hover', () => {
  const selector = getSelector('.btn:hover');
  expect(selector.style).toEqual(expect.objectContaining({ 'background-color': '#023E8A' }));
});

// Table
it('Table presence', () => {
  expect(document.querySelector('table')).toBeTruthy();
});

it('Table CSS', () => {
  const selector = getSelector('table');
  expect(selector.style.border).toBe('1px solid #DFDFDF');
  expect(selector.style).toEqual(expect.objectContaining({ 'border-radius': '4px' }));
});

// Typography
it('Typography spans', () => {
  expect(document.querySelector('.bold')).toBeTruthy();
  expect(document.querySelector('.regular')).toBeTruthy();
});

it('Typography CSS for body', () => {
  expect(getSelector('body').style).toEqual(expect.objectContaining({ 'font-family': "'Noto Sans', sans-serif" }));
});

it('Typography CSS for span', () => {
  expect(getSelector('.bold').style).toEqual(expect.objectContaining({ 'font-weight': '400' }));
  expect(getSelector('.bold').style).toEqual(expect.objectContaining({ 'font-size': '20px' }));
  expect(getSelector('.regular').style).toEqual(expect.objectContaining({ 'font-weight': '200' }));
  expect(getSelector('.regular').style).toEqual(expect.objectContaining({ 'font-size': '20px' }));
});

// Card
it('Card presence', () => {
  expect(document.querySelector('.card-element')).toBeTruthy();
});

it('Card CSS', () => {
  const selector = getSelector('.card-element');
  expect(selector.style.border).toBe('1px solid #DFDFDF');
  expect(selector.style).toEqual(expect.objectContaining({ 'border-radius': '4px' }));
});
