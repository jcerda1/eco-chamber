import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import { App } from '../client/src/index.jsx';


describe('<App />', () => {
  it('renders 1 component <App /> ', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('div')).to.have.lengthOf(1)
  });

});