import React from 'react';
import { shallow } from 'enzyme';
import App from '../../client/src/index.jsx';


describe('<App />', () => {
  it('renders three <Foo /> components', () => {
    const wrapper = shallow(<MyComponent />);
    expect(wrapper.find(Foo)).to.have.length(3);
  });