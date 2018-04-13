import React from 'react';
import { shallow } from 'enzyme';
import {App} from '../../client/src/index.jsx';


describe('<App />', () => {
  //it('renders 1 component <App /> ', () => {
    // const wrapper = shallow(<App />);
    // expect(wrapper.find('div')).to.have.lengthOf(1)
     it('should be able to run tests', () => {
        expect(1 + 2).toEqual(3);
    });

  });