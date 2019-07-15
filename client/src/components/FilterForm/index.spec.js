import { mapStateToProps } from './index';

describe('<FilterForm /> mapStateToProps() tests', () => {
  const state = {};

  test('Initial values should be fulfilled', () => {
    const props = {search: 'types=fire,water&&evoLevels=1,2'};
    expect(mapStateToProps(state, props)).toEqual({
      initialValues: {
        types: {fire: true, water: true},
        evoLevels: {'1': true, '2': true}
      }
    });
  });

  test('Initial values should be empty', () => {
    const props = {search: ''};
    expect(mapStateToProps(state, props)).toEqual({
      initialValues: {
        types: {},
        evoLevels: {}
      }
    });
  });
});