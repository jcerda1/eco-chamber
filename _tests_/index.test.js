import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';
import  App  from '../client/src/App.jsx';


describe('<App />', () => {
  it('renders 1 component <App /> ', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('div')).to.have.lengthOf(1)
  });
});