import React from 'react'
import { shallow } from 'enzyme'
import Find from '../Find'

describe('<Find />', () => {
  const shallowRenderer = () =>
    shallow(
      <Find />
    )

  const wrapper = shallowRenderer()

  test('defaults tate', () => {
    expect(wrapper.state()).toEqual({
      error: null,
      geoHelp: false,
      isGettingLocation: false,
      position: null,
      search: ''
    })
  })

  test('componentDidMount', () => {
    const wrapper_ = shallowRenderer()

    wrapper_.instance().componentDidMount()

    expect(wrapper_.instance()._isMounted).toEqual(true)
  })

  test('componentWillUnmount', () => {
    const wrapper_ = shallowRenderer()
    const instance = wrapper_.instance()
    instance.positionInterval = 'test-interval'

    instance.componentWillUnmount()

    expect(instance.positionInterval).toEqual(null)
    expect(instance._isMounted).toEqual(false)
  })
})
