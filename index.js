const {div, input, label, h2, makeDOMDriver} = CycleDOM;

/**
 * DOM read effect detect slider change
 * Recalculate BMI
 * DOM write effect: display BMI
 */

function intent(DOMSources) {
  const changeWeight$ = DOMSource
    .select('.weight')
    .events('inpunt')
    .map(ev => ev.target.value);
  const changeHeight$ = DOMSources
    .select('.height')
    .events('input')
    .map(ev => ev.target.value);
  return {changeWeight$, changeHeight$};
}

function view(state$) {
  return state$
    .map( state =>
      div([
        div([
          label('Weight: ' + state.weight + 'kg'),
          input('.weight', {type:'range', 
                min: 40, max: 150, value: state.weight})
        ]),
        div([
          label('Height: ' + state.height + 'kg'),
          input('.height', {type:'range', 
                min: 40, max: 150, value: state.height})
        ]),
        h2('BMI is ' + state.bmi)
      ])
    );
}

function  main(sources) {
  const {changeWeight$, changeHeight$} = intent(sources.DOM);
  const states$ = model(changeHeight$, changeWeight$);
  const vtree = view($states);
  return {
    DOM: vtree$
  };
}

const drivers = {
  DOM: makeDOMDriver('#app'),
}

Cycle.run(main,drivers);