//Load the library and specify options
const replace = require('replace-in-file');
const files = ['./projects/**/*.html', './projects/**/*.ts', './projects/**/*.scss'];
const breakpoints = ['sm', 'md', 'lg', 'xl'];

function getFrom(values, prefix) {
  const from = [];

  for (let value of values) {
    from.push(new RegExp(prefix + value, 'g'));
  }
  return from;
}

function getFromBreakpointsSpacing(values, prefix) {
  const from = [];

  for (let value of values) {
    for (let bp of breakpoints) {
      from.push(new RegExp(prefix + value + bp + '-', 'g'));
    }
  }
  return from;
}

function getToBreakpoints(values) {
  const to = [];

  for (let value of values) {
    for (let bp of breakpoints) {
      to.push(bp + ':' + value);
    }
  }
  return to;
}

function migrate(from, to) {
  return replace.sync({
    files: [...files],
    from: [...from],
    to: [...to],
    countMatches: true
  });
}

function migrateSpacing() {
  const prefix = 'p-'
  const values = ['p-', 'pt-', 'pr-', 'pb-', 'pl-', 'px-', 'py-', 'm-', 'mt-', 'mr-', 'mb-', 'ml-', 'mx-', 'my-'];

  return migrate(
    [
      ...getFromBreakpointsSpacing(values, prefix),
      ...getFrom(values, prefix)
    ],
    [
      ...getToBreakpoints(values),
      ...values
    ]);
}

function migrateShadow() {
  const from = [/p-shadow-9/g, /p-shadow-10/g, /p-shadow-11/g, /p-shadow-12/g, /p-shadow-13/g, /p-shadow-14/g, /p-shadow-15/g, /p-shadow-16/g, /p-shadow-17/g, /p-shadow-18/g, /p-shadow-19/g, /p-shadow-20/g, /p-shadow-21/g, /p-shadow-22/g, /p-shadow-23/g, /p-shadow-24/g, /p-shadow-/g];
  const to = ['p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'p-shadow-6', 'shadow-']

  return migrate([...from], [...to]);
}

function migrateDisplay() {
  const from = [/p-d-none/g, /p-d-inline/g, /p-d-inline-block/g, /p-d-block/g, /p-d-flex/g, /p-d-inline-flex/g, /p-d-sm-none/g, /p-d-md-none/g, /p-d-lg-none/g, /p-d-xl-none/g, /p-d-sm-/g, /p-d-md-/g, /p-d-lg-/g, /p-d-xl-/g];
  const to = ['hidden', 'inline', 'inline-block', 'block', 'flex', 'inline-flex', 'sm:hidden', 'md:hidden', 'lg:hidden', 'xl:hidden', 'sm:', 'md:', 'lg:', 'xl:'];

  return migrate([...from], [...to]);
}

function migrateText() {
  const from = [/p-text-left/g, /p-text-right/g, /p-text-center/g, /p-text-justify/g, /p-text-lowercase/g, /p-text-uppercase/g, /p-text-capitalize/g, /p-text-bold/g, /p-text-normal/g, /p-text-light/g, /p-text-italic/g];
  const to = ['text-left', 'text-right', 'text-center', 'text-justify', 'lowercase', 'uppercase', 'capitalize', 'font-bold', 'font-normal', 'font-light', 'font-italic'];

  return migrate(
    [
      ...from
    ],
    [
      ...to
    ]);
}

function migrateFlexbox() {
  // Flex General
  const prefix = 'p-'
  const flexValues = ['flex-row', 'flex-column', 'flex-row-reverse', 'flex-column-reverse', 'flex-nowrap', 'flex-wrap', 'flex-wrap-reverse'];
  const fromFlexBreakpoint = [/p-flex-sm-/g, /p-flex-md-/g, /p-flex-lg-/g, /p-flex-xl-/g];
  const toFlexBreakpoint = ['sm:flex-', 'md:flex-', 'lg:flex-', 'xl:flex-'];

  // Justify Content
  const fromJC = [/p-jc-start/g, /p-jc-end/g, /p-jc-center/g, /p-jc-between/g, /p-jc-around/g, /p-jc-evenly/g];
  const toJC = ['justify-content-start', 'justify-content-end', 'justify-content-center', 'justify-content-between', 'justify-content-around', 'justify-content-evenly'];
  const fromJCBreakpoint = [/p-jc-sm-/g, /p-jc-md-/g, /p-jc-lg-/g, /p-jc-xl-/g];
  const toJCBreakpoint = ['sm:justify-content-', 'md:justify-content-', 'lg:justify-content-', 'xl:justify-content-'];

  // Align Items
  const fromAI = [/p-ai-start/g, /p-ai-end/g, /p-ai-center/g, /p-ai-baseline/g, /p-ai-stretch/g];
  const toAI = ['align-items-start', 'align-items-end', 'align-items-center', 'align-items-baseline', 'align-items-stretch'];
  const fromAIBreakpoint = [/p-ai-sm-/g, /p-ai-md-/g, /p-ai-lg-/g, /p-ai-xl-/g];
  const toAIBreakpoint = ['sm:align-items-', 'md:align-items-', 'lg:align-items-', 'xl:align-items-'];

  // Align Self
  const fromAS = [/p-as-start/g, /p-as-end/g, /p-as-center/g, /p-as-baseline/g, /p-as-stretch/g];
  const toAS = ['align-self-start', 'align-self-end', 'align-self-center', 'align-self-baseline', 'align-self-stretch'];
  const fromASBreakpoint = [/p-as-sm-/g, /p-as-md-/g, /p-as-lg-/g, /p-as-xl-/g];
  const toASBreakpoint = ['sm:align-self-', 'md:align-self-', 'lg:align-self-', 'xl:align-self-'];

  // Align Content
  const fromAC = [/p-ac-start/g, /p-ac-end/g, /p-ac-center/g, /p-ac-around/g, /p-ac-between/g];
  const toAC = ['align-content-start', 'align-content-end', 'align-content-center', 'align-content-around', 'align-content-between'];
  const fromACBreakpoint = [/p-ac-sm-/g, /p-ac-md-/g, /p-ac-lg-/g, /p-ac-xl-/g];
  const toACBreakpoint = ['sm:align-content-', 'md:align-content-', 'lg:align-content-', 'xl:align-content-'];

  // Order
  const fromOrder = [/p-order-0/g, /p-order-1/g, /p-order-2/g, /p-order-3/g, /p-order-4/g, /p-order-5/g, /p-order-6/g];
  const toOrder = ['flex-order-0', 'flex-order-1', 'flex-order-2', 'flex-order-3', 'flex-order-4', 'flex-order-5', 'flex-order-6'];
  const fromOrderBreakpoint = [/p-order-sm-/g, /p-order-md-/g, /p-order-lg-/g, /p-order-xl-/g];
  const toOrderBreakpoint = ['sm:flex-order-', 'md-flex-order-', 'lg:flex-order-', 'xl:flex-order-'];

  return migrate(
    [
      ...getFrom(flexValues, prefix),
      ...fromFlexBreakpoint,
      ...fromJC,
      ...fromJCBreakpoint,
      ...fromAI,
      ...fromAIBreakpoint,
      ...fromAS,
      ...fromASBreakpoint,
      ...fromAC,
      ...fromACBreakpoint,
      ...fromOrder,
      ...fromOrderBreakpoint
    ],
    [
      ...flexValues,
      ...toFlexBreakpoint,
      ...toJC,
      ...toJCBreakpoint,
      ...toAI,
      ...toAIBreakpoint,
      ...toAS,
      ...toASBreakpoint,
      ...toAC,
      ...toACBreakpoint,
      ...toOrder,
      ...toOrderBreakpoint
    ]);
}

function migrateFormLayout() {
  const prefix = 'p-'
  const values = ['formgrid', 'formgroup-inline', 'field-checkbox', 'field-radiobutton'];
  const fromField = [/p-field /g, /p-field"/g, /p-field\./g]; // Workaround to avoid replace p-fieldset
  const toField = ['field ', 'field"', 'field.'];

  return migrate(
    [
      ...getFrom(values, prefix),
      ...fromField
    ],
    [
      ...values,
      ...toField
    ]);
}

function migrateGrid() {
  // General
  const prefix = 'p-'
  const values = ['grid', 'col-1', 'col-2', 'col-3', 'col-4', 'col-5', 'col-6', 'col-7', 'col-8', 'col-9', 'col-10', 'col-11', 'col-12', 'col-fixed'];

  // Offset
  const fromOffset = [/p-offset-0/g, /p-offset-1/g, /p-offset-2/g, /p-offset-3/g, /p-offset-4/g, /p-offset-5/g, /p-offset-6/g, /p-offset-7/g, /p-offset-8/g, /p-offset-9/g, /p-offset-10/g, /p-offset-11/g, /p-offset-12/g];
  const toOffset = ['col-offset-0', 'col-offset-1', 'col-offset-2', 'col-offset-3', 'col-offset-4', 'col-offset-5', 'col-offset-6', 'col-offset-7', 'col-offset-8', 'col-offset-9', 'col-offset-10', 'col-offset-11', 'col-offset-12'];
  const fromOffsetBreakpoint = [/p-sm-offset-/g, /p-md-offset-/g, /p-lg-offset-/g, /p-xl-offset-/g];
  const toOffsetBreakpoint = ['sm:col-offset-', 'md:col-offset-', 'lg:col-offset-', 'xl:col-offset-'];

  // Exception
  const fromException = [/p-nogutter/g, /p-col /g, /p-col"/g];
  const toException = ['grid-nogutter', 'col ', 'col"'];

  // Col SM
  const fromSM = [/p-sm-1/g, /p-sm-2/g, /p-sm-3/g, /p-sm-4/g, /p-sm-5/g, /p-sm-6/g, /p-sm-7/g, /p-sm-8/g, /p-sm-9/g, /p-sm-10/g, /p-sm-11/g, /p-sm-12/g];
  const toSM = ['sm:col-1', 'sm:col-2', 'sm:col-3', 'sm:col-4', 'sm:col-5', 'sm:col-6', 'sm:col-7', 'sm:col-8', 'sm:col-9', 'sm:col-10', 'sm:col-11', 'sm:col-12'];

  // Col MD
  const fromMD = [/p-md-1/g, /p-md-2/g, /p-md-3/g, /p-md-4/g, /p-md-5/g, /p-md-6/g, /p-md-7/g, /p-md-8/g, /p-md-9/g, /p-md-10/g, /p-md-11/g, /p-md-12/g];
  const toMD = ['md:col-1', 'md:col-2', 'md:col-3', 'md:col-4', 'md:col-5', 'md:col-6', 'md:col-7', 'md:col-8', 'md:col-9', 'md:col-10', 'md:col-11', 'md:col-12'];

  // Col LG
  const fromLG = [/p-lg-1/g, /p-lg-2/g, /p-lg-3/g, /p-lg-4/g, /p-lg-5/g, /p-lg-6/g, /p-lg-7/g, /p-lg-8/g, /p-lg-9/g, /p-lg-10/g, /p-lg-11/g, /p-lg-12/g];
  const toLG = ['lg:col-1', 'lg:col-2', 'lg:col-3', 'lg:col-4', 'lg:col-5', 'lg:col-6', 'lg:col-7', 'lg:col-8', 'lg:col-9', 'lg:col-10', 'lg:col-11', 'lg:col-12'];

  // Col XL
  const fromXL = [/p-xl-1/g, /p-xl-2/g, /p-xl-3/g, /p-xl-4/g, /p-xl-5/g, /p-xl-6/g, /p-xl-7/g, /p-xl-8/g, /p-xl-9/g, /p-xl-10/g, /p-xl-11/g, /p-xl-12/g];
  const toXL = ['xl:col-1', 'xl:col-2', 'xl:col-3', 'xl:col-4', 'xl:col-5', 'xl:col-6', 'xl:col-7', 'xl:col-8', 'xl:col-9', 'xl:col-10', 'xl:col-11', 'xl:col-12'];

  // User reverse to replace first 10/11/12 before 1
  return migrate(
    [
      ...getFrom(values, prefix).reverse(),
      ...fromOffset.reverse(),
      ...fromOffsetBreakpoint,
      ...fromException,
      ...fromSM.reverse(),
      ...fromMD.reverse(),
      ...fromLG.reverse(),
      ...fromXL.reverse()
    ],
    [
      ...values.reverse(),
      ...toOffset.reverse(),
      ...toOffsetBreakpoint,
      ...toException,
      ...toSM.reverse(),
      ...toMD.reverse(),
      ...toLG.reverse(),
      ...toXL.reverse()
    ]);
}

function migrateGridDeprecated() {
  const from = [
    /p-justify-start/g, /p-justify-end/g, /p-justify-center/g, /p-justify-between/g, /p-justify-around/g, /p-justify-even/g,
    /p-align-start/g, /p-align-end/g, /p-align-center/g, /p-align-baseline/g, /p-align-stretch/g,
    /p-col-align-start/g, /p-col-align-end/g, /p-col-align-center/g, /p-col-align-baseline/g, /p-col-align-stretch/g
  ];
  const to = [
    'flex justify-content-start', 'flex justify-content-end', 'flex justify-content-center', 'flex justify-content-between', 'flex justify-content-around', 'flex justify-content-evenly',
    'flex align-items-start', 'flex align-items-end', 'flex align-items-center', 'flex align-items-baseline', 'flex align-items-stretch',
    'flex align-self-start', 'flex align-self-end', 'flex align-self-center', 'flex align-self-baseline', 'flex align-self-stretch'
  ];

  return migrate(
    [
      ...from
    ],
    [
      ...to
    ]);
}

function fixBreakpointSCSS() {
  return replace.sync({
    files: ['./projects/**/*.scss'],
    from: [/\.sm:/g, /\.md:/g, /\.lg:/g, /\.xl:/g],
    to: ['.sm\\:', '.md\\:', '.lg\\:', '.xl\\:'],
    countMatches: true
  });
}

function migrateAndLog (label, migrateFunction) {
  const results = migrateFunction();
  let numFilesChanged = 0;
  let numReplacements = 0;

  results
    .filter(result => result.hasChanged)
    .map(() => numFilesChanged++);

  results
    .filter(result => result.hasChanged)
    .map(result => numReplacements += result.numReplacements);

  console.log(`${label} DONE (${numFilesChanged} changed files - ${numReplacements} replacements)`);
}


try {
  console.log('Migration to PrimeFlex 3');
  console.log('------------------------\n');

  migrateAndLog('Migrate spacing:', migrateSpacing);
  migrateAndLog('Migrate shadow:', migrateShadow);
  migrateAndLog('Migrate display:', migrateDisplay);
  migrateAndLog('Migrate text:', migrateText);
  migrateAndLog('Migrate flexbox:', migrateFlexbox);
  migrateAndLog('Migrate formlayout:', migrateFormLayout);
  migrateAndLog('Migrate grid:', migrateGrid);
  migrateAndLog('Migrate grid deprecated:', migrateGridDeprecated);
  migrateAndLog('Fix breakpoint SCSS:', fixBreakpointSCSS);

  console.log('\nAll migration successfully')
} catch (error) {
  console.error('Error occurred:', error);
}
