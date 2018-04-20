import React from 'react';
import { shallow, mount } from 'enzyme';
import { expect } from 'chai';
import  App  from '../client/src/App.jsx';


describe('<App />', () => {
  it('renders 1 component <App /> ', () => {
    const wrapper = shallow(<App/>);
    expect(wrapper.find('div')).to.have.lengthOf(1)
  });
});

// test('invalid path should redirect to 404', () => {
//   const wrapper = mount(
//     <MemoryRouter initialEntries={[ '/random' ]}>
//       <App/>
//     </MemoryRouter>
//   );
//   expect(wrapper.find(LandingPage)).toHaveLength(0);
//   expect(wrapper.find(NotFoundPage)).toHaveLength(1);
// });